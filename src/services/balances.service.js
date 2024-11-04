import { ID, Query, Permission, Role } from "appwrite";
import { format } from "date-fns";
import AppwriteService from "./appwrite.service.js";

class Balances extends AppwriteService {
  #databaseId;
  #accountSummariesCollectionId;
  #monthlyStatementsCollectionId;
  #categoriesCollectionId;
  #monthlyCategoryTotalsCollectionId;

  constructor() {
    super();
    this.#databaseId = this.getVariables().DATABASE_ID;
    this.#accountSummariesCollectionId =
      this.getVariables().ACCOUNT_SUMMARIES_COLLECTION_ID;
    this.#monthlyStatementsCollectionId =
      this.getVariables().MONTHLY_STATEMENTS_COLLECTION_ID;
    this.#categoriesCollectionId = this.getVariables().CATEGORIES_COLLECTION_ID;
    this.#monthlyCategoryTotalsCollectionId =
      this.getVariables().MONTHLY_CATEGORY_TOTALS_COLLECTION_ID;
  }

  /**
   * Initialize or get user balance record
   */

  async initializeUserBalance(currency = "USD") {
    const userId = (await this.account.get())?.$id ?? null;

    try {
      const userBalance = await this.database.listDocuments(
        this.#databaseId,
        this.#accountSummariesCollectionId,
        [Query.equal("user_id", userId)]
      );

      if (userBalance.total === 0) {
        return await this.database.createDocument(
          this.#databaseId,
          this.#accountSummariesCollectionId,
          ID.unique(),
          {
            user_id: userId,
            total_income: 0,
            total_expenses: 0,
            current_balance: 0,
            currency,
            budget_limit: 0,
            savings_goal: 0,
            last_transaction_date: new Date().toISOString(),
          },
          [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
          ]
        );
      }

      return userBalance.documents[0];
    } catch (error) {
      throw new Error(`Failed to initialize user balance: ${error.message}`);
    }
  }

  /**
   * Get or create monthly balance record
   */
  async getOrCreateMonthlyBalance(date) {
    const userId = (await this.account.get())?.$id ?? null;

    const yearMonth = format(new Date(date), "yyyy-MM");

    try {
      const monthlyBalance = await this.database.listDocuments(
        this.#databaseId,
        this.#monthlyStatementsCollectionId,
        [Query.equal("user_id", userId), Query.equal("year_month", yearMonth)]
      );

      if (monthlyBalance.total === 0) {
        return await this.database.createDocument(
          this.#databaseId,
          this.#monthlyStatementsCollectionId,
          ID.unique(),
          {
            user_id: userId,
            year_month: yearMonth,
            income: 0,
            expense: 0,
            budget_utilised: 0,
            recurring_expenses: 0,
            savings_amount: 0,
            number_of_transactions: 0,
            average_transaction_amount: 0,
            largest_transaction_amount: 0,
          },
          [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
          ]
        );
      }

      return monthlyBalance.documents[0];
    } catch (error) {
      throw new Error(`Failed to get/create monthly balance: ${error.message}`);
    }
  }

  /**
   * Update or create monthly category total
   */
  async updateMonthlyCategoryTotal(monthlyStatementId, categoryId, amount) {
    const userId = (await this.account.get())?.$id ?? null;
    try {
      const categoryTotal = await this.database.listDocuments(
        this.#databaseId,
        this.#monthlyCategoryTotalsCollectionId,
        [
          Query.equal("monthly_statement_id", monthlyStatementId),
          Query.equal("category_id", categoryId),
        ]
      );

      if (categoryTotal.total === 0) {
        return await this.database.createDocument(
          this.#databaseId,
          this.#monthlyCategoryTotalsCollectionId,
          ID.unique(),
          {
            monthly_statement_id: monthlyStatementId,
            category_id: categoryId,
            amount: amount,
          },
          [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
          ]
        );
      }

      return await this.database.updateDocument(
        this.#databaseId,
        this.#monthlyCategoryTotalsCollectionId,
        categoryTotal.documents[0].$id,
        {
          amount: categoryTotal.documents[0].amount + amount,
        }
      );
    } catch (error) {
      throw new Error(
        `Failed to update monthly category total: ${error.message}`
      );
    }
  }

  /**
   * Update balances after a new transaction
   */
  async updateBalances(amount, type, categoryId, date) {
    try {
      const [userBalance, monthlyBalance] = await Promise.all([
        this.initializeUserBalance(),
        this.getOrCreateMonthlyBalance(date),
        this.database.getDocument(
          this.#databaseId,
          this.#categoriesCollectionId,
          categoryId
        ),
      ]);

      // Execute updates in parallel since they don't depend on each other
      const [updatedUserBalance, updatedMonthlyBalance] = await Promise.all([
        // Update user balance
        this.database.updateDocument(
          this.#databaseId,
          this.#accountSummariesCollectionId,
          userBalance.$id,
          {
            total_income:
              type === "income"
                ? userBalance.total_income + amount
                : userBalance.total_income,
            total_expenses:
              type === "expense"
                ? userBalance.total_expenses + amount
                : userBalance.total_expenses,
            current_balance:
              type === "income"
                ? userBalance.current_balance + amount
                : userBalance.current_balance - amount,
            last_transaction_date: new Date().toISOString(),
          }
        ),

        // Update monthly balance
        this.database.updateDocument(
          this.#databaseId,
          this.#monthlyStatementsCollectionId,
          monthlyBalance.$id,
          {
            income:
              type === "income"
                ? monthlyBalance.income + amount
                : monthlyBalance.income,
            expense:
              type === "expense"
                ? monthlyBalance.expense + amount
                : monthlyBalance.expense,
            number_of_transactions: monthlyBalance.number_of_transactions + 1,
            average_transaction_amount:
              (monthlyBalance.average_transaction_amount *
                monthlyBalance.number_of_transactions +
                amount) /
              (monthlyBalance.number_of_transactions + 1),
            largest_transaction_amount: Math.max(
              monthlyBalance.largest_transaction_amount,
              amount
            ),
            budget_utilised:
              type === "expense"
                ? monthlyBalance.budget_utilised + amount
                : monthlyBalance.budget_utilised,
          }
        ),

        // Update category total
        this.updateMonthlyCategoryTotal(monthlyBalance.$id, categoryId, amount),
      ]);

      return {
        userBalance: updatedUserBalance,
        monthlyBalance: updatedMonthlyBalance,
      };
    } catch (error) {
      throw new Error(`Failed to update balances: ${error.message}`);
    }
  }

