import React from "react";
import Logo from "../../assets/Logo.svg";
import { Container, RegisterPaper, InputGroup, FormContainer } from "./styled";
import { TextField, Button, Typography, Link } from "@mui/material";
import { Password } from "@mui/icons-material";
import { TabFooter } from "../../components/Footer";

interface UserData {
  user: string;
  password: string;
  email: string;
  status: number;
  phone: string;
}

export function Register() {
  const [user, setUser] = React.useState<UserData>({
    user: "",
    password: "",
    email: "",
    status: 0, // 0 - inativo, 1 - ativo e usuário normal, 2 - ativo e usuário admin, 3 - bloqueado
    phone: "",
  });

  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "confirmPassword") {
      setConfirmPassword(event.target.value);
    } else {
      setUser({
        ...user,
        [event.target.name]: event.target.value,
      });
    }
  };

  console.log(Password);
  console.log(user);
  return (
    <Container>
      <img src={Logo} alt="Logo" />
      <RegisterPaper elevation={3}>
        <Typography variant="h3" fontWeight={600} align="center" marginTop={5}>
          Register
        </Typography>
        <FormContainer>
          <InputGroup>
            <TextField
              type="text"
              placeholder="User"
              variant="outlined"
              name="user"
              onChange={handleChange}
              required
            />
            <TextField
              type="password"
              placeholder="Password"
              variant="outlined"
              name="password"
              onChange={handleChange}
              sx={{
                borderColor:
                  confirmPassword === user.password ? "green" : "red",
              }}
              required
            />
            <TextField
              type="password"
              placeholder="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              onChange={handleChange}
              sx={{
                borderColor:
                  confirmPassword === user.password ? "green" : "red",
              }}
              required
            />
            <TextField
              type="email"
              placeholder="Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              required
            />
            <TextField
              type="text"
              placeholder="Phone"
              variant="outlined"
              name="phone"
              onChange={handleChange}
              required
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
            Register
          </Button>
          <Link href="/login" align="center">
            Already have an account?
          </Link>
        </FormContainer>
      </RegisterPaper>
      <TabFooter />
    </Container>
  );
}
