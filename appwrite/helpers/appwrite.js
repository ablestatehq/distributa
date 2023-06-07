require("dotenv").config();
/**
 * @author David Derrick Anyuru <davidderrickanyuru@gmail.com>
 * @file appwrite.js
 * @module appwrite
 * @requires dotenv
 * @requires node-appwrite
 * @requires node-appwrite.ID
 * @requires node-appwrite.Databases
 * @requires node-appwrite.Users
 * @requires node-appwrite.Teams
 * @requires node-appwrite.Client
 * @description Setup your appwrite server
 * @see https://appwrite.io/docs/server
 * @see https://appwrite.io/docs/server/account
 * @see https://appwrite.io/docs/server/databases
 * @see https://appwrite.io/docs/server/teams
 * @see https://appwrite.io/docs/server/storage
 */
const ID = require("node-appwrite").ID;
const Databases = require("node-appwrite").Databases;
const Users = require("node-appwrite").Users;
const Teams = require("node-appwrite").Teams;
const Client = require("node-appwrite").Client;

/**
 * @constant {string} projectEndpoint
 * @description Your API Endpoint
 * @see https://appwrite.io/docs/server/account
 */
const projectEndpoint = process.env.PROJECT_ENDPOINT;
/**
 * @constant {string} projectID
 * @description Your project ID
 * @see https://appwrite.io/docs/server/account
 */
const projectID = process.env.PROJECT_ID;
/**
 *
 * @constant {string} apiKey
 * @description Your secret API key
 * @see https://appwrite.io/docs/server/account
 */
const apiKey = process.env.API_KEY;
/**
 * @constant {string} redirectUrl
 * @description Your redirect URL
 * @see https://appwrite.io/docs/server/account
 * @example
 * const redirectUrl = "https://localhost:3000";
 */
const redirectUrl = process.env.REDIRECT_URL;
const client = new Client();

client
  .setEndpoint(projectEndpoint) // Your API Endpoint
  .setProject(projectID) // Your project ID
  .setKey(apiKey); // Your secret API key

/**
 * @constant {Object} databases
 * @description Your appwrite database
 * @see https://appwrite.io/docs/client/database
 */

const databases = new Databases(client);
const users = new Users(client);
const teams = new Teams(client);
/**
 * @author David Derrick Anyuru <davidderrickanyuru@gmail.com>
 * @async
 * @function createDatabase
 * @return {Promise<Object>}
 * @description Creates an appwrite database
 * @see https://appwrite.io/docs/server/database
 * @example
 * const database = await createDatabase();
 * console.log(database);
 * // {
 * //   "$id": "5f9c0f0c5c6f5",
 * //   "name": "Distributa",
 * //   "createdAt": "2023-05-15T06:38:00.000+00:00",
 * //   "updatedAt": "2023-05-15T06:38:00.000+00:00"
 * // }
 */
const createDatabase = async () => {
    try {
        const database = await databases.create(ID.unique(), "Distributa");
        return database;
    } catch ( error ) {
        console.log("Error creating database", error)
    }
};

/**
 * @async
 * @function createCollections
 * @param {string} databaseID - The id of the database
 * @param {string} collection - The name of the collection
 * @return {Promise<Object>} - The new collection object
 * @description Creates an appwrite collection
 * @see https://appwrite.io/docs/server/database
 * @example
 * const collection = await createCollections("5f9c0f0c5c6f5", "5e5ea5c16897e", 'invoices');
 * console.log(collection);
 * // {
 * //   "$id": "5f9c0f0c5c6f5",
 * //   "createdAt": "2023-05-15T06:38:00.000+00:00",
 * //   "updatedAt": "2023-05-15T06:38:00.000+00:00"
 * //   "permissions": [
 * //       "read(\"any\")"
 * //   ],
 * //   "databaseId": "5e5ea5c16897e",
 * //   "name": "invoices",
 * //   "enabled": false,
 * //   "documentSecurity": true,
 * //   "attributes": [],
 * //   "indexes": []
 * // }
 */
const createCollection = async (databaseID, collectionName) => {
  const collection = await databases.createCollection(
    databaseID,
    ID.unique(),
    collectionName
  );
  return collection;
};

/**
 * @async
 * @function createUser
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 * @description Creates an user account in appwrite
 * @see https://appwrite.io/docs/server/account
 * @example
 * const createUser = await createUser("user@gmail.com", "password");
 * // {
 * //   "$id": "5e5ea5c16897e",
 * //   "$createdAt": "2020-10-15T06:38:00.000+00:00",
 * //   "$updatedAt": "2020-10-15T06:38:00.000+00:00",
 * //   "name": " ",
 * //   "password": "$argon2id$v=19$m=2048,t=4,p=3$aUZjLnliVWRINmFNTWMudg$5S+x+7uA31xFnrHFT47yFwcJeaP0w92L\/4LdgrVRXxE",
 * //   "hash": "argon2",
 * //   "hashOptions": {
 * //       "type": "argon2",
 * //       "memoryCost": 65536,
 * //       "timeCost": 4,
 * //       "threads": 3
 * //   },
 * //   "registration": "2020-10-15T06:38:00.000+00:00",
 * //   "status": true,
 * //   "passwordUpdate": "2020-10-15T06:38:00.000+00:00",
 * //   "email": "user@gmail.com",
 * //   "phone": "+4930901820",
 * //   "emailVerification": true,
 * //   "phoneVerification": true,
 * //   "prefs": {}
 * // }
 */
const createUser = async (email, password) => {
  const user = await users.create(ID.unique(), email, password, " ");
  return user;
};

/**
 * @async
 * @function createTeam
 * @param {string} name - The name of the team
 * @returns {Promise<Object>}
 * @description Creates a team in appwrite
 * @see https://appwrite.io/docs/server/teams
 * @example
 * const team = await createTeam("system");
 * // {
 * //   "$id": "5f9c0f0c5c6f5",
 * //   "$createdAt": "2020-10-15T06:38:00.000+00:00",
 * //   "$updatedAt": "2020-10-15T06:38:00.000+00:00",
 * //   "name": "admin",
 * //   "total": 0,
 * //   "prefs": {}
 * // }
 */
const createTeam = async (name) => {
  const team = await teams.create(ID.unique(), name);
  return team;
};

/**
 *
 * @param {string} teamID - The id of the team
 * @param {string} userEmail - The email of the user
 * @param {array} roles - [] - ["user", "admin"]
 * @returns {Promise<Object>}
 * @description Creates a team membership in appwrite
 */
const createTeamMembership = async (teamID, userEmail, roles) => {
  const membership = await teams.createMembership(
    teamID,
    userEmail,
    roles,
    redirectUrl
  );
  return membership;
};

const deleteDatabase = async (databaseID) => {
  const database = await databases.delete(databaseID);
  return database;
};

module.exports = {
  createDatabase,
  deleteDatabase,
  createCollection,
  createUser,
  createTeam,
  createTeamMembership,
};
