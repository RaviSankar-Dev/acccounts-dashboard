import { Outfit, Poppins } from "next/font/google";
import "./globals.css";
import RootProviderLayout from "@/components/layout/RootLayout";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
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
      <body className={`${outfit.variable} ${poppins.variable} font-sans antialiased bg-slate-50 text-slate-900 selection:bg-primary-500/30 selection:text-primary-900 dark:selection:bg-primary-500/50 dark:selection:text-white`}>
        <RootProviderLayout>
          {children}
        </RootProviderLayout>
      </body>
    </html>
  );
}
