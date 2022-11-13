import { Flex, Icon, Menu, MenuButton, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type navProps = {
  sideNavSize: string;
  title: string;
  icon: any;
  active?: any;
  href: string;
  exact?: boolean;
};

const SideNavItem = (props: navProps) => {
  const { pathname } = useRouter();
  const isActive = props.exact
    ? pathname === props.href
    : pathname.startsWith(props.href);

  return (
    <Flex
      mt={5}
      flexDir="column"
      fontFamily="Raleway"
      
      w="100%"
      alignItems={props.sideNavSize == "small" ? "center" : "flex-start"}
      backgroundColor={isActive ? "#fff" : "grey.300"}
      borderTop={isActive?'1px solid  #E5EBF0':'none'}
      borderBottom={isActive?'1px solid  #E5EBF0':'none'}
    _hover={{backgroundColor:`${!isActive && "grey.200"}`}}
      color={isActive ? "black.100" : "#535b63"}
      
      pl={props.sideNavSize == "large" ? "5" : ""}
      cursor='pointer'
    >
      <Link href={props.href} passHref>
        <MenuButton  width="100%">
          <Flex
            flexDir="row"
            padding="5%"
            alignItems="center"
            justifyContent={
              props.sideNavSize == "small" ? "center" : "flex-start"
            }
            height="50px"
          >
            <Icon
              as={props.icon}
              mr={props.sideNavSize == "small" ? "0" : "5px"}
            />
            {props.sideNavSize == "small" ? "" : <Text fontWeight='700'>{props.title}</Text>}
          </Flex>
        </MenuButton>
      </Link>
    </Flex>
  );
};

export default SideNavItem;
