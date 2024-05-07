/* eslint-disable prettier/prettier */
//Pagina de cadastro com os campos: Nome completo, email, telefone, senha e confirmação de senha
import React, { useState } from 'react';
import { View, StyleSheet,Pressable } from 'react-native';
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
 <View>
            <View style={styles.container}>
                <View style={styles.boxcontainer}>
                    <Text h1 style={styles.mainText} >Register</Text>
                    <Input
                        
                        style={styles.inputbox}
                        placeholder="Full Name:"
                        value={fullName}
                        onChangeText={handleRegister}
                        inputContainerStyle={{borderBottomWidth:0, width:"100%"}} 


                    />
                    <Input
                        style={styles.inputbox}
                        placeholder="Email"
                        secureTextEntry
                        value={password}
                        onChangeText={handleRegister}
                        inputContainerStyle={{borderBottomWidth:0, width:"100%"}}

                    />
                    <Input
                        style={styles.inputbox}
                        placeholder="Phone"
                        secureTextEntry
                        value={phone}
                        onChangeText={handleRegister}
                        inputContainerStyle={{borderBottomWidth:0, width:"100%"}}

                    />
                    <Input
                        style={styles.inputbox}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={handleRegister}
                        inputContainerStyle={{borderBottomWidth:0, width:"100%"}}

                    />
                    <Input
                        style={styles.inputbox}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={handleRegister}
                        inputContainerStyle={{borderBottomWidth:0, width:"100%"}}

                    />
                    <Button title="Register" onPress={handleRegister} type="outline" radius={18}/>

                </View>
            </View>
        </View>
    
      /*  <Card style={styles.container}>
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
        </Card>*/
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
        width: "80%",
        height: "80%",
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        elevation:15,
        shadowColor:"black",  
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
