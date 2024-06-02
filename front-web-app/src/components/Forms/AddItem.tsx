



import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import {Table,TextField, ButtonBase, ButtonGroup } from "@mui/material";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { InputGroup } from "./styled";
import Swal from "sweetalert2";

/*const [Name, setName] = useState<string>(" ")
const [Price, setPrice] = useState<string>(" ")
const [Status, setStatus] = useState<string>(" ")
const [Description, setDescription] = useState<string>(" ")
const HandleAdd = () => {
        if(Name == "")
            {
                Swal.fire({
                    title: 'Error',
                    text: "Empty camp detected",
                    icon: 'warning',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'try again'
                  })
            }
        if(Price == "")
            {
                Swal.fire({
                    title: 'Error',
                    text: "Empty camp detected",
                    icon: 'warning',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'try again'
                  })

            }
        if(Status == "")
            {
                Swal.fire({
                    title: 'Error',
                    text: "Empty camp detected",
                    icon: 'warning',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'try again'
                  })

            }
        if(Description == "")
            {
                Swal.fire({
                    title: 'Error',
                    text: "Empty camp detected",
                    icon: 'warning',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'try again'
                  })

            }
               
}
*/

export function AddItem() {




    return(<TableContainer
    sx={{ maxHeight: 470, minWidth: 370, overflow: "revert" }}>
    <Table sx={{ minWidth: 1 }} arial-label="simple label">
        <TableHead>
            <TableCell>
                <text> Add new product </text>
            </TableCell>
        </TableHead>
        <TableBody>
        <InputGroup>
            <TableCell>
                  <TextField
                    type="text"
                    placeholder={"name"}
                    variant="outlined"
                    name={"name"}
 //                   onChange={(event) => setName(event.target.value)}
                    required
                  />
            </TableCell>
            <TableCell>
                  <TextField
                    type="text"
                    placeholder={"Price"}
                    variant="outlined"
                    name={"Price"}
   //                 onChange={(event) => setPrice(event.target.value)}
                    required
                  />
             </TableCell>
             <TableCell>
                   <TextField
                   type="text"
                   placeholder={"Status"}
                   variant="outlined"
                   name={"Status"}
     //              onChange={(event) => setStatus(event.target.value)}
                   required
                   />
            </TableCell>
                   <TextField
                   type="text"
                    placeholder={"description"}
                    variant="outlined"
                    name={"description"}
       //             onChange={(event) => setDescription(event.target.value)}
                    required
                    />
            </InputGroup>
        </TableBody>
    </Table>
    <ButtonGroup>
    <div style={{
                    height:30,
                    display: 'flex',
                    justifyContent: 'space-around',
                    gap: 18,
                    alignItems: 'center'                                 
                }}>
        <ButtonBase>
            <EditIcon sx={{color: '#03e92f', cursor: 'pointer'}}/>
        </ButtonBase>
        <ButtonBase>
            <CloseIcon sx={{color: '#d44038',cursos: 'pointer'}}>teste2</CloseIcon> 
        </ButtonBase>
        </div>
    </ButtonGroup>
    </TableContainer>)
// return('teste')
}