import React, { useLayoutEffect, useEffect, useState } from "react";
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
  useMediaQuery,
} from "@chakra-ui/react";

import { GiHamburgerMenu } from "react-icons/gi";
import { CgLogOut } from "react-icons/cg";
import {
  MdOutlineSpaceDashboard,
  MdOutlineInventory2,
  MdBookmarkAdd,
} from "react-icons/md";
import { BsDisplayFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { VscTag } from "react-icons/vsc";
import SideNavItem from "./SideNavItem";
import Router from "next/router";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
function SideNav() {
  const [sideNavSize, setSideNavSize] = useState("large");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

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
  const boxShadow1 = " rgba(0, 0, 0, 0.18) 0px 2px 4px";
  const boxShadow2 = "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px";
  const boxShadow3 = "rgba(0, 0, 0, 0.04) 0px 3px 5px";
  const logOut = async () => {
    const res = await axios.get("/api/auth/signout");
    let d = res?.data;
    if (d.success) {
      Router.push("/login");
    }
  };
  return (
    <Flex
      top={0}
      left="0px"
      pos="sticky"
      zIndex={500}
      minH="100vh"
      h="100vh"
      backgroundColor="white.100"
      boxShadow={boxShadow3}
    >
      <Flex
        display={{ base: "none", sm: "flex" }}
        overflowY="auto"
        className="customScrollBar"
      >
        <motion.div
          style={{
            position: "sticky",
            left: "0",
            padding: "10px 0px",
            width: 170,
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
          animate={{
            width: sideNavSize == "large" ? 180 : 90,
          }}
          //  transition={{ duration: 0.8}}
          // transition={{ duration: 0.8, type:'tween'}}
        >
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
          <Flex
            p="5%"
            flexDir="column"
            w="100%"
            alignItems="flex-start"
            // position="absolute"
            // bottom="40px"
            // left="0"
            mb={4}
          >
            <Divider my={10} />
            <Flex  width="100%">
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
          </Flex>
        </motion.div>
      </Flex>
    </Flex>
  );
}

export default SideNav;
