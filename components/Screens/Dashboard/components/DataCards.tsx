import {
  Box,
  Container,
  Flex,
  Icon,
  Text,
  SkeletonCircle,
  Skeleton,
  Switch,
  Button,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import { MdSell } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DashboardOverview } from "../../../../data/MockData";
import { formatter } from "../../../../helpers/HelperFunctions";
import { usePostRequest } from "../../../../hooks/allQueries";
import { Popover } from "antd";

const CardCont = (props: {
  loading: boolean;
  num: any;
  value: string;
  title: string;
  icon: any;
  mt?: any;
  servo: string;
}) => {
  //post request
  const { createPost, isLoading, data } = usePostRequest(
    true,
    "/api/bin/update","sensor-data"
  );
  useEffect(() => {
    let status = data?.status;
    let d = data?.data;

    if (status == 200) {
      console.log(d);
    } else {
      //console.log(data);
    }
  }, [isLoading]);
  const updateBinData = ({ key, servo }: any) => {

    return (
      <>
        <Flex>
          <Button
            w="100%"
            background="black.100"
            _active={{ background: "var(--black200)" }}
            _focus={{ background: "var(--black200)" }}
            _hover={{ background: "black" }}
            color="white"
            size="sm"
            isLoading={isLoading}
            onClick={() => {
              let data={
                bin:key,
                servo:servo
              }
              console.log(data)
              createPost(data);
            }}
          >
            Update
          </Button>
        </Flex>
      </>
    );
  };
  return (
    <Flex
      key={props.num}
      style={styles.card}
      minW={{ base: "45%", sm: "200px" }}
      mt={props.mt}
    >
      <Flex alignItems="center" w="100%">
        <Flex w="100%">
          {props.loading ? (
            <Box minW="42px">
              <SkeletonCircle
                size="42px"
                startColor="#dde1e68b"
                endColor=" #F5F8FA"
              />
            </Box>
          ) : (
            <Box style={styles.circle}>
              <Icon as={props.icon} color="#fff" />
            </Box>
          )}

          <Box ml="20px" minW="70%">
            {props.loading ? (
              <>
                <Skeleton
                  startColor="#dde1e68b"
                  endColor=" #F5F8FA"
                  height="16px"
                />
                <Skeleton
                  startColor="#dde1e68b"
                  endColor=" #F5F8FA"
                  height="16px"
                  mt="5px"
                  w="90%"
                />
              </>
            ) : (
              <>
                <Text
                  fontFamily="Open Sans, sans-serif"
                  className="number"
                  fontWeight="bold"
                >
                  {props.value}
                </Text>
                <Text fontSize="14px">{props.title}</Text>
              </>
            )}
          </Box>
        </Flex>
        <Box ml="5px">
          <Popover
          key={props.num}
            content={updateBinData({
              key: props.num,
              servo: props.servo == "on" ? "off" : "on",
            })}
            placement="bottomLeft"
            title={"Update bin"}
            trigger="click"
          >
            <button>
              <Switch
                isChecked={props.servo == "on"}
                disabled={props.loading}
              />
            </button>
          </Popover>
        </Box>
      </Flex>
    </Flex>
  );
};
function DataCards(props: { loading: boolean;fetching:boolean; sensorData: any }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const overviewData = [
    {
      no: 1,
      title: "Bin One",
      icon: RiDeleteBin6Line,
      value: `${props.sensorData?.bin1?.level} cm`,
      servo: props.sensorData?.bin1?.servo,
    },
    {
      no: 2,
      title: "Bin Two",
      icon: RiDeleteBin6Line,
      value: `${props.sensorData?.bin2?.level} cm `,
      servo: props.sensorData?.bin2?.servo,
    },
  ];
  return (
    <Box>
      {props.fetching&& <Spinner  size="sm"/>}

    <Flex
      p={0}
      justifyContent="space-between"
      flexWrap={{ base: "wrap", lg: "nowrap" }}
    >
      {overviewData.map((m, i) => (
        
          <CardCont
          key={i}
            loading={loading}
            num={m.no}
            title={m.title}
            value={m.value}
            icon={m.icon}
            servo={m.servo}
          />
        
      ))}
    </Flex>
    </Box>
  );
}

const styles = {
  card: {
    border: " 1px solid #E5EBF0",
    color: "var(--blue200)",

    borderRadius: "10px",

    padding: "20px",
    margin: "10px",
    height: "88px",
    flex: "1",
  },
  circle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--blue200)",
    width: " 42px",
    height: " 42px",
    borderRadius: "50%",
  },
};
export default DataCards;
