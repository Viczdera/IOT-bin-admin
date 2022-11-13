import { Box, Flex } from "@chakra-ui/react";

import React, { useContext } from "react";

import { DataValueContext } from "../../../context/authContext";
import ChartCards from "./components/ChartCards";
import DataCards from "./components/DataCards";
import TopProducts from "./components/TopProducts";

function Dashboard() {
  // destructuring state
  const { state, dispatch } = useContext(DataValueContext);
  //console.log(state);

  return (
    <Box w="100%">
      <Box style={styles.boxCont}>
        <DataCards />
      </Box>
      <Flex flexWrap={{ base: "wrap", xl: "nowrap" }} flexGrow={1}>
        <Flex w={{ base: "100%", xl: "65%" }}>
          <ChartCards />
        </Flex>
        <Flex w={{ base: "100%", xl: "35%" }}>
          <TopProducts />
        </Flex>
      </Flex>
    </Box>
  );
}
const styles = {
  boxCont: {
    padding: "10px",
    boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
    borderRadius: "20px",
    background: "#fff",
  },
};
export default Dashboard;
