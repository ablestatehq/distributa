import { BaseService } from "../../../lib/appwrite/base-service";
import { appwriteConfig } from "../../../lib/appwrite/config";
import { account } from "../../../lib/appwrite/client";
import { Permission, Role, Query } from "appwrite";
import { format } from "date-fns"; // Added missing import

class CategoryService extends BaseService {
  constructor(config = {}) {
    const collectionId =
      config.collectionId || appwriteConfig.collections.categories;
    super(collectionId, []);
  }

  /**
   * Create a new category
   * @param {Object} categoryData - Category data
   * @returns {Promise<Object>} - Created category
   */
  async createCategory({
    name,
    parentId = null,
    type = "expense",
    icon = null,
    sortOrder = 100,
    description = null,
  }) {
    try {
      // Validate category name uniqueness
      const isNameValid = await this.#validateCategoryName(name, parentId);
      if (!isNameValid) {
        throw new Error("Category name already exists at this level");
      }

      const slug = this.#generateSlug(name);
      let ancestors = [];
      let level = 0;

      const currentUser = await this.account.get();

      // If parent exists, get its data
      if (parentId) {
        const parent = await this.getCategory(parentId);
        if (!parent) {
          throw new Error("Parent category not found");
        }
        ancestors = [...parent.ancestors, parent.$id];
        level = parent.level + 1;
      }

      const category = await this.createDocument(
        {
          name,
          slug,
          type,
          parent_id: parentId,
          ancestors,
          level,
          is_active: true,
          sort_order: sortOrder,
          icon,
          description,
        },
        [
          Permission.read(Role.user(currentUser.$id)),
          Permission.update(Role.user(currentUser.$id)),
          Permission.delete(Role.user(currentUser.$id)),
        ]
      );

      return category;
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  }

  /**
   * Get category by ID
   * @param {string} categoryId - Category ID
   * @returns {Promise<Object>} - Category document
   */
  async getCategory(categoryId) {
    try {
      return await this.getDocument(categoryId);
    } catch (error) {
      throw new Error(`Failed to get category: ${error.message}`);
    }
  }

  /**
   * List categories with optional filters
   * @param {Object} filters - Optional filters to apply
   * @param {boolean} fetchAll - Whether to fetch all records (bypassing pagination limits)
   * @returns {Promise<Object>} - List of categories
   */
  async listCategories(filters = {}, fetchAll = false) {
    try {
      const queries = [
        Query.equal("is_active", true),
        Query.orderAsc("level"),
        Query.orderDesc("$createdAt"),
      ];

      if (fetchAll) {
        return await this.fetchAllDocuments(filters, queries);
      }

      return await this.listDocuments(filters, queries);
    } catch (error) {
      throw new Error(`Failed to list categories: ${error.message}`);
    }
  }

  /**
   * Get category tree
   * @param {Object} filters - Optional filters to apply
   * @returns {Promise<Array>} - Category tree
   */
  async getCategoryTree(filters = {}) {
    try {
      const queries = [
        Query.equal("is_active", true),
        Query.orderAsc("level"),
        Query.orderAsc("sort_order"),
        Query.orderDesc("$createdAt"),
      ];

      const result = await this.fetchAllDocuments(filters, queries);
      return this.#buildCategoryTree(result.documents);
    } catch (error) {
      throw new Error(`Failed to get category tree: ${error.message}`);
    }
  }

  /**
   * Get children categories
   * @param {string} parentId - Parent category ID
   * @returns {Promise<Object>} - List of child categories
   */
  async getChildCategories(parentId) {
    try {
      const queries = [
        Query.equal("parent_id", parentId),
        Query.equal("is_active", true),
        Query.orderAsc("sort_order"),
      ];

      return await this.fetchAllDocuments({}, queries);
    } catch (error) {
      throw new Error(`Failed to get child categories: ${error.message}`);
    }
  }

  /**
   * Get ancestor categories
   * @param {string} categoryId - Category ID
   * @returns {Promise<Array>} - List of ancestor categories
   */
  async getAncestors(categoryId) {
    try {
      const category = await this.getCategory(categoryId);

      if (!category.ancestors || !category.ancestors.length) {
        return [];
      }

      const queries = [Query.equal("$id", category.ancestors)];
      return await this.fetchAllDocuments({}, queries);
    } catch (error) {
      throw new Error(`Failed to get ancestors: ${error.message}`);
    }
  }

  /**
   * Update category
   * @param {string} categoryId - Category ID
   * @param {Object} updates - Updates to apply
   * @returns {Promise<Object>} - Updated category
   */
  async updateCategory(categoryId, updates) {
    try {
      const allowedUpdates = [
        "name",
        "icon",
        "is_active",
        "sort_order",
        "description",
        "type",
      ];

      // Get current category data for comparison
      const currentCategory = await this.getCategory(categoryId);
      if (!currentCategory) {
        throw new Error("Category not found");
      }

      // Validate name uniqueness if name is being updated
      if (updates.name && updates.name !== currentCategory.name) {
        const isNameValid = await this.#validateCategoryName(
          updates.name,
          currentCategory.parent_id,
          categoryId
        );
        if (!isNameValid) {
          throw new Error("Category name already exists at this level");
        }
      }

      const updateData = Object.keys(updates)
        .filter((key) => allowedUpdates.includes(key))
        .reduce((obj, key) => {
          obj[key] = updates[key];
          return obj;
        }, {});

      if (updates.name) {
        updateData.slug = this.#generateSlug(updates.name);
      }

      // Handle type changes and related transaction updates
      if (updates.type && updates.type !== currentCategory.type) {
        await this.#handleCategoryTypeChange(
          categoryId,
          currentCategory.type,
          updates.type
        );
      }

      // Use the BaseService method for consistency
      return await this.updateDocument(categoryId, updateData);
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  }

