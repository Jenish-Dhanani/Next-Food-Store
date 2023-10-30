import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./store/Providers";
import MyNavbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fun Food",
  description: "Fun Food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="#0070F0"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #0070F0,0 0 5px #0070F0"
        />
        <Providers>
          <MyNavbar />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
