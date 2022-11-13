import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import BarChart from "./charts/BarChart";
import dynamic from "next/dynamic";
import DoughnutChart from "./charts/Doughnut";
import Ratings from "./charts/Ratings";

// const DoughnutChartDynamic= dynamic(
//   import ("./charts/Doughnut"),{
//     ssr:false
//   }
// )

const boxShadow = "rgba(0, 0, 0, 0.04) 0px 3px 5px";
const boxShadow2 = "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px";
const Card = (props: { children: any; mt?: string;baseMl?:string ;mdMl?:string }) => {
  return (
    <Flex
      style={styles.card}
      w={{ base: "100%", md: "48%" }}
     // maxW={{ base: "100%", md: "50%" }}
      flexGrow={1}
      flexShrink={1}
      mt={props.mt}
      ml={{ base:`${props.baseMl}`,md:`${props.mdMl}` }||""}
      
    >
      {props.children}
    </Flex>
  );
};
function ChartCards(props: any) {
  return (
    <Box w="100%">
      <Flex key={0} w="100%" flexGrow={1}  flexDir={{ base: "column", md: "row" }}>
        <Card mt="20px" >
          {/* <DoughnutChartDynamic /> */}
          <DoughnutChart />
        </Card>
        <Card mt="20px" baseMl="0px" mdMl="20px">
          <Ratings />
        </Card>
      </Flex>
      <Flex key={1} mt="20px" flexWrap={{ base: "wrap", lg: "nowrap" }} flexGrow={1}>
        <Card>
          <BarChart />
        </Card>
      </Flex>
    </Box>
  );
}

const styles = {
  card: {
    background: " #FFFFFF",
    // boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
    boxShadow: boxShadow2,
    borderRadius: "10px",
    padding: "20px",
    // minWidth: "280px",
  },
};
export default ChartCards;
