import { useState, useEffect } from "react";
import { SearchField } from "../../components/SearchField";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  ButtonGroup,
  ButtonBase
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { HeaderEstoque, BodyEstoque } from "./styled";
import { InfoItem } from "../../components/Forms/InfoItem";
import {EditItem} from "../../components/Forms/EditItem";
import {AddItem} from "../../components/Forms/AddItem"
import Swal from "sweetalert2";
import { Container } from "./styled";
import Modal from "../../components/Modal";
import tabs from "../../assets/tabs.svg";
import {api} from "../../utils/api";
import React from "react";

//Mexer aqui
export interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  status: number;
}



export function EstoquePage() {

    const [loading, setLoading] = useState<boolean>(false);
    const [storageData, setStorageData] = useState<Item[]>([]);
    //const [fakeData, setFakeData] = useState<Item[]>([]);
  
  

  useEffect(() => {
      api.get("/storage/").then((response) => {
        console.log(response)
        setStorageData(response.data.data);
        setLoading(false);
      });
  }, []);


  const fields = ["id", "name", "price", "quantity", "actions"];

  const [search, setSearch] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setselectedItem] = useState<Item | undefined>(undefined);



  const handleOpen = (type: string, data: Item) => {
    if (type === "edit") {
      setIsEditModalOpen(true);
    } else if (type === "info") {
      setIsInfoModalOpen(true);
    }

    setselectedItem(data);
  };

  const HandleAddOpen = () => 
    {
        setIsAddModalOpen(true)
    }


  const handleClose = () => {
    setIsEditModalOpen(false);
    setIsInfoModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleDeleteModal = (id:number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Cannot Reverse this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Confirm deletion",
    }).then((result) => {
      if (result.isConfirmed) {

        api.delete(`/storage/${id}`).then((response) => {
          console.log(response);
          const newUserData = storageData.filter((data) => data.id !== id);
          setStorageData(newUserData);
          Swal.fire("Deleted!", "Item Deleted Successfully.", "success");
        });
        Swal.fire("Deleted!", "Item Deleted Successfully.", "success");
      }
    });
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };
  
  if(loading) {
    return (
      <Box sx={{ display: 'flex', width:"100%", height:"100vh", alignItems:"center", justifyContent:"center" }}>
        <CircularProgress  size={70}/>
      </Box>
    );
  } else {
    console.log(storageData);
    const filteredData = storageData.filter((data) =>
      JSON.stringify(data).toLowerCase().includes(search)
    );
  return (
    <Container>
      <HeaderEstoque>
        <Typography fontSize={25}>Estoque</Typography>
        <div
          onClick={toggleDrawer(true)}
          style={{ cursor: "pointer", marginRight: 0 }}
        >
          <img
            src={tabs}
            alt="tabs"
            style={{ width: 35, height: 50, marginLeft: 25 }}
          />
        </div>
      </HeaderEstoque>
      <BodyEstoque>
      <TableHead>
                <TableRow>
                <div style={{
                    width: "100%",
                    
                    justifyContent: 'center'             
                }}>
                
                <ButtonGroup>
                    <ButtonBase>
                    <AddIcon sx={{color: '#03e92f', cursor: 'pointer'}}  onClick = {() => HandleAddOpen()}>                        
                    </AddIcon>
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
        <TableContainer
          sx={{ maxHeight: 470, minWidth: 370, overflow: "revert" }}
        >
          <Table sx={{ minWidth: 1 }} arial-label="simple label">
            <TableHead>
              <TableRow>
                {fields.map((key) => (
                  <TableCell
                    key={key}
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: "#426636",
                      padding: ".5rem 0 .5rem 0",
                    }}
                  >
                    {key}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((data: Item, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:not(:last-child)": {
                        paddingBottom: "5px",
                        paddingTop: "5px",
                      },
                    }}
                  >
                    {fields.map((key: string) => (
                      <TableCell
                        key={key}
                        align="center"
                        sx={{
                          width: key === "actions" ? "30%" : "auto",
                        }}
                      >
                        {key === "actions" ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              gap: 5,
                              alignItems: "center",
                            }}
                          >
                            <InfoOutlinedIcon
                              sx={{ color: "#003775", cursor: "pointer" }}
                              onClick={() => handleOpen("info", data)}
                            />
                            <EditIcon
                              sx={{ color: "#eead2d", cursor: "pointer" }}
                              onClick={() => handleOpen("edit", data)}
                            />
                            <DeleteOutlineIcon
                              sx={{ color: "#d44038", cursor: "pointer" }}
                              onClick={() => handleDeleteModal(data.id)}
                            />
                          </div>
                        ) : (
                          data[key as keyof Item]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </BodyEstoque>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
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
        title="Product info:"
      >
        <InfoItem
          description={selectedItem?.description ?? ""}
          id={selectedItem?.id ?? 0}
          name={selectedItem?.name ?? ""}
          price={selectedItem?.price ?? 0}
          status={selectedItem?.status ?? 0}
          quantity={selectedItem?.quantity ?? 0}
        />
      </Modal>
      <Modal
        width="50%"
        height="50%"
        isModalClosed={handleClose}
        isModalOpen={isEditModalOpen}
        title="Edit Product:"
      >
        <EditItem
          description={selectedItem?.description ?? ""}
          id={selectedItem?.id ?? 0}
          name={selectedItem?.name ?? ""}
          price={selectedItem?.price ?? 0}
          status={selectedItem?.status ?? 0}
          quantity={selectedItem?.quantity ?? 0}
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
  );
}
}
