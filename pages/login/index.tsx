import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import NavHome from "../../components/Navbar/NavHome";
import Login from "../../components/Screens/Login/Login";
import { getFromLocalStorage } from "../../utils/browserStorage";

function index() {
  return (
    <Flex style={styles.flexCont}>
      <NavHome />
      <Flex w="100%" pt="180px" pb="80px" justifyContent="center">
        <Login />
      </Flex>
    </Flex>
  );
}

const styles = {
  flexCont: {
    backgroundColor: "#fff",
    width: "100%",
    // top: 0,
    // left: 0,
    height: "100vh",
    //zIndex: 10,
    padding: "100px 40px 60px 40px",
    alignItems: "center",
  },
};
export default index;
