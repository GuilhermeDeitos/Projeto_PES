import { useState } from "react"
import { SearchField } from "../../components/SearchField"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Drawer, List, ListItem, ListItemText } from "@mui/material"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { HeaderEstoque, BodyEstoque } from "./styled"
import { InfoItem } from "../../components/Forms/InfoItem"
import Swal from "sweetalert2";
import { Container } from "./styled"
import estoque1imagem from "../../assets/estoque1.jpg"
import Modal from "../../components/Modal"
import tabs from "../../assets/tabs.svg"

//Mexer aqui
export interface Item {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    description: string;
    status: number;

}

export function EstoquePage() {
    const fakeData: Item[] = [
        {
            id: 1,
            name: "Produto 1",
            price: 17.99,
            stock: 10,
            image: estoque1imagem,
            description: "Produto de alta qualidade",
            status: 1
        },
        {
            id: 2,
            name: "Produto 2",
            price: 17.99,
            stock: 20,
            image: estoque1imagem,
            description: "Produto de alta qualidade",
            status: 1

        },
        {
            id: 3,
            name: "Produto 3",
            price: 17.99,
            stock: 30,
            image: estoque1imagem,
            description: "Produto de alta qualidade",
            status: 1
        },
        {
            id: 4,
            name: "Produto 4",
            price: 17.99,
            stock: 40,
            image: estoque1imagem,
            description: "Produto de alta qualidade",
            status: 1
        },
        {
            id: 5,
            name: "Produto 5",
            price: 17.99,
            stock: 50,
            image: estoque1imagem,
            description: "Produto de alta qualidade",
            status: 1
        },
        {
            id: 6,
            name: "Produto 6",
            price: 17.99,
            stock: 60,
            image: estoque1imagem,
            description: "Produto de alta qualidade",
            status: 1
        },
        {
            id: 7,
            name: "Produto 7",
            price: 17.99,
            stock: 70,
            image: estoque1imagem,
            description: "Produto de alta qualidade",
            status: 1
        },
        {
            id: 8,
            name: "Produto 8",
            price: 17.99,
            stock: 80,
            image: estoque1imagem,
            description: "Produto de alta qualidade",
            status: 1
        },
        {
            id: 9,
            name: "Produto 9",
            price: 17.99,
            stock: 90,
            image: estoque1imagem,
            description: "Produto de alta qualidade",
            status: 1
        },
        {
            id: 10,
            name: "Produto 10",
            price: 17.99,
            stock: 100,
            image: estoque1imagem,
            description: "Produto de alta qualidade",
            status: 1
        },
    ]

    const fields = ["id", "name", "price", "stock", "actions"]

    const [search, setSearch] = useState<string>("")

    
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
                <SearchField
                    placeholder="Search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <TableContainer sx={{maxHeight:470, minWidth:370, overflow:"revert"}}>
                    <Table sx = {{minWidth: 1}} arial-label = 'simple label'>
                    <TableHead>
                        <TableRow>
                            {
                                fields.map((key) => (
                                    <TableCell key={key} align="center" sx={{fontWeight: 'bold', fontSize: 16, color: '#A0CC90', padding:".5rem 0 .5rem 0"}}>{key}</TableCell>
                                ))
                            }
                        </TableRow>
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
                 title="Editar Produto"
                 >
                    <div>
                        teste
                    </div>
                 </Modal>
        </Container>
            
            
            
    )
}
