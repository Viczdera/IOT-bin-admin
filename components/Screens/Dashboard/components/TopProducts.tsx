import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Capitalize } from "../../../../helpers/HelperFunctions";
const boxShadow = "rgba(0, 0, 0, 0.04) 0px 3px 5px";
const boxShadow2 = "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px";

//dummy porduct data
const prodData = [
  {
    name: "range sweat Pants",
    url: "https://res.cloudinary.com/db9dt41gx/image/upload/v1625578133/NextShop/joggers_vzstla.jpg",
    sold: 42,
    price: 12000,
  },
  {
    name: "Uxl sweat shirt",
    url: "https://res.cloudinary.com/db9dt41gx/image/upload/v1625578138/NextShop/sweats_pido3l.jpg",
    sold: 32,
    price: 8000,
  },
  {
    name: "range sweat Pants",
    url: "https://res.cloudinary.com/db9dt41gx/image/upload/v1625578133/NextShop/joggers_vzstla.jpg",
    sold: 42,
    price: 12000,
  },
  {
    name: "Uxl sweat shirt",
    url: "https://res.cloudinary.com/db9dt41gx/image/upload/v1625578138/NextShop/sweats_pido3l.jpg",
    sold: 32,
    price: 8000,
  },
  {
    name: "range sweat Pants",
    url: "https://res.cloudinary.com/db9dt41gx/image/upload/v1625578133/NextShop/joggers_vzstla.jpg",
    sold: 42,
    price: 12000,
  },
  {
    name: "Uxl sweat shirt",
    url: "https://res.cloudinary.com/db9dt41gx/image/upload/v1625578138/NextShop/sweats_pido3l.jpg",
    sold: 32,
    price: 8000,
  },
];
function TopProducts(props: any) {
  return (
    <Flex ml={{ base: "0px", xl: "20px" }} mt="20px" style={styles.boxCont}>
      <Box
        className="customScrollBar"
        w="100%"
        maxH="650px"
        minH="450px"
        p="10px"
        overflowY="auto"
      >
        <Text style={styles.title}> Top Selling Products</Text>
        <Box>
          {/* {props.products?.map((m: any) => (
            <Text key={m.id}>{m.title}</Text>
          ))} */}
          {prodData.map((m, i) => (
            <Box key={i} style={styles.itemCard} my="10px">
              <Flex fontSize="11px" alignItems="center" mb="10px">
                <Box mr="2px" style={styles.countCont}>
                  {m.sold}
                </Box>{" "}
                items sold
              </Flex>
              <Flex alignItems="center">
                <Box style={styles.imgCont}>
                  <Image w="80px" h="80px" src={m.url} alt={`${m.name}-img`} />
                </Box>
                <Box ml="5px">
                  <Text>{Capitalize(m.name)}</Text>
                  <Text>{m.price}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      </Box>
    </Flex>
  );
}
const styles = {
  title: {
    fontSize: "15px",
    fontWeight: "600",
  },
  boxCont: {
    background: " #FFFFFF",
    // boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
    boxShadow: boxShadow2,
    borderRadius: "10px",
    padding: "5px",
    width: "100%",
    minHeight: "400px",
    maxHeight: "650px",
  },
  itemCard: {
    height: "140px",
    //boxShadow: boxShadow,
    padding: "10px",
    borderRadius: "10px",
    boxShadow:
      " rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
  },
  countCont: {
    backgroundColor: "#000",
    lineHeight: "12px",
    color: "#fff",

    borderRadius: "3px",
    padding: "2px",
  },
  imgCont: {
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
    borderRadius: "10px",
    padding: "5px",
  },
};
export default TopProducts;
