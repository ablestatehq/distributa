/**
 * This script is used to setup the appwrite database.
 * It creates a database, a team, two accounts, two team memberships and two collections.
 * It then writes the credentials to a file.
 * The file is used by the appwrite.js helper file.
 * @file setup.js
 * @module setup
 * @requires fs
 * @requires path
 * @requires helpers/generatePassword
 * @requires database
 * @see https://appwrite.io/docs/server/database
 * @see https://appwrite.io/docs/server/teams
 * @see https://appwrite.io/docs/server/account
 */

const { writeFileSync } = require("fs");
const path = require("path");
const {
  createDatabase,
  createTeam,
  createAccount,
  createTeamMembership,
  createCollection,
} = require("./database");
const generatePassword = require("./helpers/generatePassword");

const setup = async () => {
  try {
    const userPassword = generatePassword();
    const adminPassword = generatePassword();
    const adminEmail = "admin@distributa.com";
    const userEmail = "user@distribute.com";
    const database = await createDatabase();
    const systemTeam = await createTeam("system");
    const admin = await createAccount(adminEmail, adminPassword);
    const user = await createAccount(userEmail, userPassword);
    const adminMembership = createTeamMembership(systemTeam.$id, admin.email, [
      "admin",
      "user",
      "owner",
    ]);
    const userMembership = createTeamMembership(systemTeam.$id, user.email, [
      "user",
    ]);
    const invoicesCollection = await createCollection(database.$id, "invoices");
    const distributionsCollection = await createCollection(
      database.$id,
      "distributions"
    );

    return {
      admin: {
        email: adminEmail,
        password: adminPassword,
      },
      user: {
        email: userEmail,
        password: userPassword,
      },
      systemTeamID: systemTeam.$id,
      adminMembershipID: adminMembership.$id,
      userMembershipID: userMembership.$id,
      databaseID: database.$id,
      invoicesCollectionID: invoicesCollection.$id,
      distributionsCollectionID: distributionsCollection.$id,
    };
  } catch (error) {
    console.log(error);
  }
};

setup().then((data) => {
  const filePath = path.join(__dirname, "./databaseCredentials.json");
  writeFileSync(filePath, JSON.stringify(data));
});
