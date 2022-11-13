/* eslint-disable react/no-children-prop */
import React from "react";
import {
  Box,
  Input,
  Select as SelectChakra,
  Divider,
  Flex,
  Text,
  Button,
  useDisclosure,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  IconButton,
  useToast,
  useRadioGroup,
  useRadio,
  Image,
  ModalFooter,
} from "@chakra-ui/react";
import { BsImages } from "react-icons/bs";
import { CiImageOff } from "react-icons/ci";
import { Col, Row } from "antd";

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const SelectCircle = () => {
    return (
      <Box as="label" pos="absolute" left="8px" top="8px">
        <Flex
          {...checkbox}
          boxSize="18px"
          outline="2px solid  #D5D5D5"
          borderRadius="50%"
          alignItems="center"
          justifyContent="center"
          mt="5px"
          mr="10px"
          _checked={{
            outline: "2px solid black",
          }}
        >
          <Box
            {...checkbox}
            boxSize="12px"
            background=" #D5D5D5"
            borderRadius="50%"
            _checked={{
              background: "black.200",
            }}
          ></Box>
        </Flex>
      </Box>
    );
  };
  return (
    <Flex
      as="label"
      outline="1px solid #d6d3d3b3"
      borderRadius="8px"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
      pos="relative"
      py="10px"
      mx="10px"
      mt="30px"
      flexGrow={1}
      cursor="pointer"
    >
      <input {...input} />
      <Flex {...checkbox}>
        <SelectCircle />
        {props.children}
      </Flex>
    </Flex>
  );
}

