import { useEffect, useState } from "react";
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
} from "@mui/material";
import { HeaderUsers, BodyUsers } from "./styled";
import { Container } from "./styled";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import tabs from "../../assets/tabs.svg";
import Swal from "sweetalert2";
import Modal from "../../components/Modal";
import { api } from "../../utils/api";

interface UserData {
  id: number;
  name: string;
  horasTrabalhadas: number;
  status: number;
  role: string;
}

export function UsersPage() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    api.get("/users/").then((response) => {
      console.log(response);
      setUserData(response.data.data);
      setLoading(false);
    });
  }, []);
  const [search, setSearch] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setselectedItem] = useState<UserData | undefined>(
    undefined
  );

  const handleOpen = (type: string, data: UserData) => {
    if (type === "edit") {
      setIsEditModalOpen(true);
    } else if (type === "info") {
      setIsInfoModalOpen(true);
    }

    setselectedItem(data);
  };

  const handleClose = () => {
    setIsEditModalOpen(false);
    setIsInfoModalOpen(false);
  };

  const handleDeleteModal = (id:number) => {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, deletar!",
    }).then((result) => {
      if (result.isConfirmed) {

        api.delete(`/users/${id}`).then((response) => {
          console.log(response);
          const newUserData = userData.filter((data) => data.id !== id);
          setUserData(newUserData);
          Swal.fire("Deletado!", "Usuário deletado.", "success");

        }).catch((error) => {
          Swal.fire("Erro!", "Erro ao deletar usuário.", "error");
        });

      }
    });
  };
  const fields = ["name", "hours", "role", "status","Actions"];

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

  const filteredData = userData.filter((data: UserData) =>
    JSON.stringify(data).toLowerCase().includes(search)
  );
  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  } else {
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
