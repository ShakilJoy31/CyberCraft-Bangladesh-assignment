import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
// import { Badge } from "../ui/badge";
import homeLogo from "../../assets/profile.jpg";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 py-4 font-bold lg:text-2xl text-xl", className)}>
      
      <Link href="/" className="flex items-center space-x-2 ml-2 md:ml-0">
        <Image
          src='https://i.ibb.co.com/sHvdP6k/super-logo.png'
          alt='Home logo'
          className="w-16 h-16 mb-2 rounded-lg"
          width={300}
          height={200}
          objectFit="cover"
        />

        <span className="navbar-heading ">
          {/* {headerSettings?.data?.siteTitle} */}
          Super Medical Hospital (Pvt) Ltd
        </span>
      </Link>
    </Link>
  );
}




{/* <Badge variant="outline">Free</Badge> */ }