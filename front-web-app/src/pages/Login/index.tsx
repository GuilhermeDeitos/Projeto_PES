import React from "react";
import Logo from "../../assets/Logo.svg";
import { Container, LoginPaper, InputGroup, FormContainer } from "./styled";
import { TextField, Button, Typography, Link } from "@mui/material";

interface Login {
  user: string;
  password: string;
}

export function Login() {
  const [user, setUser] = React.useState<Login>({
    user: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
        ...user,
        [event.target.name]: event.target.value,
    });
}
  console.log(user)
  return (
    <Container>
      <img src={Logo} alt="Logo" />
      <LoginPaper elevation={3}>
        <Typography variant="h3" fontWeight={600} align="center" marginTop={5}>
          Login
        </Typography>
        <FormContainer>
          <InputGroup>
            <TextField type="text" placeholder="User" variant="outlined" name="user" onChange={handleChange} />
            <TextField
              type="password"
              placeholder="Password"
              variant="outlined"
                name="password"
                onChange={handleChange}
            />
          </InputGroup>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#003775",
              fontWeight: 600,
              borderRadius: 4,
            }}
          >
            Enter
          </Button>
          <Link href="/register" align="center">
            Forget your password?
          </Link>
        </FormContainer>
      </LoginPaper>
    </Container>
  );
}
