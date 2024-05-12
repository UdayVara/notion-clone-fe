import { Inter } from "next/font/google";
import Header from "@/components/Custom/Header";
import DocumentTab from "@/components/Custom/DocumentTab";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {children}
        
      </body>
    </html>
  );
}
