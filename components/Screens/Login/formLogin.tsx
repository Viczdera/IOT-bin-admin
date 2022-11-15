/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, useFormik } from "formik";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useMutation } from "react-query";
import { DataValueContext } from "../../../context/authContext";
import { usePostRequest } from "../../../hooks/allQueries";

function LoginForm(props: any) {
  const router = useRouter();
  const [passHidden, setPassHidden] = useState(true);
  //use ref
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

  const viewPassword = () => {
    setPassHidden(false);
  };
  const hidePassword = () => {
    setPassHidden(true);
  };

  //context api
  const { state, dispatch } = useContext(DataValueContext);
  console.log(state);
  //post request
  const { createPost, isLoading, data } = usePostRequest(
    true,
    "/api/auth/signin"
  );
  useEffect(() => {
    if (data?.status == 200) {
      console.log(data);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      router.push("/");
    } else {
      console.log(data);
      dispatch({ type: "LOGIN_FAILURE", payload: data });
    }
  }, [isLoading]);
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          //rememberMe: false
        }}
        onSubmit={(values, actions) => {
          createPost(values);
        }}
      >
        {(props: {
          setFieldValue: any;
          values: any;
          errors: any;
          setFieldTouched: any;
          touched: any;
        }) => (
          <Form>
            <span style={styles.span}>Manage your shop</span>

            <Box mt="15px">
              <FormControl>
                <FormLabel htmlFor="email" style={styles.label}>
                  EMAIL ADDRESS
                </FormLabel>
                <Input
                  name="email"
                  value={props.values?.email}
                  style={styles.input}
                  _focus={{ ...styles.input.focus }}
                  type="email"
                  _invalid={{ ...styles.input.invalid }}
                  onChange={(e) => {
                    props.setFieldValue("email", e.target.value);
                  }}
                />
              </FormControl>
            </Box>
            <Box mt="20px">
              <FormControl>
                <FormLabel htmlFor="password" style={styles.label}>
                  PASSWORD
                </FormLabel>
                <Box pos="relative">
                  <InputGroup>
                    <Input
                      name="password"
                      type={!passHidden ? "text" : "password"}
                      value={props.values.password}
                      onChange={(e) => {
                        props.setFieldValue("password", e.target.value);
                      }}
                      style={styles.input}
                      _focus={{ ...styles.input.focus }}
                      _invalid={{ ...styles.input.invalid }}
                    />
                    <InputRightElement>
                      <Icon
                        as={!passHidden ? AiFillEyeInvisible : AiFillEye}
                        fontSize="18px"
                        onClick={() => {
                          setPassHidden(!passHidden);
                        }}
                        cursor="pointer"
                      />
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </FormControl>
            </Box>
            <Button
              type="submit"
              isLoading={isLoading}
              style={styles.button}
              px={{ base: "100px", sm: "120px" }}
              mt="20px"
              _active={{ ...styles.button.hover }}
              _focus={{ ...styles.button.focus }}
              _hover={{ ...styles.button.hover }}
            >
              LOGIN
            </Button>
            <Text textAlign="center" mt="10px" fontSize="14px">
              Don't have an account?
            </Text>
            <Text
              textDecoration="underline"
              textAlign="center"
              mt="4px"
              fontSize="14px"
            >
              <Link href="/signup" passHref>
                Sign Up
              </Link>
            </Text>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const styles = {
  boxCont: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow:
      " rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
    margin: "0 auto",
    mt: "30px",
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
      backgroundColor: "#dfd9d9",
      color: "#0e0d0d",
      fontSize: "14px",
    },
    invalid: {
      border: "2px solid #0e0d0d",
    },
  },
  button: {
    backgroundColor: "var(--blue200)",
    color: "#fff",
    width: "100%",
    active: {},
    focus: {
      border: "2px solid #000",
      background: "#000",
    },
    hover: {
      backgroundColor: "#181818",
    },
  },
  span: {
    fontSize: "14px",
    color: "var(--blue200) ",
  },
};
export default LoginForm;
