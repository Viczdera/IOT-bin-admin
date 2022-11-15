/* eslint-disable react/no-children-prop */
import {
  Box,
  Container,
  Divider,
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
const NavHome = () => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const { state, dispatch } = useContext(DataValueContext);
  const logOut = () => {
    dispatch({ type: "LOGOUT", payload: "" });
    Router.push("/login");
  };

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
          <Flex width="100%" p="2" justifyContent="space-between">
            <Flex alignItems="center" w="100%">
              <Link href="/" passHref>
                <Image src="/shopLogo2.gif" alt="logo" width="80" height="40" />
              </Link>
            </Flex>
            <Flex alignItems="center" w="100%" justifyContent="flex-end">
              <Link href="/login" passHref>
                <Text color="blue.200" fontWeight="bold" fontSize="14px">
                  Log In
                </Text>
              </Link>
              <Divider orientation="vertical" mx="10px" />
              <Link href="/signup" passHref>
                <Box style={styles.signupCont} fontWeight="bold" fontSize="14px">
                  Sign Up
                </Box>
              </Link>
            </Flex>
          </Flex>
        </Menu>
      </Flex>
    </Flex>
  );
};
 const styles=({
  signupCont:{
    background:'var(--blue200)',
    borderRadius:'6px',
    color:'white',
    padding:'5px 8px'

  }
 })
export default NavHome;
