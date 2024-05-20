import { CustomTable } from "../../components/Table"
import { SearchField } from "../../components/SearchField"
import { useState } from "react"
import { Paper } from "@mui/material"


export function UserPage(){
    const fakeData = [
        {
            name: "John Doe",
            email: "john.doe@gmail.com",
            status: 0,
            phone: "999999999"
        },
        {
            name: "Jane Doe",
            email: "jane@example.com",
            status: 1,
            phone: "888888888"
        },
        {
            name: "Alice",
            email: " Alice@example.com",
            status: 2,
            phone: "777777777"
        },
        {
            name: "Bob",
            email: "Bob@example.com",
            status: 3,
            phone: "666666666"
        },
        {
            name: "Charlie",
            email: "clone@example.com",
            status: 0,
            phone: "555555555"
        },
        {
            name: "John Doe",
            email: "john.doe@gmail.com",
            status: 0,
            phone: "999999999"
        },
        {
            name: "Jane Doe",
            email: "jane@example.com",
            status: 1,
            phone: "888888888"
        },
        {
            name: "Pedro",
            email: " Pedro@example.com",
            status: 2,
            phone: "777777777"
        },
        {
            name: "Bob",
            email: "Bob@example.com",
            status: 3,
            phone: "666666666"
        },
        {
            name: "Charlie",
            email: "clone@example.com",
            status: 0,
            phone: "555555555"
        },
        {
            name: "Deitos",
            email: "Deitos@example.com",
            status: 0,
            phone: "555555555"
        }
    ]

    const [search, setSearch] = useState<string>("")

    const filteredData = fakeData.filter(data => JSON.stringify(data).toLowerCase().includes(search))

    return (
        <Paper
            style={{
                width: "100%",
            }}
        >
            <h1>Users</h1>
            <SearchField placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />

            <CustomTable columns={Object.keys(fakeData[0])} data={filteredData} />
        </Paper>
    )
}