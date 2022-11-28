import { Box, Flex, FlexProps, Icon, IconProps, Text } from "@chakra-ui/react";
import React from "react";
import { StarIcon, AtSignIcon, CalendarIcon } from "@chakra-ui/icons";
import { JsxElement } from "typescript";
type PageDataType = {
  title: string;
  icon: "StarIcon" | "AtSignIcon" | "CalendarIcon";
  color: string;
};
const PageData: PageDataType = {
  title: "Hero",
  icon: "StarIcon",
  color: "yellow.300",
};

const navbarId = "navbar";
export const handleClickScroll = (id: string) => {
  const navHight = document.getElementById(navbarId)?.offsetHeight || 0;
  const element = document.getElementById(id);
  if (element) {
    const y =
      element.getBoundingClientRect().top +
      window.scrollY -
      navHight -
      navHight * 1.1;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const Header = () => {
  const iconSelector = {
    StarIcon: <StarIcon />,
    AtSignIcon: <StarIcon />,
    CalendarIcon: <StarIcon />,
  };
  const IconComponent = iconSelector[PageData.icon];
  return (
    <Flex
      id={navbarId}
      shadow="md"
      h="4rem"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Flex {...ItemBoxStyle}>
        {/* <IconComponent  {...IconStyle} color={PageData.color} /> */}
        <StarIcon w={8} h={8} color={PageData.color} />
        <Text>{PageData.title}</Text>
      </Flex>
      <Flex {...ItemBoxStyle}>
        <CalendarIcon {...IconStyle} color="blue.300" />
        <Text>Users</Text>
      </Flex>
      <Flex {...ItemBoxStyle}>
        <AtSignIcon {...IconStyle} color="red.300" />
        <Text>About Us</Text>
      </Flex>
    </Flex>
  );
};

export default Header;

export const IconStyle: IconProps = {
  w: 8,
  h: 8,
};

export const ItemBoxStyle: FlexProps = {
  alignItems: "center",
  gap: "1rem",
  cursor: "pointer",
  transition: "all .2s ease-in-out",
  _hover: {
    transform: "scale(1.3)",
    transition: "all .2s ease-in-out",
  },
};
