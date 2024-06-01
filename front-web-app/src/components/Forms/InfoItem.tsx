import { Item } from "../../pages/Estoque";
import { Typography, Container } from "@mui/material";

export function InfoItem(itemData: Item) {
  return <div>{itemData.name}</div>;
}
