import { useState } from "react"
import { SearchField } from "../../components/SearchField"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, List, ListItem, ListItemText } from "@mui/material"
import { HeaderUsers, BodyUsers, ButtonEdit } from "./styled"
import { Container } from "./styled"
import imagemUser from "../../assets/users.jpg"
import tabs from "../../assets/tabs.svg"

export function UsersPage() {
    const fakeData: any[] = [
        {
            name: "Jhon",
            horasTrabalhadas: 10,
            status:"Admin",
            image: imagemUser
        },
        {
            name: "Jane",
            horasTrabalhadas: 10,
            status:"Admin",
            image: imagemUser
        },
        {
            name: "Alice",
            horasTrabalhadas: 10,
            status:"Admin",
            image: imagemUser
        },
        {
            name: "Bob",
            horasTrabalhadas: 10,
            status:"Admin",
            image: imagemUser
        },
        {
            name: "Yudi",
            horasTrabalhadas: 10,
            status:"Admin",
            image: imagemUser
        },
        {
            name: "Deitos",
            horasTrabalhadas: 10,
            status:"Bloqueado",
            image: imagemUser
        },
        {
            name: "Rafael",
            horasTrabalhadas: 10,
            status:"Admin",
            image: imagemUser
        },
        {
            name: "Arthur",
            horasTrabalhadas: 10,
            status:"Admin",
            image: imagemUser
        },
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
            <HeaderUsers>
                <Typography fontSize={25}>Users</Typography>
                <div onClick={toggleDrawer(true)} style={{ cursor: 'pointer' }}>
                    <img src={tabs} alt="tabs" style={{ width: 35, height: 50, marginLeft: 25 }} />
                </div>
            </HeaderUsers>
            <BodyUsers>
                <SearchField
                    placeholder="Search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <TableContainer sx={{ maxHeight: 470, minWidth: 370 }}>
                    <Table sx={{ minWidth: 1 }} arial-label='simple label'>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Email</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((data, index) => {
                                return (
                                    <TableRow key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&:not(:last-child)': {
                                                paddingBottom: '5px',
                                                paddingTop: '5px',
                                            }
                                        }}>
                                        <TableCell>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleClickOpen(data)}>
                                                <img src={data.image} alt="imagem" style={{ width: 50, height: 50, borderRadius: 50 }} />
                                                <div>{data.name}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="center">{data.horasTrabalhadas}</TableCell>
                                        <TableCell align="center">{data.status}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </BodyUsers>
            <ButtonEdit>
                <Button variant="contained" sx = {{backgroundColor:'#047D98',
                '&:hover':{
                    backgroundColor:'#047D98',
                },
                '&:active':{
                    backgroundColor:'#047D98',
                },
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
                borderRadius: 10,
                height: 50,
                width: 200,
                position: 'fixed',
                bottom: 15,
        

                }}>Edit Users</Button>
            </ButtonEdit>
            


            <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button component="a" href="/storage">
                        <ListItemText primary="Storage" />
                    </ListItem>
                    <ListItem button component="a" href="/home">
                        <ListItemText primary="Home" />
                    </ListItem>
                    {/* Add more links as needed */}
                </List>
            </Drawer>
        </Container>
    )
}
