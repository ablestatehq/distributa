import { ID, Permission, Role } from "appwrite";
import Logger from "../../utils/logger";

class BaseService {
  constructor(appwriteService, collectionName) {
    this.appwrite = appwriteService;
    this.database = this.appwrite.database;
    this.account = this.appwrite.account;
    this.logger = new Logger(this.constructor.name);

    const variables = this.appwrite.getVariables();
    this.databaseId = variables.databaseId;
    this.collectionId = variables.collections[collectionName];

    this.logger.info("BaseService initialized", {
      collectionName,
      collectionId: this.collectionId,
    });
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      this.logger.error("Failed to get the current user", { error });
      throw error;
    }
  }

  async getUserPermissions(userId) {
    return [
      Permission.read(Role.user(userId)),
      Permission.write(Role.user(userId)),
      Permission.update(Role.user(userId)),
    ];
  }

  async createDocument(data, permissions = []) {
    try {
      const currentUser = await this.getCurrentUser();
      const userPermissions = await this.getUserPermissions(currentUser.$id);

      return await this.database.createDocument(
        this.databaseId,
        this.collectionId,
        ID.unique(),
        data,
        [...userPermissions, ...permissions]
      );
    } catch (error) {
      this.logger.error("Failed to create document", { error });
      throw error;
    }
  }

  async getDocument(documentId) {
    try {
      const document = await this.database.getDocument(
        this.databaseId,
        this.collectionId,
        documentId
      );

      return document;
    } catch (error) {
      this.logger.error("Failed to get document", { error });
      throw error;
    }
  }

  async updateDocument(documentId, data) {
    try {
      const result = await this.database.updateDocument(
        this.databaseId,
        this.collectionId,
        documentId,
        data
      );

      return result;
    } catch (error) {
      this.logger.error("Failed to update document", { id: documentId, error });
      throw error;
    }
  }

  async deleteDocument(documentId) {
    try {
      const result = await this.database.deleteDocument(
        this.databaseId,
        this.collectionId,
        documentId
      );

      return result;
    } catch (error) {
      this.logger.error("Failed to delete document", { id: documentId, error });
      throw error;
    }
  }

  async listDocuments(queries = []) {
    try {
      return await this.database.listDocuments(
        this.databaseId,
        this.collectionId,
        queries
      );
    } catch (error) {
      this.logger.error("Failed to list documents", { error });
    }
  }
}

export default BaseService;
