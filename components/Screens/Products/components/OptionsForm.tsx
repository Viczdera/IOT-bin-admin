/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import { HiViewGridAdd } from "react-icons/hi";

import { MdOutlineDeleteSweep } from "react-icons/md";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form as FormikForm, Field, Formik, Form } from "formik";
import { FaSlidersH } from "react-icons/fa";
const boxShadow1 = " rgba(0, 0, 0, 0.18) 0px 2px 4px";
const boxShadow2 = " rgba(0, 0, 0, 0.04) 0px 3px 5px";

function OptionsForm(props: {
  setformValues: any;
  formValues: any;
  isOpen: any;
  onOpen?: any;
  onClose?: any;
  onCloseDrawer: any;
  btnRef: any;
}) {
  const toast = useToast();
  //higher state
  const [optionsData, setOptionsData] = React.useState({
    name: "",
    values: [],
  });
  //
  const [optionName, setOptionName] = React.useState<any>("size");
  const [ivalues, setValues] = React.useState<any>([]);
  const [isValueEmpty, setIsValueEmpty] = React.useState<any>([]);
  const [isValueExist, setIsValueExist] = React.useState<any>([]);
  // function closeModal(){
  //   props.onClose()
  // }

  //dynamic input valus
  const handleChange = (e: any, index: any) => {
    let newValues = [...ivalues];
    let newEmptyValues = [...isValueEmpty];
    let newExistValues = [...isValueExist];
    newValues[index] = e.target.value;
    //check empty value
    if (newValues[index] == "") {
      newEmptyValues[index] = true;
      setIsValueEmpty(newEmptyValues);
    } else {
      newEmptyValues[index] = false;
      setIsValueEmpty(newEmptyValues);
    }
    //check existing value
    //TODO:take all values to lowercase
    let check = ivalues.some((e: any) =>
      e == newValues[index] ? true : false
    );
    if (check && newValues[index] != "") {
      newExistValues[index] = true;
      setIsValueExist(newExistValues);
    } else {
      newExistValues[index] = false;
      setIsValueExist(newExistValues);
    }
    setValues(newValues);
  };
  // console.log(isValueEmpty);
  const addValues = () => {
    setValues([...ivalues, ""]);
    setIsValueEmpty([...isValueEmpty, true]);
    // setIsValueExist([...isValueExist, false]);
  };
  const removeValues = (i: any) => {
    let newValues = [...ivalues];
    newValues.splice(i, 1);
    isValueEmpty.splice(i, 1);
    isValueExist.splice(i, 1);
    optionsData.values.splice(i, 1);
    setValues(newValues);
  };

  const submitForm = () => {
    let check = props.formValues.some((e: any) =>
      e.name == optionName ? true : false
    );
    if(ivalues.length==0){
      toast({
        position: "top-right",
        title: "Error",
        description: `Must add a value`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
    else if (check == false) {
      setOptionsData((prevState) => ({
        ...prevState,
        name: optionName,
        values: ivalues,
      }));
      props.onClose();
    } else {
      toast({
        position: "top-right",
        title: "Error",
        description: `${optionName} option already exists`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  // const cancelSubmit = () => {
  //   props.onCloseDrawer();
  // };

  useEffect(() => {
   // console.log("pushed");
    //back to defaults
    setValues([]);
    setIsValueEmpty([]);
    setOptionName("size");
    //push
    props.setformValues((prevState: any) => [...prevState, optionsData]);
  }, [optionsData]);
  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onCloseDrawer}
      finalFocusRef={props.btnRef}
      size="lg"
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />
      <DrawerContent pt="80px">
        <DrawerCloseButton mt="80px" />
        <DrawerHeader>Add Option</DrawerHeader>

        <DrawerBody>
          <Box>
            <Formik
              onSubmit={(e) => {
                let empty = () => {
                  return isValueEmpty.some((m: any) =>
                    m == true ? true : false
                  );
                };
                let exist = () => {
                  return isValueExist.some((m: any) =>
                    m == true ? true : false
                  );
                };
                // console.log(value());
                !empty() && !exist() && submitForm();
              }}
              initialValues={{ name: "", value: "" }}
            >
              {(props: any) => (
                <Form id="options_form" name="options_form">
                  <Field name="name">
                    {({ field, form }: { form: any; field: any }) => (
                      <Flex
                        flexDir={{ base: "column", lg: "row" }}
                        alignItems="center"
                      >
                        <Box w="100%">
                          <Box>
                            <FormControl py={{ base: "10px", md: "20px" }}>
                              <FormLabel
                                htmlFor="option_name"
                                style={styles.title}
                              >
                                Option Name
                              </FormLabel>
                              <Select
                                placeholder=""
                                h="40px"
                                onChange={(e) => {
                                  ivalues.length == 0 ? addValues() : "";
                                  setOptionName(e.target.value);
                                }}
                              >
                                <option
                                  style={{ padding: "15px" }}
                                  value="size"
                                >
                                  Size
                                </option>
                                <option
                                  style={{ padding: "15px" }}
                                  value="color"
                                >
                                  Color
                                </option>
                                <option
                                  style={{ padding: "15px" }}
                                  value="material"
                                >
                                  Material
                                </option>
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                      </Flex>
                    )}
                  </Field>
                  {ivalues.length > 0 && (
                    <Box>
                      <Divider orientation="horizontal" my="15px" />
                      <Text style={styles.title}>Option Values</Text>
                    </Box>
                  )}

                  <>
                    {ivalues.map((e: any, index: any) => (
                      <>
                        <FormControl
                        key={index}
                          pb={{ base: "10px", md: "20px" }}
                          mt="9px"
                          isInvalid={isValueEmpty[index] || isValueExist[index]}
                        >
                          <Flex alignItems="center">
                            <Input
                              placeholder="value"
                              id="value"
                              h="40px"
                              name={`value${index + 1}`}
                              value={e}
                              onChange={(e) => {
                                handleChange(e, index);
                              }}
                            />{" "}
                            <Icon
                              ml="5px"
                              as={MdOutlineDeleteSweep}
                              boxSize="20px"
                              onClick={() => {
                                removeValues(index);
                              }}
                            />
                          </Flex>
                          {!isValueEmpty[index] ? (
                            isValueExist[index] ? (
                              <>
                                <FormErrorMessage>
                                  Option value has already been used!
                                </FormErrorMessage>
                              </>
                            ) : (
                              <> </>
                            )
                          ) : (
                            <FormErrorMessage>
                              Value is required.
                            </FormErrorMessage>
                          )}
                        </FormControl>
                      </>
                    ))}
                  </>

                  <Flex
                    pb={{ base: "10px", md: "20px" }}
                    mt="10px"
                    cursor="pointer"
                    _hover={{ color: "blue.600" }}
                    onClick={() => {
                      addValues();
                    }}
                  >
                    <Icon as={HiViewGridAdd} mr="10px" boxSize="20px" />{" "}
                    <Text>Add Value</Text>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Flex w="100%">
            <Button
              style={styles.btn}
              variant="outline"
              colorScheme="white"
              mr={3}
              onClick={props.onCloseDrawer}
            >
              Cancel
            </Button>
            <Button
              style={styles.btn}
              background='black.100'
              _active={{background:'var(--black200)'}}
              _focus={{background:'var(--black200)'}}
              _hover={{background:'black'}}
              color='white'
              form="options_form"
              onClick={() => {
                let empty = () => {
                  return isValueEmpty.some((m: any) =>
                    m == true ? true : false
                  );
                };
                let exist = () => {
                  return isValueExist.some((m: any) =>
                    m == true ? true : false
                  );
                };
                !empty() && !exist() && submitForm();
              }}
            >
              Save
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const styles = {
  cardCont: {
    borderRadius: "10px",
    boxShadow: boxShadow2,
    backgroundColor: "#fff",
  },
  option: {
    padding: "10px",
    marginBottom: "5px",
    outline: "1px solid red",
  },
  title: {
    fontSize: "15px",
    fontWeight: "600",
  },
  btn: {
    width: "110px",
    borderRadius: "5px",
  },
};
export default OptionsForm;
