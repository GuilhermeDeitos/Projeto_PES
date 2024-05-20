import { ButtonGroup, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function TabFooter() {
  const actualPage = window.location.pathname;
  const [page, setPage] = useState<string>(actualPage.split("/")[1]);
  console.log(page);

  const navigate = useNavigate();

  function handlePageChange(page: string) {
    setPage(page);
    //Redirecionar para /page
    navigate(`/${page}`);
  }
  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button
        onClick={() => {
          handlePageChange("login");
        }}
        variant={page === "login" ? "outlined" : "contained"}
        disabled={page === "login"}
      >
        Login
      </Button>
      <Button
        onClick={() => {
          handlePageChange("register");
        }}
        variant={page === "register" ? "outlined" : "contained"}
        disabled={page === "register"}
      >
        Register
      </Button>
    </ButtonGroup>
  );
}
