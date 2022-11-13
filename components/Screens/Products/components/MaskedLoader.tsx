import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
function MaskedLoader(props: any) {
  const loaderVariants = {
    animationUno: {
      x: [-10, 10],
      y: [0, -20],
      transition: {
        x: {
          yoyo: Infinity,
          duration: 0.5,
        },
        y: {
          yoyo: Infinity,
          duration: 0.25,
          ease:'easeOut'
        },
      },
    },
  };
  return (
    <Box background="grey.100" width="100%" h={{ base: "100px", lg: "140px" }}>
     <Flex alignItems='center' justifyContent='center' h='100%'>

      <motion.div
        style={styles.loader}
        variants={loaderVariants}
        animate="animationUno"
      ></motion.div>
       <motion.div
        style={styles.loader}
        variants={loaderVariants}
        animate="animationUno"
      ></motion.div>
      <motion.div
        style={styles.loader}
        variants={loaderVariants}
        animate="animationUno"
      ></motion.div>
      
     </Flex>
    </Box>
  );
}
const styles = {
  loader: {
    width: "10px",
    height: "10px",
    margin: "0px 10px",
    borderRadius: "50%",
    background: "#fff",
  },
};
export default MaskedLoader;
