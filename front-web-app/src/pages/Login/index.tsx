import React from "react";
import Logo from "../../assets/Logo.svg";
import { Container, LoginPaper, InputGroup, FormContainer } from "./styled";
import { TextField, Button, Typography, Link } from "@mui/material";
import { TabFooter } from "../../components/Footer";
import { api } from "../../utils/api";
import Swal from "sweetalert2";
interface Login {
  email: string;
  password: string;
}

export function Login() {
  const [user, setUser] = React.useState<Login>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
        ...user,
        [event.target.name]: event.target.value,
    });
}

const handleLogin = () => {
  api.post("/users/login", user).then((response) => {
    console.log(response.data);
    Swal.fire({
      icon: "success",
      title: "Login successfully",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.href = "/home";
    });
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
            <TextField type="email" placeholder="example@gmail.com" variant="outlined" name="email" onChange={handleChange} />
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
            onClick={handleLogin}
          >
            Enter
          </Button>
          <Link href="/register" align="center">
            Forget your password?
          </Link>
        </FormContainer>
      </LoginPaper>
      <TabFooter />
    </Container>
  );
}
