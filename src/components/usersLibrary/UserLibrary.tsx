import React, { useEffect, useState } from "react";
import { getUsers } from "../../redux/userSlice";
import UserCard from "./UserCard";
import { Box, Button, Flex, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ContainerStyle, CreateButtonStyle, GridStyle } from "./styles";
import { text } from "../../utils/appConsts";
import EditUser from "./EditUser";
import { UserDataApp } from "../../utils/types";
import SearchBar from "./SearchBar";

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
    <Box id="users" {...ContainerStyle}>
      <EditUser isOpen={isOpen} onClose={onClose} />
      <Button {...CreateButtonStyle} onClick={onOpen}>
        {text.create}
      </Button>
      <SearchBar setter={setSearchValue} />
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
