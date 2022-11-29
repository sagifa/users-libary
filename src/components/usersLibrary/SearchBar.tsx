import { InputGroup, InputLeftElement, Input, Flex } from "@chakra-ui/react";
import React from "react";
import { SearchBarBoxStyle, SearchBarStyle } from "./styles";
import { Search2Icon } from "@chakra-ui/icons";

const SearchBar = ({
  setter,
}: {
  setter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Flex {...SearchBarBoxStyle}>
      <InputGroup>
        <InputLeftElement children={<Search2Icon color="gray.300" />} />
        <Input {...SearchBarStyle} onChange={(e) => setter(e.target.value)} />
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
