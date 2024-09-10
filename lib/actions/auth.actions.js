import { Query } from "node-appwrite";
import { databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export const getUser = async (email, password) => {
    try {
      const products = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_ADMIN_COLLECTION_ID,
        [Query.equal('password', password)]
      );
  
      return parseStringify(products.documents[0]);
    } catch (error) {
      console.log(error);
    }
  };