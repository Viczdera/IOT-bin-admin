/* eslint-disable react/no-children-prop */
import React from "react";
import {
  Box,
  Input,
  Select as SelectChakra,
  Divider,
  Flex,
  Text,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";


const OptionsVariants = (props: {
  disabled?:boolean
  setFieldValue: any;
  variants: any[];
  options: boolean;
  currency: string;
  rate: number;
  images: [];
  showVariant: boolean;
}) => {
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
 

  
  return (
    <>
      <Box>
        <Divider orientation="horizontal" my="20px" />
        <Flex px={{ base: "10px", md: "20px" }}>
        
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
                           disabled={props.disabled||false}
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
                          disabled={props.disabled||false}
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
    background: "var(--blue200)",
    color: "white",
    padding: "1px 8px",
  },
  editBtn: {
    backgroundColor: "var(--grey200)",
    color: "var(--blue200)",
    fontSize: "14px",
    border: "1px solid var(--blue200)",
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
