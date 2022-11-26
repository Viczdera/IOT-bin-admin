import {
  Box,
  Container,
  Flex,
  Icon,
  Text,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import { MdSell } from "react-icons/md";
import { DashboardOverview } from "../../../../data/MockData";
import { formatter } from "../../../../helpers/HelperFunctions";

const CardCont = (props: {
  loading: boolean;
  key: number;
  value: string;
  title: string;
  icon: any;
  mt?: any;
}) => {
  return (
    <Flex
      key={props.key}
      style={styles.card}
      minW={{ base: "45%", sm: "200px" }}
      mt={props.mt}
    >
      <Flex w="100%">
        {props.loading  ? (
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
          {props.loading  ? (
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
              <Text fontFamily='Open Sans, sans-serif' className="number" fontWeight="bold">
                {props.value}
              </Text>
              <Text  fontSize="14px">{props.title}</Text>
            </>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
function DataCards(props: any) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const overviewData = [
    {
      title: "Product Sold",
      icon: MdSell,
      value: `${DashboardOverview.soldItems}`,
    },
    {
      title: "Earnings",
      icon: BsCashCoin,
      value: `N ${formatter.format(DashboardOverview.revenue)}`,
    },
    {
      title: "New Orders",
      icon: BsCartCheckFill,
      value: `${DashboardOverview.newOrders}`,
    },
  ];
  return (
    <Flex
      p={0}
      justifyContent="space-between"
      flexWrap={{ base: "wrap", lg: "nowrap" }}
    >
      {overviewData.map((m, i) => (
        <>
          <CardCont
            loading={loading}
            key={i}
            title={m.title}
            value={m.value}
            icon={m.icon}
          />
        </>
      ))}
    </Flex>
  );
}

const styles = {
  card: {
    border:' 1px solid #E5EBF0',
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
