import {
  Client as appwrite,
  Account,
  Databases,
  ID,
  Teams,
  Storage,
  Functions,
} from "appwrite";
import { API_ENDPOINT, PROJECT_ID, SYSTEM_TEAM_ID, DATABASE_ID, INVOICES_COLLECTION_ID, DISTRIBUTIONS_COLLECTION_ID, LOGOS_BUCKET_ID } from "../data/constants";
import { Server } from "./config";

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }

    let appwrite = new appwrite();
    appwrite.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

    const account = new Account(appwrite);
    const database = new Databases(appwrite, DATABASE_ID);
    const teams = new Teams(appwrite);
    const storage = new Storage(appwrite);
    const functions = new Functions(appwrite);

    api.sdk = { database, account, teams, storage, functions };
    return api.sdk;
  },

  /**
   * @function createAccount
   * @description Creates an account using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @param {Object} values An object containing the credentials for account creation
   * @param {String} provider The provider to use for account creation
   * @returns <Promise> A promise that resolves to the account creation response
   */

  createAccount: (values, provider) => {
    console.log("values: ", values);
    console.log("provider: ", values.provider);
    if (provider === "email") {
      const { email, pass } = values;
      return api.provider().account.create("unique()", email, pass, " ");
    }
  },

  /**
   * @function getAccount
   * @description Gets the account object using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @returns <Promise> A promise that resolves to the account object
   */

  getAccount: () => {
    let account = api.provider().account;
    return account.get();
  },

  /**
   * @function getAccountPrefs
   * @description Gets the account preferences object using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @returns <Promise> A promise that resolves to the account object
   */
  getAccountPrefs: () => {
    let account = api.provider().account;
    return account.getPrefs();
  },

  /**
   * @function listLogs
   * @description Gets the account logs object using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @returns <Promise> A promise that resolves to the account logs object
   */
  listLogs: () => {
    let account = api.provider().account;
    return account.listLogs();
  },

  /**
   * @function createSession
   * @description Creates a session using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @param {String} email
   * @param {String} pass
   * @returns <Promise> A promise that resolves to the session object
   */

  createSession: (email, pass) => {
    return api.provider().account.createEmailSession(email, pass);
  },

  /**
   * @function getSession
   * @description Gets the current session using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @returns <Promise> A promise that resolves to the session object or null if the user does not have a session
   */

  getSession: () => {
    return api.provider().account.getSession("current");
  },

  /**
   * @function updateName
   * @param {String} name
   * @returns <Promise> A promise that resolves to the user object with the updated name
   */
  updateName: (name) => {
    return api.provider().account.updateName(name);
  },

  /**
   * @function updatepass
   * @description Updates the user's pass details using the appwrite API
   * @param {pass} pass
   * @returns <Promise> A promise that resolves to the user object.
   */
  updatepass: (pass) => {
    return api.provider().account.updatepassword(pass);
  },

  /**
   * @function updateEmail
   * @description Updates the user's email details using the appwrite API
   * @param {String} email
   * @returns <Promise> A promise that resolves to the user object.
   */
  updateEmail: (email) => {
    return api.provider().account.updateEmail(email);
  },

  /**
   * @function deleteCurrentSession
   * @returns <Promise> A promise that resolves to the user object.
   */

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  /**
   * @function createCollection
   * @description Creates a collection using the appwrite API
   * @param {String} databaseId The id of the database
   * @param {String} collectionId The id of the new collection
   * @param {Object} data The data to be stored in the collection
   * @param {String} Id The of the document
   * @param {Object} permissions The access rights to the document
   * @returns
   */
  createDocument: (
    databaseId,
    collectionId,
    data,
    id = ID.unique(),
    permissions = []
  ) => {
    console.log("Permissions: ", permissions);
    return api
      .provider()
      .database.createDocument(databaseId, collectionId, id, data, permissions);
  },

  /**
   * @function listCollections
   * @description Lists all collections in a database using the appwrite API
   * @param {String} databaseId
   * @param {String} collectionId
   * @returns <Promise> A promise that resolves to the collections object
   * @see https://appwrite.io/docs/client/database
   */
  listDocuments: (databaseId, collectionId) => {
    return api.provider().database.listDocuments(databaseId, collectionId);
  },

  /**
   *
   * @param {String} databaseId The database ID
   * @param {String} collectionId The collection ID
   * @param {String} documentId The document ID
   * @returns <Promise> A promise that resolves to the document object
   * @see https://appwrite.io/docs/client/database
   */

  getDocument: (databaseId, collectionId, documentId) => {
    return api
      .provider()
      .database.getDocument(databaseId, collectionId, documentId);
  },

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
  updateDocument: (databaseId, collectionId, documentId, data) => {
    return api
      .provider()
      .database.updateDocument(databaseId, collectionId, documentId, data);
  },

  /**
   * @function deleteDocument
   * @description Deletes a document in a collection using the appwrite API
   * @param {String} databaseId
   * @param {String} collectionId
   * @param {String} documentId
   * @returns <Promise> A promise that resolves to the deleted document object
   * @see https://appwrite.io/docs/client/database
   */
  deleteDocument: (databaseId, collectionId, documentId) => {
    return api
      .provider()
      .database.deleteDocument(databaseId, collectionId, documentId);
  },

  /**
   * @function listMemberships
   * @description Lists all memberships in a team using the appwrite API
   * @param {String} teamId
   * @returns <Promise> A promise that resolves to the memberships object
   * @see https://appwrite.io/docs/client/teams
   */
  listMemberships: () => {
    const memberships = api
      .provider()
      .teams.listMemberships(Server.systemTeamID);
    return memberships;
  },

  /**
   * @function createTeam
   * @param {String} teamName The name of the team
   * @returns <Promise> A promise that resolves to the team object
   * @see https://appwrite.io/docs/client/teams
   * @description Creates a team using the appwrite API
   */
  createTeam: (teamName) => {
    return api.provider().teams.create("unique()", teamName);
  },

  /**
   * @function listTeams
   * @description Lists all teams using the appwrite API
   * @returns <Promise> A promise that resolves to the team object
   * @see https://appwrite.io/docs/client/teams
   */

  listTeams: () => {
    return api.provider().teams.list();
  },

  /**
   * @function createFile
   * @description Creates a file using the appwrite API
   * @param {Object} file
   * @param {String} bucketID
   * @returns <Promise> A promise that resolves to the file object
   * @see https://appwrite.io/docs/client/storage
   */

  createFile: (file, bucketID) => {
    return api.provider().storage.createFile(bucketID, "unique()", file);
  },

  /**
   * @function getFileForView
   * @description Gets a file for viewing using the appwrite API
   * @param {String} fileID
   * @param {String} bucketID
   * @returns <Promise> A promise that resolves to the file object
   */

  getFileForView: (fileID, bucketID) => {
    return api.provider().storage.getFileView(bucketID, fileID);
  },

  /**
   * @function createFunctionExecution
   * @description Creates a function execution using the appwrite API
   * @param {String} functionID
   * @param {Object} data
   * @param {Boolean} async
   * @returns <Promise> A promise that resolves to the function execution object
   * @see https://appwrite.io/docs/client/functions
   */
  createFunctionExecution: (functionID, data, async = true) => {
    return api.provider().functions.createExecution(functionID, data, async);
  },

  /**
   * @function getExecution
   * @description Gets a function execution using the appwrite API
   * @param {String} functionID
   * @param {String} executionID
   * @returns <Promise> A promise that resolves to the function execution object
   * @see https://appwrite.io/docs/client/functions
   */

  getExecution: async (functionID, executionID) => {
    return await api.provider().functions.getExecution(functionID, executionID);
  },
};

export default api;
