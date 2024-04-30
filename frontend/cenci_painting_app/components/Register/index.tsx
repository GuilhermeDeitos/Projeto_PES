/* eslint-disable prettier/prettier */
//Pagina de cadastro com os campos: Nome completo, email, telefone, senha e confirmação de senha
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text, Card} from '@rneui/themed';


export const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if(fullName && email && phone && password && confirmPassword && password) {
            alert(`Full Name: ${fullName}, Email: ${email}, Phone: ${phone}, Password: ${password}, Confirm Password: ${confirmPassword}`);
        } else if (!arePasswordEquals(password, confirmPassword)) {
            alert('Passwords do not match');
        } else{
            alert('Please fill in the form');
        }
    };

    const arePasswordEquals = (password: string, confirmPassword: string) => {
        return password === confirmPassword
    }

    return (
        <Card style={styles.container}>
            <Text h2 style={styles.mainText}>Register</Text>
            <Input
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />
            <Input
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Input
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
            />
            <Input
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Input
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button title="Register" onPress={handleRegister} type="outline" radius={18}/>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    mainText: {
        marginBottom: 16,
        textAlign: 'center',
    },
   
});
