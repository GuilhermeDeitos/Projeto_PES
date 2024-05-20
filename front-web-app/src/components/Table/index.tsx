import { Table, TableBody, TableCell, TableHead, TableFooter, TableRow, Select, MenuItem, Button } from "@mui/material";
import { useState } from "react";

interface TableProps {
    columns: string[];
    data: any[];
}

export function CustomTable({ columns, data }: TableProps) {


    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const optionsPage = [5,10,15,20]


    return (
        <Table sx={{
            width: "100%"
        }}>
            <TableHead>
                <TableRow>
                    {columns.map((column, index) => {
                        return (
                            <TableCell key={index}>
                                {column}
                            </TableCell>
                        )
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                        <TableRow key={index}
                            sx={{
                                backgroundColor: row["status"] === 3 ? "#ffbfb0" : row["status"] === 2 ? "#d5e4cf" : row["status"] === 1 ? "#e4fbfb" : "#f0f0f0"
                            }}
                        >
                            {columns.map((column, index) => {
                                return (
                                    <TableCell key={index}>
                                        {
                                            column == "status" ? row[column] === 0 ? "Inativo" : row[column] === 1 ? "Ativo" : row[column] === 2 ? "Admin" : "Bloqueado" : row[column]
                                        }
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>
                        <Button onClick={() => setPage(page - 1)} disabled={page === 0} variant="outlined">Anterior</Button>
                    </TableCell>
                    <TableCell>
                        <Select 
                            onChange={(event) =>{
                                setPage(0)
                                setRowsPerPage(Number(event.target.value))
                            }}
                            sx={{
                                width: "100%"
                            }}
                        value={rowsPerPage}> 
                            {optionsPage.map((option, index) => {
                                return (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                )
                            })}
                        </Select>
                    </TableCell>
                    <TableCell>
                        <Button onClick={() => setPage(page + 1)} disabled={page === Math.floor(data.length / rowsPerPage)} variant="outlined">Próximo</Button>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}