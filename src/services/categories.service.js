import { Permission, Role, Query, ID } from "appwrite";
import AppwriteService from "./appwrite.service.js";
class Category extends AppwriteService {
  #databaseId;
  #categoriesCollectionId;

  constructor() {
    super();
    this.#databaseId = this.getVariables().DATABASE_ID;
    this.#categoriesCollectionId = this.getVariables().CATEGORIES_COLLECTION_ID;
  }

  /**
   * Create a new category
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
      const slug = this.#generateSlug(name);
      let ancestors = [];
      let level = 0;

      // If parent exists, get its data
      if (parentId) {
        const parent = await this.getCategory(parentId);
        if (!parent) {
          throw new Error("Parent category not found");
        }
        ancestors = [...parent.ancestors, parent.$id];
        level = parent.level + 1;
      }

      const category = await this.database.createDocument(
        this.#databaseId,
        this.#categoriesCollectionId,
        ID.unique(),
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
          Permission.read(Role.any()),
          Permission.update(Role.any()),
          Permission.delete(Role.any()),
        ]
      );

      return category;
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  }

  /**
   * Get category by ID
   */
  async getCategory(categoryId) {
    try {
      return await this.database.getDocument(
        this.#databaseId,
        this.#categoriesCollectionId,
        categoryId
      );
    } catch (error) {
      throw new Error(`Failed to get category: ${error.message}`);
    }
  }

  async listCategories() {
    try {
      return await this.database.listDocuments(
        this.#databaseId,
        this.#categoriesCollectionId,
        [
          Query.equal("is_active", true),
          Query.orderAsc("level"),
          Query.orderDesc("$createdAt"),
        ]
      );
    } catch (error) {
      throw new Error(`Failed to list categories: ${error.message}`);
    }
  }
  /**
   * Get category tree
   */
  async getCategoryTree() {
    try {
      const categories = await this.database.listDocuments(
        this.#databaseId,
        this.#categoriesCollectionId,
        [
          Query.equal("is_active", true),
          Query.orderAsc("level"),
          Query.orderAsc("sort_order"),
        ]
      );

      return this.#buildCategoryTree(categories.documents);
    } catch (error) {
      throw new Error(`Failed to get category tree: ${error.message}`);
    }
  }

  /**
   * Get children categories
   */
  async getChildCategories(parentId) {
    try {
      return await this.database.listDocuments(
        this.#databaseId,
        this.#categoriesCollectionId,
        [
          Query.equal("parent_id", parentId),
          Query.equal("is_active", true),
          Query.orderAsc("sort_order"),
        ]
      );
    } catch (error) {
      throw new Error(`Failed to get child categories: ${error.message}`);
    }
  }

  /**
   * Get ancestor categories
   */
  async getAncestors(categoryId) {
    try {
      const category = await this.getCategory(categoryId);
      if (!category.ancestors.length) return [];

      return await this.database.listDocuments(
        this.#databaseId,
        this.#categoriesCollectionId,
        [Query.equal("$id", Query.in(category.ancestors))]
      );
    } catch (error) {
      throw new Error(`Failed to get ancestors: ${error.message}`);
    }
  }

  /**
   * Update category
   */
  async updateCategory(categoryId, updates) {
    try {
      const allowedUpdates = [
        "name",
        "icon",
        "is_active",
        "sort_order",
        "description",
      ];

      const updateData = Object.keys(updates)
        .filter((key) => allowedUpdates.includes(key))
        .reduce((obj, key) => {
          obj[key] = updates[key];
          return obj;
        }, {});

      if (updates.name) {
        updateData.slug = this.#generateSlug(updates.name);
      }

      return await this.database.updateDocument(
        this.#databaseId,
        this.#categoriesCollectionId,
        categoryId,
        updateData
      );
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  }

  /**
   * Soft delete category
   */
  async deleteCategory(categoryId) {
    try {
      // Check for child categories
      const children = await this.getChildCategories(categoryId);
      if (children.total > 0) {
        throw new Error("Cannot delete category with child categories");
      }

      // Soft delete by setting is_active to false
      return await this.updateCategory(categoryId, { is_active: false });
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }

  /**
   * Move category to new parent
   */
  async moveCategory(categoryId, newParentId) {
    try {
      const category = await this.getCategory(categoryId);
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

      return await this.database.updateDocument(
        this.#databaseId,
        this.#categoriesCollectionId,
        categoryId,
        {
          parent_id: newParentId,
          ancestors,
          level: ancestors.length,
        }
      );
    } catch (error) {
      throw new Error(`Failed to move category: ${error.message}`);
    }
  }

  /**
   * Helper method to build tree structure
   */
  #buildCategoryTree(categories) {
    const categoryMap = new Map();
    const roots = [];

    // First pass: create nodes
    categories.forEach((category) => {
      categoryMap.set(category.$id, {
        ...category,
        children: [],
      });
    });

    // Second pass: build tree
    categories.forEach((category) => {
      const node = categoryMap.get(category.$id);
      if (category.parent_id) {
        const parent = categoryMap.get(category.parent_id);
        if (parent) {
          parent.children.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  /**
   * Helper method to generate slug
   */
  #generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
}

const CategoryService = new Category();
export default CategoryService;
