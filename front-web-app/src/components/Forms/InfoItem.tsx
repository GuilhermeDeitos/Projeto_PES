import React from "react";
import { Item } from "../../pages/Estoque";
import {Table } from "@mui/material";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";





export function InfoItem(itemData:Item) {


        return(
                <TableContainer
                sx={{ maxHeight: 470, minWidth: 370, overflow: "revert" }}
              >
                <Table sx={{ minWidth: 1 }} arial-label="simple label">
                  <TableHead>
                        <TableCell>
                                <text fontSize={24}>Code: {itemData.id}  </text>
                        </TableCell>
                        <TableCell>
                                <text>Name: </text> {itemData.name}
                        </TableCell>
                        <TableCell>
                                {itemData.image}
                        </TableCell>
                      
                  </TableHead>
                  <TableBody>
                        <TableRow>
                                <TableCell>
                                        <text>Price: </text>
                                </TableCell>
                                <TableCell>
                                        <text>
                                       
                                        </text>
                                </TableCell>
                                <TableCell>
                                        {itemData.price}
                                </TableCell>
                        </TableRow>
                        <TableRow>
                                <TableCell>
                                        <text>In stock: </text>
                                </TableCell>
                                <TableCell>
                                        <text>
                                       
                                        </text>
                                </TableCell>
                                <TableCell>
                                        <text>
                                                {itemData.stock}
                                        </text>
                                </TableCell>
                        </TableRow>
                        <TableRow>
                                <TableCell>
                                        <text>Item Status: </text>
                                </TableCell>
                                <TableCell>
                                        <text>
                                       
                                        </text>
                                </TableCell>
                                <TableCell>
                                        <text>{itemData.status}</text>
                                </TableCell>
                        </TableRow>
                        <TableRow>
                                <TableCell>
                                        <text>Description:</text> 
                                </TableCell>
                                <TableCell>
                                        <text>
                                       
                                        </text>
                                </TableCell>
                                <TableCell>
                                        {itemData.description}
                                </TableCell>
                        </TableRow>
                        </TableBody>    
                </Table>
              </TableContainer>












           /*     <Container>
                        <Table sx={{ minWidth: 1 }} arial-label="simple label">
                                <tbody>
                                <tr>
                                {itemData.image}
                                </tr>
                                <Typography>
                                <text>Name: </text>{itemData.name}
                                </Typography>
                                <Typography>
                                <text>Price: </text>{itemData.price}
                                </Typography>
                                <Typography>
                                <text>In stock: </text>{itemData.stock}
                                </Typography>
                                <Typography>
                                <text>Description: </text>{itemData.description}
                                </Typography>
                                <Typography>
                                <text>Status: </text>{itemData.status}
                                </Typography>
                                </tbody>
                        </Table>
                </Container>*/

        )
}
