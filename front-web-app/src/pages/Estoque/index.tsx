import { useState } from "react"
import { SearchField } from "../../components/SearchField"
import { Button, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { HeaderEstoque, BodyEstoque, ButtonEdit } from "./styled"
import { Container } from "./styled"
import estoque1imagem from "../../assets/estoque1.jpg"

//Mexer aqui

export function EstoquePage() {
    const fakeData: any[] = [
        {
            id: 1,
            name: "Produto 1",
            price: "tinta",
            stock: 10,
            image: estoque1imagem
        },
        {
            id: 2,
            name: "Produto 2",
            price: "tinta",
            stock: 20,
            image: estoque1imagem
        },
        {
            id: 3,
            name: "Produto 3",
            price: "ferramenta",
            stock: 30,
            image: estoque1imagem
        },
        {
            id: 4,
            name: "Produto 4",
            price: "ferramenta",
            stock: 40,
            image: estoque1imagem
        },
        {
            id: 5,
            name: "Produto 5",
            price: "ferramenta",
            stock: 50,
            image: estoque1imagem
        },
        {
            id: 6,
            name: "Produto 6",
            price: "ferramenta",
            stock: 60,
            image: estoque1imagem
        },
        {
            id: 7,
            name: "Produto 7",
            price: "tinta",
            stock: 70,
            image: estoque1imagem
        },
        {
            id: 8,
            name: "Produto 8",
            price: "ferramenta",
            stock: 80,
            image: estoque1imagem
        },
        {
            id: 9,
            name: "Produto 9",
            price: "tinta",
            stock: 90,
            image: estoque1imagem
        },
        {
            id: 10,
            name: "Produto 10",
            price: "ferramenta",
            stock: 100,
            image: estoque1imagem
        }

    ]

    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)
    const [orderBy, setOrderBy] = useState<string>("code")
    const [order, setOrder] = useState<string>("asc")
    const optionsPage = [fakeData.length, 5, 10, 15, 20]
    const keys = Object.keys(fakeData[0])

    const [filteredData, setFilteredData] = useState<any[]>(fakeData.filter(data => JSON.stringify(data).toLowerCase().includes(search)))

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
        setFilteredData(filteredData.sort((a, b) =>
            (a[property] < b[property] ? -1 : 1) * (isAsc ? 1 : -1)
        ))

    }

    


    return (
        <Container>
            <HeaderEstoque>
                <Typography fontSize={25}>Estoque</Typography>
            </HeaderEstoque>
            <BodyEstoque>
                <span>
                <SearchField
                        placeholder="Search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                <TableRow sx={{
                    
                }}>
                   
                    <TableCell sx={{
                        padding:1
                    }}>
                        <Button onClick={() => setPage(page - 1)} disabled={page === 0} variant="outlined">Anterior</Button>
                    </TableCell>
                    <TableCell  sx={{
                        padding:1                    }}>
                        <Select 
                            onChange={(event) =>{
                                setPage(0)
                                setRowsPerPage(Number(event.target.value))
                            }}
                            sx={{
                                width: "100%",
                            }}
                        value={rowsPerPage}> 
                            {optionsPage.map((option, index) => {
                                return (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                )
                            })}
                        </Select>
                    </TableCell>
                    <TableCell  sx={{
                        padding:1
                    }}>
                        <Button onClick={() => setPage(page + 1)} disabled={page === Math.floor(fakeData.length / rowsPerPage)} variant="outlined">Próximo</Button>
                    </TableCell>
                </TableRow>
                </span>
                <TableContainer sx={{maxHeight:470, minWidth:370}}>
                    <Table sx = {{minWidth: 1}} arial-label = 'simple label'>
                    <TableHead>
                        <TableRow>
                            {keys.map((key, index) => {
                                return (
                                    <TableCell sx={{fontStyle:"bold"}} key={index} onClick={() => handleRequestSort(key)}>
                                        {key}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
                            return (
                                <TableRow key={index}
                                    sx={{'&:last-child td, &:last-child th': 
                                    { border: 0 },
                                    '&:not(:last-child)':{
                                        paddingBottom: '5px',
                                        paddingTop: '5px',
                                    }
                                    }}>
                                    {
                                        keys.map((key, index) => {
                                            return (
                                                <TableCell key={index}>
                                                    {key === "image" ? <img src={data[key]} alt="imagem" style={{width: 50, height: 50}}/> : data[key]}
                                                </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            )
                        })} 
                    </TableBody>
                </Table>
                </TableContainer>
                

                
            </BodyEstoque>
            <ButtonEdit>
                <Button variant="contained" sx = {{backgroundColor:'#A0CC90',
                '&:hover':{
                    backgroundColor:'#A0CC90',
                },
                '&:active':{
                    backgroundColor:'#A0CC90',
                },
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
                borderRadius: 10,
                height: 50,
                width: 200,
                position: 'fixed',
                bottom: 15,
        

                }}>Editar produtos</Button>
            </ButtonEdit>
            
            
            
        </Container>
    )
}