import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import NewProduct from "../../components/Screens/Products/NewProduct";
import { ImPriceTags } from "react-icons/im";
import DashLayout from "../../components/Layout/DashboardLayout";

function newProduct(props: any) {
  return (
    <DashLayout>

    <Box>
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
