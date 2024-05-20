import { CardTrabalhos } from "../../components/CardTrabalhos"
import { Container } from "./styled"
import { SearchField } from "../../components/SearchField"
import { useState } from "react"



export function Home(){

    const fakeData = [
        {
            address: "Rua 1",
            title: "Title 1",
            description: "Description 1",
            image: "https://www.w3schools.com/w3images/lights.jpg",
            progress: 50,
            value: 19900
        },
        {
            address: "Rua 2",
            title: "Title 2",
            description: "Description 2",
            image: "https://www.w3schools.com/w3images/lights.jpg",
            progress: 75,
            value: 10000
        },
        {
            address: "Rua 3",
            title: "Title 3",
            description: "Description 3",
            image: "https://www.w3schools.com/w3images/lights.jpg",
            progress: 25,
            value: 5000
        },
        {
            address: "Rua 4",
            title: "Title 4",
            description: "Description 4",
            image: "https://www.w3schools.com/w3images/lights.jpg",
            progress: 100,
            value: 1000
        }
    ]
    const [search, setSearch] = useState<string>("")

    const filteredData = fakeData.filter(data => JSON.stringify(data).toLowerCase().includes(search))
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
                            image={data.image}
                            progress={data.progress}
                            value={data.value}
                        />
                    )
                })
            }
        </Container>
    )
}