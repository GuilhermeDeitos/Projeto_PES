import { CardTrabalhos } from "../../components/CardTrabalhos";
import { Container, HeaderHome } from "./styled";
import { SearchField } from "../../components/SearchField";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import {
  CircularProgress,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Drawer,
  ButtonGroup,
  ButtonBase,
} from "@mui/material";
import img from "../../assets/tabs.svg";
import Add from "@mui/icons-material/Add";
import { AddJob } from "../../components/Forms/Jobs/AddJob";
import Modal from "../../components/Modal";
import { EditJob } from "../../components/Forms/Jobs/EditJob";

export interface JobData {
  id: number;
  address: string;
  title: string;
  description: string;
  image?: string;
  progress: number;
  value: number;
}
export function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [jobsData, setJobsData] = useState<JobData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditModalOpen, SetIsEditModalOpen] = useState(false);


  const handleClose = () => {
    setIsAddModalOpen(false);
    SetIsEditModalOpen(false);
  };

  const handleAddOpen = () => {
    setIsAddModalOpen(true);
    SetIsEditModalOpen(true);
  };

  useEffect(() => {
    api.get("/jobs/").then((response) => {
      console.log(response);
      setJobsData(response.data.data);
      setLoading(false);
    });
  }, []);

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

  const filteredData = jobsData.filter((data: JobData) =>
    JSON.stringify(data).toLowerCase().includes(search)
  );
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Container>
      <div
        style={{
          width: "100%",
          display: "flex",

          justifyContent: "center",
        }}
      >
        <ButtonGroup>
          <ButtonBase>
            <Add
              sx={{ color: "#03e92f", cursor: "pointer" }}
              onClick={() => handleAddOpen()}
            ></Add>
          </ButtonBase>
        </ButtonGroup>

        <SearchField
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <HeaderHome>
        <Typography fontSize={25}>Home</Typography>
        <div onClick={toggleDrawer(true)} style={{ cursor: "pointer" }}>
          <img
            src={img}
            alt="tabs"
            style={{ width: 35, height: 50, marginLeft: 25 }}
          />
        </div>
      </HeaderHome>
      {filteredData.map((data: JobData, index) => {
        return (
          <CardTrabalhos
            key={index}
            id={data.id}
            address={data.address}
            title={data.title}
            description={data.description}
            image={
              data.image
                ? data.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbIojNZJMCPt8-xOxWsqY27-XkGea2vq1dg&s"
            }
            progress={data.progress}
            value={data.value}
          />
        );
      })}

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button component="a" href="/storage">
            <ListItemText primary="Storage" />
          </ListItem>
          <ListItem button component="a" href="/users">
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>
      
      <Modal
        width="50%"
        height="50%"
        isModalClosed={handleClose}
        isModalOpen={isAddModalOpen}
        title="Add New Job">
        <AddJob/>
        </Modal>
    </Container>
  );
}
