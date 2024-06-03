import { useState } from "react"
import { SearchField } from "../../components/SearchField"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Drawer, List, ListItem, ListItemText, ButtonGroup,ButtonBase } from "@mui/material"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { HeaderEstoque, BodyEstoque } from "./styled"
import { InfoItem } from "../../components/Forms/InfoItem"
import {EditItem} from "../../components/Forms/EditItem"
import {AddItem} from "../../components/Forms/AddItem"
import Swal from "sweetalert2";
import { Container } from "./styled"
import estoque1imagem from "../../assets/estoque1.jpg"
import Modal from "../../components/Modal"
import tabs from "../../assets/tabs.svg"
import React from "react";

//Mexer aqui
export interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    description: string;
    status: number;

}

export function EstoquePage() {

    const fields = ["id", "name", "price", "stock", "actions"]

    const [search, setSearch] = useState<string>("")

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedItem, setselectedItem] = useState<Item | undefined>(undefined)

    const handleOpen = (type:string, data: Item) => {
        if(type === "edit") {
            setIsEditModalOpen(true)
        } else if (type === "info") {
            setIsInfoModalOpen(true)
        }


        setselectedItem(data)
    }

    const HandleAddOpen = () => 
        {
            setIsAddModalOpen(true)
        }

    const handleClose = () => {
            setIsEditModalOpen(false)
            setIsInfoModalOpen(false)
            setIsAddModalOpen(false)

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
                'Seu Item foi deletado.',
                'success'
              )
            }
          })
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
                <div onClick={toggleDrawer(true)} style={{ cursor: 'pointer', marginRight:0  }}>
                    <img src={tabs} alt="tabs" style={{ width: 35, height: 50, marginLeft: 25}} />
                </div>
            </HeaderEstoque>
            <BodyEstoque>
                <TableHead>
                <TableRow>
                <div style={{
                    width: 500,
                    marginRight: 25,
                    marginLeft: 0,
                    justifyContent: 'center'             
                }}>
                
                <ButtonGroup>
                    <ButtonBase>
                    <EditIcon sx={{color: '#03e92f', cursor: 'pointer'}}  onClick = {() => HandleAddOpen()}>                        
                    </EditIcon>
                    </ButtonBase>
                </ButtonGroup>
                
                <SearchField
                    placeholder="Search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                </div>
                </TableRow>
                </TableHead>
                <TableContainer sx={{maxHeight:470, minWidth:370, overflow:"revert"}}>
                    <Table sx = {{minWidth: 1}} arial-label = 'simple label'>
                    <TableHead>
                        <TableRow>
                            {
                                fields.map((key) => (
                                    <TableCell key={key} align="center" sx={{fontWeight: 'bold', fontSize: 16, color: '#A0CC90', padding:".5rem 0 .5rem 0"}}>{key}</TableCell>
                                ))
                            }
                        </TableRow> data
                    </TableHead>
                    <TableBody>
                        {filteredData.map((data: Item, index) => {
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
                                        fields.map((key:string) => (
                                            <TableCell key={key} align="center" sx={{
                                                width: key === "actions" ? "30%" : "auto",
                                            }}>
                                                {key === "actions" ? (
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
                                                ) : data[key as keyof Item]}
                                            </TableCell>
                                        ))
                                    }
                                    
                                </TableRow>
                            )
                        })} 
                    </TableBody>
                </Table>
                </TableContainer>
                

                
            </BodyEstoque>

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
            <Modal
                width="50%"
                height="50%"
                isModalClosed={handleClose}
                isModalOpen={isInfoModalOpen}
                title="Detalhes do Produto"
            >
                <InfoItem
                    description={selectedItem?.description ?? ''}
                    id={selectedItem?.id ?? 0}
                    image={selectedItem?.image ?? ""}
                    name={selectedItem?.name ?? ""}
                    price={selectedItem?.price ?? 0}
                    status={selectedItem?.status ?? 0}
                    stock={selectedItem?.stock ?? 0}
                />
            </Modal>   
            <Modal
                 width="50%"
                 height="50%"
                 isModalClosed={handleClose}
                 isModalOpen={isEditModalOpen}
                 title="Edit Product Information"
                 >
                    <EditItem
                    description={selectedItem?.description ?? ''}
                    id={selectedItem?.id ?? 0}
                    image={selectedItem?.image ?? ""}
                    name={selectedItem?.name ?? ""}
                    price={selectedItem?.price ?? 0}
                    status={selectedItem?.status ?? 0}
                    stock={selectedItem?.stock ?? 0}
                    />
                 </Modal>
            <Modal
                 width="50%"
                 height="50%"
                 isModalClosed={handleClose}
                 isModalOpen={isAddModalOpen}
                 title="Add New Product">
                 <AddItem>

                 </AddItem>
            </Modal>
        </Container>
            
            
            
    )
}
