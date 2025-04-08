import { Client, Account } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67cc5068000fd5a02c7c');

const account = new Account(client);

export { client, account };