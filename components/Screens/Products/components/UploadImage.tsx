/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Image,
  Stack,
  Flex,
  Button,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ImPriceTags } from "react-icons/im";
import { Field, Form, Formik } from "formik";
import { FileUploader } from "react-drag-drop-files";
import { Checkbox, Col, Divider, Row } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { FaUpload } from "react-icons/fa";
import { useMutation } from "react-query";
import MaskedLoader from "./MaskedLoader";
import { headers2 } from "../../../../hooks/allQueries";
const boxShadow = "rgba(0, 0, 0, 0.1) 0px 1px 2px 0.4px";
const boxShadow1 = " rgba(0, 0, 0, 0.18) 0px 2px 4px";
const boxShadow2 = " rgba(0, 0, 0, 0.04) 0px 3px 5px";
const UploadImage = (props: { setFieldValue: any; uploadSuccess: any }) => {
  const [filed, setFile] = useState<any>([]);
  const [imageSrc, setImageSrc] = useState<any>(null || "");
  const route = "/api/";
  const toast = useToast();

  //upload
  const uploadImg = async (data: any) => {
    // //console.log(data)

    const config = {
      method: "POST",
      body: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };
    //console.log(config);
    const res = await fetch(route + `products/images`, config);
    return await res.json();
  };
  const UploadImage = useMutation(
    (data: any) => {
      return uploadImg(data);
    },
    {
      onSuccess: (response) => {
        //console.log(response);
        let d = response.data;
        let s = response.success;
        if (s && !d.errors) {
          //console.log(d);
          let imgSrc = {
            src: d,
          };
          setFile((prevState: any) => [...prevState, imgSrc]);

          toast({
            position: "top-right",
            title: "Success",
            description: `Image added`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            position: "top-right",
            title: "Error.",
            description: 'Error uploading',
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          // queryClient.invalidateQueries("products");
        }
      },
      onError: (error: any) => {
        toast({
          position: "bottom-right",
          title: "Error",
          description: "Upload server error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const handleChange = (file:any) => {
    if (file) {
      Object.values(file).map((f:any) => {
        const formData=new FormData()
        formData.append('file',f)
        UploadImage.mutate(formData);
      });
    }
  };

  const imageFileTypes = ["JPG", "PNG", "GIF", "JPEG"];

  //checked
  const CheckboxGroup = Checkbox.Group;

  //checked states
  const [checkedList, setCheckedList] = useState<[]>([]);
  const [checkedItems, setCheckedItems] = useState<
    { id: string; src: string }[]
  >([]);
  const [ticked, setTicked] = useState<{ id: string; value: boolean }[]>([]);

  const onChangeCheck = (id: string, src: string) => {
    let item = {
      id,
      src,
    };
    let isCheckedItem = {
      id,
      value: true,
    };
    //  ticked.some((e) => {
    //   if (e.id === key) {
    //     return true;
    //   }
    //   return false;
    // });
    let exist = checkedItems.some((e) => {
      if (e.id === id) {
        return true;
      }
      return false;
    });
    if (!exist) {
      setCheckedItems((prevstate: any) => [...prevstate, item]);
      setTicked((prevState: any) => [...prevState, isCheckedItem]);
    } else {
      let index = checkedItems.findIndex(function (i) {
        return i.id === id;
      });
      let indexChecked = ticked.findIndex(function (i) {
        return i.id === id;
      });
      checkedItems.splice(index, 1);
      //filter ticked array, filter and return those that does not include the indexofChecked item
      const newTickedState = () => {
        return ticked.filter(
          (i: any, key: any) => !indexChecked.toString().includes(key)
        );
      };
      setTicked(newTickedState());
      //console.log(newTickedState());
      // isChecked(id)
      // //console.log(isChecked(id)||false)
      //console.log(`removed ${id}`);
    }
  };
  //console.log(checkedItems);
  //console.log(ticked);
  const deleteSelected = () => {
    // filed.splice(1, 1);
    let checkItemsIndex = checkedItems.map((m) => {
      let index = filed.findIndex(function (i: any, key: any) {
        return key === m.id;
      });
      //console.log(index);
      return index;
    });
    //console.log(checkItemsIndex);
    function removeFromArray(original: any, remove: any) {
      return original.filter((value: any, key: any) => !remove.includes(key));
    }
    //console.log(removeFromArray(filed, checkItemsIndex));
    setFile(removeFromArray(filed, checkItemsIndex));
    setCheckedItems([]);
    setTicked([]);
    // checkItemsIndex.forEach((i) => {
    //   filed.splice(i, 1);
    // });
    // checkedItems.splice(index, 1);
  };

  const isChecked = (key: any) => {
    return ticked.some((e) => {
      if (e.id === key) {
        return true;
      }
      return false;
    });
  };
  // const onCheckAllChange = (e: CheckboxChangeEvent) => {
  //   setCheckedList(e.target.checked ? filed : []);
  //   setIndeterminate(false);
  //   setCheckAll(e.target.checked);
  // };
  //console.log(checkedList);
  useEffect(() => {
    props.setFieldValue("images", filed);
  }, [filed]);

  //clear on success
  useEffect(() => {
    if (props.uploadSuccess) {
      setFile([]);
    }
  }, [props.uploadSuccess]);
  return (
    <Box padding={{ base: "10px", md: "20px" }}>
      <FormLabel htmlFor="title" style={styles.title}>
        Product Images
      </FormLabel>
      <Button
        disabled={checkedItems.length > 0 ? false : true}
        onClick={deleteSelected}
      >
        Delete
      </Button>
      <Box
      //style={styles.gridCont}
      // className="imgGridCont"
      >
        <Row justify="start" align="top" gutter={[12, 12]}>
          {filed.map((m: any, key: any) => (
            <>
              {/* <Image
            key={key}
              src={m}
              alt="imgs"
              width="100px"
              height="100px"
            /> */}

              <Col span={key == 0 ? 12 : 6} key={key}>
                <Box
                  outline="1px solid #d6d3d3b3"
                  borderRadius="8px"
                  boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
                  h={{ base: 120, sm: 120, md: 200, lg: 300 }}
                >
                  <Flex h="100%" alignItems="center" justifyContent="center">
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
                  <Box pos="absolute" top={1} right={3}>
                    <Checkbox
                      checked={isChecked(key)}
                      onChange={() => {
                        onChangeCheck(key, m);

                        // //console.log(key, m);
                      }}
                    />
                  </Box>
                </Box>
              </Col>
            </>
          ))}
          <Col span={filed.length == 0 ? 24 : 6}>
            <FileUploader
              handleChange={(file: any) => {
                handleChange(file);
                //console.log(file);
              }}
              // classes="fileUploader"
              multiple
              name="file"
              maxSize={2000}
              types={imageFileTypes}
              children={
                <Flex
                  flexDir="column"
                  alignItems="center"
                  flexShrink={1}
                  border="2px dashed #5F698C"
                  borderRadius="6px"
                  textAlign="center"
                  minH={{ base: "100px", lg: "140px" }}
                  flexWrap="nowrap"
                  cursor="pointer"
                  //  h={{base:120,sm:120,md:200,lg:300}}
                >
                  {UploadImage.isLoading ? (
                    <MaskedLoader />
                  ) : (
                    <Box p="20px">
                      <Icon as={FaUpload} fontSize="30px" />

                      <Text display={{ base: "none", xl: "block" }}>
                        Drag and Drop here <br /> or
                      </Text>
                      <Text display={{ base: "none", lg: "block" }}>
                        Browse Files
                      </Text>
                    </Box>
                  )}
                </Flex>
              }
            />
          </Col>
        </Row>
      </Box>
    </Box>
  );
};

const styles = {
  gridCont: {
    gridGap: "8px",
    display: "grid",
    gridTemplateColumns: " repeat(4,1fr)",
  },
  title: {
    fontSize: "15px",
    fontWeight: "600",
  },
};
export default UploadImage;
