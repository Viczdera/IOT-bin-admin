/* eslint-disable react/no-children-prop */
import {
  Box,
  Container,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import logo from "../../Assets/logo5.svg";
import { MdOutlineSupervisedUserCircle } from "react-icons/md";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import { BsDot } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { Dropdown, Menu as MenuAntd, Space } from "antd";
import { DataValueContext } from "../../context/authContext";
import Router from "next/router";
import { CamelCase } from "../../helpers/HelperFunctions";
const Nav = () => {
  const { state, dispatch } = useContext(DataValueContext);
  const logOut = () => {
    dispatch({ type: "LOGOUT", payload: "" });
    Router.push("/login");
  };
  const userName = state.user?.user_name || "";
  const name = CamelCase(userName)
  const menu = (
    <MenuAntd
      style={{
        zIndex: "2000",
        marginTop: "0px",
        width: "150px",
        boxShadow: " rgba(0, 0, 0, 0.05) 0px 1px 2px 0px ",
      }}
      items={[
        {
          type: "divider",
        },
        {
          label: (
            <div onClick={logOut}>
              <Flex alignItems="center">
                <CgLogOut size="30px" /> LogOut
              </Flex>
            </div>
          ),
          key: "3",
          disabled: false,
        },
      ]}
    />
  );
  return (
    <Flex
      width="100%"
      justifyContent="center"
      h="80px"
      pos="fixed"
      px="20px"
      top="0"
      left="0"
      zIndex={500}
      backgroundColor="white.100"
      boxShadow=" rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;"
    >
      <Flex w="100%">
        <Menu>
          <Flex width="100%" pl="2">
            <Flex alignItems="center" justifyContent="space-between" w="100%">
              <Box>
                <Link href="/" passHref>
                  <Image
                    src="/shopLogo2.gif"
                    alt="logo"
                    width="80"
                    height="40"
                  />
                </Link>
              </Box>

              <Flex alignItems="center">
                <Text mx="10px">Hi {name} !</Text>
                <Flex alignItems="center">
                  <Dropdown
                    placement="bottomRight"
                    arrow
                    overlay={menu}
                    trigger={["click", "hover"]}
                  >
                    <a
                      style={{ color: "#000" }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Flex
                        background="grey.200"
                        alignItems="center"
                        border=" 1px solid #DBDBDB"
                        borderRadius="10px"
                        pt="1px"
                        px="5px"
                      >
                        <Icon
                          fontSize="30px"
                          as={MdOutlineSupervisedUserCircle}
                        />

                        <Icon
                          fontSize="20px"
                          as={BiChevronDown}
                          //  onClick={onOpen}
                        />
                      </Flex>
                    </a>
                  </Dropdown>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Nav;
