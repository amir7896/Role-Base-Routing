import { Grid, Typography } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppRoot from "./AppRoot";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoot />
      </BrowserRouter>
    </>
  );
}

export default App;
