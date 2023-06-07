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
 * @requires chalk
 * @see https://appwrite.io/docs/server/database
 * @see https://appwrite.io/docs/server/teams
 * @see https://appwrite.io/docs/server/account
 */

const { writeFileSync } = require("fs");
const { singleBar } = require("cli-progress");
const chalk = require("chalk");
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
const { error } = require("console");

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
    const adminPassword = generatePassword();
    const adminEmail = "admin@distributa.com";
    const userEmail = "user@distribute.com";
    const progressSteps = [
        'creating database',
        'creating system team',
        'creating admin account',
        'creating user account',
        'creating admin team membership',
        'creating user team membership',
        'creating invoices collection',
        'creating distributions collection'
    ]

    const progressBar = new singleBar({
        format: 'Progress |' + chalk.green('{bar}') + '| {percentage}% || {value}/{total} Steps || {step}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });

    const updateProgress = (step) => {
        progressBar.update(stepIndex + 1, { step: progressSteps[stepIndex] });
    }

    progressBar.start(progressSteps.length, 0, { step: progressSteps[0] });
    const database = await createDatabase();
    updateProgress(0);


    const systemTeam = await createTeam("system");
    updateProgress(1);

    const admin = await createAccount(adminEmail, adminPassword);
    updateProgress(2);

    const user = await createUser(userEmail, userPassword);
    updateProgress(3);

    const adminMembership = createTeamMembership(systemTeam.$id, admin.email, [
      "admin",
      "user",
      "owner",
    ]);
    updateProgress(4);

    const userMembership = createTeamMembership(systemTeam.$id, user.email, [
      "user",
    ]);
    updateProgress(5);

    const invoicesCollection = await createCollection(database.$id, "invoices");
    updateProgress(6);

    const distributionsCollection = await createCollection(
      database.$id,
      "distributions"
    );
    updateProgress(7);
    progressBar.stop();

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

setup()
  .then((data) => {
    const filePath = path.join(__dirname, "./databaseCredentials.json");
    writeFileSync(filePath, JSON.stringify(data));
  })
  .catch((error) => console.log(error));


// createDatabase("6480898a7a795426d789").then((data) => console.log(data)).catch(error => console.log(error))


