"use client";

import { InputFile } from "appwrite";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dropdownMenu } from "@/constants";
import { Toaster } from "@/components/ui/toaster";

import { useDropzone } from "react-dropzone";
import { databases, storage } from "@/app/api/appwrite.config";
import { ID } from "appwrite";
import { createProduct } from "@/lib/actions/product.actions";
import { convertFileToUrl } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";

const formSchema = z.object({
  productName: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be at most 100 characters"),
  productDescription: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  referenceNumber: z
    .string()
    .min(2, "Reference number must be at least 2 characters")
    .max(50, "Reference number must be at most 50 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category must be at most 50 characters"),
  subcategory: z
    .string()
    .min(1, "Subcategory is required")
    .max(50, "Subcategory must be at most 50 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .max(10, "Price must be at most 10 characters"),
  image: z.any().refine((files) => files?.length === 1, "Image is required"),
});

import { useRouter } from "next/navigation";
const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      referenceNumber: "",
      category: "",
      subcategory: "",
      price: "",
      image: null,
    },
  });

  const onSubmit = async (values) => {
    let formData;

    if (values.image && values.image.length > 0) {
      const blobFile = new Blob([values.image[0]], {
        type: values.image[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.image[0].name);
    }

    try {
      const productData = {
        ...values,
        image: formData,
      };
      //@ts-ignore
      const product = await createProduct(productData);
      if(product){
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectedCategoryValue = form.watch("category");

  useEffect(() => {
    setSelectedCategory(selectedCategoryValue);
    form.setValue("subcategory", ""); // Reset subcategory when category changes
  }, [selectedCategoryValue]);

  const subcategories =
    dropdownMenu.find((item) => item.category === selectedCategory)
      ?.subcategory || [];

  const onDrop = useCallback((acceptedFiles) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-10 w-full"
      >
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the product description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="referenceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter the reference number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between w-full gap-5">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {dropdownMenu.map((item) => (
                        <SelectItem key={item.category} value={item.category}>
                          {item.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Subcategory</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map((subcategory) => (
                        <SelectItem
                          key={subcategory.link}
                          value={subcategory.category}
                        >
                          {subcategory.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter the price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Page;
