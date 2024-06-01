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
  Button,
} from "@mui/material";
import { HeaderUsers, BodyUsers, ButtonEdit } from "./styled";
import { InfoItem } from "../../components/Forms/InfoItem";
import { Container } from "./styled";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import tabs from "../../assets/tabs.svg";
import Swal from "sweetalert2";
import Modal from "../../components/Modal";
import { api } from "../../utils/api";

interface UserData {
  image: string | undefined;
  id: number;
  name: string;
  horasTrabalhadas: number;
  status: number;
  role: string;
}

export function UsersPage() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  /*useEffect(() => {
    api.get("/users/").then((response) => {
      console.log(response);
      setUserData(response.data.data);
      setLoading(false);
    });
  }, []);*/

  const fakeData = [
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbIojNZJMCPt8-xOxWsqY27-XkGea2vq1dg&s",
      id: 1,
      name: "User 1",
      horasTrabalhadas: 10,
      status: 1,
      role: "Admin",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbIojNZJMCPt8-xOxWsqY27-XkGea2vq1dg&s",
      id: 2,
      name: "User 2",
      horasTrabalhadas: 20,
      status: 0,
      role: "User",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbIojNZJMCPt8-xOxWsqY27-XkGea2vq1dg&s",
      id: 3,
      name: "User 3",
      horasTrabalhadas: 30,
      status: 1,
      role: "Admin",
    }
  ];

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

  const handleDeleteModal = (id: number) => {
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
  const fields = ["name", "hours", "role", "status", "Actions"];

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

  const filteredData = fakeData.filter((data: UserData) =>
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
                  {fields.map((key) => (
                    <TableCell key={key} align="center"
                      sx={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#047D98",
                        padding: ".5rem 0 .1rem 0",
                      }}
                    >
                      {key}
                    </TableCell>
                  ))}

                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((data: UserData, index) => {
                  return (
                    <TableRow key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:not(:last-child)': {
                          paddingBottom: '5px',
                          paddingTop: '5px',
                        }
                      }}>
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
                          data[key as keyof UserData]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </BodyUsers>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button component="a" href="/storage">
            <ListItemText primary="Storage" />
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
          image={selectedItem?.image ?? ""}
          id={selectedItem?.id ?? 0}
          name={selectedItem?.name ?? ""}
          horasTrabalhadas={selectedItem?.horasTrabalhadas ?? 0}
          status={selectedItem?.status ?? 0}
          role={selectedItem?.role ?? ""}
        />
      </Modal>
      <Modal
        width="50%"
        height="50%"
        isModalClosed={handleClose}
        isModalOpen={isEditModalOpen}
        title="Editar Produto"
      >
        <div>teste</div>
      </Modal>
    </Container>
  );
}
}