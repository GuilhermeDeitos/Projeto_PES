/* eslint-disable prettier/prettier */
import { Input, Text, Card } from '@rneui/themed';
import React, { useState } from 'react';
import { View, StyleSheet, Image, Button, Pressable } from 'react-native';


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
        if (username && password) {
            alert(`Username: ${username}, Password: ${password}`);
        } else {
            alert('Please fill in the form');
        }

    };

    return (
        <View>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('assets/Logo (1).png')} />
            </View>
            
            <View style={styles.container}>
                <View style={styles.boxcontainer}>
                    <Text h1 style={styles.mainText} >Login</Text>
                    <Input
                        
                        style={styles.inputbox}
                        placeholder="Username"
                        value={username}
                        onChangeText={handleUsernameChange}
                        inputContainerStyle={{borderBottomWidth:0, width:"100%"}} 


                    />
                    <Input
                        style={styles.inputbox}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={handlePasswordChange}
                        inputContainerStyle={{borderBottomWidth:0, width:"100%"}}

                    />
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.logintext}>Login</Text>
                    </Pressable>
                    <Text style={styles.forgotText}>Forgot Password</Text>
                </View>
            </View>
        </View>


    );
};


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        backgroundColor: "white",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    image:{
        
    },

    inputbox:{
        borderWidth:0.5,
        borderRadius:10,
        padding:5,
        marginRight:"10%",
        marginLeft:"10%",
        
    },
    boxcontainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: "60%",
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        elevation:15,
        shadowColor:"black", 
        marginBottom: 80, 
    },

    

    button: {
        width: '60%',
        height: 40,
        backgroundColor: "#58CDFF",
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    logintext: {
        fontSize: 20,
        fontWeight: "bold"
    },

    mainText: {
        textAlign: 'center',
        marginBottom: 60,
        


    },
    forgotText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'grey',
    },
});
