import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import RootProviderLayout from "@/components/layout/RootLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-poppins" 
});

export const metadata = {
  title: "CRK Visionera | Smart Business Dashboard",
  description: "Premium internal company dashboard for quotations, deals, and projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <RootProviderLayout>
          {children}
        </RootProviderLayout>
      </body>
    </html>
  );
}