  /**
   * Soft delete category
   * @param {string} categoryId - Category ID
   * @returns {Promise<Object>} - Deleted category
   */
  async deleteCategory(categoryId) {
    try {
      // Check for child categories
      const children = await this.getChildCategories(categoryId);
      if (children.total > 0) {
        throw new Error("Cannot delete category with child categories");
      }

      // Soft delete by setting is_active to false
      return await this.updateDocument(categoryId, { is_active: false });
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }

  /**
   * Restore a soft-deleted category
   * @param {string} categoryId - Category ID
   * @returns {Promise<Object>} - Restored category
   */
  async restoreCategory(categoryId) {
    try {
      const category = await this.getDocument(categoryId);

      // Check if parent is active
      if (category.parent_id) {
        const parent = await this.getDocument(category.parent_id);
        if (!parent || !parent.is_active) {
          throw new Error("Cannot restore category with inactive parent");
        }
      }

      return await this.updateDocument(categoryId, { is_active: true });
    } catch (error) {
      throw new Error(`Failed to restore category: ${error.message}`);
    }
  }

  /**
   * Move category to new parent
   * @param {string} categoryId - Category ID
   * @param {string|null} newParentId - New parent category ID
   * @returns {Promise<Object>} - Updated category
   */
  async moveCategory(categoryId, newParentId) {
    try {
      // Prevent moving to self
      if (categoryId === newParentId) {
        throw new Error("Cannot move category to itself");
      }

      const category = await this.getCategory(categoryId);
      if (!category) throw new Error("Category not found");

      const newParent = newParentId
        ? await this.getCategory(newParentId)
        : null;

      // Prevent circular references
      if (newParentId && newParent.ancestors.includes(categoryId)) {
        throw new Error("Cannot move category to its own descendant");
      }

      const ancestors = newParent
        ? [...newParent.ancestors, newParent.$id]
        : [];

      return await this.updateDocument(categoryId, {
        parent_id: newParentId,
        ancestors,
        level: ancestors.length,
      });
    } catch (error) {
      throw new Error(`Failed to move category: ${error.message}`);
    }
  }

  /**
   * Bulk update categories
   * @param {Array} updates - Array of updates [{id, data}, ...]
   * @returns {Promise<Array>} - Array of updated categories
   */
  async bulkUpdateCategories(updates) {
    try {
      return await Promise.all(
        updates.map(({ id, data }) => this.updateCategory(id, data))
      );
    } catch (error) {
      throw new Error(`Failed to bulk update categories: ${error.message}`);
    }
  }

  /**
   * Fetches all documents by handling pagination automatically
   * @param {Object} filters - Optional filters to apply
   * @param {Array} queries - Array of Query objects
   * @returns {Promise<Object>} - Combined result of all documents
   */
  async fetchAllDocuments(filters = {}, queries = []) {
    try {
      const initialResult = await this.listDocuments(filters, queries, 1, 0);
      const totalDocuments = initialResult.total;

      if (totalDocuments <= 25) {
        return await this.listDocuments(filters, queries);
      }

      const limit = 25;
      const requestsNeeded = Math.ceil(totalDocuments / limit);

      const promises = [];

      for (let i = 0; i < requestsNeeded; i++) {
        const offset = i * limit;
        promises.push(this.listDocuments(filters, queries, limit, offset));
      }

      const results = await Promise.all(promises);

      const allDocuments = results.reduce((acc, result) => {
        return acc.concat(result.documents);
      }, []);

      return {
        documents: allDocuments,
        total: totalDocuments,
      };
    } catch (error) {
      throw new Error(`Failed to fetch all documents: ${error.message}`);
    }
  }

  /**
   * Helper method to build tree structure
   * @private
   * @param {Array} categories - List of categories
   * @returns {Array} - Tree structure
   */
  #buildCategoryTree(categories) {
    const categoryMap = {};
    const roots = [];

    // Create nodes and map
    categories.forEach((category) => {
      categoryMap[category.$id] = { ...category, children: [] };
    });

    // Build tree
    categories.forEach((category) => {
      if (category.parent_id && categoryMap[category.parent_id]) {
        categoryMap[category.parent_id].children.push(
          categoryMap[category.$id]
        );
      } else {
        roots.push(categoryMap[category.$id]);
      }
    });

    return roots;
  }

