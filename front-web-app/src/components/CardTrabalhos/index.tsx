import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { ProgressBar } from "../ProgressBar";

interface CardProps {
  address: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  value: number;
}
export function CardTrabalhos({
  address,
  progress,
  title,
  description,
  image,
  value,
}: CardProps) {

    //Formatar o valor 
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
      });


  return (
    <Card sx={{ width:"70%" }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <ProgressBar variant="determinate" value={progress}/>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
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
      
    </Card>
  );
}
