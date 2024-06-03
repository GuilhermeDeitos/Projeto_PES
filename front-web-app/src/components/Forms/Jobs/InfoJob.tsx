import React from "react";
import { Table } from "@mui/material";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { JobData } from "../../../pages/Home";

export function InfoJob(itemData: JobData) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
  });
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
                  {key === "value" ? formatter.format(itemData.value) : (itemData as JobData)[key as keyof JobData]}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