  /**
   * Helper method to generate slug
   * @private
   * @param {string} name - Category name
   * @returns {string} - Generated slug
   */
  #generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  /**
   * Validate category name uniqueness at the same level
   * @private
   * @param {string} name - Category name
   * @param {string|null} parentId - Parent category ID
   * @param {string|null} excludeId - Category ID to exclude from check (for updates)
   * @returns {Promise<boolean>} - Whether name is valid
   */
  async #validateCategoryName(name, parentId, excludeId = null) {
    const queries = [
      Query.equal("name", name),
      Query.equal("parent_id", parentId || null),
    ];

    if (excludeId) {
      queries.push(Query.notEqual("$id", excludeId));
    }

    const { total } = await this.listDocuments({}, queries, 1);
    return total === 0;
  }

  /**
   * Handle category type change and update related transactions
   * @private
   * @param {string} categoryId - Category ID
   * @param {string} prevType - Previous category type
   * @param {string} newType - New category type
   * @returns {Promise<void>}
   */
  async #handleCategoryTypeChange(categoryId, prevType, newType) {
    const { $id: userId } = await account.get();

    // Update child categories first
    const children = await this.getChildCategories(categoryId);
    let updatedCategories = [categoryId];

    if (children.total > 0) {
      const updatedChildren = await Promise.all(
        children.documents.map(async (child) => {
          const { $id: childId } = await this.updateCategory(child.$id, {
            type: newType,
          });
          return childId;
        })
      );
      updatedCategories = [...updatedCategories, ...updatedChildren];
    }

    // Update related transactions
    await this.#updateTransactionsForCategoryTypeChange(
      updatedCategories,
      prevType,
      newType,
      userId
    );
  }

  /**
   * Update transactions when category type changes
   * @private
   * @param {Array} categoryIds - Array of category IDs
   * @param {string} prevType - Previous category type
   * @param {string} newType - New category type
   * @param {string} userId - User ID
   * @returns {Promise<void>}
   */
  async #updateTransactionsForCategoryTypeChange(
    categoryIds,
    prevType,
    newType,
    userId
  ) {
    let offset = 0;
    const limit = 100;

    while (true) {
      const queries = [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc("$createdAt"),
      ];

      // Use the BaseService method for consistency
      const { documents: transactions, total: totalTransactions } =
        await this.database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.collections.transactions,
          queries
        );

      if (totalTransactions === 0) break;

      const relevantTransactions = transactions.filter((transaction) =>
        categoryIds.includes(transaction.category.$id)
      );

      if (relevantTransactions.length > 0) {
        await Promise.all(
          relevantTransactions.map((transaction) =>
            this.#updateTransactionForCategoryTypeChange(
              transaction,
              prevType,
              newType,
              userId
            )
          )
        );
      }

      if (transactions.length < limit) break;
      offset += limit;
    }
  }

  /**
   * Update a single transaction for category type change
   * @private
   * @param {Object} transaction - Transaction document
   * @param {string} prevType - Previous category type
   * @param {string} newType - New category type
   * @param {string} userId - User ID
   * @returns {Promise<Array>} - Array of promises
   */
  async #updateTransactionForCategoryTypeChange(
    transaction,
    prevType,
    newType,
    userId
  ) {
    // Get the monthly statement
    const {
      documents: [statement = null],
    } = await this.database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.monthlyStatements,
      [
        Query.equal("user_id", userId),
        Query.equal(
          "year_month",
          format(new Date(transaction.date), "yyyy-MM")
        ),
      ]
    );

    if (!statement) return null;

    // Handle different type change scenarios
    if (prevType === "income" && newType === "expense") {
      const statementUpdate = this.database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.monthlyStatements,
        statement.$id,
        {
          expense: statement.expense + transaction.amount,
          income: statement.income - transaction.amount,
        }
      );

      const transactionUpdate = this.database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.transactions,
        transaction.$id,
        { flow_type: newType }
      );

      return Promise.all([statementUpdate, transactionUpdate]);
    } else if (prevType === "expense" && newType === "income") {
      const statementUpdate = this.database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.monthlyStatements,
        statement.$id,
        {
          expense: statement.expense - transaction.amount,
          income: statement.income + transaction.amount,
        }
      );

      const transactionUpdate = this.database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.transactions,
        transaction.$id,
        { flow_type: newType }
      );

      return Promise.all([statementUpdate, transactionUpdate]);
    } else if (
      prevType === "both" &&
      newType === "income" &&
      transaction.flow_type === "expense"
    ) {
      const statementUpdate = this.database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.monthlyStatements,
        statement.$id,
        {
          expense: statement.expense - transaction.amount,
          income: statement.income + transaction.amount,
        }
      );

      const transactionUpdate = this.database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.transactions,
        transaction.$id,
        { flow_type: newType }
      );

      return Promise.all([statementUpdate, transactionUpdate]);
    } else if (
      prevType === "both" &&
      newType === "expense" &&
      transaction.flow_type === "income"
    ) {
      const statementUpdate = this.database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.monthlyStatements,
        statement.$id,
        {
          expense: statement.expense + transaction.amount,
          income: statement.income - transaction.amount,
        }
      );

      const transactionUpdate = this.database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.transactions,
        transaction.$id,
        { flow_type: newType }
      );

      return Promise.all([statementUpdate, transactionUpdate]);
    }

    return null;
  }
}

export const categoryService = new CategoryService();
export default CategoryService;
