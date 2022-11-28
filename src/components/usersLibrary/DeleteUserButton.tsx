import {
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../../redux/hooks";
import { deleteUser } from "../../redux/userSlice";
import { IconDeleteStyle } from "./styles";
import { text } from "../../utils/appConsts";

interface DeleteUserButtonProps {
  uuid: string;
}
const DeleteUserButton = ({ uuid }: DeleteUserButtonProps) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteUser(uuid));
  };
  return (
    <Popover>
      <PopoverTrigger>
        <DeleteIcon {...IconDeleteStyle} />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>{text.deleteConfirm}</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button colorScheme="red" onClick={handleDelete}>
              {text.delete}
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default DeleteUserButton;
