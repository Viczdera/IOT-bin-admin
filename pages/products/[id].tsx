/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import DashLayout from "../../components/Layout/DashboardLayout";
import Product from "../../components/Screens/Products/Product";
import { Flex, Icon } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

const IdInventory = () => {
  const {
    query: { id },
  } = useRouter();

  return (
    <DashLayout>
      <Flex
          color="blue.200"
          fontWeight={700}
          cursor='pointer'
          my="10px"
          onClick={() => {
            Router.push("/products");
          }}
        >

          <Icon fontSize="18px" as={BiArrowBack} mr='5px' />
          Back
        </Flex>
      <Product id={id} />
    </DashLayout>
  );
};

export default IdInventory;
