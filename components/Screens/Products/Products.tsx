import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { BiFilter } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { Table } from "antd";
import { useQuery } from "react-query";
import Link from "next/link";
import Router from "next/router";
import { useGetRequest } from "../../../hooks/allQueries";
import { formatter } from "../../../helpers/HelperFunctions";

//const { Column, ColumnGroup } = Table;
const boxShadow = "rgba(0, 0, 0, 0.1) 0px 1px 2px 0.4px";
function Products(props: any) {
  const [products, setProducts] = React.useState([]);
  const [status, setStatus] = React.useState("");
  //table
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
        <Image
          alt={`${i}image`}
          src={data[0]?.src||""}
          width="50px"
          height="52px"
          style={{ borderRadius: "2px" }}
        />
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
  const hasSelected = selectedRowKeys.length > 0;
  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  return (
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
                    _focus={styles.form._focus}
                  />
                </form>
              </FormControl>
              <Box h="30px" pos="relative" ml="5px">
                <Icon
                  as={BiFilter}
                  pos="absolute"
                  zIndex={10}
                  top="7px"
                  left="12px"
                  fontSize="16px"
                />
                <Select
                  mr="40px"
                  h="30px"
                  placeholder="All"
                  style={styles.filterBox}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </Select>
              </Box>
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
          <Table
            id="productsTable"
            dataSource={tableData}
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
};
export default Products;
