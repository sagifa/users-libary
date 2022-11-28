import React, { useState } from "react";
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
  FormErrorMessage,
  Button,
  ModalFooter,
  useToast,
  Box,
} from "@chakra-ui/react";
import { Field, Form, Formik, FieldInputProps, FormikProps } from "formik";
import { useAppDispatch } from "../../redux/hooks";
import {
  validateEmail,
  validateLocation,
  validateName,
  validatePicture,
} from "./EditUser";
import { createUser } from "../../redux/userSlice";
import { CreateUserProps } from "../../utils/types";
import { text } from "../../utils/appConsts";

const CreateUser = ({ isOpen, onClose }: CreateUserProps) => {
  const [buttonName, setButtonName] = useState("Cancel");
  const dispatch = useAppDispatch();
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{text.create}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              location: "",
              picture: "",
            }}
            onSubmit={(values) => {
              dispatch(createUser({ ...values }));
              toast({
                title: "User Created.",
                description: "You can close the Create User window",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              setButtonName("Close");
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
                    <FormLabel>Full Name</FormLabel>
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
                    <FormLabel mt="1rem">picture</FormLabel>
                    <Input {...field} placeholder="insert URL" />
                    <FormErrorMessage>{form.errors.picture}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Box mt="2rem">
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
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

export default CreateUser;
