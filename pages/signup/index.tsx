import { Flex } from "@chakra-ui/react";
import React from "react";
import NavHome from "../../components/Navbar/NavHome";
import Login from "../../components/Screens/Login/Login";
import SignUp from "../../components/Screens/SignUp/Signup";
function index() {
  return (
    <Flex style={styles.flexCont}>
      <NavHome />
      <Flex w="100%" pt="100px" pb="80px" justifyContent="center">
        <SignUp />
      </Flex>
    </Flex>
  );
}

const styles = {
  flexCont: {
    background: "#fff",
    padding: "0px 20px",
  },
};
export default index;
