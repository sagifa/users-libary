import React, { useEffect, useState } from "react";
import { getUsers } from "../../redux/userSlice";
import UserCard from "./UserCard";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  ContainerStyle,
  CreateButtonStyle,
  GridStyle,
  SearchBarStyle,
} from "./styles";
import { text } from "../../utils/appConsts";
import EditUser from "./EditUser";
import { UserDataApp } from "../../utils/types";
import { Search2Icon } from "@chakra-ui/icons";

const UserLibrary = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userListData = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const isStrInObg = (obj: UserDataApp, value: string) => {
    const { name, location, email, uuid } = { ...obj };
    const newArray = [name, location, email, uuid];
    return newArray.toString().toLowerCase().includes(value.toLowerCase());
  };

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  if (isLoading) return <>{text.loading}</>;

  return (
    <Box {...ContainerStyle}>
      <EditUser isOpen={isOpen} onClose={onClose} />
      <Button {...CreateButtonStyle} onClick={onOpen}>
        {text.create}
      </Button>
      <Flex w="30%" mx="auto">
        <InputGroup>
          <InputLeftElement children={<Search2Icon color="gray.300" />} />
          <Input
            {...SearchBarStyle}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputGroup>
      </Flex>
      <SimpleGrid {...GridStyle}>
        {userListData.map((user) => {
          if (!isStrInObg(user, searchValue)) return "";
          return (
            <Flex key={user.uuid}>
              <UserCard userData={user} />
            </Flex>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};
export default UserLibrary;
