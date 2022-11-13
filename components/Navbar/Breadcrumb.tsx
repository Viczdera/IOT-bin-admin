import {
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Breadcrumbs from "nextjs-breadcrumbs";
import React from "react";
import { BsChevronRight } from "react-icons/bs";

const BreadcrumbNav = () => {
  const {pathname}=useRouter()
  return (
    <Flex width="100%" mt="90px" mb="20px" py={4} fontFamily='Cerebri Sans'>
      {/* <Breadcrumbs
      
        listStyle={styles.listStyle}
        rootLabel="Dashboard"
        transformLabel={(title) =>
          title == "Dashboard" ? (
            <Text color={pathname=='/'?'#000':"grey"}>
            {  "" + title}
            </Text>
          ) : (
            <>
              {" "}
              <Icon
                as={BsChevronRight}
                fontSize="x-small"
                mx={2}
              />
              {title}
            </>
          )
        }
        inactiveItemStyle={styles.inactive}
      /> */}
    </Flex>
  );
};

const styles = {
  listStyle: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize:"16px",
    listStyleType: "none",
    fontWeight: "600",
  },
  inactive: {
   color:"grey"
  },
};

export default BreadcrumbNav;
