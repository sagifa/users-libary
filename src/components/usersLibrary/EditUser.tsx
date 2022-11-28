import React from "react";
import { Field, Form, Formik, FieldInputProps, FormikProps } from "formik";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  FormErrorMessage,
  useToast,
  Box,
} from "@chakra-ui/react";
import { UserDataApp } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editUser, selectUsersEmail } from "../../redux/userSlice";

interface EditUserProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserDataApp;
}

const EditUser = ({ isOpen, onClose, userData }: EditUserProps) => {
  const dispatch = useAppDispatch();
  const emailList = useAppSelector(selectUsersEmail);
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              name: userData.name,
              email: userData.email,
              location: userData.location,
            }}
            onSubmit={(values, actions) => {
              if (emailList.includes(values.email)) {
                toast({
                  title: "Email not valid",
                  description: "Email already exists in our system",
                  status: "warning",
                  duration: 7000,
                  isClosable: true,
                });
                return;
              }
              dispatch(editUser({ ...values, uuid: userData.uuid }));
              toast({
                title: "User updated.",
                description: "You can close the Edit User window",
                status: "success",
                duration: 7000,
                isClosable: true,
              });
            }}
          >
            <Form>
              <Field name="name" validate={validateName}>
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<{ name: string }>;
                }) => (
                  <FormControl
                    isInvalid={Boolean(form.errors.name && form.touched.name)}
                  >
                    <FormLabel>First name</FormLabel>
                    <Input {...field} placeholder="name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email" validate={validateEmail}>
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<{ email: string }>;
                }) => (
                  <FormControl
                    isInvalid={Boolean(form.errors.email && form.touched.email)}
                  >
                    <FormLabel mt="1rem">Email</FormLabel>
                    <Input {...field} placeholder="Email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="location" validate={validateLocation}>
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<string>;
                  form: FormikProps<{ location: string }>;
                }) => (
                  <FormControl
                    isInvalid={Boolean(
                      form.errors.location && form.touched.location
                    )}
                  >
                    <FormLabel mt="1rem">Location</FormLabel>
                    <Input {...field} placeholder="Current Living Location" />
                    <FormErrorMessage>{form.errors.location}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Box mt="2rem">
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </Box>
            </Form>
          </Formik>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUser;

export function validateName(value: string) {
  let error;
  if (!value) {
    error = "Name is required";
    return error;
  } else if (value.length < 3) {
    error = "Must be min of 3 characters";
  }
  return error;
}

export function validateEmail(value: string) {
  let error;
  if (!value) {
    error = "Email is required";
    return error;
  }
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (value.match(validRegex)) {
  } else {
    error = "Invalid email address!";
  }
  return error;
}

export function validateLocation(value: string) {
  let error;
  if (!value) {
    error = "Location is required";
    return error;
  }
}

export function validatePicture(value: string) {
  let error;
  if (!value) {
    error = "Picture is required";
    return error;
  }
}

const toastEmailNotUnique = {
  title: "User updated.",
  status: "warning",
  duration: 7000,
  isClosable: true,
};
