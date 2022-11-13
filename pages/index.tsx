import { verify } from "jsonwebtoken";
import type { NextPage } from "next";
import cookies from "next-cookies";
import React from "react";
import DashLayout from "../components/Layout/DashboardLayout";
import Dashboard from "../components/Screens/Dashboard/Dashboard";

const Home: NextPage = (pageProps) => {
  return (
    <DashLayout pageProps={pageProps}>
      <div>
        <Dashboard />
      </div>
    </DashLayout>
  );
};

export default Home;
