import React, { useEffect } from "react";
import { getUsers } from "../../redux/userSlice";
import UserCard from "./UserCard";
import { Box, Button, Flex, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import CreateUser from "./CreateUser";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const UserLibrary = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userListData = useAppSelector((state) => state.user.data);
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  if (!userListData) return <>Loading</>;

  return (
    <Box p="1rem" pb="4rem" bgColor="gray.100">
      <CreateUser isOpen={isOpen} onClose={onClose} />
      <Button mx="1rem" colorScheme="linkedin" onClick={onOpen}>
        Create User
      </Button>
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3, xl: 4, "2xl": 5 }}
        spacing="1rem"
        p="1rem"
        justifyContent="end"
      >
        {userListData.map((user) => (
          <Flex key={user.uuid} justifyContent="center">
            <UserCard userData={user} />
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default UserLibrary;
