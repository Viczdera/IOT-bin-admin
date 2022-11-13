/* eslint-disable react/no-children-prop */
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
import { InputNumber, Select } from "antd";
import OptionsForm from "./components/OptionsForm";
import EditOptions from "./components/EditOptions";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { GrHomeOption } from "react-icons/gr";
import { TbCurrencyDollar, TbCurrencyNaira, TbEdit } from "react-icons/tb";
import { usePostRequest } from "../../../hooks/allQueries";
import { DataValueContext } from "../../../context/authContext";
import { formatter, formatterUsd } from "../../../helpers/HelperFunctions";
import OptionsVariants from "./components/OptionsVariants";
const boxShadow = "rgba(0, 0, 0, 0.1) 0px 1px 2px 0.4px";
const boxShadow1 = " rgba(0, 0, 0, 0.18) 0px 2px 4px";
const boxShadow2 = " rgba(0, 0, 0, 0.04) 0px 3px 5px";
const { Option } = Select;
const NewProduct = (props: any) => {
  const route = "/api/";
  const queryClient = useQueryClient();
  ///toast
  const toast = useToast();
  //refs
  const price = useRef<HTMLInputElement>(null);
  const priceDiscounted = useRef<HTMLInputElement>(null);
  //context
  const { state, dispatch } = useContext(DataValueContext);
  const accessToken =
    state?.user?.accessToken || state?.user?.data?.accessToken;
  const userCurrency = state?.currency;
  //checkbox
  const [checkedItems, setCheckedItems] = React.useState<any>([false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  //variants
  const [variants, setVariants] = useState<any>([]);
  //pricing and currency
  const [currency, setCurrency] = useState("NGN");
  const [priceData, setPriceData] = useState({ ngn: "", usd: "" });
  const rate = 439;
  //drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();
  const btnRef = useRef<HTMLInputElement>(null);

  //options
  const [options, setOptions] = useState(false);
  const [formValues, setFormValues] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showVariant, setShowVariant] = useState(true);
  //check funct
  //console.log(formValues);
  const onChangeCheck = () => {
    if (options == true) {
      let newValues: never[] = [];
      //newValues.splice(0, newValues.length);
      setFormValues(newValues);
      setOptions(false);
    } else {
      let newValues: never[] = [];
      setFormValues(newValues);
      addOptions();

      setOptions(true);
    }
  };

  //drawer funct
  const addOptions = () => {
    onOpen();
    // setFormValues([...formValues, { name: "" }]);
  };

  const onCloseDrawer = () => {
    if (formValues.length == 0) {
      let newValues: never[] = [];
      //newValues.splice(0, newValues.length);
      setFormValues(newValues);
      setOptions(false);
    }
    onClose();
  };

  const openEditDrawer = (index: number) => {
    setActiveIndex(index);
    editOnOpen();
  };
  // useEffect(() => {
  //   console.log(formValues);
  // }, [formValues]);

  //testing combination
  function cartesian(args: any) {
    var r: any = [],
      max = args.length - 1;
    function helper(arr: any, i: any) {
      for (var j = 0, l = args[i].length; j < l; j++) {
        var a = arr.slice(0); // clone arr

        a.push(args[i][j]);
        if (i == max) r.push(a);
        else helper(a, i + 1);
      }
    }
    helper([], 0);
    let erd = r.map((m: any) => {
      return Object.assign({}, m);
    });
    return erd;
  }
  const dVariants = () => {
    let optionValues = formValues.map((m: any) => {
      return m.values;
    });
    return optionValues.length > 0 ? cartesian(optionValues) : [];
  };
  // console.log(dVariants());
  function mapVariants() {
    let variantsWithOptions = dVariants().map((m: any) => {
      return Object.fromEntries(
        Object.entries(m).map(([key, value]) => {
          let no_ = parseInt(key) + 1;
          return [`option${no_}`, value];
        })
      );
    });
    //add price
    variantsWithOptions.map((m: any, i: number) => {
      m.price = priceData;
    });
    setVariants(variantsWithOptions);
  }

  useEffect(() => {
    dVariants();
    mapVariants();
  }, [formValues]);

  const handleValidation = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    status: yup.string().required("Status is required"),
    sku: yup.string().required("SKU (Store Keeping Unit) is required"),
    // price: yup.number().required("Product price is required"),
    price: yup.object({
      ngn: yup.number().required("Product price is required"),
      usd: yup.number().required("Product price is required"),
    }),
    quantity: yup
      .number()
      .min(1, "Quantity must be at least one")
      .typeError("Quantity must be a number")
      .required("Provide quantity"),
    images: yup
      .array()
      .min(1, "A product image is required")
      .required("Product image is required"),
  });

  const prices: {
    ngn: string;
    usd: string;
  } = { ngn: "", usd: "" };
  const initialFormValues = {
    title: "",
    description: "",
    sku: "",
    barcode: "",
    quantity: 1,
    price: prices,
    priceDiscounted: prices,
    variants: variants,
    status: "active",
    images: [""],
    options: formValues,
  };
  //post request
  //console.log(accessToken)
  const { createPost, isLoading, isSuccess, data } = usePostRequest(
    true,
    "/api/vendor/products/new",
    accessToken
  );
  if (data?.status == 200 || 201) {
    console.log(data);
  }
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
  //console.log(currency);
  return (
    <>
      <Box mt="20px" minH="100vh">
        <Formik
          initialValues={initialFormValues}
          validationSchema={handleValidation}
          onSubmit={(values, actions) => {
            values.options = formValues;
            values.variants = variants;
            console.log(values);
            createPost(values);
            if (data?.status == 200 || data?.status == 201) {
              actions.resetForm(initialFormValues);
            }
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
              <Flex flexDir={{ base: "column", lg: "row" }} alignItems="ce">
                <Box w={{ base: "100%", lg: "60%" }}>
                  <Box style={styles.cardCont}>
                    <FormControl
                      isInvalid={props.errors.title && props.touched.title}
                      padding={{ base: "10px", md: "20px" }}
                    >
                      <FormLabel htmlFor="title" style={styles.title}>
                        Title
                      </FormLabel>
                      <Input
                        name="title"
                        placeholder="title"
                        value={props.values.title}
                        h="40px"
                        type="text"
                        onChange={(e) => {
                          props.setFieldValue("title", e.target.value);
                        }}
                      />

                      <FormErrorMessage mt="10px">
                        {props.errors.title}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        props.errors.description && props.touched.description
                      }
                      px={{ base: "10px", md: "20px" }}
                      pb={{ base: "10px", md: "20px" }}
                      mt="9px"
                    >
                      <FormLabel htmlFor="description" style={styles.title}>
                        Description
                      </FormLabel>
                      <Textarea
                        name="description"
                        value={props.values.description}
                        placeholder="product detail"
                        h="40px"
                        resize="none"
                        minH="150px"
                        onChange={(e) => {
                          props.setFieldValue("description", e.target.value);
                        }}
                      />

                      <FormErrorMessage>
                        {props.errors.description}
                      </FormErrorMessage>
                      <Box>
                        <Text
                          borderBottom="2px solid black"
                          w="max-content"
                          mt="15px"
                          mb="10px"
                        >
                          Note{" "}
                        </Text>{" "}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ut libero aspernatur provident ratione sit? Cum
                        temporibus aut quisquam culpa perspiciatis voluptas.
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
                      isInvalid={props.errors.status && props.touched.status}
                      padding={{ base: "10px", md: "20px" }}
                    >
                      <FormLabel htmlFor="status" style={styles.title}>
                        Product Status
                      </FormLabel>
                      <Select
                        defaultValue="active"
                        style={{ width: "100%" }}
                        onChange={(value: string) => {
                          props.setFieldValue("status", value);
                        }}
                      >
                        <Option value="active">Active</Option>
                        <Option value="draft">Draft</Option>
                      </Select>

                      <FormErrorMessage mt="10px">
                        {props.errors.status}
                      </FormErrorMessage>
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
                          isInvalid={props.errors.sku && props.touched.sku}
                          mr="20px"
                        >
                          <FormLabel htmlFor="sku" fontSize="14px">
                            SKU <p> (Stock Keeping Unit)</p>
                          </FormLabel>
                          <Input
                            name="sku"
                            min={1}
                            placeholder="sku"
                            value={props.values.sku}
                            h="40px"
                            onChange={(e) => {
                              props.setFieldValue("sku", e.target.value);
                            }}
                          />

                          <FormErrorMessage mt="10px">
                            {props.errors.sku}
                          </FormErrorMessage>
                        </FormControl>

                        <FormControl>
                          <FormLabel htmlFor="barcode" fontSize="14px">
                            Barcode <p>(Optional)</p>
                          </FormLabel>

                          <Input
                            name="barcode"
                            placeholder="barcode"
                            value={props.values.barcode}
                            h="40px"
                            onChange={(e) => {
                              props.setFieldValue("barcode", e.target.value);
                            }}
                          />
                        </FormControl>
                      </Flex>

                      <Box px={{ base: "10px", md: "20px" }} mt="20px">
                        <FormControl
                          isInvalid={
                            props.errors.quantity && props.touched.quantity
                          }
                        >
                          <FormLabel htmlFor="quantity" fontSize="14px">
                            Quantity
                          </FormLabel>
                          <NumberInput
                            value={props.values.quantity}
                            name="quantity"
                            width="100%"
                            height="40px"
                            min={1}
                            max={5000}
                            clampValueOnBlur={true}
                            onChange={(value: any) => {
                              props.setFieldValue("quantity", value);
                            }}
                          >
                            <NumberInputField
                              _focus={{ border: "2px solid var(--black100)" }}
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

                          <FormErrorMessage mt="10px">
                            {props.errors.quantity}
                          </FormErrorMessage>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Flex>
              <Box style={styles.cardCont} mt={{ base: "20px", md: "30px" }}>
                <Box py={{ base: "10px", md: "20px" }}>
                  <Flex alignItems="center">
                    <Text
                      px={{ base: "10px", md: "20px" }}
                      style={styles.title}
                    >
                      Pricing
                    </Text>
                    <Select
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
                      isInvalid={
                        currency == "NGN"
                          ? props.errors.price?.ngn && props.touched.price?.ngn
                          : props.errors.price?.usd && props.touched.price?.usd
                      }
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
                            name="price"
                            border="none"
                            min={0}
                            padding="2px"
                            h="30px"
                            fontSize="18px"
                            fontWeight="bold"
                            type="number"
                            ref={price}
                            placeholder="0"
                            value={
                              currency == "NGN"
                                ? props.values.price.ngn
                                : props.values.price.usd
                            }
                            onChange={(e) => {
                              if (currency == "NGN") {
                                let p: any = e.target.value;
                                let pUsd = p / rate;
                                setPriceData({
                                  ngn: p,
                                  usd: pUsd.toFixed(2),
                                });
                                props.setFieldValue("price", {
                                  ngn: p,
                                  usd: pUsd.toFixed(2),
                                });
                              } else {
                                let p: any = parseFloat(e.target.value);
                                p.toFixed(2);
                                let pNgn = p * rate;
                                setPriceData({
                                  ngn: pNgn.toString(),
                                  usd: p,
                                });
                                props.setFieldValue("price", {
                                  ngn: pNgn,
                                  usd: p,
                                });
                              }
                            }}
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
                              ? formatterUsd.format(props.values.price.usd)
                              : formatter.format(props.values.price.ngn)}
                          </Text>
                        </Flex>
                      </Box>

                      <FormErrorMessage mt="10px">
                        {currency == "NGN"
                          ? props.errors.price?.ngn
                          : props.errors.price?.usd}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl mr="20px">
                      <FormLabel htmlFor="priceDiscounted" fontSize="14px">
                        Price Discounted
                      </FormLabel>
                      <Box style={styles.inputBox}>
                        <Flex alignItems="center">
                          <Input
                            name="priceDiscounted"
                            border="none"
                            min={0}
                            padding="2px"
                            h="30px"
                            fontSize="18px"
                            fontWeight="bold"
                            type="number"
                            placeholder="0"
                            value={
                              currency == "NGN"
                                ? props.values.priceDiscounted.ngn
                                : props.values.priceDiscounted.usd
                            }
                            onChange={(e) => {
                              if (currency == "NGN") {
                                let p: any = e.target.value;
                                let pUsd = p / rate;

                                props.setFieldValue("priceDiscounted", {
                                  ngn: p,
                                  usd: pUsd.toFixed(2),
                                });
                              } else {
                                let p: any = parseFloat(e.target.value);
                                p.toFixed(2);
                                let pNgn = p * rate;

                                props.setFieldValue("priceDiscounted", {
                                  ngn: pNgn,
                                  usd: p,
                                });
                              }
                            }}
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
                                  props.values.priceDiscounted.usd
                                )
                              : formatter.format(
                                  props.values.priceDiscounted.ngn
                                )}
                          </Text>
                        </Flex>
                      </Box>
                    </FormControl>
                  </Flex>
                </Box>
              </Box>
              <Box style={styles.cardCont} mt={{ base: "20px", md: "30px" }}>
                <FormControl
                  isInvalid={props.errors.images && props.touched.images}
                >
                  <UploadImage
                    setFieldValue={props.setFieldValue}
                    uploadSuccess={isSuccess}
                  />

                  <FormErrorMessage px={{ base: "10px", md: "20px" }} pb="10px">
                    {props.errors.images}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              {/* <OptionsVariants setFieldValue={setFieldValue} /> */}
              <Box>
                <Box style={styles.cardCont} mt={{ base: "20px", md: "30px" }}>
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
                          onChange={() => {
                            onChangeCheck();
                          }}
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
                            {formValues.length == 0 ? (
                              ""
                            ) : (
                              <Flex
                                flexDir={{ base: "column", lg: "row" }}
                                flexWrap="wrap"
                                w="100%"
                              >
                                {formValues.map((m: any, i: number) => (
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
                                          {m.values.map((v: any, i: number) => (
                                            <Box
                                              key={i}
                                              style={styles.valueCont}
                                            >
                                              <Text>{v}</Text>
                                            </Box>
                                          ))}
                                        </Wrap>
                                      </Box>
                                      <IconButton
                                        size="sm"
                                        onClick={() => {
                                          openEditDrawer(i);
                                        }}
                                        aria-label={"edit-option-btn"}
                                      >
                                        <TbEdit />
                                      </IconButton>
                                    </Flex>
                                  </Box>
                                ))}
                              </Flex>
                            )}
                          </Flex>
                          <Divider orientation="horizontal" my="20px" />
                          <Flex
                            px={{ base: "10px", md: "20px" }}
                            pb={{ base: "10px", md: "20px" }}
                            cursor="pointer"
                            _hover={{ color: "blue.600" }}
                            onClick={() => {
                              onOpen();
                            }}
                          >
                            <Icon as={HiViewGridAdd} mr="10px" boxSize="20px" />{" "}
                            <Text>Add option</Text>
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
                <Box style={styles.cardCont} mt={{ base: "20px", md: "30px" }}>
                  <FormControl>
                    <FormLabel
                      htmlFor="title"
                      style={styles.title}
                      pt={{ base: "10px", md: "20px" }}
                      px={{ base: "10px", md: "20px" }}
                    >
                      Variants
                    </FormLabel>
                    <Box px={{ base: "10px", md: "20px" }} lineHeight="10px">
                      Note: *variants are generated from optionsz
                    </Box>
                    <OptionsVariants
                      rate={rate}
                      variants={variants}
                      setFieldValue={props.setFieldValue}
                      currency={currency}
                      showVariant={showVariant}
                      options={options}
                      images={props.values?.images}
                    />
                  </FormControl>
                </Box>
              ) : (
                ""
              )}
              <Button
                type="submit"
                mt="20px"
                backgroundColor="black.100"
                color="white"
                width="100%"
                isLoading={isLoading}
              >
                Add Product
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <OptionsForm
        setformValues={setFormValues}
        formValues={formValues}
        isOpen={isOpen}
        onOpen={onOpen}
        onCloseDrawer={onCloseDrawer}
        onClose={onClose}
        btnRef={btnRef}
      />

      <EditOptions
        index={activeIndex}
        setformValues={setFormValues}
        formValues={formValues}
        isOpen={editIsOpen}
        onOpen={editIsOpen}
        onClose={editOnClose}
        btnRef={btnRef}
      />
    </>
  );
};
// name={`values[${index}].payload`}
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
export default NewProduct;
