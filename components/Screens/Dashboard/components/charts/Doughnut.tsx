import {
  Box,
  Flex,
  Icon,
  Select,
  Text,
  useFocusEffect,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

function DoughnutChart(props: any) {
  const [labels, setLabels] = React.useState<any>([]);
  const [values, setValues] = React.useState<any>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [isLargerThan1000] = useMediaQuery("(min-width: 900px)");
  const chartData = [
    {
      label: "Closed",
      value: 10,
    },
    {
      label: "Dispatched",
      value: 8,
    },
    {
      label: "Returned",
      value: 6,
    },
  ];

  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
    } = props;

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={-1}
          fontWeight="bold"
          fontSize={14}
          textAnchor="middle"
          fill={fill}
        >
          {payload.label}
        </text>
        <text
          x={cx}
          y={cy}
          dy={15}
          fontSize={11}
          textAnchor="middle"
          fill={fill}
        >
          {payload.value}
        </text>

        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 7}
          fill={fill}
        />
      </g>
    );
  };
  const COLORS = [
    "#3975cf",
    "#EC4C47",
    "#FAC478",
    // '#B065F6',
    // '#EC4C47',
    // '#0F0491',
    // '#1665D8',
    // '#FFBE9D',
    // '#2B7DC0',
    // "#0E3EC6",
    //  '#5DB18C',
    // '#17E0BC',
  ];
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_: any, index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  const RADIAN = Math.PI / 180;

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Box w="100%">
      <Flex justifyContent="space-between" mb="10px">
        <Text style={styles.title}>Orders</Text>{" "}
        <Box style={styles.selectCont}>
          <Select style={styles.select} isDisabled>
            <option value="option1">All Time</option>
            <option value="option2">Week</option>
            <option value="option3">Month</option>
          </Select>
        </Box>
      </Flex>
      <Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          w={{ base: "80%", md: "70%" }}
          minH="240px"
        >
          <Flex w="max-content">
            {loaded ? (
              <PieChart
                width={isLargerThan1000 ? 250 : 200}
                height={isLargerThan1000 ? 250 : 200}
              >
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  activeShape={renderActiveShape}
                  innerRadius={65}
                  outerRadius={90}
                  dataKey="value"
                  labelLine={false}
                  activeIndex={activeIndex}
                  onMouseEnter={onPieEnter}
                  fill="#8884d8"
                >
                  {chartData.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} key={index} />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              ""
            )}
          </Flex>
        </Flex>
        <Flex ml="2px" w="40%" flexDir="column" justifyContent="center">
          {chartData.map((m, i) => (
            <>
              <Flex key={i} mb="10px" alignItems="center">
                <Box
                  w="15px"
                  h="15px"
                  borderRadius="5px"
                  backgroundColor={COLORS[i]}
                ></Box>
                <Text ml="5px">{m.label}</Text>
              </Flex>
            </>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
const styles = {
  greyTxt: {
    color: "#131313",
    fontSize: "16px",
    fontWeight: "600",
  },
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
export default DoughnutChart;
