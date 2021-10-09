import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://admin:admin@cluster0.fkmsa.mongodb.net/next-auth?retryWrites=true&w=majority'
  );

  return client;
};
