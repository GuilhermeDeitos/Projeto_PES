import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import {Table,TextField, ButtonBase, ButtonGroup, Button, Box } from "@mui/material";
import {
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { InputGroup } from "./styled";
import Swal from "sweetalert2";
import { api } from "../../utils/api";


export interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    status: number;
}



export function AddItem() {
    const [items, setItems] = useState<Item>({
        id: 0,
        name: "",
        price: 0,
        quantity: 0,
        description: "",
        status: 0
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItems({
            ...items,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e:any) => {
        api.post(`/storage/`, items)
        .then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Product Added Succesfully',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload()
            })
            
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Failure adding product',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }



    return(<TableContainer
    sx={{ maxHeight: 470, minWidth: 370, overflow: "revert" }}>
    <Table sx={{ minWidth: 1 }} arial-label="simple label">
        <TableBody>
        <InputGroup>
            {Object.keys(items).map(item =>{
                if(item === "id" || item === "status") return null
                return(
                    <TableRow key={item} sx={{
                        padding:".5rem"
                    }}>
                                <TextField
                                    type="text"
                                    name={item}
                                    value={items[item as keyof Item]}
                                    onChange={handleChange}
                                    variant="standard"
                                    label={item}
                                    sx={{width: "100%",}}
                                />
                    </TableRow>
                )
            })}
            </InputGroup>
        </TableBody>
    </Table>
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
    </TableContainer>)
// return('teste')
}