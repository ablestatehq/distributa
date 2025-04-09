import {
  Client,
  Databases,
  Account,
  Storage,
  Teams,
  Functions,
} from "appwrite";
import { appwriteConfig } from "./config";

const { endpoint, projectId } = appwriteConfig;

export const client = new Client().setEndpoint(endpoint).setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client);
export const functions = new Functions(client);
