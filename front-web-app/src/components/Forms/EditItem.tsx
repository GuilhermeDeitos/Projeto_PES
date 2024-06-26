import React, { useState } from "react";
import { Item } from "../../pages/Estoque/index(teste)";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import {Table,TextField, ButtonBase, ButtonGroup, Button, TextareaAutosize, Typography } from "@mui/material";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { InputGroup } from "./styled";
import { api } from "../../utils/api";
import Swal from "sweetalert2";
import { AxiosResponse } from "axios";


export function EditItem(itemData:Item) {
    const [data, setData] = useState<Item>(itemData)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        api.put(`/storage/${data.id}`, data)
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Product Edited succesfully',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload()
            })
            
        })
        .catch((error:AxiosResponse) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed Editing Product',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(error)
        })
    }



    return(<TableContainer
    sx={{ maxHeight: 470, minWidth: 370, overflow: "revert" }}>
    <Table sx={{ minWidth: 1 }} arial-label="simple label">
        <TableBody>
        <InputGroup>
            {Object.keys(itemData).map((key:string) => {
                return (
                    <>
                        <TableCell>
                            <Typography sx={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "#426636",
                                padding: ".5rem 0 .5rem 0",
                            }}>
                                {key}
                            </Typography>
                        
                            <TextField
                            name={key}
                            fullWidth
                            value={data[key as keyof Item]}
                            onChange={handleChange}
                            disabled={key === "id"}
                            />
                        </TableCell>
                    </>
                )})
            }
            </InputGroup>
        </TableBody>
    <ButtonGroup style={{
                    height:30,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 18,
                    alignItems: 'center'   

                }}>
        <Button onClick={handleSubmit} type="submit">
            Save Product
            <EditIcon sx={{color: '#03e92f', cursor: 'pointer'}} />
        </Button>
    </ButtonGroup>
    </Table>

    </TableContainer>
)

}