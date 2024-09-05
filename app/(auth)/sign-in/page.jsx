"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { account } from "@/app/api/appwrite.config";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(2, { message: "Password must be at least 2 characters long" }),
});

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("accessKey");
    router.push(isAdmin ? "/dashboard" : "/sign-in");
  }, [router]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid credentials. Please check your email and password.");
    }
  };

  const onSubmit = (values) => login(values.email, values.password);

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[90%] md:w-[400px] bg-white shadow p-10 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Log in</h1>
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            {...form.register("email")}
          />
          <Input
            type="password"
            placeholder="Password"
            {...form.register("password")}
          />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
