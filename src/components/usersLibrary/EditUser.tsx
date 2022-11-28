import React, { useState } from "react";
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
import { EditUserProps } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createUser, editUser, selectUsersEmail } from "../../redux/userSlice";
import { text } from "../../utils/appConsts";

const EditUser = ({ isOpen, onClose, userData }: EditUserProps) => {
  const [buttonName, setButtonName] = useState(text.cancel);
  const dispatch = useAppDispatch();
  const emailList = useAppSelector(selectUsersEmail);
  const toast = useToast();
  const isEditMode = Boolean(userData);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditMode ? text.edit : text.create}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              name: userData?.name || "",
              email: userData?.email || "",
              location: userData?.location || "",
              picture: "",
            }}
            onSubmit={(values) => {
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

              if (isEditMode && userData?.uuid) {
                dispatch(
                  editUser({
                    name: values.name,
                    location: values.location,
                    email: values.email,
                    uuid: userData.uuid,
                  })
                );
              } else {
                dispatch(createUser({ ...values }));
              }
              toast({
                title: isEditMode ? "User updated." : "User Created.",
                description: `You can close the Edit ${
                  isEditMode ? "edit" : "create"
                } window`,
                status: "success",
                duration: 7000,
                isClosable: true,
              });
              setButtonName(text.close);
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
                    <FormLabel>{text.name}</FormLabel>
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
                    <FormLabel mt="1rem">{text.email}</FormLabel>
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
                    <FormLabel mt="1rem">{text.location}</FormLabel>
                    <Input {...field} placeholder="Current Living Location" />
                    <FormErrorMessage>{form.errors.location}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {!isEditMode && (
                <Field name="picture" validate={validatePicture}>
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: FormikProps<{ picture: string }>;
                  }) => (
                    <FormControl
                      isInvalid={Boolean(
                        form.errors.picture && form.touched.picture
                      )}
                    >
                      <FormLabel mt="1rem">{text.picture}</FormLabel>
                      <Input {...field} placeholder="insert URL" />
                      <FormErrorMessage>{form.errors.picture}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              )}

              <Box mt="2rem">
                <Button colorScheme="blue" mr={3} type="submit">
                  {text.save}
                </Button>
                <Button onClick={onClose}>{buttonName}</Button>
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
