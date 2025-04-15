import { Client, Account } from 'appwrite';

const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: '67cc5068000fd5a02c7c',
}

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

const account = new Account(client);

export { client, account };