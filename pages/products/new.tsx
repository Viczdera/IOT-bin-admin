import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import NewProduct from "../../components/Screens/Products/NewProduct";
import { ImPriceTags } from "react-icons/im";
import DashLayout from "../../components/Layout/DashboardLayout";
import { BiArrowBack } from "react-icons/bi";
import Router from "next/router";
function newProduct(props: any) {
  return (
    <DashLayout>
      <Box>
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

        <Flex alignItems="center">
          <Text fontWeight={700} fontSize="lg">
            Add Product
          </Text>
          <Icon as={ImPriceTags} ml="10px" fontSize="lg" />
        </Flex>
        <NewProduct />
      </Box>
    </DashLayout>
  );
}

export default newProduct;
