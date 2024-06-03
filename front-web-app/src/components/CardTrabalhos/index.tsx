import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { Info } from "@mui/icons-material";
import { ProgressBar } from "../ProgressBar";
import { useState } from "react";
import Modal from "../Modal/index";
import Swal from "sweetalert2";
import { api } from "../../utils/api";
import { InfoJob } from "../Forms/Jobs/InfoJob";
import { EditJob } from "../Forms/Jobs/EditJob";
interface CardProps {
  id:number;
  address: string;
  title: string;
  description: string;
  image?: string;
  progress: number;
  value: number;
}
export function CardTrabalhos({
  id,
  address,
  progress,
  title,
  description,
  image,
  value,
}: CardProps) {
  //Formatar o valor
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const handleInfo = () => {
    setIsInfoModalOpen(true);
  }

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleClose = () => {
    setIsEditModalOpen(false);
    setIsInfoModalOpen(false);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/jobs/${id}`).then((response) => {
          console.log(response);
          
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          })

        }).catch(() => {
          Swal.fire({
            title: "Error!",
            text: "Error deleting user.",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  }

  return (
    <Card sx={{ width: "70%" }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <ProgressBar variant="determinate" value={progress} />

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {title}
          <CardActions>
            <Edit
              sx={{
                cursor: "pointer",
                color: "#eead2d",
              }} 
              onClick={handleEdit}
            />
            <Delete
              sx={{
                cursor: "pointer",
                color: "#d44038",
              }}
              onClick={handleDelete}
            />
            <Info
              sx={{
                cursor: "pointer",
                color: "#3f51b5",
              }}
              onClick={handleInfo}
            />
          </CardActions>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatter.format(value)}
        </Typography>
      </CardContent>
      <Modal
        isModalOpen={isEditModalOpen}
        isModalClosed={handleClose}
        title="Edit"
        width="50%"
        height="50%"

      >
        <EditJob
          id={id}
          address={address}
          title={title}
          description={description}
          value={value}
          progress={progress}
        />
      </Modal>
      <Modal
        isModalOpen={isInfoModalOpen}
        isModalClosed={handleClose}
        title="Information"
        width="50%"
        height="50%"

      >
        <InfoJob id={id}
        address={address}
        title={title}
        description={description}
        value={value}
        progress={progress}
        />
      </Modal>
     
    </Card>
  );
}
