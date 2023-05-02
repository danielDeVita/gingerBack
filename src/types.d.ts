import { Document } from "mongoose";

export interface UserInterface extends Document {
    email: string;
    password: string
}

export interface ProductInterface extends Document {
    name: string;
    description: string;
    category: string;
    image: {
        public_id: string;
        secure_url: string;
    }
    price: number;
}
