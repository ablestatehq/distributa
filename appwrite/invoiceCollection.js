import { Permission, Role } from "node-appwrite";

const { writeFileSync } = require("fs");
const path = require("path");

class Invoice {
  constructor(appwrite, databaseID) {
    this.appwrite = appwrite;
    this.collectionName = "invoices";
    this.collectionID = ID.unique();
    this.databaseID = databaseID;
  }

  async InvoiceCollection () {
    const collection = await this.appwrite.databases.createCollection(
        this.databaseID,
        this.collectionID,
        this.collectionName,
        []
    )
  }
}
