/**
 * This script is used to setup the appwrite database.
 * It creates a database, a team, two accounts, two team memberships and two collections.
 * It then writes the credentials to a file.
 * The file is used by the appwrite.js helper file.
 * @file setup.js
 * @author David Derrick Anyuru
 * @module setup
 * @requires fs
 * @requires path
 * @requires helpers/generatePassword
 * @requires database
 * @requires helpers/appwrite
 * @requires cli-progress
 * @requires ansi-colors
 * @requires dotenv
 * @requires node-appwrite
 * @requires encryptPassword
 *
 * @see https://appwrite.io/docs/server/database
 * @see https://appwrite.io/docs/server/teams
 * @see https://appwrite.io/docs/server/account
 */

const { writeFileSync } = require("fs");
const cliProgress = require("cli-progress");
const colors = require("ansi-colors");
const path = require("path");
const {
  createDatabase,
  deleteDatabase,
  createTeam,
  createUser,
  createTeamMembership,
  createCollection,
} = require("./helpers/appwrite");
const generatePassword = require("./helpers/generatePassword");
const encryptPassword = require("./helpers/encryptPassword");

/**
 * @function setup
 * @returns {Promise<Object>}
 * @description Creates a database, a team, two accounts, two team memberships and two collections.
 * @example
 * const data = await setup();
 * // {
 * //   admin: {
 * //     email: "admin@distributa",
 * //     password: "password"
 * //   },
 * //   user: {
 * //     email: "user@distributa",
 * //     password: "password"
 * //   },
 * //   systemTeamID: "5f9c0f0c5c6f5",
 * //   adminMembershipID: "5f9c0f0c5c6f5",
 * //   userMembershipID: "5f9c0f0c5c6f5",
 * //   databaseID: "5f9c0f0c5c6f5",
 * //   invoicesCollectionID: "5f9c0f0c5c6f5",
 * //   distributionsCollectionID: "5f9c0f0c5c6f5",
 * // }
 *
 */
const setup = async () => {
  try {
    const userPassword = generatePassword();
    const userPasswordHash = await encryptPassword(userPassword);
    const adminPassword = generatePassword();
    const adminPasswordHash = await encryptPassword(adminPassword);
    const adminEmail = "admin@distributa.com";
    const userEmail = "user@distributa.com";
    const progressSteps = [
      "creating database",
      "creating system team",
      "creating admin account",
      "creating user account",
      "creating admin team membership",
      "creating user team membership",
      "creating invoices collection",
      "creating distributions collection",
    ];

    const progressBar = new cliProgress.SingleBar({
      format:
        "Progress |" +
        colors.cyan("{bar}") +
        "| {percentage}% | {eta}s | {value}/{total} Steps | {step}",
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true,
    });

    progressBar.start(progressSteps.length, 0, { step: progressSteps[0] });
    const database = await createDatabase();
    progressBar.update(1, { step: progressSteps[1] });

    const systemTeam = await createTeam("system");
    progressBar.update(2, { step: progressSteps[2] });

    const admin = await createUser(adminEmail, adminPasswordHash);
    progressBar.update(3, { step: progressSteps[3] });

    const user = await createUser(userEmail, userPasswordHash);
    progressBar.update(4, { step: progressSteps[4] });

    const adminMembership = await createTeamMembership(
      systemTeam.$id,
      admin.email,
      ["admin", "user", "owner"]
    );
    progressBar.update(5, { step: progressSteps[5] });

    const userMembership = await createTeamMembership(
      systemTeam.$id,
      user.email,
      ["user"]
    );
    progressBar.update(6, { step: progressSteps[6] });

    const invoicesCollection = await createCollection(database.$id, "invoices");
    progressBar.update(7, { step: progressSteps[6] });

    const distributionsCollection = await createCollection(
      database.$id,
      "distributions"
    );
    progressBar.update(8, { step: "Saving secrets" });
    progressBar.stop();

    const environments = `
    1. Use the following credentials to login to the user and admin accounts.
    - User Login Credentails
    Email: ${userEmail}
    Password: ${userPassword}

    - Admin Login Credentails
    Email: ${adminEmail}
    Password: ${adminPassword}
    
    2. Create a file named .env.local following information to your env.local file
    # Project Credentails
    REACT_APP_APPWRITE_API_PROJECT_ID=${process.env.PROJECT_ID}
    REACT_APP_APPWRITE_API_ENDPOINT=${process.env.PROJECT_ENDPOINT}

    # Database Credentails
    REACT_APP_APPWRITE_DATABASE_ID=${database.$id}
    REACT_APP_APPWRITE_INVOICES_COLLECTION_ID=${invoicesCollection.$id}
    REACT_APP_APPWRITE_DISTRIBUTIONS_COLLECTION_ID=${distributionsCollection.$id}

    # Team Credentails
    REACT_APP_APPWRITE_SYSTEM_TEAM_ID=${systemTeam.$id}
    `;

    const filePath = path.join(__dirname, "./environments.txt");
    writeFileSync(filePath, environments);

    return;
  } catch (error) {
    console.log(error);
  }
};

setup().catch((error) => console.log(error));
