import { CardTrabalhos } from "../../components/CardTrabalhos"
import { Container, HeaderHome } from "./styled"
import { SearchField } from "../../components/SearchField"
import { useState, useEffect } from "react"
import { api } from "../../utils/api"
import { CircularProgress, Box, Typography, List, ListItem, ListItemText, Drawer } from "@mui/material"
import { Style } from "@mui/icons-material"
import img from "../../assets/tabs.svg"


interface JobData{
    address: string;
    title: string;
    description: string;
    image: string;
    progress: number;
    value: number;

}
export function Home(){

    const fakeData = [
        {
            address: "teste, 123",
            title: "seu joao",
            description: "Descrição do item 1",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbIojNZJMCPt8-xOxWsqY27-XkGea2vq1dg&s",
            progress: 70,
            value: 1,
        },
        {
            address: "teste, 123",
            title: "seu joao",
            description: "Descrição do item 2",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbIojNZJMCPt8-xOxWsqY27-XkGea2vq1dg&s",
            progress: 70,
            value: 1,
        },
        {
            address: "teste, 123",
            title: "seu joao",
            description: "Descrição do item 3",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbIojNZJMCPt8-xOxWsqY27-XkGea2vq1dg&s",
            progress: 70,
            value: 1,
        },
        {
            address: "teste, 123",
            title: "seu joao",
            description: "Descrição do item 4",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbIojNZJMCPt8-xOxWsqY27-XkGea2vq1dg&s",
            progress: 70,
            value: 1,
        },
        {
            address: "teste, 123",
            title: "seu joao",
            description: "Descrição do item 5",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbIojNZJMCPt8-xOxWsqY27-XkGea2vq1dg&s",
            progress: 70,
            value: 1,
        },
        {
            address: "teste, 123",
            title: "seu joao",
            description: "Descrição do item 6",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbIojNZJMCPt8-xOxWsqY27-XkGea2vq1dg&s",
            progress: 70,
            value: 1,
        },
    ]
        

        
    const [loading, setLoading] = useState<boolean>(false)
    const [jobsData, setJobsData] = useState<JobData[]>([])
    const [search, setSearch] = useState<string>("")
    const [drawerOpen, setDrawerOpen] = useState(false);


    /*useEffect(() => {
        api.get("/jobs/").then((response) => {
            console.log(response)
            setJobsData(response.data.data)
            setLoading(false)
        })
    }, [])*/

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

    const filteredData = fakeData.filter((data: JobData) => JSON.stringify(data).toLowerCase().includes(search))
    return (
        <Container>
            <SearchField
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <HeaderHome>
                <Typography fontSize={25}>Home</Typography>
                <div onClick={toggleDrawer(true)} style = {{cursor:"pointer"}}>
                    <img src={img} alt="tabs" style={{width: 35, height: 50, marginLeft: 25}}/>
                </div>
            </HeaderHome>
            {
                filteredData.map((data: JobData, index) => {
                    return (
                        <CardTrabalhos
                            key={index}
                            address={data.address}
                            title={data.title}
                            description={data.description}
                            image={data.image ? data.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbIojNZJMCPt8-xOxWsqY27-XkGea2vq1dg&s"}
                            progress={data.progress}
                            value={data.value}
                        />
                    )
                })
            }

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
        </Container>
        
    )
}