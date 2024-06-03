import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Table,
  TextField,
  ButtonGroup,
  Button,
  Typography,
} from "@mui/material";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { InputGroup } from "./../styled";
import { api } from "../../../utils/api";
import Swal from "sweetalert2";
import { UserData } from "../../../pages/Users";

export function EditUser(userData: UserData) {
  const [data, setData] = useState<UserData>(userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    api
      .put(`/storage/${data.id}`, data)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "User Data Edited succesfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed Editing User Data",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <TableContainer sx={{ maxHeight: 470, minWidth: 370, overflow: "revert" }}>
      <Table sx={{ minWidth: 1 }} arial-label="simple label">
        <TableBody>
          <InputGroup>
            {Object.keys(userData).map((key) => {
              return (
                  <TableCell>
                    <Typography>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>

                    <TextField
                      type="text"
                      variant="outlined"
                      name={key}
                      sx={{width: "100%"}}
                      value={userData[key as keyof UserData]}
                      onChange={handleChange}
                      disabled={key === "id"}
                    />
                  </TableCell>
              );
            })}
          </InputGroup>
        </TableBody>
        <ButtonGroup
          style={{
            height: 30,
            display: "flex",
            justifyContent: "center",
            gap: 18,
            alignItems: "center",
          }}
        >
          <Button onClick={handleSubmit} type="submit">
            Salvar produto
            <EditIcon sx={{ color: "#03e92f", cursor: "pointer" }} />
          </Button>
        </ButtonGroup>
      </Table>
    </TableContainer>
  );
}
