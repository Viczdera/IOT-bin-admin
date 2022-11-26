import React, { useLayoutEffect, useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Icon,
  IconButton,
  //Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { GiHamburgerMenu } from "react-icons/gi";
import { CgLogOut } from "react-icons/cg";
import {
  MdOutlineSpaceDashboard,
  MdOutlineInventory2,
  MdBookmarkAdd,
  MdOutlineSupervisedUserCircle,
  MdSettingsInputComposite,
} from "react-icons/md";
import { BsDisplayFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { VscTag } from "react-icons/vsc";
import SideNavItem from "./SideNavItem";
import Router from "next/router";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { DataValueContext } from "../../context/authContext";
import { CamelCase } from "../../helpers/HelperFunctions";
function SideNav() {
  const [sideNavSize, setSideNavSize] = useState("large");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
const [userDetails,setUserDetails]=useState({
  name:"",
  email:""
})
  //TODO:fix layout effect.Use contextapi/ redux for state
  useLayoutEffect(() => {
    isLargerThan1280 ? setSideNavSize("large") : setSideNavSize("small");
  }, [isLargerThan1280]);
  const changeNavSide = () => {
    if (sideNavSize == "small") setSideNavSize("large");
    else setSideNavSize("small");
  };
  // const shrinkTab = () => {
  //   if (sideNavSize == "xsmall") setSideNavSize("small");
  //   else setSideNavSize("xsmall");
  // };
  const boxShadow = "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px";
 
  const {state,dispatch}=useContext(DataValueContext)
  //console.log(state)
  const logOut=()=>{
    dispatch({ type: "LOGOUT", payload: ''});
  }
 useEffect(()=>{
  const name = CamelCase(state.user?.user_name||"")
  const email = state.user?.email||""
  let newDetails={
    name:name,
    email:email
  }
  setUserDetails(newDetails)
 },[])
  return (
    <Flex
      top={0}
      left="0px"
      pos="sticky"
      zIndex={1000}
      minH="100vh"
      h="100vh"
      //  / boxShadow={boxShadow3}
    >
      <Flex
        display={{ base: "none", sm: "flex" }}
        overflowY="auto"
        overflowX='hidden'
        className="customScrollBar"
        background="grey.300"
      >
        <motion.div
          style={{
            position: "sticky",
            left: "0",
            padding: "10px 0px",
            width: 170,
            justifyContent: "space-between",
            backgroundColor: "var(--grey300)",
          }}
          animate={{
            width: sideNavSize == "large" ? 180 : 90,
          }}
          //  transition={{ duration: 0.8}}
          // transition={{ duration: 0.8, type:'tween'}}
        >
          <Flex justifyContent="center">
            <Link href="/" passHref>
              <Image src="/shopLogo.gif" alt="logo" width="80" height="40" />
            </Link>
          </Flex>
          <Flex
            pl={sideNavSize == "large" ? "5" : ""}
            flexDir="column"
            w="100%"
            alignItems={sideNavSize == "small" ? "center" : "flex-start"}
            // background='white.100'
          >
            <IconButton
              icon={<GiHamburgerMenu />}
              aria-label={""}
              background="white.100"
              color="black.100"
              mt="100px"
              mb={5}
              fontSize="2xl"
              _hover={{ border: "1px solid black.200" }}
              onClick={changeNavSide}
            />
          </Flex>
          <Flex flexDir="column" w="100%" alignItems="flex-start" as="nav">
            <Menu placement="right">
              <SideNavItem
                title="Dashboard"
                icon={MdOutlineSpaceDashboard}
                sideNavSize={sideNavSize}
                href="/"
                exact
              />
              <SideNavItem
                title="Products"
                icon={VscTag}
                sideNavSize={sideNavSize}
                href="/products"
              />
              {/* <SideNavItem
                title="Orders"
                icon={BsDisplayFill}
                sideNavSize={sideNavSize}
                href="/orders"
              /> */}
            </Menu>
          </Flex>
          <Box w="100%" mb={4}>
            <Flex width="100%" py="20px">
              <Button
                margin="0 auto"
                backgroundColor="white.100"
                boxShadow={boxShadow}
                onClick={() => {
                  Router.push("/products/new");
                }}
              >
                {sideNavSize == "small" ? (
                  <MdBookmarkAdd size="20px" />
                ) : (
                  <>
                    {" "}
                    <Flex alignItems="center">
                      <MdBookmarkAdd size="20px" />
                      Add Item
                    </Flex>
                  </>
                )}
              </Button>
            </Flex>
            <Divider />
            <Box width="100%" py="20px">
              <Flex
                flexDir="row"
                padding="5%"
                pl={sideNavSize == "small" ? "0" : "7"}
                justifyContent={
                  sideNavSize == "small" ? "center" : "flex-start"
                }
                alignItems="center"
              >
                <Icon
                  as={MdSettingsInputComposite}
                  mr={sideNavSize == "small" ? "0" : "5px"}
                />
                {sideNavSize == "small" ? (
                  ""
                ) : (
                  <Text color="grey.400" fontWeight="700">
                    Settings
                  </Text>
                )}
              </Flex>
              <Menu >
                <MenuButton p={0}>
                  <Flex mt="10px" pl="7" alignItems="center">
                    <Icon
                      mr="5px"
                      fontSize="35px"
                      as={MdOutlineSupervisedUserCircle}
                    />
                    <Box
                      mr="5px"
                      textAlign='left'
                      display={sideNavSize == "small" ? "none" : "block"}
                    >
                      <Text>{userDetails.name}</Text>
                      <Text>{userDetails.email}</Text>
                    </Box>
                    <Icon
                      mr="5px"
                      as={BiChevronUp}
                    />
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={logOut}>Log out</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>
        </motion.div>
      </Flex>
    </Flex>
  );
}

export default SideNav;
