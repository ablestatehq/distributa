export const Server = {
  endpoint: process.env.REACT_APP_APPWRITE_API_ENDPOINT,
  project: process.env.REACT_APP_APPWRITE_API_PROJECT_ID,
  systemTeamID: process.env.REACT_APP_APPWRITE_SYSTEM_TEAM_ID,
  databaseID: process.env.REACT_APP_APPWRITE_DATABASE_ID,
  invoicesCollectionID: process.env.REACT_APP_APPWRITE_INVOICES_COLLECTION_ID,
  distributionsCollectionID:
    process.env.REACT_APP_APPWRITE_DISTRIBUTIONS_COLLECTION_ID,
  logosBucketID: process.env.REACT_APP_APPWRITE_LOGOS_BUCKET_ID,
};
