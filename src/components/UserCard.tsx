import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import {
  InfoIcon,
  AtSignIcon,
  ArrowDownIcon,
  ViewIcon,
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { UserData } from "../utils/types";
import EditUser from "./EditUser";
import { useAppDispatch } from "../redux/hooks";
import { deleteUser } from "../redux/userSlice";
import DeleteUserButton from "./DeleteUserButton";
import { parseLocation, parseName } from "../utils/helpers";

type userCardProps = {
  userData: UserData;
};
const UserCard = ({ userData }: userCardProps) => {
  //   const initValue = parseName(userData);

  const setDetailShow = (type: string): string => {
    if (type == "name") {
      const fullName = parseName(userData);
      setValueToShow(fullName);
    }
    if (type == "email") {
      setValueToShow(userData.email);
    }
    if (type == "location") {
      const fullLocation = parseLocation(userData);
      setValueToShow(fullLocation);
    }
    if (type == "id") {
      setValueToShow(userData.login.uuid);
    }
    return "";
  };

  const [valueToShow, setValueToShow] = useState<string>(() =>
    parseName(userData)
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        name={userData.name.first + userData.name.last}
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
