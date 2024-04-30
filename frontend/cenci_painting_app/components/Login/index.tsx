/* eslint-disable prettier/prettier */
import { Button, Input, Text, Card} from '@rneui/themed';
import React, { useState } from 'react';
import { View, StyleSheet, Image} from 'react-native';


export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (text: string) => {
        setUsername(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleSubmit = () => {
        if(username && password) {
            alert(`Username: ${username}, Password: ${password}`);
        } else {
            alert('Please fill in the form');
        }

    };

    return (
        <View>
            <Image source="https://www.specialdog.com.br/assets/uploads/images/gateirosdeprimeiraviagem.png" />
             <Card style={styles.container}>
            <Text h2 style={styles.mainText} >Login</Text>
            <Input
                placeholder="Username"
                value={username}
                onChangeText={handleUsernameChange}
                
            />
            <Input
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange}
                
            />
            <Button title="Login" onPress={handleSubmit} type="outline" radius={18}/>
            <Text style={styles.forgotText}>Forgot Password</Text>
        </Card>
        </View>
       
    );
};


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    button: {
        width: '80%',
        height: 40,
    },
    mainText: {
        textAlign: 'center',
        marginBottom: 20,
    },
    forgotText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
});
