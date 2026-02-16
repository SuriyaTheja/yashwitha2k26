import { Shantell_Sans } from "next/font/google";
import "./globals.css";

const shantell = Shantell_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "HBD🎉🎂",
  description: "Celebrate your day with joy and happiness!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${shantell.className} antialiased bg-background select-none`}
      >
        {children}
      </body>
    </html>
  );
}
