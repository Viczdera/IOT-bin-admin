import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { PasswordInfoForm, ShopInfoForm } from "./formSignUp";

const FormHandler = (props: {
  next: () => void;
  back: () => void;
  pageSteps: string[];
  step: number;
}) => {
  interface construct {
    state: boolean;
    city: boolean;
  }
  const [disabled, setDisabled] = React.useState<construct>({
    state: true,
    city: true,
  });
  const [values, setValues] = useState({
    user_name: "",
    email: "",
    phone: "",
    password: "",
    c_password: "",
  });
  const handleValueChange = (input: string, value: any) => {
    setValues((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  switch (props.step) {
    case 1:
      return (
        <Box>
          <ShopInfoForm
            values={values}
            next={props.next}
            handleValueChange={handleValueChange}
          />
        </Box>
      );
    case 2:
      return (
        <Box>
          <PasswordInfoForm
            values={values}
            next={props.next}
            back={props.back}
            handleValueChange={handleValueChange}
          />
        </Box>
      );

    default:
      return <Text> No More steps</Text>;
  }
};

export default FormHandler;
