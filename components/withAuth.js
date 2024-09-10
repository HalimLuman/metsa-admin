'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem("auth");

      // If user is not authenticated, redirect to login page
      if (!isAuthenticated) {
        router.replace("/sign-in");
      }
    }, [router]);

    // If authenticated, render the protected page
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
