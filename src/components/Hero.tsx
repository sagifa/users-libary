import {
  Flex,
  Container,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";
import Illustration from "./Illustration";

const Hero = () => {
  return (
    <Container id="hero" maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Our user library{" "}
          <Text as={"span"} color={"orange.400"}>
            made easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          All the data you need. Never miss, Keep track of your users, Smart
          reminders in appropriate times. Read your smart “Daily Agenda” every
          morning.
        </Text>
        <Stack spacing={6} direction={{ base: "column", sm: "row" }}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
          >
            Get started
          </Button>
          <Button rounded={"full"} px={6}>
            Learn more
          </Button>
        </Stack>
        <Flex w={"full"}>
          <Illustration
            height={{ sm: "24rem", lg: "28rem" }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Hero;
