import { Input, Button, Box  } from "@mui/material";

interface InputProps{
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function SearchField({
        placeholder,
        value,
        onChange
    }:InputProps) {
    return (
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                sx={{width: "70%"}}
            />
           

    )
}
