import localFont from "next/font/local";
import "./../styles/globals.css";

export const metadata = {
  title: "Resfound",
  description: "Survey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="menu-container">
          {children}
        </main>
      </body>
    </html>
  );
}
