import React from "react";
import {
  InfoIcon,
  AtSignIcon,
  ArrowDownIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import {
  IconNameStyle,
  IconEmailStyle,
  IconLocationStyle,
  IconIdStyle,
} from "./styles";
import { CardItems, UserDataApp } from "../../utils/types";

const UserCardItems = ({
  userData,
  setter,
}: {
  userData: UserDataApp;
  setter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const setDetailShow = (type: CardItems) => {
    setter(userData[type]);
  };

  return (
    <Flex gap="1rem" position="absolute" bottom="1rem">
      <InfoIcon {...IconNameStyle} onMouseEnter={() => setDetailShow("name")} />
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
  );
};

export default UserCardItems;
