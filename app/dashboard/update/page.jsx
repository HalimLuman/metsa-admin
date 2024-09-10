"use client";

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
import { useRouter } from "next/navigation";
import { getProducts, updateProduct } from "@/lib/actions/product.actions";
import FileUploader from "@/components/FileUploader";

const formSchema = z.object({
  productName: z.string().min().max(100),
  productDescription: z.string().min().max(500),
  referenceNumber: z.string().min().max(50),
  category: z.string().min(),
  subcategory: z.string().min(),
  price: z.string().min(1),
  image: z.any().optional().refine((files) => !files || files.length === 1, "Image must be a single file or empty."),
});

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      const product = products.find((p) => p.$id === selectedProductId);
      if (product) {
        form.reset({
          productName: product.productName,
          productDescription: product.productDescription,
          referenceNumber: product.referenceNumber,
          category: product.category,
          subcategory: product.subcategory,
          price: product.price,
        });
      }
    }
  }, [selectedProductId, products, form]);

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
      };

      if (selectedProductId) {
        //@ts-ignore
        await updateProduct(selectedProductId, productData);
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const selectedCategoryValue = form.watch("category");
  useEffect(() => {
    setSelectedCategory(selectedCategoryValue);
    form.setValue("subcategory", "");
  }, [selectedCategoryValue]);

  const subcategories =
    dropdownMenu.find((item) => item.category === selectedCategory)
      ?.subcategory || [];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-10 w-full"
      >
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedProductId(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="h-14 text-gray-400 shadow-md">
                    <SelectValue placeholder="Select one of the products..." />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.$id} value={product.$id}>
                        {product.productName}
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
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter the product name" 
                  {...field} 
                  className="h-12" // Increased height
                />
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
                  className="h-32" // Increased height
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
                <Input 
                  placeholder="Enter the reference number" 
                  {...field} 
                  className="h-12" // Increased height
                />
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
                    <SelectTrigger className="h-12">
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
                    <SelectTrigger className="h-12">
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
                <Input 
                  type="number" 
                  placeholder="Enter the price" 
                  {...field} 
                  className="h-12" // Increased height
                />
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

        <Button type="submit" className="w-full bg-[#5985d0] text-md h-12 hover:bg-[#547fc7] hover:shadow-md">Submit</Button>
      </form>
    </Form>
  );
};

export default Page;
