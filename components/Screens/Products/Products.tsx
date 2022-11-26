import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  Image,
  Input,
  Select,
  Spinner,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { BiFilter } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { Table } from "antd";
import { useQuery } from "react-query";
import Link from "next/link";
import Router from "next/router";
import { useGetRequest, usePostRequest } from "../../../hooks/allQueries";
import { formatter } from "../../../helpers/HelperFunctions";
import { RiDeleteBackLine } from "react-icons/ri";
//const { Column, ColumnGroup } = Table;
const boxShadow = "rgba(0, 0, 0, 0.1) 0px 1px 2px 0.4px";
function Products(props: any) {
  const [products, setProducts] = React.useState([]);
  const [status, setStatus] = React.useState("");
  //modal
  const { onClose, isOpen, onOpen } = useDisclosure();
  //table
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  //search
  const [searchValue, setSearchValue] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState<any>([]);

  //fetch products
  const { isLoading, data, isSuccess, isFetching } = useGetRequest(
    "/api/products",
    "allProducts",
    ""
  );
  useEffect(() => {
    if (data?.status == 200) {
      let d = data?.data?.data;
      setProducts(d);
    }
  }, [data]);
  console.log(products);
  //Add keys to product
  const tableData = products?.map((m: any, i) => {
    m.key = m._id;
    return m;
  });

  const CapitalizeFirst = (text: string) => {
    const mod = text.charAt(0).toUpperCase() + text.slice(1);
    return mod;
  };

  //table columns
  //TODO:use columns type later
  const columns = [
    {
      title: "",
      dataIndex: "images",
      key: 0,
      render: (data: any, i: any) => (
        <Box style={styles.imgCont}>

          <Image
            alt={`${i}image`}
            src={data[0]?.src || ""}
            maxW='100%'
            width="auto"
            height="auto"
          />
        </Box>
      ),
    },
    {
      title: () => <Text fontWeight={700}>Name</Text>,
      dataIndex: "title",
      key: 1,
      render: (data: any) => <Text>{data}</Text>,
    },
    {
      title: () => <Text fontWeight={700}>Price</Text>,
      dataIndex: "price",
      key: 1,
      render: (data: any) => <Text>{formatter.format(data?.ngn)}</Text>,
    },
    {
      title: () => <Text fontWeight={700}>Status</Text>,
      dataIndex: "status",
      key: 2,
      render: (data: any) => {
        const bkg = () => {
          if (data == "active") {
            return styles.active;
          } else if (data == "archived") {
            return styles.archived;
          } else {
            return styles.draft;
          }
        };
        return (
          <Box
            // margin="0 auto"
            style={bkg()}
            py="3px"
            px="8px"
            w="fit-content"
            borderRadius="4px"
          >
            <Text
              textAlign="center"
              fontWeight="600"
              w="fit-content"
              fontSize="12px"
            >
              {CapitalizeFirst(data)}
            </Text>
          </Box>
        );
      },
    },
    {
      title: "",
      dataIndex: "key",
      key: 3,
      render: (data: any) => (
        <Box cursor="pointer" margin="0 auto" w="fit-content">
          <Link href={"/products/" + data} key={data}>
            <Flex alignItems="center">
              <Icon as={BsEyeFill} mr="5px" />
              <Text>View Product</Text>
            </Flex>
          </Link>
        </Box>
      ),
    },
  ];
  const onSelectChange = (newSelectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  let hasSelected = selectedRowKeys.length > 0;
  //post request
  const {
    createPost,
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel,
    data: delData,
  } = usePostRequest(true, "/api/products/delete", "allProducts");
  useEffect(() => {
    if (data?.status == 200 || 201) {
      setSelectedRowKeys([])
      onClose();
    }
  }, [delData]);

  //refs
  const searchField = useRef<HTMLInputElement>(null);

  const searchTable = (text: string) => {
    setSearchValue(true);
    if (text !== "") {
      const filtered = tableData.filter((m: any, i: number) => {
        return Object.values(m)
          .join("")
          .toLowerCase()
          .includes(text.toLowerCase());
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(tableData);
    }
  };
  return (
    <>
      <Box
        borderRadius="5px"
        background="white.100"
        minHeight="80vh"
        py={{ base: "8px", sm: "15px" }}
        boxShadow={boxShadow}
      >
        <Flex
          px={{ base: "8px", sm: "15px" }}
          mb="20px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontWeight={700} fontSize="lg">
            All Products
          </Text>
          <Flex alignItems="center">
            <Button
              style={styles.addBtn}
              border="0.2px solid #7472726c"
              _hover={styles.addBtn._focus}
              onClick={() => {
                Router.push("/products/new");
              }}
            >
              Add Product
            </Button>
          </Flex>
        </Flex>

        <Box overflow="hidden" overflowX="scroll">
          <Box pos="relative" mb="70px">
            <Box
              pos="absolute"
              top={0}
              w="100%"
              zIndex={10}
              background="white"
              borderBottomRadius="5px"
            >
              <Flex
                bgColor="blue.200"
                borderRadius="8px"
                mx={{ base: "8px", sm: "15px" }}
                justifyContent="space-between"
                p="10px"
                alignItems="center"
              >
                <FormControl
                  maxW={{ base: "200px", lg: "300px" }}
                  mr={{ base: "30px", lg: "0px" }}
                >
                  <form>
                    <Input
                      placeholder="Filter Fields"
                      fontSize="13px"
                      height="30px"
                      background="grey.200"
                      ref={searchField}
                      onChange={(e) =>
                        searchTable(searchField?.current?.value || "")
                      }
                      _focus={styles.form._focus}
                    />
                  </form>
                </FormControl>
              </Flex>
              {isFetching && (
                <Flex alignItems="center" p={{ base: "8px", sm: "15px" }}>
                  <Spinner mr="10px" size="sm" />
                  <Text>Loading ...</Text>
                </Flex>
              )}
            </Box>
          </Box>
          <Box px={{ base: "8px", sm: "15px" }}>
            {hasSelected && (
              <Flex
                my="10px"
                p="5px 10px"
                borderRadius="5px"
                color="#fff"
                background="blue.200"
                w="max-content"
                onClick={onOpen}
                cursor='pointer'
              >
                Delete
                <Icon as={RiDeleteBackLine} ml="5px" />
              </Flex>
            )}

            <Table
              id="productsTable"
              dataSource={searchValue ? filteredData : tableData}
              rowSelection={rowSelection}
              size="small"
              columns={columns}
              style={{
                border: "1px solid #2f3d4944",
                borderRadius: "5px",
                overflowX: "auto",
                minHeight: "80vh",
              }}
            ></Table>
          </Box>
        </Box>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        // closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay
          id="chakra_overlay"
          // backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent py="40px" px="30px">
          <ModalBody>
            {selectedRowKeys.length == 1 ? (
              <Text style={styles.txtgrey} textAlign="center" lineHeight="25px">
                Are you sure you want to delete this product?
              </Text>
            ) : (
              <Text style={styles.txtgrey} textAlign="center" lineHeight="25px">
                Are you sure you want to delete these {selectedRowKeys.length}{" "}
                products?
              </Text>
            )}
          </ModalBody>
          <Flex px="30px" my="15px">
            <Button style={styles.orngBtn} mr="15px" onClick={onClose}>
              Cancel
            </Button>
            <Button
              style={styles.blueBtn}
              isLoading={isLoadingDel}
              onClick={() => {
                let data = {
                  items: selectedRowKeys,
                };
                createPost(data);
              }}
            >
              Continue
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

const styles = {
  filterBox: {
    backgroundColor: "#fff",
    border: " 1px solid #E5EBF0",
    fontSize: "13px",
    fontWeight: "bold",
    borderRadius: "4px",
    color: "#2D4047",
    paddingLeft: "34px",
  },
  form: {
    _focus: {
      backgroundColor: "#fff",
    },
  },
  addBtn: {
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
    _focus: {
      border: "0.2px solid #2f3d49d1",
    },
  },
  active: {
    backgroundColor: "#5bb3ee",
    color: "#ffffff",
  },
  archived: {
    backgroundColor: "#818383",
    color: "#ffffff",
  },
  draft: {
    backgroundColor: "#FF7262",
    color: "#ffffff",
  },
  blueBtn: {
    background: "var(--blue200)",
    color: "#fff",
    //border: "1px solid #056643",
    borderRadius: "6px",
    width: "100%",
  },
  orngBtn: {
    background: "#FFF2F2",
    color: "#c74a2e",
    border: "1px solid #c74a2e",
    borderRadius: "6px",
    width: "100%",
  },
  txtgrey: {
    color: "#272626",
    fontWeight: "500",
    fontSize: "20px",
  },
  txtBlack: {
    color: "#000",
    fontWeight: "600",
    fontSize: "20px",
  },
  imgCont: {
    width: "60px",
    height: "60px",
    overflow: "hidden",
    borderRadius: "2px",
  },
};
export default Products;
