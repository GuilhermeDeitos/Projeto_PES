import { CardTrabalhos } from "../../components/CardTrabalhos"
import { Container } from "./styled"
import { SearchField } from "../../components/SearchField"
import { useState, useEffect } from "react"
import { api } from "../../utils/api"
import { CircularProgress, Box } from "@mui/material"

interface JobData{
    address: string;
    title: string;
    description: string;
    image: string;
    progress: number;
    value: number;

}
export function Home(){

    const [loading, setLoading] = useState<boolean>(true)
    const [jobsData, setJobsData] = useState<JobData[]>([])
    const [search, setSearch] = useState<string>("")

    useEffect(() => {
        api.get("/jobs/").then((response) => {
            console.log(response)
            setJobsData(response.data.data)
            setLoading(false)
        })
    }, [])

    const filteredData = jobsData.filter(data => JSON.stringify(data).toLowerCase().includes(search))
    return (
        <Container>
            <SearchField
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            {
                filteredData.map((data, index) => {
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
        </Container>
    )
}