



import React from "react";
import { Item } from "../../pages/Estoque/index(teste)";
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




const HandleEdit = (data:Item) => {
    
}


export function EditItem(itemData:Item) {




    return(<TableContainer
    sx={{ maxHeight: 470, minWidth: 370, overflow: "revert" }}>
    <Table sx={{ minWidth: 1 }} arial-label="simple label">
        <TableHead>
            <TableCell>
                <text> Edit Product Information </text>
            </TableCell>
        </TableHead>
        <TableBody>
        <InputGroup>
            <TableCell>
                  <TextField
                    type="text"
                    placeholder={itemData.name}
                    variant="outlined"
                    name={itemData.name}
                    //onChange={handleChange}
                    required
                  />
            </TableCell>
            <TableCell>
                  <TextField
                    type="text"
                    placeholder={itemData.price.toString()}
                    variant="outlined"
                    name={itemData.price.toString()}
                    //onChange={handleChange}
                    required
                  />
             </TableCell>
             <TableCell>
                   <TextField
                   type="text"
                   placeholder={itemData.stock.toString()}
                   variant="outlined"
                   name={itemData.stock.toString()}
                   //onChange={Handlehange}
                   required
                   />
            </TableCell>
                   <TextField
                   type="text"
                    placeholder={itemData.status.toString()}
                    variant="outlined"
                    name={itemData.status.toString()}
                    //onChange={handleChange}
                    required
                    />
            <TableCell>
                    <TextField
                    type="text"
                    placeholder={itemData.description}
                    variant="outlined"
                    name={itemData.description}
                    //onChange={handleChange}
                    required/>
            </TableCell>
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
            <EditIcon sx={{color: '#03e92f', cursor: 'pointer'}}  onClick = {() => HandleEdit(itemData)} />
        </ButtonBase>
        <ButtonBase>
            <CloseIcon sx={{color: '#d44038',cursos: 'pointer'}}>teste2</CloseIcon> 
        </ButtonBase>
        </div>
    </ButtonGroup>
    </TableContainer>)
// return('teste')
}