import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';

import {Table,TextField, ButtonBase, ButtonGroup, Button, TextareaAutosize, Typography } from "@mui/material";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { InputGroup } from "../styled";
import { api } from "../../../utils/api";
import Swal from "sweetalert2";
import { AxiosResponse } from "axios";
import { JobData } from "../../../pages/Home";

export function EditJob(itemData:JobData) {
    const [data, setData] = useState<JobData>(itemData)

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
                title: 'Job Edited succesfully',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload()
            })
            
        })
        .catch((error:AxiosResponse) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed Editing Job',
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