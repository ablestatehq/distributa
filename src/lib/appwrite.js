// lib/appwrite.js
import { Client, Databases, Storage, Account } from "appwrite";
import { API_ENDPOINT, PROJECT_ID } from "../data/constants";

class AppwriteClient {
  constructor() {
    const client = new Client()
      .setEndpoint(API_ENDPOINT)
      .setProject(PROJECT_ID);

    this.client = client;
    this.databases = new Databases(client);
    this.storage = new Storage(client);
    this.account = new Account(client);
  }
}

export const appwrite = new AppwriteClient();
