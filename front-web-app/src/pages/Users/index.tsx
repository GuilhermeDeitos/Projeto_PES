import { useState } from "react"
import { SearchField } from "../../components/SearchField"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Drawer, List, ListItem, ListItemText } from "@mui/material"
import { HeaderUsers, BodyUsers } from "./styled"
import { Container } from "./styled"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import tabs from "../../assets/tabs.svg"
import Swal from "sweetalert2"
import Modal from "../../components/Modal"


interface UserData{
    name: string,
    horasTrabalhadas: number,
    status: number,
}

export function UsersPage() {
    const fakeData: UserData[] = [
        {
            name: "Jhon",
            horasTrabalhadas: 10,
            status:3,
        },
        {
            name: "Jane",
            horasTrabalhadas: 10,
            status:3,
        },
        {
            name: "Alice",
            horasTrabalhadas: 10,
            status:1,
        },
        {
            name: "Bob",
            horasTrabalhadas: 10,
            status:1,
        },
        {
            name: "Yudi",
            horasTrabalhadas: 10,
            status:1,
        },
        {
            name: "Deitos",
            horasTrabalhadas: 10,
            status:2,
        },
        {
            name: "Rafael",
            horasTrabalhadas: 10,
            status:1,
        },
        {
            name: "Arthur",
            horasTrabalhadas: 10,
            status:2,
        },
    ]

    const [search, setSearch] = useState<string>("")
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedItem, setselectedItem] = useState<UserData | undefined>(undefined)

    const handleOpen = (type:string, data: UserData) => {
        if(type === "edit") {
            setIsEditModalOpen(true)
        } else if (type === "info") {
            setIsInfoModalOpen(true)
        } 

        setselectedItem(data)
    }

    const handleClose = () => {
            setIsEditModalOpen(false)
            setIsInfoModalOpen(false)
    }

    const handleDeleteModal = () => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, deletar!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deletado!',
                'Usuário deletado.',
                'success'
              )
            }
          })
    }
    const fields = ["Name", "Hours", "Status", "Actions"]

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
                <TableContainer sx={{ maxHeight: 470, minWidth: 370, overflow:"revert" }}>
                    <Table sx={{ minWidth: 1 }} arial-label='simple label'>
                        <TableHead>
                            <TableRow>
                                {fields.map((key, index) => {
                                    return (
                                        <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                                            {key}
                                        </TableCell>
                                    )
                                }
                                )}
            
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((data:UserData, index) => {
                                return (
                                    <TableRow key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&:not(:last-child)': {
                                                paddingBottom: '5px',
                                                paddingTop: '5px',
                                            }
                                        }}>
                                        {Object.keys(data).map((key, index) => {
                                            return (
                                                <TableCell key={index}>
                                                    {key === "status" ? (
                                                        data[key as keyof UserData] === 1 ? "Active" : data[key as keyof UserData] === 2 ? "Blocked" :  data[key as keyof UserData] === 3 ? "Admin" : "Inactive"
                                                    ) :  data[key as keyof UserData]}
                                                </TableCell>
                                            )
                                        }
                                        )}
                                        <TableCell>
                                        <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-around',
                                                        gap: 5,
                                                        alignItems: 'center'
                                                    
                                                    }}>

                                                        <InfoOutlinedIcon sx={{color: '#003775', cursor: 'pointer'}} onClick={() => handleOpen("info",data)} />
                                                        <EditIcon sx={{color: '#eead2d', cursor: 'pointer'}} onClick={() => handleOpen("edit", data)} />
                                                        <DeleteOutlineIcon sx={{color: '#d44038', cursor: 'pointer'}} onClick={handleDeleteModal}/>
                                                    </div>
                                        </TableCell>
                                            
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </BodyUsers>
            <Modal
                width="50%"
                height="50%"
                isModalClosed={handleClose}
                isModalOpen={isInfoModalOpen}
                title="Info User"
            >
                <div>
                    Colocar função aq
                </div>
            </Modal>
            <Modal
                width="50%"
                height="50%"
                isModalClosed={handleClose}
                isModalOpen={isEditModalOpen}
                title="Edit User"
            >
                <div>
                    Colocar função aq
                </div>
            </Modal>

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
