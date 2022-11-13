import { Flex } from "@chakra-ui/react";
import React from "react";
import Login from "../../components/Screens/Login/Login";
import SignUp from "../../components/Screens/SignUp/Signup";
function index() {
  return (
    <Flex style={styles.flexCont}>
      <SignUp />
    </Flex>
  );
}

const styles = {
  flexCont: {
 background:'#fff',
 padding:'0px 20px'
  },
};
export default index;
