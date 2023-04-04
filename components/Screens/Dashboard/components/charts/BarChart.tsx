import React from "react";
import { Box, Flex, Select, Text, useMediaQuery } from "@chakra-ui/react";
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

const chartData = [
  {
    label: "Jan",
    value: 10,
  },
  {
    label: "Feb",
    value: 4,
  },
  {
    label: "Mar",
    value: 14,
  },
  {
    label: "Apr",
    value: 18,
  },
  {
    label: "Jun",
    value: 10,
  },
  {
    label: "July",
    value: 4,
  },
  {
    label: "Aug",
    value: 14,
  },
  {
    label: "Sep",
    value: 18,
  },
  {
    label: "Oct",
    value: 4,
  },
  {
    label: "Nov",
    value: 14,
  },
  {
    label: "Dec",
    value: 18,
  },
];

function BarChart(props: any) {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [isLargerThan960] = useMediaQuery("(min-width: 960px)");
  const [width, setWidth] = React.useState(300);
  React.useEffect(() => {
    if (!isLargerThan600 && !isLargerThan960) {
      setWidth(300);
    } else if (isLargerThan960) {
      setWidth(800);
    } else {
      setWidth(500);
    }
    //console.log(width);
  }, [isLargerThan600, isLargerThan960]);

  return (
    <Box w="100%">
      <Flex justifyContent="space-between" mb="10px">
        <Text style={styles.title}>Products Sold</Text>{" "}
        <Box style={styles.selectCont}>
          <Select style={styles.select} isDisabled>
            <option value="option1">All Time</option>
            <option value="option2">Week</option>
            <option value="option3">Month</option>
          </Select>
        </Box>
      </Flex>
      <Flex pb="20px" display="flex" w="100%">
        <Flex
          py="20px"
          width="max-content"
          // outline="1px solid red "
          overflowX="auto"
          className="customScrollBarHorizontal"
          h="278px"
          margin="auto"
          //outline="1px solid blue"
        >
          <ResponsiveContainer width={width} height="100%" minWidth={300}>
            <ComposedChart
              //width="100%"
              height={300}
              style={{ width: "100%", paddingLeft: "0px" }}
              data={chartData}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="amt"
                fill="#8884d8"
                stroke="#8884d8"
              />
              <Bar dataKey="value" fill="#56A55C" />
              <Line type="monotone" dataKey="value" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
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
};
export default BarChart;
