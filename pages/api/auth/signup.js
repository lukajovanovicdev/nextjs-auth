import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      res.status(422).json({ message: `User with email: ${email} already exists` });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({ email, password: hashedPassword });

    res.status(201).json({ message: 'Created successfully' });
  }
};

export default handler;
