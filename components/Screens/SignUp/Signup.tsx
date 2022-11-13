import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiFillShop } from "react-icons/ai";
import FormHandler from "./FormHandler";
import Stepper from "./Stepper";
function SignUp() {
  const boxShadow =
    " rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px";

  const [step, setStep] = React.useState(1);

  const next = () => {
    window.scrollTo(0, 10);
    setStep(step + 1);
  };
  const back = () => {
    window.scrollTo(0, 10);
    setStep(step - 1);
  };
  const pageSteps: string[] = ["User Info","Security"];
  return (
    <Box w="100%" mt="40px">
      <Box mb="30px">
        <Icon as={AiFillShop} style={styles.icon} />
        <Text fontWeight="bold" fontSize="xl" textAlign="center" my="10px">
          SignUp
        </Text>
      </Box>
      <Stepper steps={pageSteps} setStep={setStep} step={step} />
      <Flex justifyContent="center" my="20px">
        <Box
          w="100%"
          px={{ base: "20px", sm: "80px" }}
          py={{ base: "30px", sm: "50px" }}
         
          style={styles.boxCont}
        >
          <FormHandler step={step} pageSteps={pageSteps} next={next} back={back} />
        </Box>
      </Flex>
    </Box>
  );
}
const styles = {
  boxCont: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow:
      " rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
minHeight:'350px',
    maxWidth: "600px",
  },
  icon: {
    fontSize: "50px",
    display: "block",
    margin: "0 auto",
    marginBottom: "10px",
  },
  label: {
    fontSize: "14px",
    textTranform: "uppercase",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  input: {
    border: "1px solid #BDBDBD",
    focus: {
      backgroundColor: "#0e0d0d",
      color: "#f8f8f8",
      fontSize: "14px",
    },
  },
  span: {
    fontSize: "14px",
  },
};
export default SignUp;
