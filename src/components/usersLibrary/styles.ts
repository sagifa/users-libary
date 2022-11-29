import {
  BoxProps,
  ButtonProps,
  FlexProps,
  IconProps,
  InputProps,
  SimpleGridProps,
} from "@chakra-ui/react";
import { text } from "../../utils/appConsts";

export const ContainerStyle: BoxProps = {
  p: "1rem",
  pb: "4rem",
  bgColor: "gray.100",
};

export const GridStyle: SimpleGridProps = {
  columns: { base: 1, sm: 2, lg: 3, xl: 4, "2xl": 5 },
  spacing: "1rem",
  p: "1rem",
  justifyContent: "end",
};

export const CardContainerStyle: FlexProps = {
  shadow: "2xl",
  direction: "column",
  alignItems: "center",
  borderRadius: "20px",
  w: { base: "full", md: "22rem", xl: "18rem" },
  h: "18rem",
  p: "1rem",
  gap: "1rem",
  bgColor: "white",
  position: "relative",
};

export const EditIconStyle: IconProps = {
  position: "absolute",
  right: "1rem",
  cursor: "pointer",
  _hover: { color: "yellow.400" },
};

export const IconNameStyle: IconProps = {
  cursor: "pointer",
  transition: "all .2s ease-in-out",
  _hover: {
    color: "green.300",
    transform: "scale(1.8)",
    transition: "all .2s ease-in-out",
  },
};

export const IconEmailStyle: IconProps = {
  cursor: "pointer",
  transition: "all .2s ease-in-out",
  _hover: {
    color: "blue.300",
    transform: "scale(1.8)",
    transition: "all .2s ease-in-out",
  },
};
export const IconLocationStyle: IconProps = {
  cursor: "pointer",
  transition: "all .2s ease-in-out",
  _hover: {
    color: "red.300",
    transform: "scale(1.8)",
    transition: "all .2s ease-in-out",
  },
};

export const IconIdStyle: IconProps = {
  cursor: "pointer",
  transition: "all .2s ease-in-out",
  _hover: {
    color: "purple.300",
    transform: "scale(1.8)",
    transition: "all .2s ease-in-out",
  },
};

export const IconDeleteStyle: IconProps = {
  position: "absolute",
  bottom: "1rem",
  right: "1rem",
  cursor: "pointer",
  _hover: { color: "red.400" },
};

export const CreateButtonStyle: ButtonProps = {
  mx: "1rem",
  mt: "2rem",
  colorScheme: "linkedin",
};

export const SearchBarStyle: InputProps = {
  borderRadius: "15px",
  mb: "1rem",
  bgColor: "white",
  placeholder: text.searchbar,
};
