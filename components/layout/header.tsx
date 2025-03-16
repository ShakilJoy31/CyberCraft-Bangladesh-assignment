"use client"


import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Search from "./search";
import Logo from "./logo";
import { SidebarNavLink } from "./sidebar";
import { page_routes } from "@/lib/routes-config";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import CustomModal from "../custom-component/CustomModal";
import { UpdateUserInformation } from "./UpdateUserInformation";

export default function Header({ handleNavigation }: { handleNavigation: (href: string) => void }) {
  const [deleteService, setDeleteService] = useState<boolean | null>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage drawer open/close
  const router = useRouter();
  const pathname = usePathname()
  const [userProfilePicture, setUserProfilePicture] = useState<string>('');
  const [isUserUpdateModal, setIsUserUpdateModal] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("admin-user")

    // Redirect to /dashboard/default
    router.push("/dashboard/default");

    // Force a full page reload after redirecting
    setTimeout(() => {
      window.location.href = "/dashboard/default";
    }, 200);
  };

  useEffect(() => {
    const userData = localStorage.getItem("admin-user");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserProfilePicture(parsedData?.user?.image || '');
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const JSX = <motion.div
    className="bg-white rounded-lg p-8 w-[90%] md:w-[60%] lg:w-[40%]"
    initial={{ scale: 0.3, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.3, opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-center items-center mb-4">
      <h1 className="text-2xl font-bold tracking-tight">
        Are you sure to log out?
      </h1>
    </div>
    <div className="">
      <div className="flex justify-center gap-x-6">
        <button onClick={() => setDeleteService(null)} className="font-medium text-white bg-black rounded-md w-32 hover:bg-white border hover:border-black gap-x-6rder-black hover:text-black py-1">No</button>

        <button onClick={handleLogout} className="font-medium text-white bg-red-600 rounded-md w-32 hover:bg-white border hover:border-red-600 hover:text-black py-1">Yes</button>
      </div>
    </div>
  </motion.div>

  const userInformationModal = <UpdateUserInformation setIsUserUpdateModal={setIsUserUpdateModal}></UpdateUserInformation>

  const handleNavigationWithDrawerClose = (href: string) => {
    handleNavigation(href);
    setIsDrawerOpen(false); // Close the drawer after navigation
  };

  return (
    <div className="sticky top-0 z-50 flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col overflow-auto">
            <Logo className="px-0" />
            <nav className="grid gap-2 text-lg font-medium">
              {page_routes.map((route) => (
                <Fragment key={route.title}>
                  <div className="px-2 py-4 font-medium">{route.title}</div>
                  <nav className="*:flex *:items-center *:gap-3 *:rounded-lg *:px-3 *:py-2 *:transition-all hover:*:bg-muted">
                    {route.items.map((item, key) => (
                      <SidebarNavLink key={key} item={item} handleNavigation={handleNavigationWithDrawerClose} />
                    ))}
                  </nav>
                </Fragment>
              ))}
            </nav>

          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          <Search />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>

            <Image
              src={userProfilePicture || "https://cdn-icons-png.flaticon.com/512/666/666201.png"}
              alt='Home logo'
              className="h-12 w-12 cursor-pointer rounded-full p-0.5 md:p-0"
              width={300}
              height={200}
              objectFit="cover"
            />

            {/* <figure className="cursor-pointer">
              <img src={`/images/avatars/1.png`} className="" alt="..." />
            </figure> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {
              pathname === '/dashboard/pages/settings/account-settings' ? '' : <DropdownMenuItem onClick={() => setIsUserUpdateModal(true)} className="hover:cursor-pointer">My Account</DropdownMenuItem>
            }

            {
              pathname === '/dashboard/pages/settings/account-settings' ? '' :  <DropdownMenuSeparator />
            }
           
            <DropdownMenuItem
              onClick={() => window.open('https://newscell.org', '_blank')}
              className="hover:cursor-pointer"
            >
              Visit Site
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:cursor-pointer" onClick={() => setDeleteService(true)}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <AnimatePresence>
        {deleteService && (
          <CustomModal JSX={JSX}></CustomModal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUserUpdateModal && (
          <CustomModal JSX={userInformationModal}></CustomModal>
        )}
      </AnimatePresence>
    </div>
  );
}