import React, { useEffect, useState } from "react";
import { Avatar, Box, Flex, useDisclosure } from "@chakra-ui/react";
import {
  InfoIcon,
  AtSignIcon,
  ArrowDownIcon,
  ViewIcon,
  EditIcon,
} from "@chakra-ui/icons";
import EditUser from "./EditUser";
import DeleteUserButton from "./DeleteUserButton";
import { CardItems, UserCardProps } from "../../utils/types";

const UserCard = ({ userData }: UserCardProps) => {
  const [valueToShow, setValueToShow] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setDetailShow = (type: CardItems) => {
    setValueToShow(userData[type]);
  };

  useEffect(() => {
    setValueToShow(userData.name);
  }, [userData]);

  return (
    <Flex
      shadow="2xl"
      direction="column"
      alignItems="center"
      borderRadius="20px"
      w={{ base: "full", md: "22rem", xl: "18rem" }}
      h="18rem"
      p="1rem"
      gap="1rem"
      bgColor="white"
      position="relative"
    >
      <EditIcon
        onClick={onOpen}
        position="absolute"
        right="1rem"
        cursor="pointer"
        _hover={{ color: "yellow.400" }}
      />
      <EditUser isOpen={isOpen} onClose={onClose} userData={userData} />
      <DeleteUserButton uuid={userData.uuid} />
      <Avatar
        mt="1rem"
        size="xl"
        name={userData.name}
        src={userData.picture}
      />{" "}
      <Box my="2rem">{valueToShow}</Box>
      <Flex gap="1rem" position="absolute" bottom="1rem">
        <InfoIcon
          cursor="pointer"
          transition="all .2s ease-in-out"
          onMouseEnter={() => setDetailShow("name")}
          _hover={{
            color: "green.300",
            transform: "scale(1.3)",
            transition: "all .2s ease-in-out",
          }}
        />
        <AtSignIcon
          cursor="pointer"
          onMouseEnter={() => setDetailShow("email")}
          _hover={{ color: "blue.300" }}
        />
        <ArrowDownIcon
          cursor="pointer"
          onMouseEnter={() => setDetailShow("location")}
          _hover={{ color: "red.300" }}
        />
        <ViewIcon
          cursor="pointer"
          onMouseEnter={() => setDetailShow("uuid")}
          _hover={{ color: "purple.300" }}
        />
      </Flex>
    </Flex>
  );
};

export default UserCard;
