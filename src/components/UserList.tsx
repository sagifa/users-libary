import React, { useEffect } from "react";
import { UserData } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUserListData } from "../redux/userSlice";
import UserCard from "./UserCard";
import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react";

export type GetUsersResponse = {
  results: UserData[];
};

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const userListData = useSelector(selectUserListData);

  if (!userListData) return <>Loading</>;

  return (
    <Box p="1rem" bgColor="gray.100">
      <Button colorScheme="linkedin">Create User</Button>
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
        spacing="1rem"
        p="1rem"
        justifyContent="end"
      >
        {userListData.map((user) => (
          <Flex key={user.login.uuid} justifyContent="center">
            <UserCard userData={user} />
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default UserList;
