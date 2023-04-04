import { Box, Flex, Text, Select } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
const Ratings = (props: any) => {
  const [load, setLoad] = React.useState(false);
  const ratingData = {
    oneStar: 3,
    twoStar: 5,
    threeStar: 30,
    fourStar: 400,
    fiveStar: 89,
  };

  const ratingBars = [
    ratingData.fiveStar,
    ratingData.fourStar,
    ratingData.threeStar,
    ratingData.twoStar,
    ratingData.oneStar,
  ];
  const ratioFunc = () => {
    let ratio: number = 1;
    function CheckLoop() {
      return Object.values(ratingData).some((m, i) => {
        while (m / ratio > 270) {
          ratio = ratio + 1;
          CheckLoop();
        }
      });
    }
    CheckLoop();

    return ratio;
  };
  const ratio = ratioFunc();
  //console.log(ratio);
  useEffect(() => {
    setLoad(true);
  }, [1]);
  const SingleBar = (props: any) => {
    return (
      <Box
        height="18px"
        margin="0px 1px"
        w="270px"
        minW="270px"
        maxW="270px"
        borderRadius="6px"
        mx='10px'
        mb="8px"
        overflowX="hidden"
        // backgroundColor={props.color}
        backgroundColor="grey.300"
      >
        {" "}
        <motion.div
          style={{
            width: "0px",
            height: "18px",
            borderTopRightRadius: "6px",
            borderBottomRightRadius: "6px",
            // backgroundColor:{props.color}
            backgroundColor: "var(--blue200)",
          }}
          animate={{
            width: load && props.width,
          }}
          transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
        ></motion.div>
      </Box>
    );
  };

  return (
    <Box w="100%">
      <Flex justifyContent="space-between" mb="10px">
        <Text style={styles.title}>Ratings</Text>{" "}
        <Box style={styles.selectCont}>
          <Select style={styles.select} isDisabled>
            <option value="option1">All Time</option>
            <option value="option2">Week</option>
            <option value="option3">Month</option>
          </Select>
        </Box>
      </Flex>
      <Flex >
        <Box w="100%">
          {ratingBars.map((m, i) => (
            <>
              <Flex justifyContent="center" >
                <Flex alignItems="center" w={{base:'300px','xl':'100%'}}>
                  <Text className="number">{i + 1}</Text>
                  <SingleBar width={`${(m / ratio / 300) * 100}%`} />
                  <Text className="number">{m}</Text>
                </Flex>
              </Flex>
            </>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

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
export default Ratings;
