import { Client, Account } from "appwrite";

const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "67cc5068000fd5a02c7c",
};

const client = new Client()
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId);

const account = new Account(client);

export { client, account };
