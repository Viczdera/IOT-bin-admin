import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import Router from "next/router";
import React, { useEffect } from "react";
import { CiShop } from "react-icons/ci";
import LoginForm from "./formLogin";
function Login() {
return (
    <Box
      px={{ base: "40px", sm: "80px" }}
      py={{ base: "40px", sm: "50px" }}
      style={styles.boxCont}
    >
      <Box>
        <Icon as={CiShop} color='blue.200'  style={styles.icon} />
        <Text fontWeight="bold" fontSize="xl" textAlign="center" my="10px">
          Log In
        </Text>
      </Box>

      <LoginForm />
    </Box>
  );
}
const styles = {
  boxCont: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow:
      " rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
    
    h: "max-content",
  },
  icon: {
    fontSize: "50px",
    display: "block",
    margin: "0 auto",
    marginBottom: "10px",
  },
  label: {
    fontSize: "14px",
    textTranform: "uppercase",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  input: {
    border: "1px solid #BDBDBD",
    focus: {
      backgroundColor: "#0e0d0d",
      color: "#f8f8f8",
      fontSize: "14px",
    },
  },
  span: {
    fontSize: "14px",
  },
};
export default Login;
