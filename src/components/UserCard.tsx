import React, { useEffect, useState } from "react";
import { Avatar, Box, Flex, useDisclosure } from "@chakra-ui/react";
import {
  InfoIcon,
  AtSignIcon,
  ArrowDownIcon,
  ViewIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { UserDataApp } from "../utils/types";
import EditUser from "./EditUser";
import DeleteUserButton from "./DeleteUserButton";

type userCardProps = {
  userData: UserDataApp;
};
const UserCard = ({ userData }: userCardProps) => {
  const setDetailShow = (type: string): string => {
    if (type === "name") {
      setValueToShow(userData.name);
    }
    if (type === "email") {
      setValueToShow(userData.email);
    }
    if (type === "location") {
      setValueToShow(userData.location);
    }
    if (type === "id") {
      setValueToShow(userData.login.uuid);
    }
    return "";
  };

  const [valueToShow, setValueToShow] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <DeleteUserButton uuid={userData.login.uuid} />
      <Avatar
        mt="1rem"
        size="xl"
        name={userData.name}
        src={userData.picture.medium}
      />{" "}
      <Box my="2rem">{valueToShow}</Box>
      <Flex gap="1rem" position="absolute" bottom="1rem">
        <InfoIcon
          cursor="pointer"
          onMouseEnter={() => setDetailShow("name")}
          _hover={{ color: "green.300" }}
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
          onMouseEnter={() => setDetailShow("id")}
          _hover={{ color: "purple.300" }}
        />
      </Flex>
    </Flex>
  );
};

export default UserCard;
