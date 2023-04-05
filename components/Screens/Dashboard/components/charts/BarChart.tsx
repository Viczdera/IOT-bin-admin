import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Flex,
  Image,
  Select,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Sector,
  ComposedChart,
  Area,
  Line,
} from "recharts";

import { DataValueContext } from "../../../../../context/authContext";

function BarChart(props: { loading: boolean; sensorData: any }) {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [isLargerThan960] = useMediaQuery("(min-width: 960px)");
  const [width, setWidth] = React.useState(300);
  const { state, dispatch } = useContext(DataValueContext);
  const [topSelling, setTopSelling] = useState<any>([]);
  const [chartData, setChartData] = useState<any>([]);
  // const [loading, setLoading] = useState(false);
  const chartData1 = [
    {
      label: "Jan",
      value: 10,
    },
    {
      label: "Feb",
      value: 4,
    },
  ];
  useEffect(() => {
   let dataArr= Object.values(props.sensorData).map((m:any, i) => {
      m.label=`Bin ${i+1}`
      m.value=m?.level
      return m
    });
  setChartData(dataArr)
  }, [props.sensorData]);
  //console.log(chartData)
  useEffect(() => {
    if (!isLargerThan600 && !isLargerThan960) {
      setWidth(300);
    } else if (isLargerThan960) {
      setWidth(800);
    } else {
      setWidth(500);
    }
    ////console.log(width);
  }, [isLargerThan600, isLargerThan960]);

  const CustomTooltip = (props: { active: any; payload: any; label: any }) => {
    if (props.active && props.payload && props.payload.length) {
      //  //console.log(props.payload[0]?.payload);
      let data = props.payload[0]?.payload;
      //console.log(data)
      return (
        <Box p="10px" borderRadius="4px" background="#fff" minW="80px">
         
          
            <Text fontSize="11px" color="black.300">
                Level
            </Text>
            <Text fontWeight="bold">
            {data?.level}cm
          </Text>
        </Box>
      );
    }

    return null;
  };
  return (
    <Box w="100%">
      <Flex justifyContent="space-between" mb="10px">
        <Text style={styles.title}>Waste bin levels</Text>{" "}
        <Flex>
          {/* <Box style={styles.selectCont}>
          <Select style={styles.select} isDisabled>
            <option value="option1">All Time</option>
            <option value="option2">Week</option>
            <option value="option3">Month</option>
          </Select>
        </Box> */}
        </Flex>
      </Flex>
      <Flex pb="20px" display="flex" w="100%">
        <Flex
          py="20px"
          //width="max-content"
          // outline="1px solid red "
          overflowX="auto"
          className="customScrollBarHorizontal"
          h="278px"
          w="100%"
          margin="auto"
          //  outline="1px solid blue"
        >
          {props.loading ? (
            <Flex py="40px" w="100%" justifyContent="center">
              <img src="/loaders/audio.svg" />
              <Box w="10px"></Box>
              <img src="/loaders/audio.svg" />{" "}
            </Flex>
          ) : (
            <>
              {chartData?.length == 0 ? (
                <Box w="100%">
                  <Flex py="40px" w="100%" justifyContent="center">
                    <img width="100px" src="/loaders/audiocustom.svg" />
                    <Box w="10px"></Box>
                    <img width="100px" src="/loaders/audiocustom.svg" />{" "}
                  </Flex>
                  <Text fontSize="18px" textAlign="center" fontWeight="bold">
                    No Data.
                  </Text>
                </Box>
              ) : (
                <>
                  {" "}
                  <ResponsiveContainer
                  //  width={width} height="100%" minWidth={300}
                  >
                    <ReBarChart
                      height={300}
                      style={{
                        width: "100%",
                        paddingLeft: "0px",
                        //backgroundColor:"var(--grey200)",opacity:1,
                        borderRadius: "10px",
                      }}
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 5,
                        left: -10,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid
                        strokeDasharray="2 2"
                        strokeOpacity={0.3}
                      />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip
                        // coordinate={{ x: 0, y: 140 }}
                        content={
                          <CustomTooltip
                            active={undefined}
                            payload={undefined}
                            label={undefined}
                          />
                        }
                      />
                      <Legend
                        formatter={(value, entry) => {
                          return "Waste levels";
                        }}
                      />

                      <Bar
                        barSize={80}
                        background
                        radius={[6, 6, 0, 0]}
                        dataKey="value"
                        fill="var(--blue200)"
                      />
                    </ReBarChart>
                  </ResponsiveContainer>
                </>
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
const styles = {
  selectCont: {
    width: "100px",
    height: "30px",
  },
  select: {
    height: "30px",
    fontSize: "12px",
  },
  title: {
    fontSize: "15px",
    fontWeight: "600",
  },
  countCont: {
    backgroundColor: "#000",
    color: "#fff",
    fontSize: "11px",
    borderRadius: "3px",
    padding: "0.5px 4px",
  },
};
export default BarChart;
