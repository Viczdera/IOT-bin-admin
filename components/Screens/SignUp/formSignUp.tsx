import React, { useContext, useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
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
} from "@chakra-ui/react";
import { Field, Form, Formik, useFormik } from "formik";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import * as yup from "yup";
import { usePostRequest } from "../../../hooks/allQueries";
import Router from 'next/router'
interface ShopInfoProps {
  values: object;
  next: () => void;
  handleValueChange: (input: string, value: string) => void;
}
export const ShopInfoForm: React.FC<ShopInfoProps> = ({
  values,
  next,
  handleValueChange,
}) => {
  const handleValidation = yup.object().shape({
    user_name: yup.string().required("Kindly add your user name"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: yup
      .string()
      .required("Email is required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Enter a valid phone number"
      ),
  });

  return (
    <Formik
      initialValues={values}
      validationSchema={handleValidation}
      onSubmit={(values: any, actions) => {
        handleValueChange("user_name", values?.user_name);
        handleValueChange("email", values?.email);
        handleValueChange("phone", values?.phone);
        //console.log(values);
        next();
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
          <Box position="relative">
            <Alert status="info" mb="5px" fontSize="12px">
              <AlertIcon color='blue.200' />
              Some Message for those signing up !
            </Alert>
            <span style={styles.span}>Manage your shop account</span>
            <Box mt="15px">
              <FormControl isInvalid={props.errors.user_name}>
                <FormLabel htmlFor="user_name" style={styles.label}>
                  USER NAME
                </FormLabel>
                <Input
                  name="user_name"
                  value={props.values.user_name}
                  onChange={(e) => {
                    props.setFieldValue("user_name", e.target.value);
                  }}
                  style={styles.input}
                  _focus={{ ...styles.input.focus }}
                  type="text"
                  _invalid={{ ...styles.input.invalid }}
                />
                <FormErrorMessage>{props.errors.user_name}</FormErrorMessage>
              </FormControl>
            </Box>
            <Flex mt="20px" flexDir={{ base: "column", sm: "row" }}>
              <FormControl
                isInvalid={props.errors.email && props.touched.email}
              >
                <FormLabel htmlFor="email" style={styles.label}>
                  EMAIL ADDRESS
                </FormLabel>
                <Input
                  name="email"
                  value={props.values.email}
                  onChange={(e) => {
                    props.setFieldValue("email", e.target.value);
                  }}
                  style={styles.input}
                  _focus={{ ...styles.input.focus }}
                  type="text"
                  _invalid={{ ...styles.input.invalid }}
                />
                <FormErrorMessage>{props.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl
                ml={{ base: "0px", sm: "10px", md: "20px" }}
                isInvalid={props.errors.phone && props.touched.phone}
              >
                <FormLabel htmlFor="tel" style={styles.label}>
                  PHONE NUMBER
                </FormLabel>
                <Input
                  name="phone"
                  value={props.values.phone}
                  onChange={(e) => {
                    props.setFieldValue("phone", e.target.value);
                  }}
                  style={styles.input}
                  _focus={{ ...styles.input.focus }}
                  type="tel"
                  _invalid={{ ...styles.input.invalid }}
                />
                <FormErrorMessage>{props.errors.phone}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Button
              type="submit"
              style={styles.button}
              px={{ base: "100px", sm: "120px" }}
              w="100%"
              mt="60px"
              _active={{ ...styles.button.hover }}
              _focus={{ ...styles.button.focus }}
              _hover={{ ...styles.button.hover }}
            >
              Next
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

interface PasswordInfoProps {
  values: object;
  next: () => void;
  back: () => void;
  handleValueChange: (input: string, value: string) => void;
}
export const PasswordInfoForm: React.FC<PasswordInfoProps> = ({
  values,
  next,
  back,
  handleValueChange,
}) => {
  const [show, setShow] = React.useState([false, false]);
  const handleValidation = yup.object().shape({
    password: yup
      .string()
      .required("This field is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, a letter and a number"
      ),
    c_password: yup
      .string()
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });
  const handleChange = (values: any) => {
    handleValueChange("password", values?.password);
    handleValueChange("c_password", values?.c_password);
  };

  //post request
  const { createPost, isLoading, data } = usePostRequest(
    true,
    "/api/auth/signup"
  );
  if (data?.status == 200) {
    Router.push("/login");
  }
  return (
    <Formik
      initialValues={values}
      validationSchema={handleValidation}
      onSubmit={(values: any, actions) => {
        let postValues = {
          user_name: values.user_name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          c_password: values.c_password,
        };
      //  console.log(postValues);

        createPost(postValues);
 
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
          <Box>
            <span style={styles.span}>Manage your account security</span>
            <Box mt="15px">
              <FormControl isInvalid={props.errors.password}>
                <FormLabel htmlFor="password" style={styles.label}>
                  PASSWORD
                </FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={show[0] ? "text" : "password"}
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
                      as={show[0] ? AiFillEyeInvisible : AiFillEye}
                      fontSize="18px"
                      onClick={() => {
                        setShow([!show[0], show[1]]);
                      }}
                      cursor="pointer"
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{props.errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl mt="20px" isInvalid={props.errors.c_password}>
                <FormLabel htmlFor="c_password" style={styles.label}>
                  CONFIRM PASSWORD
                </FormLabel>
                <InputGroup>
                  <Input
                    name="c_password"
                    type={show[1] ? "text" : "password"}
                    value={props.values.c_password}
                    onChange={(e) => {
                      props.setFieldValue("c_password", e.target.value);
                    }}
                    style={styles.input}
                    _focus={{ ...styles.input.focus }}
                    _invalid={{ ...styles.input.invalid }}
                  />
                  <InputRightElement>
                    <Icon
                      as={show[1] ? AiFillEyeInvisible : AiFillEye}
                      fontSize="18px"
                      onClick={() => setShow([show[0], !show[1]])}
                      cursor="pointer"
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{props.errors.c_password}</FormErrorMessage>
              </FormControl>
            </Box>
            <Flex mt="50px" justifyContent="space-between">
              <Button
                style={styles.backBtn}
                px={{ base: "40px", sm: "60px" }}
                w="50%"
                mt="20px"
                _active={{ ...styles.backBtn.hover }}
                _focus={{ ...styles.backBtn.focus }}
                _hover={{ ...styles.backBtn.hover }}
                onClick={() => {
                  back();
                  handleChange(props.values);
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                style={styles.button}
                w="50%"
                px={{ base: "40px", sm: "60px" }}
                ml="20px"
                mt="20px"
                isLoading={isLoading}
                _active={{ ...styles.button.hover }}
                _focus={{ ...styles.button.focus }}
                _hover={{ ...styles.button.hover }}
              >
                Sign Up
              </Button>
            </Flex>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

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
    active: {},
    focus: {
      border: "2px solid var(--blue200)",
      background: "#000",
    },
    hover: {
      backgroundColor: "#181818",
    },
  },
  backBtn: {
    backgroundColor: "var(--grey200)",
    color: "var(--black100)",

    border: "1px solid var(--black100)",
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
  },
};
