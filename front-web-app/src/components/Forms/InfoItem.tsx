import React from "react";
import { Item } from "../../pages/Estoque";
import { Typography,Container,Table } from "@mui/material";



export function InfoItem(itemData:Item) {


        return(
                <Container>
                        <Table>
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
                </Container>

        )
}
