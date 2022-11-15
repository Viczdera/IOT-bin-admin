/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import DashLayout from "../../components/Layout/DashboardLayout";
import Product from "../../components/Screens/Products/Product";

const IdInventory = () => {
  const {
    query: { id },
  } = useRouter();

  return (
    <DashLayout>
      <Product id={id} />
    </DashLayout>
  );
};

export default IdInventory;
