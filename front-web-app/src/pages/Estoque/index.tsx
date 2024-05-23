import { useState } from "react"
import { SearchField } from "../../components/SearchField"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Drawer, List, ListItem, ListItemText } from "@mui/material"
import { HeaderEstoque, BodyEstoque, ButtonEdit } from "./styled"
import { Container } from "./styled"
import estoque1imagem from "../../assets/estoque1.jpg"
import tabs from "../../assets/tabs.svg"

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

    
    const [open, setOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<any>(null)

    const handleClickOpen = (user: any) => {
        setSelectedUser(user)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedUser(null)
    }

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return
        }
        setDrawerOpen(open)
    }
        const filteredData = fakeData.filter(data => JSON.stringify(data).toLowerCase().includes(search))
    

    


    return (
        <Container>
            <HeaderEstoque>
                <Typography fontSize={25}>Estoque</Typography>
                <div onClick={toggleDrawer(true)} style={{ cursor: 'pointer' }}>
                    <img src={tabs} alt="tabs" style={{ width: 35, height: 50, marginLeft: 25 }} />
                </div>
            </HeaderEstoque>
            <BodyEstoque>
                <SearchField
                    placeholder="Search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <TableContainer sx={{maxHeight:470, minWidth:370}}>
                    <Table sx = {{minWidth: 1}} arial-label = 'simple label'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight:"bold"}} >Produto</TableCell>
                            <TableCell align="right" sx={{fontWeight:"bold"}}>Code</TableCell>
                            <TableCell align="right" sx={{fontWeight:"bold"}}>Categoria</TableCell>
                            <TableCell align="right" sx={{fontWeight:"bold"}}>Qnt.</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((data, index) => {
                            return (
                                <TableRow key={index}
                                    sx={{'&:last-child td, &:last-child th': 
                                    { border: 0 },
                                    '&:not(:last-child)':{
                                        paddingBottom: '5px',
                                        paddingTop: '5px',
                                    }
                                    }}>
                                    <TableCell>
                                        <div style={{display: 'flex', flexDirection:'column', alignItems:'center',}}>
                                            <img src={data.image} alt="Imagem do produto" style=
                                            {{width: 60, height: 60}}/>
                                            <div>{data.name}</div>
                                        </div>
                                        
                                    </TableCell>
                                    <TableCell align="center" >{data.id}</TableCell>
                                    <TableCell align="center" >{data.price}</TableCell>
                                    <TableCell align="center" >{data.stock}</TableCell>
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

            <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button component="a" href="/Users">
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button component="a" href="/home">
                        <ListItemText primary="Home" />
                    </ListItem>
                    
                </List>
            </Drawer>
        </Container>
            
            
            
    )
}
