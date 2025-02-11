import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { sendEncryptedCard } from "../utils/encryption";

const PagoScreen: React.FC = () => {
    const [cvv, setCvv] = useState<string>("");

    // Simulación de tarjeta
    const cardNumber: string = "4111111111111111"; 

    const enviarPago = async () => {
        try {
            const data = await sendEncryptedCard(cardNumber, cvv);
            Alert.alert("Éxito", data.mensaje);
            setCvv(""); // Borra el CVV después del uso
        } catch (error) {
            Alert.alert("Error", "No se pudo procesar la transacción");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Introduce el CVV:</Text>
            <TextInput 
                secureTextEntry={true} 
                maxLength={4} 
                keyboardType="numeric" 
                value={cvv} 
                onChangeText={setCvv} 
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <Button title="Pagar" onPress={enviarPago} />
        </View>
    );
};

export default PagoScreen;