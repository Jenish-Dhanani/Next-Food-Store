import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./store/Providers";
import MyNavbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fun Food",
  description: "Fun Food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <MyNavbar />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
