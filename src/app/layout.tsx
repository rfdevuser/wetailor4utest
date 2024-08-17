"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { ApolloProvider } from '@apollo/client';
import client from '@/utils/apollo/ApolloClient';
import { Provider } from "react-redux";
import store from '@/redux/store'


const inter = Inter({ subsets: ["latin"] });
const navigationData = [
  { name: "Home", link: "/" },
  { name: "Blouse Designs", link: "/MTM_Blouse" },
  { name: "Main Fabric Store", link: "/Fabric_Store" },
  { name: "Lining Fabric Store", link: "/Lining_Store" },
  { name: "Saved", link: "/saved" },
];



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      
      <head />

      <body className={`bg-white dark:bg-black ${inter.className}`}>
      <Provider store={store}>
      <ApolloProvider client={client}>
   
          <Header />
        <Sidebar navigationData={navigationData}  />
       
          {children}
          <Footer/>
          </ApolloProvider>
          </Provider>
        </body>
    </html>
  );
}
