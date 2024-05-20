import styled from "styled-components";
import { Paper } from "@mui/material";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90vh;
    margin: 0 auto;
    gap: 1rem;
`;

export const RegisterPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    height: 55vh;
    gap: .5rem;
   
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
`;

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: .5rem;
`;
