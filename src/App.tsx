import { Container, CssBaseline } from "@material-ui/core";
import React from "react";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <CssBaseline>
      <NavBar />
      <Container>
        <HomePage />
      </Container>
    </CssBaseline>
  );
}

export default App;