  /**
   * Get monthly statistics with category details
   */
  async getMonthlyStats(yearMonth) {
    const userId = (await this.account.get())?.$id ?? null;

    try {
      const monthlyBalance = await this.database.listDocuments(
        this.#databaseId,
        this.#monthlyStatementsCollectionId,
        [Query.equal("user_id", userId), Query.equal("year_month", yearMonth)]
      );

      if (monthlyBalance.total === 0) {
        return null;
      }

      const balance = monthlyBalance.documents[0];

      // Get category totals for this monthly statement
      const categoryTotals = await this.database.listDocuments(
        this.#databaseId,
        this.#monthlyCategoryTotalsCollectionId,
        [Query.equal("monthly_statement_id", balance.$id)]
      );

      // Get all categories referenced in the totals
      const categoryIds = categoryTotals.documents.map((ct) => ct.category_id);
      let categories = [];
      if (categoryIds.length > 0) {
        categories = await this.database.listDocuments(
          this.#databaseId,
          this.#categoriesCollectionId,
          [Query.equal("$id", Query.in(categoryIds))]
        );
      }

      // Calculate category breakdown with details
      const categoryBreakdown = categories.documents.map((category) => {
        const categoryTotal = categoryTotals.documents.find(
          (ct) => ct.category_id === category.$id
        );
        return {
          id: category.$id,
          name: category.name,
          icon: category.icon,
          type: category.type,
          total: categoryTotal?.amount || 0,
          percentage:
            ((categoryTotal?.amount || 0) /
              (category.type === "expense"
                ? balance.expenses
                : balance.income)) *
            100,
        };
      });

      return {
        income: balance.income,
        expenses: balance.expenses,
        netSavings: balance.income - balance.expenses,
        transactionCount: balance.number_of_transactions,
        averageTransaction: balance.average_transaction_amount,
        largestTransaction: balance.largest_transaction_amount,
        budgetUtilised: balance.budget_utilised,
        categoryBreakdown,
      };
    } catch (error) {
      throw new Error(`Failed to get monthly stats: ${error.message}`);
    }
  }

  /**
   * Get monthly balances for a date range
   */
  async getMonthlyBalances(startDate, endDate) {
    const userId = (await this.account.get())?.$id ?? null;

    try {
      return await this.database.listDocuments(
        this.#databaseId,
        this.#monthlyStatementsCollectionId,
        [
          Query.equal("user_id", userId),
          Query.greaterThanEqual(
            "year_month",
            format(new Date(startDate), "yyyy-MM")
          ),
          Query.lessThanEqual(
            "year_month",
            format(new Date(endDate), "yyyy-MM")
          ),
          Query.orderDesc("year_month"),
        ]
      );
    } catch (error) {
      throw new Error(`Failed to fetch monthly balances: ${error.message}`);
    }
  }

  /**
   * Get current month Summary
   */
  async getCurrentMonthSummary() {
    const userId = (await this.account.get())?.$id ?? null;
    const yearMonth = format(new Date(), "yyyy-MM");

    try {
      const monthlyBalance = await this.database.listDocuments(
        this.#databaseId,
        this.#monthlyStatementsCollectionId,
        [Query.equal("user_id", userId), Query.equal("year_month", yearMonth)]
      );

      return monthlyBalance;
    } catch (error) {
      throw new Error(
        `Failed to get current monthly balance: ${error.message}`
      );
    }
  }

  /**
   * Update budget limit
   */
  async updateBudgetLimit(newLimit) {
    try {
      const userBalance = await this.initializeUserBalance();
      return await this.database.updateDocument(
        this.#databaseId,
        this.#accountSummariesCollectionId,
        userBalance.$id,
        { budget_limit: newLimit }
      );
    } catch (error) {
      throw new Error(`Failed to update budget limit: ${error.message}`);
    }
  }

  /**
   * Update savings goal
   */
  async updateSavingsGoal(newGoal) {
    try {
      const userBalance = await this.initializeUserBalance();
      return await this.database.updateDocument(
        this.#databaseId,
        this.#accountSummariesCollectionId,
        userBalance.$id,
        { savings_goal: newGoal }
      );
    } catch (error) {
      throw new Error(`Failed to update savings goal: ${error.message}`);
    }
  }

  /**
   * Get current user balance
   */
  async getCurrentBalance() {
    try {
      const userBalance = await this.initializeUserBalance();
      return userBalance.current_balance;
    } catch (error) {
      throw new Error(`Failed to get current balance: ${error.message}`);
    }
  }
}

const BalancesService = new Balances();
export default BalancesService;
