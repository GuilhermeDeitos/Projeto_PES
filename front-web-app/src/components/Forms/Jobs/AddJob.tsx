import React, { useEffect, useState } from "react";
import {Table,TextField, ButtonGroup, Button, Typography, Select, ListItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {
  TableBody,
  TableContainer,
  TableRow,
  Slider, Box, CircularProgress
} from "@mui/material";
import { JobData } from "../../../pages/Home";
import {api} from "../../../utils/api"
import Swal from "sweetalert2";
import { InputGroup } from "../styled";
import { UserData } from "../../../pages/Users";


interface AddJobData extends JobData {
    workersId: number[];
}


export function AddJob() {
    const [items, setItems] = useState<AddJobData>({
        id: 0,
        address: "",
        title: "",
        description: "",
        progress: 0,
        value: 0,
        workersId:[],
    })

    const [users, setUsers] = useState<UserData[]>([])

    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        api.get("/users/").then((response) => {
            console.log(response)
            setUsers(response.data.data);
            setLoading(false);
        });
    }, []);




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItems({
            ...items,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e:any) => {
        console.log(items)
        api.post(`/jobs/`, items)
        .then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Job Added Succesfully',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload()
            })
            
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Failure adding job',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }


    if(loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <CircularProgress />
            </Box>
        )
    }
    return(<TableContainer
    sx={{ maxHeight: 470, minWidth: 370, overflow: "revert" }}>
    <Table sx={{ minWidth: 1 }} arial-label="simple label">
        <TableBody>
        <InputGroup>
            {Object.keys(items).map(item =>{
                if(item === "id" || item === "status") return null
                if(item === "progress"){
                    return(
                        <TableRow key={item} sx={{
                            padding:"0 1rem"

                        }}>
                           <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "#426636",
                                padding: ".5rem 0 .5rem 0",
                            }}>
                                Progress
                            </Typography>
                            <Slider defaultValue={0} aria-label="Default" valueLabelDisplay="auto"
                            onChange={(e:any) => setItems({...items, progress: e.target.value})}
                             />
                        </TableRow>
                    )
                }

                if(item === "workersId"){
                    return(
                        <TableRow key={item} sx={{
                            padding:".5rem"
                        }}>
                           <Select
                            multiple
                            value={items.workersId}
                            onChange={(e:any) => setItems({...items, workersId: e.target.value as string[]})}
                            sx={{
                                width: "100%",
                            
                            }}
                           >
                                 {users ? users.map(user => (
                                      <ListItem key={user.id} value={user.id}>{user.name}</ListItem>
                                 )) : null}
                           </Select>
                        </TableRow>
                    )
                }
                return(
                    <TableRow key={item} sx={{
                        padding:".5rem"
                    }}>
                                <TextField
                                    type="text"
                                    name={item}
                                    value={items[item as keyof JobData]}
                                    onChange={handleChange}
                                    variant="standard"
                                    label={item}
                                    sx={{width: "100%",}}
                                />
                    </TableRow>
                )
            })}
            </InputGroup>
        </TableBody>
    </Table>
    <ButtonGroup style={{
                    height:30,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 18,
                    alignItems: 'center'   

                }}>
        <Button onClick={handleSubmit} type="submit">
            Save Job
            <EditIcon sx={{color: '#03e92f', cursor: 'pointer'}} />
        </Button>
    </ButtonGroup>
</TableContainer>)
}