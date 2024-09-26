import {
  Client as Appwrite,
  Account,
  Databases,
  ID,
  Teams,
  Storage,
  Functions,
} from "appwrite";
import {
  API_ENDPOINT,
  PROJECT_ID,
  SYSTEM_TEAM_ID,
  DATABASE_ID,
  INVOICES_COLLECTION_ID,
  DISTRIBUTIONS_COLLECTION_ID,
  // LOGOS_BUCKET_ID,
} from "../../data/constants";

const appwriteClient = new Appwrite();

class AppwriteService {
  account;
  database;
  teams;
  storage;
  functions;
  client;

  /**
   * @constructor
   * @description Creates an instance of the AppwriteService class
   * @see https://appwrite.io/docs/client/account
   * @see https://appwrite.io/docs/client/database
   * @see https://appwrite.io/docs/client/teams
   * @see https://appwrite.io/docs/client/storage
   * @see https://appwrite.io/docs/client/functions
   * @returns {AppwriteService} An instance of the AppwriteService class
   * @example
   * const appwriteService = new AppwriteService();
   * appwriteService.account.get().then((account) => {
   *  console.log(account);
   * });
   */
  constructor() {
    appwriteClient.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

    this.client = appwriteClient;
    this.account = new Account(appwriteClient);
    this.database = new Databases(appwriteClient, DATABASE_ID);
    this.teams = new Teams(appwriteClient);
    this.functions = new Functions(appwriteClient);
    this.storage = new Storage(appwriteClient);
  }

  // Variables
  getVariables() {
    const variables = {
      API_ENDPOINT,
      PROJECT_ID,
      SYSTEM_TEAM_ID,
      DATABASE_ID,
      INVOICES_COLLECTION_ID,
      DISTRIBUTIONS_COLLECTION_ID,
    };

    return variables;
  }

  /**
   * @function createAccount
   * @description Creates an account using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @param {Object} values An object containing the credentials for account creation
   * @param {String} provider The provider to use for account creation
   * @returns <Promise> A promise that resolves to the account creation response
   */
  createAccount(email, pass) {
    return this.account.create("unique()", email, pass, " ");
  }

  /**
   * @function getAccount
   * @description Gets the account object using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @returns <Promise> A promise that resolves to the account object
   */
  getAccount() {
    return this.account.get();
  }

  /**
   * @function getAccountPrefs
   * @description Gets the account preferences object using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @returns <Promise> A promise that resolves to the account object
   */
  getAccountPrefs() {
    return this.account.getPrefs();
  }

  /**
   * @function listLogs
   * @description Gets the account logs object using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @returns <Promise> A promise that resolves to the account logs object
   */
  listLogs() {
    return this.account.listLogs();
  }

  /**
   * @function createSession
   * @description Creates a session using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @param {String} email
   * @param {String} pass
   * @returns <Promise> A promise that resolves to the session object
   */
  createSession(email, pass) {
    return this.account.createEmailPasswordSession(email, pass);
  }

  /**
   * @function getSession
   * @description Gets the current session using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @returns <Promise> A promise that resolves to the session object or null if the user does not have a session
   */
  getSession() {
    return this.account.getSession("current");
  }

  /**
   * @function updateName
   * @param {String} name
   * @returns <Promise> A promise that resolves to the user object with the updated name
   */
  updateName(name) {
    return this.account.updateName(name);
  }

  /**
   * @function updatepass
   * @description Updates the user's pass details using the appwrite API
   * @param {pass} pass
   * @returns <Promise> A promise that resolves to the user object.
   */
  updatepass(pass) {
    return this.account.updatepassword(pass);
  }

  /**
   * @function updateEmail
   * @description Updates the user's email details using the appwrite API
   * @param {String} email
   * @returns <Promise> A promise that resolves to the user object.
   */
  updateEmail(email) {
    return this.account.updateEmail(email);
  }

  /**
   * @function deleteCurrentSession
   * @returns <Promise> A promise that resolves to null
   */
  deleteCurrentSession() {
    return this.account.deleteSession("current");
  }

  // Database
  /**
   * @function createCollection
   * @description Creates a collection using the appwrite API
   * @param {String} databaseId The id of the database
   * @param {String} collectionId The id of the new collection
   * @param {Object} data The data to be stored in the collection
   * @param {String} Id The of the document
   * @param {Object} permissions The access rights to the document
   * @returns <Promise> A promise that resolves to the collection object
   */
  createDocument(
    databaseId,
    collectionId,
    data,
    id = ID.unique(),
    permissions = []
  ) {
    return this.database.createDocument(
      databaseId,
      collectionId,
      id,
      data,
      permissions
    );
  }

