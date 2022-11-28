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
} from "@chakra-ui/react";
import { UserData, UserDataApp } from "../utils/types";
import { useAppDispatch } from "../redux/hooks";
import { editUserData } from "../redux/userSlice";
import { parseLocation, parseName } from "../utils/helpers";

interface EditUserProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserDataApp;
}

const EditUser = ({ isOpen, onClose, userData }: EditUserProps) => {
  const dispatch = useAppDispatch();
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
              actions.setSubmitting(true);
              dispatch(editUserData({ ...values, uuid: userData.login.uuid }));
              toast({
                title: "Account updated.",
                description: "You can close the Edit User window",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }}
          >
            {(props) => (
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
                      <Input {...field} mb="1rem" placeholder="name" />
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
                      isInvalid={Boolean(
                        form.errors.email && form.touched.email
                      )}
                    >
                      <FormLabel>Email</FormLabel>
                      <Input {...field} mb="1rem" placeholder="Email" />
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
                      <FormLabel>Location</FormLabel>
                      <Input
                        {...field}
                        mb="2rem"
                        placeholder="Current Living Location"
                      />
                      <FormErrorMessage>
                        {form.errors.location}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUser;

function validateName(value: string) {
  let error;
  if (!value) {
    error = "Name is required";
    return error;
  } else if (value.length < 3) {
    error = "Must be min of 3 characters";
  }
  return error;
}

function validateEmail(value: string) {
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

function validateLocation(value: string) {
  let error;
  if (!value) {
    error = "Location is required";
    return error;
  }
}

const toast = {
  title: "User updated.",
  status: "success",
  duration: 7000,
  isClosable: true,
};
