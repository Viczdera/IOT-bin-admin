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
const Nav = () => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const {state,dispatch}=useContext(DataValueContext)
  const logOut=()=>{
    dispatch({ type: "LOGOUT", payload: ''});
    Router.push('/login')
  }
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
          label: <Link href="/settings/">Profile</Link>,
          key: "0",
        },
        {
          label: <Link href="/settings/">Settings</Link>,
          key: "1",
        },
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
              {/* <Box>
                <Link href="/" passHref>
                  <Image src={logo} alt="logo" width="120px" height="40px" />
                </Link>
              </Box> */}
              <Box display={{ base: "none", md: "block" }}>
                <InputGroup h="30px">
                  <Input
                 fontFamily='Cerebri Sans Light'
                 fontSize='sm'
                    placeholder="Search products"
                    w='210px'
                    h="30px"
                    _focus={{ outline: "none" }}
                  />
                  <InputRightAddon
                    h="30px"
                    background="black.100"
                    children={
                      <Icon
                        as={BiSearchAlt}
                        color="white.100"
                        fontSize="20px"
                      />
                    }
                  />
                </InputGroup>
              </Box>
              <Box>
                <Flex alignItems="center">
                  <Flex mr="10px" pos="relative" cursor="pointer">
                    <Icon fontSize="35px" as={IoNotificationsCircleOutline} />
                    <Flex
                      w="16px"
                      h="16px"
                      borderRadius="50%"
                      pos="absolute"
                      top="-5px"
                      right="-2px"
                      alignItems="center"
                      justifyContent="center"
                      backgroundColor="white.100"
                    >
                      <Icon fontSize="50px" color="#2E8BF7" as={BsDot} />
                    </Flex>
                  </Flex>
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
              </Box>
            </Flex>
          </Flex>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Nav;
