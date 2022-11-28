import React, { useEffect } from "react";
import { getUsers } from "../../redux/userSlice";
import UserCard from "./UserCard";
import { Box, Button, Flex, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import CreateUser from "./CreateUser";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ContainerStyle, GridStyle } from "./styles";
import { text } from "../../utils/appConsts";

const UserLibrary = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userListData = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  if (isLoading) return <>{text.loading}</>;

  return (
    <Box {...ContainerStyle}>
      <CreateUser isOpen={isOpen} onClose={onClose} />
      <Button mx="1rem" colorScheme="linkedin" onClick={onOpen}>
        {text.create}
      </Button>
      <SimpleGrid {...GridStyle}>
        {userListData.map((user) => (
          <Flex key={user.uuid}>
            <UserCard userData={user} />
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default UserLibrary;
