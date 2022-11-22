/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Image,
  Checkbox,
  Stack,
  Select as SelectChakra,
  Divider,
  Flex,
  Text,
  Button,
  useDisclosure,
  Switch,
  Icon,
  useToast,
  InputGroup,
  InputLeftAddon,
  Wrap,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { ImPriceTags } from "react-icons/im";
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { Field, Form, Formik } from "formik";
import { FileUploader } from "react-drag-drop-files";
import UploadImage from "./components/UploadImage";
import { Col, InputNumber, Row, Select } from "antd";
import OptionsForm from "./components/OptionsForm";
import EditOptions from "./components/EditOptions";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { GrHomeOption } from "react-icons/gr";
import { TbCurrencyDollar, TbCurrencyNaira, TbEdit } from "react-icons/tb";
import { DataValueContext } from "../../../context/authContext";
import { formatter, formatterUsd } from "../../../helpers/HelperFunctions";
import OptionsVariants from "./components/OptionsVariants";
const boxShadow = "rgba(0, 0, 0, 0.1) 0px 1px 2px 0.4px";
const boxShadow1 = " rgba(0, 0, 0, 0.18) 0px 2px 4px";
const boxShadow2 = " rgba(0, 0, 0, 0.04) 0px 3px 5px";
const { Option } = Select;
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useGetRequest } from "../../../hooks/allQueries";