const OptionsVariants = (props: {
  setFieldValue: any;
  variants: any[];
  options: boolean;
  currency: string;
  rate: number;
  images: [];
  showVariant: boolean;
}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = React.useState("");
  const [selected, setSelected] = React.useState<any>(null);
  const Toast = useToast();
  const changeVariantDetails = (type: any, value: any, i: number) => {
    switch (type) {
      case "price":
        let v_price = props.variants[i];
        if (props.currency == "NGN") {
          let pUsd = value / props.rate;
          v_price.price = { ngn: value, usd: pUsd.toFixed(2) };
          props.variants.splice(i, 1, v_price);
        } else {
          let pNgn = value * props.rate;
          v_price.price = { ngn: pNgn, usd: value };
          props.variants.splice(i, 1, v_price);
        }

        console.log(props.variants);
        break;
      case "sku":
        let v_sku = props.variants[i];
        v_sku.sku = value;
        props.variants.splice(i, 1, v_sku);
        //console.log(props.variants);
        break;
      case "image":
        let v_image = props.variants[i];
        v_image.image = value;
        props.variants.splice(i, 1, v_image);
        console.log(props.variants);
        break;
      default:
        //console.log(props.variants);
        break;
    }
  };
  console.log(props.images)
  const openModal = (i: number) => {
    onOpen();
    setSelected(i);
  };
  const closeModal = () => {
    setSelected(null);
    onClose();
  };
  const handleChange = (value: string) => {
    changeVariantDetails("image", value, selected);
    setSelected(null);

    console.log(value);
  };

  const { getRootProps, getRadioProps, value } = useRadioGroup({
    defaultValue: "",
    onChange: handleChange,
  });
  const group = getRootProps();

  //check for deleted
  
  return (
    <>
      <Box>
        <Divider orientation="horizontal" my="20px" />
        <Flex px={{ base: "10px", md: "20px" }}>
          <Box w={{ base: "20%", sm: "10%" }} minW="80px">
            <Box w="80px" h="40px" outline="1px dashed blue"></Box>
            {props.variants.map((m: any, i: number) => (
              <>
                <Flex
                  w="80px"
                  h="80px"
                  outline="1px dashed blue"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconButton
                    aria-label="img-icon"
                    onClick={() => {
                      props.images.length > 0
                        ? openModal(i)
                        : Toast({
                            title: "Images",
                            position: "top-right",
                            description: "Upload an Image to add !",
                            status: "info",
                            duration: 2000,
                            isClosable: true,
                          });
                    }}
                  >
                    {m?.image == null ? (
                      <BsImages />
                    ) : (
                      <Flex
                        h="100%"
                        w="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image
                          src={m?.image}
                          alt="imgs"
                          width="auto"
                          height="auto"
                          maxH="100%"
                          maxW="100%"
                        />
                      </Flex>
                    )}
                  </IconButton>
                </Flex>
              </>
            ))}
          </Box>
          <Box
            w={{ base: "80%", sm: "90%" }}
            maxW="90%"
            overflowX="scroll"
            // outline="1px solid red"
          >
            <Flex
              w="100%"
              minH="40px"
              // outline="1px solid yellow"
            >
              <Flex
                flexDir="column"
                flexGrow={1}
                w="30%"
                outline="1px solid grey"
                minW="150px"
                px="20px"
              >
                <Text style={styles.title}>Variant</Text>
              </Flex>
              <Flex
                flexDir="column"
                flexGrow={1}
                w="35%"
                outline="1px solid grey"
                minW="150px"
                px="20px"
              >
                <Text style={styles.title}>Price</Text>
              </Flex>
              <Flex
                flexDir="column"
                flexGrow={1}
                w="35%"
                outline="1px solid grey"
                minW="150px"
                px="20px"
              >
                <Text style={styles.title}>Sku</Text>
              </Flex>
            </Flex>
            {/* {console.log(props.variants)} */}
            {props.showVariant &&
              props.variants.map((m: any, i: any) => (
                <>
                  <Box
                    minW="100%"
                    w="max-content"
                    minH="80px"
                    //outline="1px solid grey"
                  >
                    <Flex minH="80px" alignItems="center">
                      <Flex
                        flexDir="column"
                        outline="1px solid grey"
                        borderTop="1px solid grey"
                        minH="80px"
                        justifyContent="center"
                        flexGrow={1}
                        w="30%"
                        h="40px"
                        minW="150px"
                        px="20px"
                      >
                        {m.option3 ? (
                          <Text>
                            {m.option1}/{m.option2}/{m.option3}
                          </Text>
                        ) : m.option2 ? (
                          <Text>
                            {m.option1}/{m.option2}
                          </Text>
                        ) : (
                          <Text>{m.option1}</Text>
                        )}
                      </Flex>
                      <Flex
                        flexDir="column"
                        outline="1px solid grey"
                        borderTop="1px solid grey"
                        minH="80px"
                        justifyContent="center"
                        flexGrow={1}
                        w="35%"
                        h="40px"
                        minW="150px"
                        alignItems="center"
                      >
                        <InputGroup
                          minW="100px"
                          w="80%"
                          //outline="1px solid yellow"
                          p={0}
                          m={0}
                        >
                          <InputLeftAddon
                            children={props.currency == "NGN" ? "₦" : "$ "}
                          />
                          {/* {console.log(price.current?.value)} */}
                          <Input
                            w="100%"
                            defaultValue={
                              props.currency == "USD"
                                ? m.price?.usd
                                : m.price?.ngn
                            }
                            type="number"
                            placeholder="price"
                            onChange={(e) => {
                              changeVariantDetails("price", e.target.value, i);
                            }}
                          />
                        </InputGroup>
                      </Flex>
                      <Flex
                        flexDir="column"
                        outline="1px solid grey"
                        borderTop="1px solid grey"
                        minH="80px"
                        justifyContent="center"
                        flexGrow={1}
                        w="35%"
                        h="40px"
                        minW="150px"
                        px="20px"
                      >
                        <InputGroup
                          minW="100px"
                          w="80%"
                          //  outline="1px solid yellow"
                          p={0}
                          m={0}
                        >
                          <Input
                            w="100%"
                            onChange={(e) => {
                              changeVariantDetails("sku", e.target.value, i);
                            }}
                          />
                        </InputGroup>
                      </Flex>
                    </Flex>
                  </Box>
                </>
              ))}
          </Box>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w="100%">
          <ModalCloseButton />
          <ModalBody p="10px" minH="200px" maxH="70vh" overflowY="auto">
            <Flex {...group} w="100%" flexWrap="wrap">
              {props.images.map((value, key) => {
                const radio = getRadioProps({ value: value });
                return (
                  <RadioCard key={key} {...radio}>
                    <Flex
                      flexGrow={1}
                      // outline="1px solid #d6d3d3b3"
                      w="100%"
                      // boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
                      maxW="100%"
                      maxH="200px"
                      //h={{ base: 120, sm: 120, md: 200, lg: 300 }}
                    >
                      <Flex
                        h="100%"
                        w="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image
                          key={key}
                          src={value}
                          alt="imgs"
                          width="auto"
                          height="auto"
                          maxH="100%"
                          maxW="100%"
                        />
                      </Flex>
                    </Flex>
                  </RadioCard>
                );
              })}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%">
              <Button
                style={styles.btn}
                variant="outline"
                colorScheme="white"
                mr={3}
                onClick={() => {
                  changeVariantDetails("image", null, selected);
                  closeModal();
                }}
              >
                Clear
              </Button>
              <Button
                style={styles.btn}
                background="black.100"
                _active={{ background: "var(--black200)" }}
                _focus={{ background: "var(--black200)" }}
                _hover={{ background: "black" }}
                color="white"
                onClick={closeModal}
              >
                Save
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
const styles = {
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
  btn: {
    width: "110px",
    borderRadius: "5px",
  },
};
export default OptionsVariants;
