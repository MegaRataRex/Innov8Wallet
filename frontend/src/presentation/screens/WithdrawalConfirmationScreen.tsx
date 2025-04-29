"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image, Share } from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParams } from "../navigation/Navigation"

type WithdrawalConfirmationScreenRouteProp = RouteProp<RootStackParams, "WithdrawalConfirmationScreen">
type WithdrawalConfirmationScreenNavigationProp = StackNavigationProp<RootStackParams, "WithdrawalConfirmationScreen">

export const WithdrawalConfirmationScreen = () => {
  const navigation = useNavigation<WithdrawalConfirmationScreenNavigationProp>();
  const route = useRoute<WithdrawalConfirmationScreenRouteProp>();
  const { amount } = route.params;

  // Generate a random reference number (in a real app, this would come from the backend)
  const [referenceNumber] = useState(() => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  });

  // Current date and time
  const [currentDateTime] = useState(() => {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, "0")
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const year = now.getFullYear()
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const seconds = String(now.getSeconds()).padStart(2, "0")

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
  })

  // Expiration timer (20 minutes countdown)
  const [expirationMinutes, setExpirationMinutes] = useState(20)
  const [expirationSeconds, setExpirationSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (expirationSeconds > 0) {
        setExpirationSeconds(expirationSeconds - 1);
      } else if (expirationMinutes > 0) {
        setExpirationMinutes(expirationMinutes - 1);
        setExpirationSeconds(59);
      } else {
        clearInterval(timer);
        // Handle expiration (e.g., show alert, navigate back)
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationMinutes, expirationSeconds]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Código de retiro sin tarjeta: ${referenceNumber}. Válido hasta: ${currentDateTime}`,
      });
    } catch (error) {
      console.error("Error sharing:", error)
    }
  };

  const handleExit = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/icons/arrow-left-icon.png")} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Retiro sin tarjeta</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Amount Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Cantidad</Text>
          <Text style={styles.amountText}>${amount.toFixed(2)} MN</Text>
        </View>

        {/* Reference Number Section */}
        <View style={styles.section}>
          <Text style={styles.referenceLabel}>No. de Referencia</Text>
          <Text style={styles.referenceNumber}>{referenceNumber}</Text>
        </View>

        {/* Barcode Section - You'll add the actual barcode image */}
        <View style={styles.barcodeContainer}>
            <Image
                source={require("../../assets/icons/bar-code.png")}
                style={styles.barcodeImage}
                resizeMode="contain"
            />
          <Text style={styles.dateTimeText}>{currentDateTime}</Text>
        </View>

        {/* Instructions */}
        <Text style={styles.instructionsText}>
          Acerca el código de barras al lector de un cajero automático o captura a el número de referencia.
        </Text>

        {/* Expiration Timer */}
        <View style={styles.timerContainer}>
            <Image 
                source={require("../../assets/icons/clock.png")} 
                style={styles.timerIcon}
            />
          <Text style={styles.timerText}>
            Expira en {expirationMinutes}:{expirationSeconds < 10 ? `0${expirationSeconds}` : expirationSeconds} minutos
          </Text>
        </View>

        {/* Share Button */}
        <TouchableOpacity style={styles.shareContainer} onPress={handleShare}>
            <Image
                source={require("../../assets/icons/share.png")} 
                style={styles.shareIcon}
            />
          <Text style={styles.shareText}>Compartir</Text>
        </TouchableOpacity>
      </View>

      {/* Exit Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.exitButtonText}>Salir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: {
    width: 24,
    height: 24,
    tintColor: "#EA0A2A",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    alignItems: "center",
  },
  section: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  amountText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  referenceLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  referenceNumber: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000",
    letterSpacing: 1,
  },
  barcodeContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  barcodePlaceholder: {
    width: "100%",
    height: 80,
    backgroundColor: "#E0E0E0",
    marginBottom: 8,
  },
  dateTimeText: {
    fontSize: 12,
    color: "#666",
  },
  instructionsText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
    marginRight: 8,
  },
  timerText: {
    fontSize: 16,
    color: "#333",
  },
  shareContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  shareText: {
    fontSize: 16,
    color: "#333",
  },
  bottomButtonContainer: {
    padding: 24,
  },
  exitButton: {
    backgroundColor: "#EA0A2A",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
  },
  exitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  barcodeImage: {
    width: "100%",
    height: 80,
    marginBottom: 8,
  },
  timerIcon: {
    width: 20,
    height: 20,
  },
  shareIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});
