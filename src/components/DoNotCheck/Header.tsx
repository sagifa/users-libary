import React from "react";
import { Flex, FlexProps, IconProps, Text } from "@chakra-ui/react";
import { AtSignIcon, CalendarIcon } from "@chakra-ui/icons";

const navbarId = "navbar";
export const handleClickScroll = (id: string) => {
  const navHight = document.getElementById(navbarId)?.offsetHeight || 0;
  const element = document.getElementById(id);
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY - navHight;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const Header = () => {
  return (
    <Flex id={navbarId} {...HeaderContainerStyle}>
      <Flex {...ItemBoxStyle} onClick={() => handleClickScroll("users")}>
        <CalendarIcon {...IconStyle} color="blue.300" />
        <Text>Users</Text>
      </Flex>
      <Flex {...ItemBoxStyle} onClick={() => handleClickScroll("footer")}>
        <AtSignIcon {...IconStyle} color="red.300" />
        <Text>About Us</Text>
      </Flex>
    </Flex>
  );
};

export default Header;

const IconStyle: IconProps = {
  w: 8,
  h: 8,
};

const HeaderContainerStyle: FlexProps = {
  shadow: "md",
  h: "4rem",
  alignItems: "center",
  pl: "4rem",
  gap: "4rem",
};
const ItemBoxStyle: FlexProps = {
  cursor: "pointer",
  alignItems: "center",
  gap: "1rem",
  transition: "all .2s ease-in-out",
  _hover: {
    transform: "scale(1.3)",
    transition: "all .2s ease-in-out",
  },
};
