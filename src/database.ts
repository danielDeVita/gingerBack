import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_USER: string = process.env.DB_USER!;
const DB_PASSWORD: string = process.env.DB_PASSWORD!;
const CLUSTER: string = process.env.CLUSTER!;
const DB_NAME: string = process.env.DB_NAME!;

export default async function connect(): Promise<void> {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER}.mongodb.net/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log("connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}
