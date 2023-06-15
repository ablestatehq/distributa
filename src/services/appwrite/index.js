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
  LOGOS_BUCKET_ID,
} from "../../data/constants";

const appwriteClient = new Appwrite();

class AppwriteService {
  account;
  database;
  teams;
  storage;
  functions;

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

    this.account = new Account(appwriteClient);
    this.database = new Databases(appwriteClient, DATABASE_ID);
    this.teams = new Teams(appwriteClient);
    this.functions = new Functions(appwriteClient);
    this.storage = new Storage(appwriteClient);
  }

  /**
   * @async
   * @function createAccount
   * @description Creates an account using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @param {Object} values An object containing the credentials for account creation
   * @param {String} provider The provider to use for account creation
   * @returns <Promise> A promise that resolves to the account creation response
   */
  async createAccount(email, pass) {
    try {
      const account = await this.account.create("unique()", email, pass, " ");
      if (account) {
        return this.createEmailSession(email, pass);
      } else {
        return account;
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function getAccount
   * @description Gets the account object using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @returns <Promise> A promise that resolves to the account object
   */
  async getAccount() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function getAccountPrefs
   * @description Gets the account preferences object using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @returns <Promise> A promise that resolves to the account object
   */
  async getAccountPrefs() {
    try {
      let accountPrefs = await this.account.getPrefs();
      return accountPrefs;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function listLogs
   * @description Gets the account logs object using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @returns <Promise> A promise that resolves to the account logs object
   */
  async listLogs() {
    try {
      let logs = await this.account.listLogs();
      return logs;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function createSession
   * @description Creates a session using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @param {String} email
   * @param {String} pass
   * @returns <Promise> A promise that resolves to the session object
   */
  async createSession(email, pass) {
    try {
      const session = await this.account.createEmailSession(email, pass);
      return session;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function getSession
   * @description Gets the current session using the appwrite API
   * @see https://appwrite.io/docs/client/account
   * @returns <Promise> A promise that resolves to the session object or null if the user does not have a session
   */
  async getSession() {
    try {
      const session = await this.account.getSession("current");
      return session;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function updateName
   * @param {String} name
   * @returns <Promise> A promise that resolves to the user object with the updated name
   */
  async updateName(name) {
    try {
      const user = await this.account.updateName(name);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function updatepass
   * @description Updates the user's pass details using the appwrite API
   * @param {pass} pass
   * @returns <Promise> A promise that resolves to the user object.
   */
  async updatepass(pass) {
    try {
      const user = await this.account.updatepassword(pass);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function updateEmail
   * @description Updates the user's email details using the appwrite API
   * @param {String} email
   * @returns <Promise> A promise that resolves to the user object.
   */
  async updateEmail(email) {
    try {
      const user = await this.account.updateEmail(email);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @function deleteCurrentSession
   * @returns <Promise> A promise that resolves to null
   */
  async deleteCurrentSession() {
    try {
      const user = await this.account.deleteSession("current");
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  // Database
  /**
   * @async
   * @function createCollection
   * @description Creates a collection using the appwrite API
   * @param {String} databaseId The id of the database
   * @param {String} collectionId The id of the new collection
   * @param {Object} data The data to be stored in the collection
   * @param {String} Id The of the document
   * @param {Object} permissions The access rights to the document
   * @returns <Promise> A promise that resolves to the collection object
   */
  async createDocument(
    databaseId,
    collectionId,
    data,
    id = ID.unique(),
    permissions = []
  ) {
    try {
      const document = await this.database.createDocument(
        databaseId,
        collectionId,
        id,
        data,
        permissions
      );
      return document;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function listCollections
   * @description Lists all collections in a database using the appwrite API
   * @param {String} databaseId
   * @param {String} collectionId
   * @returns <Promise> A promise that resolves to the collections object
   * @see https://appwrite.io/docs/client/database
   */
  async listDocuments(databaseId, collectionId) {
    try {
      const documents = await this.database.listDocuments(
        databaseId,
        collectionId
      );
      return documents;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   *@function getDocument
   * @param {String} databaseId The database ID
   * @param {String} collectionId The collection ID
   * @param {String} documentId The document ID
   * @returns <Promise> A promise that resolves to the document object
   * @see https://appwrite.io/docs/client/database
   */
  async getDocument(databaseId, collectionId, documentId) {
    try {
      const document = await this.database.getDocument(
        databaseId,
        collectionId,
        documentId
      );
      return document;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function updateDocument
   * @description Updates a document in a collection using the appwrite API
   * @param {String} databaseId
   * @param {String} collectionId
   * @param {String} documentId
   * @param {Object} data
   * @returns <Promise> A promise that resolves to the updated document object
   * @see https://appwrite.io/docs/client/database
   */
  async updateDocument(databaseId, collectionId, documentId, data) {
    try {
      const document = await this.database.updateDocument(
        databaseId,
        collectionId,
        documentId,
        data
      );
      return document;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function deleteDocument
   * @description Deletes a document in a collection using the appwrite API
   * @param {String} databaseId
   * @param {String} collectionId
   * @param {String} documentId
   * @returns <Promise> A promise that resolves to null
   * @see https://appwrite.io/docs/client/database
   */
  async deleteDocument(databaseId, collectionId, documentId) {
    try {
      const document = await this.database.deleteDocument(
        databaseId,
        collectionId,
        documentId
      );
      return document;
    } catch (error) {
      console.log(error);
    }
  }

  // Teams
  /**
   * @async
   * @function listMemberships
   * @description Lists all memberships in a team using the appwrite API
   * @param {String} teamId
   * @returns <Promise> A promise that resolves to the memberships object
   * @see https://appwrite.io/docs/client/teams
   */
  async listSystemTeamMemberships(teamId = SYSTEM_TEAM_ID) {
    try {
      const memberships = await this.teams.listMemberships(teamId);
      return memberships;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function createTeam
   * @description Creates a team using the appwrite API
   * @param {String} teamName The name of the team
   * @returns <Promise> A promise that resolves to the team object
   * @see https://appwrite.io/docs/client/teams
   */
  async createTeam(teamName) {
    try {
      const team = await this.teams.create("unique()", teamName);
      return team;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function listTeams
   * @description Lists all teams using the appwrite API
   * @returns <Promise> A promise that resolves to the team object
   * @see https://appwrite.io/docs/client/teams
   */
  async listTeams() {
    try {
      const teams = await this.teams.list();
      return teams;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function createFile
   * @description Creates a file using the appwrite API
   * @param {Object} file
   * @param {String} bucketID
   * @returns <Promise> A promise that resolves to the file object
   * @see https://appwrite.io/docs/client/storage
   */
  async createFile(file, bucketID) {
    try {
      const fileObj = await this.storage.createFile(bucketID, "unique()", file);
      return fileObj;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function getFileForView
   * @description Gets a file for viewing using the appwrite API
   * @param {String} fileID
   * @param {String} bucketID
   * @returns <Promise> A promise that resolves to the file object
   */
  async getFileForView(fileID, bucketID) {
    try {
      const preview = await this.storage.getFileView(bucketID, fileID);
      return preview;
    } catch (error) {
      console.log(error);
    }
  }

  // Functions
  /**
   * @async
   * @function createFunctionExecution
   * @description Creates a function execution using the appwrite API
   * @param {String} functionID
   * @param {Object} data
   * @param {Boolean} async
   * @returns <Promise> A promise that resolves to the function execution object
   * @see https://appwrite.io/docs/client/functions
   */
  async createFunctionExecution(functionID, data, async = true) {
    try {
      const execution = await this.functions.createExecution(
        functionID,
        data,
        async
      );
      return execution;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @async
   * @function getExecution
   * @description Gets a function execution using the appwrite API
   * @param {String} functionID
   * @param {String} executionID
   * @returns <Promise> A promise that resolves to the function execution object
   * @see https://appwrite.io/docs/client/functions
   */

  async getExecution(functionID, executionID) {
    try {
      const execution = await this.functions.getExecution(
        functionID,
        executionID
      );
      return execution;
    } catch (error) {
      console.log(error);
    }
  }
}

// const api = {
//   sdk: null,

//   provider: () => {
//     if (api.sdk) {
//       return api.sdk;
//     }

//     let appwrite = new Appwrite();
//     appwrite.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

//     const account = new Account(appwrite);
//     const database = new Databases(appwrite, DATABASE_ID);
//     const teams = new Teams(appwrite);
//     const storage = new Storage(appwrite);
//     const functions = new Functions(appwrite);

//     api.sdk = { database, account, teams, storage, functions };
//     return api.sdk;
//   },

//   /**
//    * @function createAccount
//    * @description Creates an account using the appwrite API
//    * @see https://appwrite.io/docs/client/account
//    * @param {Object} values An object containing the credentials for account creation
//    * @param {String} provider The provider to use for account creation
//    * @returns <Promise> A promise that resolves to the account creation response
//    */

//   createAccount: (values, provider) => {
//     console.log("values: ", values);
//     console.log("provider: ", values.provider);
//     if (provider === "email") {
//       const { email, pass } = values;
//       return api.provider().account.create("unique()", email, pass, " ");
//     }
//   },

//   /**
//    * @function getAccount
//    * @description Gets the account object using the appwrite API
//    * @see https://appwrite.io/docs/client/account
//    * @returns <Promise> A promise that resolves to the account object
//    */

//   getAccount: () => {
//     let account = api.provider().account;
//     return account.get();
//   },

//   /**
//    * @function getAccountPrefs
//    * @description Gets the account preferences object using the appwrite API
//    * @see https://appwrite.io/docs/client/account
//    * @returns <Promise> A promise that resolves to the account object
//    */
//   getAccountPrefs: () => {
//     let account = api.provider().account;
//     return account.getPrefs();
//   },

//   /**
//    * @function listLogs
//    * @description Gets the account logs object using the appwrite API
//    * @see https://appwrite.io/docs/client/account
//    * @returns <Promise> A promise that resolves to the account logs object
//    */
//   listLogs: () => {
//     let account = api.provider().account;
//     return account.listLogs();
//   },

//   /**
//    * @function createSession
//    * @description Creates a session using the appwrite API
//    * @see https://appwrite.io/docs/client/account
//    * @param {String} email
//    * @param {String} pass
//    * @returns <Promise> A promise that resolves to the session object
//    */

//   createSession: (email, pass) => {
//     return api.provider().account.createEmailSession(email, pass);
//   },

//   /**
//    * @function getSession
//    * @description Gets the current session using the appwrite API
//    * @see https://appwrite.io/docs/client/account
//    * @returns <Promise> A promise that resolves to the session object or null if the user does not have a session
//    */

//   getSession: () => {
//     return api.provider().account.getSession("current");
//   },

//   /**
//    * @function updateName
//    * @param {String} name
//    * @returns <Promise> A promise that resolves to the user object with the updated name
//    */
//   updateName: (name) => {
//     return api.provider().account.updateName(name);
//   },

//   /**
//    * @function updatepass
//    * @description Updates the user's pass details using the appwrite API
//    * @param {pass} pass
//    * @returns <Promise> A promise that resolves to the user object.
//    */
//   updatepass: (pass) => {
//     return api.provider().account.updatepassword(pass);
//   },

//   /**
//    * @function updateEmail
//    * @description Updates the user's email details using the appwrite API
//    * @param {String} email
//    * @returns <Promise> A promise that resolves to the user object.
//    */
//   updateEmail: (email) => {
//     return api.provider().account.updateEmail(email);
//   },

//   /**
//    * @function deleteCurrentSession
//    * @returns <Promise> null
//    */

//   deleteCurrentSession: () => {
//     return api.provider().account.deleteSession("current");
//   },

//   /**
//    * @function createCollection
//    * @description Creates a collection using the appwrite API
//    * @param {String} databaseId The id of the database
//    * @param {String} collectionId The id of the new collection
//    * @param {Object} data The data to be stored in the collection
//    * @param {String} Id The of the document
//    * @param {Object} permissions The access rights to the document
//    * @returns
//    */
//   createDocument: (
//     databaseId,
//     collectionId,
//     data,
//     id = ID.unique(),
//     permissions = []
//   ) => {
//     console.log("Permissions: ", permissions);
//     return api
//       .provider()
//       .database.createDocument(databaseId, collectionId, id, data, permissions);
//   },

//   /**
//    * @function listCollections
//    * @description Lists all collections in a database using the appwrite API
//    * @param {String} databaseId
//    * @param {String} collectionId
//    * @returns <Promise> A promise that resolves to the collections object
//    * @see https://appwrite.io/docs/client/database
//    */
//   listDocuments: (databaseId, collectionId) => {
//     return api.provider().database.listDocuments(databaseId, collectionId);
//   },

//   /**
//    *
//    * @param {String} databaseId The database ID
//    * @param {String} collectionId The collection ID
//    * @param {String} documentId The document ID
//    * @returns <Promise> A promise that resolves to the document object
//    * @see https://appwrite.io/docs/client/database
//    */

//   getDocument: (databaseId, collectionId, documentId) => {
//     return api
//       .provider()
//       .database.getDocument(databaseId, collectionId, documentId);
//   },

//   /**
//    * @function updateDocument
//    * @description Updates a document in a collection using the appwrite API
//    * @param {String} databaseId
//    * @param {String} collectionId
//    * @param {String} documentId
//    * @param {Object} data
//    * @returns <Promise> A promise that resolves to the updated document object
//    * @see https://appwrite.io/docs/client/database
//    */
//   updateDocument: (databaseId, collectionId, documentId, data) => {
//     return api
//       .provider()
//       .database.updateDocument(databaseId, collectionId, documentId, data);
//   },

//   /**
//    * @function deleteDocument
//    * @description Deletes a document in a collection using the appwrite API
//    * @param {String} databaseId
//    * @param {String} collectionId
//    * @param {String} documentId
//    * @returns <Promise> A promise that resolves to the deleted document object
//    * @see https://appwrite.io/docs/client/database
//    */
//   deleteDocument: (databaseId, collectionId, documentId) => {
//     return api
//       .provider()
//       .database.deleteDocument(databaseId, collectionId, documentId);
//   },

//   /**
//    * @function listMemberships
//    * @description Lists all memberships in a team using the appwrite API
//    * @param {String} teamId
//    * @returns <Promise> A promise that resolves to the memberships object
//    * @see https://appwrite.io/docs/client/teams
//    */
//   listMemberships: () => {
//     const memberships = api.provider().teams.listMemberships(SYSTEM_TEAM_ID);
//     return memberships;
//   },

//   /**
//    * @function createTeam
//    * @param {String} teamName The name of the team
//    * @returns <Promise> A promise that resolves to the team object
//    * @see https://appwrite.io/docs/client/teams
//    * @description Creates a team using the appwrite API
//    */
//   createTeam: (teamName) => {
//     return api.provider().teams.create("unique()", teamName);
//   },

//   /**
//    * @function listTeams
//    * @description Lists all teams using the appwrite API
//    * @returns <Promise> A promise that resolves to the team object
//    * @see https://appwrite.io/docs/client/teams
//    */

//   listTeams: () => {
//     return api.provider().teams.list();
//   },

//   /**
//    * @function createFile
//    * @description Creates a file using the appwrite API
//    * @param {Object} file
//    * @param {String} bucketID
//    * @returns <Promise> A promise that resolves to the file object
//    * @see https://appwrite.io/docs/client/storage
//    */

//   createFile: (file, bucketID) => {
//     return api.provider().storage.createFile(bucketID, "unique()", file);
//   },

//   /**
//    * @function getFileForView
//    * @description Gets a file for viewing using the appwrite API
//    * @param {String} fileID
//    * @param {String} bucketID
//    * @returns <Promise> A promise that resolves to the file object
//    */

//   getFileForView: (fileID, bucketID) => {
//     return api.provider().storage.getFileView(bucketID, fileID);
//   },

//   /**
//    * @function createFunctionExecution
//    * @description Creates a function execution using the appwrite API
//    * @param {String} functionID
//    * @param {Object} data
//    * @param {Boolean} async
//    * @returns <Promise> A promise that resolves to the function execution object
//    * @see https://appwrite.io/docs/client/functions
//    */
//   createFunctionExecution: (functionID, data, async = true) => {
//     return api.provider().functions.createExecution(functionID, data, async);
//   },

//   /**
//    * @function getExecution
//    * @description Gets a function execution using the appwrite API
//    * @param {String} functionID
//    * @param {String} executionID
//    * @returns <Promise> A promise that resolves to the function execution object
//    * @see https://appwrite.io/docs/client/functions
//    */

//   getExecution: async (functionID, executionID) => {
//     return await api.provider().functions.getExecution(functionID, executionID);
//   },
// };

export default AppwriteService;
