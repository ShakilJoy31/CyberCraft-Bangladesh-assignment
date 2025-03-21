"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PageLoader from "./PageLoader";
import ScrollToTopButton from "./ScrollToTopButton";
import { RolePermissionsProvider } from "@/lib/server/RoleContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isUser, setIsUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Global loading state
  const pathname = usePathname(); // Current pathname
  const router = useRouter(); // Router instance

  useEffect(() => {
    const user = localStorage.getItem("admin-user");
    if (user === null) {
      setIsUser(false);
    }
  }, []);

  useEffect(() => {
    // Hide the loader when the route changes
    setIsLoading(false);
  }, [pathname]);

  const handleNavigation = (href: string) => {
    if (pathname !== href) {
      setIsLoading(true); // Show loader when navigating to a new page
      router.push(href);
    }
  };

  return (
    <>
      <main className={cn(`min-h-full ${isUser && 'p-4'}`)}>
        {isLoading && <PageLoader></PageLoader>}
        <RolePermissionsProvider>
          {children}
        </RolePermissionsProvider>
      </main>
    </>
  );
}
