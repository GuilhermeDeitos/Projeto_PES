import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export const ProgressBar = styled(LinearProgress)(({ theme, value }) => ({
  height: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    //Cor vai mudar dependendo do valor passado
    backgroundColor: (() => {
        if(value === undefined)
            return "#003775"
        else if (value < 50) {
            return "#FF0000";
          } else if (value < 75) {
            return "#FFA500";
          } else {
            return "#008000";
          }
      })(),
  },
}));
