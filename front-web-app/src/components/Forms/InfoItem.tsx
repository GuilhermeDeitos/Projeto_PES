import React from "react";
import { Item } from "../../pages/Estoque/index(teste)";
import { Table } from "@mui/material";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { UserData } from "../../pages/Users";

export function InfoItem(itemData: Item | UserData) {
  return (
    <TableContainer sx={{ maxHeight: 470, minWidth: 370, overflow: "revert" }}>
      <Table sx={{ minWidth: 1 }} arial-label="simple label">
        <TableBody>
          {Object.keys(itemData).map((key: string) => {
            return (
              <TableRow key={key}>
                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: "#426636",
                      padding: ".5rem 0 .5rem 0",
                    }}
                  >
                    {key}
                  </Typography>
                </TableCell>
                <TableCell>
                  <text>{(itemData as Item)[key as keyof Item]}</text>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
