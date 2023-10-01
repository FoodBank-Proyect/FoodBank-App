import React from "react";
import { Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

export const ProductInfoCard = ( { product = {} } ) => {
    const {
        name = 'Producto de chill',
        icon, 
        photos = [require('./pruebaProducto.png')],
        price = 200, 
        isAvailable = true
        } = product;
    return (
        <Card elevation={5} style={styles.card}>
            <Card.Cover key={name} style={styles.cover} source={photos[0]} />
            <Text style={styles.title}>{name}</Text>
        </Card>
        );
};

const styles = StyleSheet.create({
    card: { backgroundColor: "white" },
    cover: { padding: 20, backgroundColor: "white" },
    title: { padding: 16 },
  });