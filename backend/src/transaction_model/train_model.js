const tf = require("@tensorflow/tfjs-node")

async function trainModel(){
    const training_data = [
        {
          "description": "GNP Seguros",
          "category": "insurance"
        },
        {
          "description": "Banco Santander - Pago de tarjeta",
          "category": "debt"
        },
        {
          "description": "Uber Mexico",
          "category": "transportation"
        },
        {
          "description": "CFE - Pago de luz",
          "category": "utilities"
        },
        {
          "description": "Cinemex - Entrada al cine",
          "category": "entertainment"
        },
        {
          "description": "Toks Restaurante",
          "category": "food"
        },
        {
          "description": "Farmacias del Ahorro",
          "category": "healthcare"
        },
        {
          "description": "Infonavit - Pago de hipoteca",
          "category": "housing"
        },
        {
          "description": "Oxxo - Compras varias",
          "category": "misc"
        },
        {
          "description": "AXA Seguros",
          "category": "insurance"
        },
        {
          "description": "BBVA - Pago de crédito",
          "category": "debt"
        },
        {
          "description": "Didi Taxi",
          "category": "transportation"
        },
        {
          "description": "Telmex - Pago de internet",
          "category": "utilities"
        },
        {
          "description": "Spotify - Suscripción mensual",
          "category": "entertainment"
        },
        {
          "description": "Vips Restaurante",
          "category": "food"
        },
        {
          "description": "Hospital Ángeles - Consulta médica",
          "category": "healthcare"
        },
        {
          "description": "Renta mensual - Casa habitación",
          "category": "housing"
        },
        {
          "description": "Liverpool - Compra de accesorios",
          "category": "misc"
        },
        {
          "description": "MetLife Seguros",
          "category": "insurance"
        },
        {
          "description": "Scotiabank - Pago de préstamo",
          "category": "debt"
        }
      ];
}

trainModel();