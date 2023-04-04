import {
  Button,
  Container,
  Flex,
  IconButton,
  propNames,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";
import Breadcrumb from "../Navbar/Breadcrumb";
import Nav from "../Navbar/Nav";
import MobileNav from "../Sidenav/MobileNav";
import SideNav from "../Sidenav/SideNav";
import { BsDisplayFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { getFromLocalStorage } from "../../utils/browserStorage";
import Login from "../Screens/Login/Login";

type LayoutProps = {
  pageProps?: {};
  children: ReactNode;
};
function DashLayout(props: LayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Flex minW={{ base: "0px", sm: "800px" }} w="100%" justifyContent="center">
      <Flex display={{ base: "block", sm: "none" }}>
        <Nav />
      </Flex>
      <Flex w="100%">
        <SideNav />

        <Flex
          flexDir="column"
          width="100%"
          overflowX={{ sm: "auto", md: "hidden" }}
        >
          <Container maxW="1600px" px="20px" pb="20px">
            <Breadcrumb />
            {props.children}
          </Container>
        </Flex>
      </Flex>
      <>
        <IconButton
          pos="fixed"
          right={0}
          zIndex={100}
          top="40vh"
          icon={<BsChevronRight />}
          aria-label={""}
          background="black"
          display={{ base: "block", sm: "none" }}
          fontSize="20px"
          size="md"
          color="white"
          _hover={{ border: "1px solid black.200" }}
          onClick={onOpen}
        />
        <MobileNav onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
      </>
    </Flex>
  );
}

export default DashLayout;
