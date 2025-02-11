import CryptoJS from "crypto-js";
import { API_URL } from "@env";

// Clave de encriptación segura
const SECRET_KEY: string = "clave_secreta_segura"; 

export const encryptCardNumber = (cardNumber: string): string => {
    return CryptoJS.AES.encrypt(cardNumber, SECRET_KEY).toString();
};

export const sendEncryptedCard = async (cardNumber: string, cvv: string): Promise<{ mensaje: string }> => {
    const encryptedCard = encryptCardNumber(cardNumber);

    const response = await fetch(`${API_URL}/api/agregarTarjeta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tarjeta: encryptedCard, cvv }),
    });

    return await response.json();
};