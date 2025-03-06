import { Client, Account, Databases, Storage, Functions } from "appwrite";

import config from "../../config";
import Logger from "../../utils/logger";

class AppwriteService {
  static instance = null;

  constructor() {
    if (AppwriteService.instance) {
      return AppwriteService.instance;
    }

    this.logger = new Logger("AppwriteService", {
      logLevel: process.env.NODE_ENV === "development" ? "debug" : "info",
      metadata: {
        timestamp: true,
        correlationId: true,
      },
    });

    this.initializeClient();
    AppwriteService.instance = this;
  }

  initializeClient() {
    try {
      this.logger.debug("Initializing Appwrite client", {
        endpoint: config.appwrite.endpoint,
      });

      const client = new Client()
        .setEndpoint(config.appwrite.endpoint)
        .setProject(config.appwrite.projectId);

      this.account = new Account(client);
      this.database = new Databases(client);
      this.storage = new Storage(client);
      this.functions = new Functions(client);

      this.logger.info("Appwrite client initialized successfully");

      this.accountLogger = this.logger.child("account");
      this.databaseLogger = this.logger.child("database");
      this.storageLogger = this.logger.child("storage");
      this.functionsLogger = this.logger.child("functions");
    } catch (error) {
      this.logger.error("Error initializing Appwrite client", { error });
    }
  }

  getVariables() {
    return config.appwrite;
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;
