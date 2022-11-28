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
import {
  CardContainerStyle,
  EditIconStyle,
  IconEmailStyle,
  IconIdStyle,
  IconLocationStyle,
  IconNameStyle,
} from "./styles";

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
    <Flex {...CardContainerStyle}>
      <EditIcon {...EditIconStyle} onClick={onOpen} />
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
          {...IconNameStyle}
          onMouseEnter={() => setDetailShow("name")}
        />
        <AtSignIcon
          {...IconEmailStyle}
          onMouseEnter={() => setDetailShow("email")}
        />
        <ArrowDownIcon
          {...IconLocationStyle}
          onMouseEnter={() => setDetailShow("location")}
        />
        <ViewIcon {...IconIdStyle} onMouseEnter={() => setDetailShow("uuid")} />
      </Flex>
    </Flex>
  );
};

export default UserCard;
