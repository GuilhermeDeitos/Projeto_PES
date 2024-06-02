import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    width: 100%;
    height: 100%;
    flex-direction: column;
   
    
    
    `;

export const HeaderEstoque = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    margin-right:0;
    background-color: #8FFEA1;
    color: black;
    border-radius: 30px 0 0px 30px;
    position: absolute;
    right: 0;
    top: 0;
    width: 40%;
    height: 4%;
    
    `;



export const BodyEstoque = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    gap: 5px;
    flex-direction: column;
    color: black;
    border-radius: 30px 0 0px 30px;
    width: 70%;
    position: absolute;
    top: 10%;
    
    
    
    
    
    `;

    export const ButtonEdit = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    background-color: grey;
    
    `;

export const Table = styled.table`
    display: table;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;

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