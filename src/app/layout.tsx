import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './context/context';
import DisplayHeader from "./components/DisplayHeader";


const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rest-countries-api-with-color-theme-switcher",
  description: "rest-countries-api-with-color-theme-switcher-master",
    icons: {
    icon: '/globe.svg',
  },
  keywords: [
    "rest-countries-api-with-color-theme-switcher",
    "rest countries api",
    "color theme switcher",
    "dark mode",
    "light mode",
    "frontend mentor",
    "react",
    "next.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
return (
  <html lang="en" className={nunitoSans.variable}>
    <body>
      <ThemeProvider>
        <DisplayHeader />
        {children}
      </ThemeProvider>
    </body>
  </html>
);
}