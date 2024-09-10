import { ID, Query } from "node-appwrite";
import { storage, users, databases } from "../appwrite.config";
import { InputFile } from "node-appwrite/file";
import { parseStringify } from "../utils";

export const createProduct = async ({ image, ...product }) => {
  try {
    let file;
    if (image) {
      const inputFile = InputFile.fromBuffer(
        image?.get("blobFile"),
        image.get("fileName")
      );
      file = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID,
        ID.unique(),
        inputFile
      );
    }
    console.log(product);
    const newProduct = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PRODUCT_COLLECTION_ID,
      ID.unique(),
      {
        image: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        ...product,
      }
    );

    return parseStringify(newProduct);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (selectedProductId, productData) => {
  try {
    const existingProduct = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PRODUCT_COLLECTION_ID,
      selectedProductId
    );

    let file;
    if (productData.image && productData.image.length > 0) {
      const inputFile = InputFile.fromBuffer(
        productData.image[0],
        productData.image[0].name
      );
      file = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID,
        ID.unique(),
        inputFile
      );
    }

    const updateData = {
      ...productData,
      image: file
        ? `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`
        : existingProduct.image,
      subcategory: productData.subcategory
        ? productData.subcategory
        : existingProduct.subcategory,
    };
    console.log(updateData);

    const updatedProduct = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PRODUCT_COLLECTION_ID,
      selectedProductId,
      updateData
    );

    return parseStringify(updatedProduct);
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const products = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PRODUCT_COLLECTION_ID,
      [Query.orderDesc("$createdAt")]
    );

    return parseStringify(products.documents);
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PRODUCT_COLLECTION_ID,
      productId
    );
    return parseStringify(product);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (productId) => {
  try {
    const product = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PRODUCT_COLLECTION_ID,
      productId
    );
    return parseStringify(product);
  } catch (error) {
    console.log(error);
  }
};
