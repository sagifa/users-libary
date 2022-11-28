import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Main from "./components/Main";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <Main />
    </Provider>
  </ChakraProvider>
);
