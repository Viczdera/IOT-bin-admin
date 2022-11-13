import React from "react";
import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GoX } from "react-icons/go";
const Stepper = (props: {
  step: number;
  steps: string[];
  close?: any;
  setStep: any;
}) => {
  const stepBoxWidth = 100 / props.steps.length + "%";
  const progress = (step: number, index: number, item: any) => {
    const moveStep = () => {
      window.scrollTo(0, 10);
      if(step>=index+1){

        props.setStep(index+1);
      }else{
        return null
      }
    };
    return (
      <Box w="100%"  cursor={step>=index+1?'pointer':''} onClick={moveStep}>
        <Text
          color={step >= index + 1 ? "black.100" : "grey.500"}
          // fontWeight= {step == index + 1 ? "bold" : "normal"}
        >
          {item}
        </Text>
        <Box
          background={step >= index + 1 ? "black.100" : "grey.500"}
          w="100%"
          h="5px"
        ></Box>
      </Box>
    );
  };
  return (
    <Flex
      justifyContent="space-between"
      borderTopRadius="5px"
      maxW="600px"
      margin="0 auto"
    >
      <>
        {props.steps.map((index: any, item: any) => {
          return (
            <Flex
              w="100%"
              key={index}
              mx="4px"
              _first={{ marginLeft: "0px" }}
              _last={{ marginRight: "0px" }}
              fontSize="13px"
              // fontStyle="italic"
            >
              {progress(props.step, item, index)}
            </Flex>
          );
        })}
      </>
    </Flex>
  );
};

export default Stepper;
