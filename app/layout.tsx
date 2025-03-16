import { Inter } from "next/font/google";
import "./globals.scss";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}


export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, {
      cache: "no-store",
    });

    const data = await response.json();

    let keywordsArray;

    if (data?.success && data?.settings) {
      const keywordsString =
        data?.setting?.client?.meta_keywords || "nextjs, starter, template";
      keywordsArray = keywordsString
        .split(",")
        .map((keyword: any) => keyword.trim());
    }

    return {
      title: {
        template: `${data?.setting?.client?.site_title} | %s`,
        default: data?.setting?.client?.site_title || "Super Medical Hospital",
      },
      description: data?.setting?.client?.meta_description || "An advanced medical center equipped with international standard machinery, located near Dhaka in Savar",
      keywords: keywordsArray,
      icons: {
        icon: data?.setting?.client?.favicon || "https://supermedicalhospital.com/wp-content/uploads/2018/01/super-logo.png",
      },
    };
  } catch (error) {
    return {
      title: "Super Medical Hospital",
      description: "An advanced medical center equipped with international standard machinery, located near Dhaka in Savar.",
      icons: {
        icon: "https://i.ibb.co.com/5X3ks7Pp/logo.png",
      },
    };
  }
}