const Product = (props: { id: any }) => {
  const [product, setProduct] = React.useState<any>([]);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState("");
  const [showVariant, setShowVariant] = useState(true);
  const [options, setOptions] = useState(false);
  const toast = useToast();
  const rate = 439;
  //fetch products
  const { isLoading, data, isSuccess, isFetching } = useGetRequest(
    `/api/products/${props.id}`,
    `product-${props.id}`,
    ""
  );
  useEffect(() => {
    if (data?.status == 200) {
      let d = data?.data?.data;
      let optionL = Object.keys(d?.options).length;
      console.log(optionL);
      if (optionL > 0) {
        setOptions(true);
      }
      setProduct(d);
    }
  }, [data]);
  console.log(product);

  //context
  const { state, dispatch } = useContext(DataValueContext);
  const userCurrency = state?.currency;
  //pricing and currency
  const [currency, setCurrency] = useState("NGN");
  const handleCurrencyChange = (value: string) => {
    setShowVariant(false);
    setTimeout(() => {
      setShowVariant(true);
    }, 1000);
    dispatch({ type: "CURRENCY", payload: value });
    toast({
      title: "Currency",
      position: "top-right",
      description: value,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };
  useEffect(() => setCurrency(userCurrency), [userCurrency]);
  const toInt = (number: string) => {
    return parseFloat(number);
  };
  return (
    <>
      {isSuccess ? (
        <>
          <Box mt="20px" minH="100vh">
            <Formik
              initialValues={product}
              validationSchema={""}
              onSubmit={() => {}}
            >
              {(props: {
                setFieldValue: any;
                values: any;
                errors: any;
                setFieldTouched: any;
                touched: any;
              }) => {
                if (!edit) {
                  props.values = product;
                }
                return (
                  <Form>
                    <Flex
                      flexDir={{ base: "column", lg: "row" }}
                      alignItems="center"
                    >
                      <Box w={{ base: "100%", lg: "60%" }}>
                        <Box style={styles.cardCont}>
                          <FormControl
                            //isInvalid={props.errors.title && props.touched.title}
                            padding={{ base: "10px", md: "20px" }}
                          >
                            <FormLabel htmlFor="title" style={styles.title}>
                              Title
                            </FormLabel>
                            <Input
                              disabled
                              name="title"
                              placeholder="title"
                              value={props.values.title}
                              isDisabled
                              h="40px"
                              type="text"
                              onChange={(e) => {
                                props.setFieldValue("title", e.target.value);
                              }}
                            />

                            {/* <FormErrorMessage mt="10px">
                          {props.errors.title}
                        </FormErrorMessage> */}
                          </FormControl>

                          <FormControl
                            //   isInvalid={
                            //     props.errors.description && props.touched.description
                            //   }
                            px={{ base: "10px", md: "20px" }}
                            pb={{ base: "10px", md: "20px" }}
                            mt="9px"
                          >
                            <FormLabel
                              htmlFor="description"
                              style={styles.title}
                            >
                              Description
                            </FormLabel>
                            <Textarea
                              name="description"
                              value={props.values.description}
                              placeholder="product detail"
                              h="40px"
                              resize="none"
                              minH="150px"
                              isDisabled
                              // onChange={(e) => {
                              //   props.setFieldValue("description", e.target.value);
                              // }}
                            />

                            {/* <FormErrorMessage>
                          {props.errors.description}
                        </FormErrorMessage> */}
                            <Box>
                              <Text
                                borderBottom="2px solid black"
                                w="max-content"
                                mt="15px"
                                mb="10px"
                              >
                                Note{" "}
                              </Text>{" "}
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Ut libero aspernatur provident ratione sit?
                              Cum temporibus aut quisquam culpa perspiciatis
                              voluptas.
                            </Box>
                          </FormControl>
                        </Box>
                      </Box>

                      <Box
                        w={{ base: "100%", lg: "40%" }}
                        ml={{ base: "0px", lg: "30px" }}
                        my={{ base: "20px", md: "0px" }}
                      >
                        <Box style={styles.cardCont}>
                          <FormControl
                            // isInvalid={props.errors.status && props.touched.status}
                            padding={{ base: "10px", md: "20px" }}
                          >
                            <FormLabel htmlFor="status" style={styles.title}>
                              Product Status
                            </FormLabel>
                            <Select
                              defaultValue={product?.status}
                              style={{ width: "100%" }}
                              onChange={(value: string) => {
                                props.setFieldValue("status", value);
                              }}
                              disabled
                            >
                              <Option value="active">Active</Option>
                              <Option value="draft">Draft</Option>
                            </Select>

                            {/* <FormErrorMessage mt="10px">
                          {props.errors.status}
                        </FormErrorMessage> */}
                          </FormControl>
                        </Box>

                        <Box
                          style={styles.cardCont}
                          mt={{ base: "20px", md: "30px" }}
                        >
                          <Box py={{ base: "10px", md: "20px" }}>
                            <Text
                              px={{ base: "10px", md: "20px" }}
                              style={styles.title}
                            >
                              Inventory
                            </Text>
                            <Divider orientation="horizontal" my="20px" />
                            <Flex
                              px={{ base: "10px", md: "20px" }}
                              flexDir={{ base: "column", sm: "row" }}
                            >
                              <FormControl
                                // isInvalid={props.errors.sku && props.touched.sku}
                                mr="20px"
                              >
                                <FormLabel htmlFor="sku" fontSize="14px">
                                  SKU <p> (Stock Keeping Unit)</p>
                                </FormLabel>
                                <Input
                                  disabled
                                  name="sku"
                                  min={1}
                                  placeholder="sku"
                                  value={props.values.sku}
                                  h="40px"
                                  onChange={(e) => {
                                    props.setFieldValue("sku", e.target.value);
                                  }}
                                />

                                {/* <FormErrorMessage mt="10px">
                              {props.errors.sku}
                            </FormErrorMessage> */}
                              </FormControl>
                            </Flex>

                            <Box px={{ base: "10px", md: "20px" }} mt="20px">
                              <FormControl
                              //   isInvalid={
                              //     props.errors.quantity && props.touched.quantity
                              //   }
                              >
                                <FormLabel htmlFor="quantity" fontSize="14px">
                                  Quantity
                                </FormLabel>
                                <NumberInput
                                  isDisabled
                                  value={props.values.quantity}
                                  name="quantity"
                                  width="100%"
                                  height="40px"
                                  min={1}
                                  max={5000}
                                  clampValueOnBlur={true}
                                  // onChange={(value: any) => {
                                  //   props.setFieldValue("quantity", value);
                                  // }}
                                >
                                  <NumberInputField
                                    _focus={{
                                      border: "2px solid var(--black100)",
                                    }}
                                  />
                                  <NumberInputStepper height="38px" top="0px">
                                    <NumberIncrementStepper
                                      border="unset"
                                      _active={{ background: "var(--grey100)" }}
                                    />
                                    <NumberDecrementStepper
                                      border="unset"
                                      _active={{ background: "var(--grey100)" }}
                                    />
                                  </NumberInputStepper>
                                </NumberInput>

                                {/* <FormErrorMessage mt="10px">
                              {props.errors.quantity}
                            </FormErrorMessage> */}
                              </FormControl>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Flex>
                    <Box
                      style={styles.cardCont}
                      mt={{ base: "20px", md: "30px" }}
                    >
                      <Box py={{ base: "10px", md: "20px" }}>
                        <Flex alignItems="center">
                          <Text
                            px={{ base: "10px", md: "20px" }}
                            style={styles.title}
                          >
                            Pricing
                          </Text>
                          <Select
                            // disabled
                            style={{ width: "80px" }}
                            value={currency}
                            onChange={handleCurrencyChange}
                            options={[
                              {
                                value: "NGN",
                                label: "NGN",
                              },
                              {
                                value: "USD",
                                label: "USD",
                              },
                            ]}
                          />
                        </Flex>
                        <Divider orientation="horizontal" my="20px" />
                        <Flex
                          px={{ base: "10px", md: "20px" }}
                          flexDir={{ base: "column", sm: "row" }}
                        >
                          <FormControl
                            //   isInvalid={
                            //     currency == "NGN"
                            //       ? props.errors.price?.ngn && props.touched.price?.ngn
                            //       : props.errors.price?.usd && props.touched.price?.usd
                            //   }
                            mr="20px"
                          >
                            <FormLabel htmlFor="price" fontSize="14px">
                              Price
                            </FormLabel>
                            <Box style={styles.inputBox}>
                              <Flex alignItems="center">
                                {/* <Icon
                            as={
                              currency == "NGN"
                                ? TbCurrencyNaira
                                : TbCurrencyDollar
                            }
                            fontSize="18px"
                          /> */}
                                <Input
                                  disabled
                                  name="price"
                                  border="none"
                                  min={0}
                                  padding="2px"
                                  h="30px"
                                  fontSize="18px"
                                  fontWeight="bold"
                                  // ref={price}
                                  placeholder="0"
                                  value={
                                    currency == "NGN"
                                      ? props.values.price?.ngn || 0
                                      : props.values.price?.usd || 0
                                  }
                                />
                              </Flex>
                              <Flex
                                mt="5px"
                                alignItems="center"
                                fontSize="12px"
                                color="grey"
                              >
                                <Icon
                                  as={
                                    currency == "NGN"
                                      ? TbCurrencyDollar
                                      : TbCurrencyNaira
                                  }
                                />
                                <Text>
                                  {currency == "NGN"
                                    ? formatterUsd.format(
                                        product?.price?.usd || 0
                                      )
                                    : formatter.format(
                                        product?.price?.ngn || 0
                                      )}
                                </Text>
                              </Flex>
                            </Box>
                          </FormControl>

                          <FormControl mr="20px">
                            <FormLabel
                              htmlFor="priceDiscounted"
                              fontSize="14px"
                            >
                              Price Discounted
                            </FormLabel>
                            <Box style={styles.inputBox}>
                              <Flex alignItems="center">
                                <Input
                                  disabled
                                  name="priceDiscounted"
                                  border="none"
                                  min={0}
                                  padding="2px"
                                  h="30px"
                                  fontSize="18px"
                                  fontWeight="bold"
                                  placeholder="0"
                                  value={
                                    currency == "NGN"
                                      ? props.values.priceDiscounted?.ngn || 0
                                      : props.values.priceDiscounted?.usd || 0
                                  }
                                />
                              </Flex>
                              <Flex
                                mt="5px"
                                alignItems="center"
                                fontSize="12px"
                                color="grey"
                              >
                                <Icon
                                  as={
                                    currency == "NGN"
                                      ? TbCurrencyDollar
                                      : TbCurrencyNaira
                                  }
                                />
                                <Text>
                                  {currency == "NGN"
                                    ? formatterUsd.format(
                                        props.values.priceDiscounted?.usd || 0
                                      )
                                    : formatter.format(
                                        props.values.priceDiscounted?.ngn || 0
                                      )}
                                </Text>
                              </Flex>
                            </Box>
                          </FormControl>
                        </Flex>
                      </Box>
                    </Box>
                    <Box
                      style={styles.cardCont}
                      mt={{ base: "20px", md: "30px" }}
                    >
                      <FormControl p='20px'>
                        <Box>
                          <Row justify="start" align="top" gutter={[12, 12]}>
                            {product?.images?.map((m: any, key: any) => (
                              <>
                                <Col span={key == 0 ? 12 : 6} key={key}>
                                  <Box
                                    outline="1px solid #d6d3d3b3"
                                    borderRadius="8px"
                                    boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
                                    h={{ base: 120, sm: 120, md: 200, lg: 300 }}
                                  >
                                    <Flex
                                      h="100%"
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <Image
                                        key={key}
                                        src={m.src}
                                        alt="imgs"
                                        width="auto"
                                        height="auto"
                                        maxH="100%"
                                        maxW="100%"
                                      />
                                    </Flex>
                                  </Box>
                                </Col>
                              </>
                            ))}
                          </Row>
                        </Box>
                      </FormControl>
                    </Box>

                    <Box>
                      <Box
                        style={styles.cardCont}
                        mt={{ base: "20px", md: "30px" }}
                      >
                        <FormControl>
                          <FormLabel
                            htmlFor="title"
                            style={styles.title}
                            p={{ base: "10px", md: "20px" }}
                          >
                            Options
                          </FormLabel>
                          <Box>
                            <Flex
                              px={{ base: "10px", md: "20px" }}
                              pb={options ? "0px" : "30px"}
                            >
                              <Switch
                                mr="10px"
                                isChecked={options}
                                //   onChange={() => {
                                //     onChangeCheck();
                                //   }}
                              />
                              <Text>
                                This product has options, like size or color
                              </Text>
                            </Flex>
                            {options ? (
                              <Box>
                                <Divider orientation="horizontal" my="20px" />
                                <Flex
                                  px={{ base: "10px", md: "20px" }}
                                  pb={{ base: "10px", md: "20px" }}
                                  //  flexDir={{ base: "column", lg: "row" }}
                                  flexWrap="wrap"
                                >
                                  {!options ? (
                                    ""
                                  ) : (
                                    <Flex
                                      flexDir={{ base: "column", lg: "row" }}
                                      flexWrap="wrap"
                                      w="100%"
                                    >
                                      {props.values.options?.map(
                                        (m: any, i: number) => (
                                          <Box
                                            width={{ base: "100%", lg: "50%" }}
                                            key={i}
                                            border="1px solid var(--grey200)"
                                            p="10px"
                                          >
                                            <Flex
                                              alignItems="center"
                                              justifyContent="space-between"
                                            >
                                              <Icon as={GrHomeOption} />
                                              <Box w="100%" mx="20px">
                                                <Text
                                                  style={styles.title}
                                                  textTransform="capitalize"
                                                >
                                                  {m.name}
                                                </Text>
                                                <Wrap>
                                                  {m.values.map(
                                                    (v: any, i: number) => (
                                                      <Box
                                                        key={i}
                                                        style={styles.valueCont}
                                                      >
                                                        <Text>{v}</Text>
                                                      </Box>
                                                    )
                                                  )}
                                                </Wrap>
                                              </Box>
                                              {/* <IconButton
                                          size="sm"
                                          onClick={() => {
                                            openEditDrawer(i);
                                          }}
                                          aria-label={"edit-option-btn"}
                                        >
                                          <TbEdit />
                                        </IconButton> */}
                                            </Flex>
                                          </Box>
                                        )
                                      )}
                                    </Flex>
                                  )}
                                </Flex>
                                <Divider orientation="horizontal" my="20px" />
                                <Flex
                                  px={{ base: "10px", md: "20px" }}
                                  pb={{ base: "10px", md: "20px" }}
                                  cursor="pointer"
                                  _hover={{ color: "blue.600" }}
                                  // onClick={() => {
                                  //   onOpen();
                                  // }}
                                >
                                  <Icon
                                    as={HiViewGridAdd}
                                    mr="10px"
                                    boxSize="20px"
                                  />{" "}
                                  {/* <Text>Add option</Text> */}
                                </Flex>
                              </Box>
                            ) : (
                              ""
                            )}
                          </Box>
                        </FormControl>
                      </Box>
                    </Box>

                    {options ? (
                      <Box
                        style={styles.cardCont}
                        mt={{ base: "20px", md: "30px" }}
                      >
                        <FormControl>
                          <FormLabel
                            htmlFor="title"
                            style={styles.title}
                            pt={{ base: "10px", md: "20px" }}
                            px={{ base: "10px", md: "20px" }}
                          >
                            Variants
                          </FormLabel>
                          <Box
                            px={{ base: "10px", md: "20px" }}
                            lineHeight="10px"
                          >
                            Note: *variants are generated from optionsz
                          </Box>
                          <OptionsVariants
                          disabled={true}
                            rate={rate}
                            variants={product?.variants}
                            setFieldValue={props.setFieldValue}
                            currency={currency}
                            showVariant={showVariant}
                            options={options}
                            images={product?.images}
                          />
                        </FormControl>
                      </Box>
                    ) : (
                      ""
                    )}
                    {/* <Button
                type="submit"
                mt="20px"
                backgroundColor="black.100"
                color="white"
                width="100%"
                isLoading={isLoading}
              >
                Add Product
              </Button> */}
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </>
      ) : (
        "Error"
      )}
    </>
  );
};

const styles = {
  cardCont: {
    borderRadius: "10px",
    boxShadow: boxShadow2,
    backgroundColor: "#fff",
  },
  option: {
    padding: "10px",
    marginBottom: "5px",
  },
  title: {
    fontSize: "15px",
    fontWeight: "600",
  },
  inputBox: {
    border: "1px solid var(--grey200)",
    borderRadius: "10px",
    padding: "10px 8px",
  },
  valueCont: {
    borderRadius: "10px",
    background: "var(--black100)",
    color: "white",
    padding: "1px 8px",
  },
  editBtn: {
    backgroundColor: "var(--grey200)",
    color: "var(--black100)",
    fontSize: "14px",
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
};

export default Product;
