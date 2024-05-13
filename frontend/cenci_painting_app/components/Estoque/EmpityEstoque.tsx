import { Input, Text, Card } from '@rneui/themed';
import React, { useState } from 'react';
import { View, StyleSheet, Image, Button, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function Estoque() {
    const clicado = () => {
        alert('Clicado');
    }


    return (
        


        <View style={styles.container}>
            <View style={[styles.textcontainer]}>
                <Text style={styles.textmain}>Estoque</Text>
            </View>

            <View style={styles.containertext}>
                <Text style={styles.text}>Produto</Text>
                <Text style={styles.text}>Categoria</Text>
                <Text style={styles.text}>Código</Text>
                <Text style={styles.text}>Qnt.</Text>
            </View>
            <View style={styles.estoquevazio}>
                <Text> Estoque vazio </Text>
            </View>
            
            <LinearGradient colors={['#BABABA', '#636363']} style={styles.editinfos}>
                <Pressable style={styles.button} onPress={clicado}>
                    <Text style={styles.textedit}>EDIT INFOS</Text>
                </Pressable>
            </LinearGradient>
            

        </View>

        



    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor:'white',
        width: '100%',
        height: '100%',

    },
    button:{
        backgroundColor: '#A0CC90',
        width: '55%',
        height: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 10,
    },
    textedit:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    editinfos:{
        backgroundColor: '#8FFEA1',
        width: '100%',
        height: '20%', // Ajuste a altura para ocupar 10% da tela
        alignSelf: 'flex-end', // Posiciona no final da tela
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    estoquevazio: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containertext: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginTop: 30,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    fotocontainer: {
        width: '90%',
        height: '17%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        marginTop: 20,
        
    },
    foto:{
        backgroundColor: '#A0CC90',
        width: '20%',
        height: '70%',
    },


    textcontainer: {
        backgroundColor: '#8FFEA1',
        width: '50%',
        height: '9%',
        borderTopLeftRadius: 30, // Arredonda a borda superior direita
        borderBottomLeftRadius: 30,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        display: 'flex',
        marginLeft: '55%',

    },
    textmain: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 20,
    },

});