  /**
   * @function listCollections
   * @description Lists all collections in a database using the appwrite API
   * @param {String} databaseId
   * @param {String} collectionId
   * @returns <Promise> A promise that resolves to the collections object
   * @see https://appwrite.io/docs/client/database
   */
  listDocuments(databaseId, collectionId) {
    return this.database.listDocuments(databaseId, collectionId);
  }

  /**
   *@function getDocument
   * @param {String} databaseId The database ID
   * @param {String} collectionId The collection ID
   * @param {String} documentId The document ID
   * @returns <Promise> A promise that resolves to the document object
   * @see https://appwrite.io/docs/client/database
   */
  getDocument(databaseId, collectionId, documentId) {
    return this.database.getDocument(databaseId, collectionId, documentId);
  }

  /**
   * @function updateDocument
   * @description Updates a document in a collection using the appwrite API
   * @param {String} databaseId
   * @param {String} collectionId
   * @param {String} documentId
   * @param {Object} data
   * @returns <Promise> A promise that resolves to the updated document object
   * @see https://appwrite.io/docs/client/database
   */
  updateDocument(databaseId, collectionId, documentId, data) {
    return this.database.updateDocument(
      databaseId,
      collectionId,
      documentId,
      data
    );
  }

  /**
   * @function deleteDocument
   * @description Deletes a document in a collection using the appwrite API
   * @param {String} databaseId
   * @param {String} collectionId
   * @param {String} documentId
   * @returns <Promise> A promise that resolves to null
   * @see https://appwrite.io/docs/client/database
   */
  deleteDocument(databaseId, collectionId, documentId) {
    return this.database.deleteDocument(databaseId, collectionId, documentId);
  }

  // Teams
  /**
   * @function listMemberships
   * @description Lists all memberships in a team using the appwrite API
   * @param {String} teamId
   * @returns <Promise> A promise that resolves to the memberships object
   * @see https://appwrite.io/docs/client/teams
   */
  listSystemTeamMemberships(teamId = SYSTEM_TEAM_ID) {
    return this.teams.listMemberships(teamId);
  }

  /**
   * @function createTeam
   * @description Creates a team using the appwrite API
   * @param {String} teamName The name of the team
   * @returns <Promise> A promise that resolves to the team object
   * @see https://appwrite.io/docs/client/teams
   */
  createTeam(teamName) {
    return this.teams.create("unique()", teamName);
  }

  /**
   * @function listTeams
   * @description Lists all teams using the appwrite API
   * @returns <Promise> A promise that resolves to the team object
   * @see https://appwrite.io/docs/client/teams
   */
  listTeams() {
    return this.teams.list();
  }

  /**
   * @function createFile
   * @description Creates a file using the appwrite API
   * @param {Object} file
   * @param {String} bucketID
   * @returns <Promise> A promise that resolves to the file object
   * @see https://appwrite.io/docs/client/storage
   */
  createFile(file, bucketID) {
    return this.storage.createFile(bucketID, "unique()", file);
  }

  /**
   * @function getFileForView
   * @description Gets a file for viewing using the appwrite API
   * @param {String} fileID
   * @param {String} bucketID
   * @returns <Promise> A promise that resolves to the file object
   */
  getFileForView(fileID, bucketID) {
    return this.storage.getFileView(bucketID, fileID);
  }

  // Functions
  /**
   * @function createFunctionExecution
   * @description Creates a function execution using the appwrite API
   * @param {String} functionID
   * @param {Object} data
   * @param {Boolean}
   * @returns <Promise> A promise that resolves to the function execution object
   * @see https://appwrite.io/docs/client/functions
   */
  createFunctionExecution(functionID, data, async = true) {
    return this.functions.createExecution(functionID, data);
  }

  /**
   * @function getExecution
   * @description Gets a function execution using the appwrite API
   * @param {String} functionID
   * @param {String} executionID
   * @returns <Promise> A promise that resolves to the function execution object
   * @see https://appwrite.io/docs/client/functions
   */
  getExecution(functionID, executionID) {
    return this.functions.getExecution(functionID, executionID);
  }
}

export default AppwriteService;
