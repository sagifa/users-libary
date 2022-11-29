import React, { useEffect, useState } from "react";
import { Avatar, Box, Flex, useDisclosure } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import EditUser from "./EditUser";
import DeleteUserButton from "./DeleteUserButton";
import { UserCardProps } from "../../utils/types";
import { CardContainerStyle, EditIconStyle } from "./styles";
import UserCardItems from "./UserCardItems";

const UserCard = ({ userData }: UserCardProps) => {
  const [valueToShow, setValueToShow] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setValueToShow(userData.name);
  }, [userData]);

  return (
    <Flex {...CardContainerStyle}>
      <EditIcon {...EditIconStyle} onClick={onOpen} />
      <EditUser isOpen={isOpen} onClose={onClose} userData={userData} />
      <DeleteUserButton uuid={userData.uuid} />
      <Avatar mt="1rem" size="xl" name={userData.name} src={userData.picture} />
      <Box my="2rem">{valueToShow}</Box>
      <UserCardItems setter={setValueToShow} userData={userData} />
    </Flex>
  );
};

export default UserCard;
