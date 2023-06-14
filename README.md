# Distributa

An Open Source Tool helps you to generate Unlimited Invoices for FREE.

## How it works

### Share Earnings

1. Enter the Amount to be shared.
2. Add a benecificiary and portion in percentage.
3. See what everyone gets in real time.
4. Reset to share more.

### Generate Invoice

Generate unlimited invoices for FREE.

1. Click Invoice
2. Enter details
3. Click download to get a PDF invoice for free
4. Send the invoice using a medium of your preference

## Getting started

### Prerequisites

An actively running Appwrite instance. The instance can be a self-hosted installation or created using the Appwrite Cloud. For self-hosted installation instructions, refer to Appwrite's [self-hosting guide](https://appwrite.io/docs/self-hosting). To create an Appwrite Cloud account, visit [Appwrite Cloud](https://cloud.appwrite.io/).

### Setup Instructions

1. Clone the repository to your computer.
2. Navigate to the project directory and:-

    - Run `yarn add` or `npm install`
    - Run `yarn start` or `npm start`

3. Login to the Appwrite console:
   Open a web browser and navigate to your Appwrite instance's URL. Login to the Appwrite console using your account credentials.

4. Create a project:
   In the Appwrite console, create a project or select an existing project create an API key for the project:
   Navigate to your project in the Appwrite console and find the "API Keys" section and create a new API key.

-   Provide a name for the API key and choose the necessary permissions for your project.
-   Give the API key access to the following scopes: auth, databases, functions, storage and others.
-   The redirect url for redirecting the user on accepting team membership.

After creating the API key, make sure to copy and store the API key, project ID, and project endpoint in a .env file:

-   Create a new file named .env in the root directory of your project and add the following lines to the .env file:

```dotenv
API_KEY=your-api-key
PROJECT_ID=your-project-id
PROJECT_ENDPOINT=your-project-endpoint
REDIRECT_URL=your-redirect-url
```

In the env file replace your-api-key, your-project-id, and your-project-endpoint with the actual values.

**Note:**

-   Keep the .env file secret, as it contains sensitive information.
-   Use these variables exclusively under the server environment.

5. Run the shell script to set up the Appwrite database.

```bash
chmod u+x ./setup-appwrite-database.sh
```

This script will create initial project configuration for Distributa.
Once the script completes execution, the distributa database, invoices collection, and distributions collection will be created the project whose ID is specified in the project of your Appwrite instance.

6. Set environment variables for React:
   In your project's environment configuration file (e.g., .env.local or .env.development), add the following lines:

```dotenv
REACT_APP_APPWRITE_PROJECT_ENDPOINT=your-project-endpoint
REACT_APP_APPWRITE_DATABASE_ID=your-distributa-database-id
REACT_APP_APPWRITE_INVOICES_COLLECTION_ID=your-invoices-collection-id
REACT_APP_APPWRITE_DISTRIBUTIONS_COLLECTION_ID=your-distributions-collection-id
```

-   Replace your-project-endpoint, your-distributa-database-id, your-invoices-collection-id, and your-distributions-collection-id with the actual values obtained from the previous steps.

Your inital Project configuartion is now set is now ready! Voilà! Let's distribute:
With the configurations in place, you can use Distributa to distribute earnings, generate invoices, and perform other application-specific actions.

### Prerequisites

1. Clone the project
2. Create an appwrite cloud account or

## Want to contribute?

Without your hand there is no way this tool can go far. If there is anyway you can contribute let me know through raising an issue.
You can also give it a star. This will help me put more resources into this project.

### How to Contribute

**Code and Technical contributions**

1. Fork to get your copy.
2. Clone Fork to your computer.
3. Navigate to the project directory and:-
    - Run `yarn add` or `npm install`
    - Run `yarn start` or `npm start`
4. Test your code and make sure it works.
5. Commit and use a concise commit message.
6. Push to your repo.
7. Send a PR.
8. Wait for PR review.
9. Your contribution will go live in a few days after approval.
10. If not approved you will get response.

**Other contributions**

1. You can contribute by using the app and sharing your feedback via the Github issues tab
2. You can suggest features

## Why should you Contribute?

1. It motivates me and other contributors.
2. Take the opportunity to create the impact doing what you love.
3. Gain experience.
4. Increase your Github commits.
5. Increase your chances of landing a job as a Developer.
6. It helps to learn from you.
7. Add your voice to Open Source.
8. Receive credit through mentions.
9. Use the code to build your own SaaS project.

## Tech Stack

    → React.JS

    → Tailwind CSS

    → Vercel.com deployment

    → Appwrite

### Change log

---

**Added**

    - Custom bill title

**Bugfixes**

    - Remove need for 2 terms

    - Change date to issue date

    - Download pdf without logo

    - Print title in pdf
