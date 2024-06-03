import React from "react";
import Logo from "../../assets/Logo.svg";
import { Container, RegisterPaper, InputGroup, FormContainer } from "./styled";
import { TextField, Button, Typography, Link } from "@mui/material";
import { Password } from "@mui/icons-material";
import { TabFooter } from "../../components/Footer";
import { UserData } from "../Users";
import { api } from "../../utils/api";
import Swal from "sweetalert2";
import { AxiosResponse } from "axios";

interface UserFormData extends UserData {
  password: string;
}

export function Register() {
  const [user, setUser] = React.useState<UserFormData>({
    name: "",
    password: "",
    email: "",
    status: 0, // 0 - inativo, 1 - ativo e usuário normal, 2 - ativo e usuário admin, 3 - bloqueado
    role: "",
    hours: 0
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


  const createUser = () => {
    if(user.password !== confirmPassword){
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        showConfirmButton: false,
        timer: 1500
      
      })
      return;
    } else if(user.password === "" || user.email === "" || user.name === "" || user.role === ""){
      Swal.fire({
        icon: 'error',
        title: 'Please fill all fields',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }

    api.post("/users/", user).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'User registered successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = "/login";
      })
    }).catch((error: AxiosResponse) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed to register user',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(error);
    })

  }
    

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
              name="name"
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
              placeholder="Role"
              variant="outlined"
              name="role"
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
            onClick={createUser}
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
