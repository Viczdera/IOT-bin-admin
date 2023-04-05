import { Box, Flex } from "@chakra-ui/react";

import React, { useState, useContext, useEffect } from "react";

import { DataValueContext } from "../../../context/authContext";
import DataCards from "./components/DataCards";
import TopProducts from "./components/TopProducts";
import { useGetRequest } from "../../../hooks/allQueries";
import BarChart from "./components/charts/BarChart";

const boxShadow = "rgba(0, 0, 0, 0.04) 0px 3px 5px";
const boxShadow2 = "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px";
function Dashboard() {
  // destructuring state
  const { state, dispatch } = useContext(DataValueContext);
  const [sensorData, setSensorData] = useState<any>({});
  //post request
  const { isLoading, data } = useGetRequest("/api/bin", "sensor-data");
  useEffect(() => {
    let status = data?.status;
    let d = data?.data;
    if (d?.success) {
      setSensorData(d?.data);
    }
  }, [isLoading]);

  const Card = (props: {
    children: any;
    mt?: string;
    baseMl?: string;
    mdMl?: string;
  }) => {
    return (
      <Flex
        style={styles.card}
        w={{ base: "100%", md: "48%" }}
        // maxW={{ base: "100%", md: "50%" }}
        flexGrow={1}
        flexShrink={1}
        mt={props.mt}
        ml={{ base: `${props.baseMl}`, md: `${props.mdMl}` } || ""}
      >
        {props.children}
      </Flex>
    );
  };
  return (
    <Box w="100%">
      <Box style={styles.boxCont}>
        <DataCards loading={isLoading} sensorData={sensorData}   />
      </Box>
      <Flex flexGrow={1}>
        <Flex w="100%">
          <Flex
            key={1}
            mt="20px"
            flexWrap={{ base: "wrap", lg: "nowrap" }}
            flexGrow={1}
          >
            <Card>
              <BarChart loading={isLoading} sensorData={sensorData} />
            </Card>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
const styles = {
  boxCont: {
    padding: "10px",
    //boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
    boxShadow:
      "rgba(83, 87, 94, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    borderRadius: "20px",
    background: "#fff",
  },
  card: {
    background: " #FFFFFF",
    // boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
    boxShadow: boxShadow2,
    borderRadius: "10px",
    padding: "20px",
    // minWidth: "280px",
  },
};
export default Dashboard;
