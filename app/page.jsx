'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return null; // You can return a loading spinner or message if desired
};

export default Redirect;
