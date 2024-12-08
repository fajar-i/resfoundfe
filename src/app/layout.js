import localFont from "next/font/local";
import "./globals.css";

import {Inter} from "next/font/google"
const inter = Inter({subsets : ["latin"]});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Resfound",
  description: "Survey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="menu-container">
          {children}
        </main>
      </body>
    </html>
  );
}
