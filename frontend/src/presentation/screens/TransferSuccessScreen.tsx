"use client"

import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image } from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParams } from "../navigation/Navigation"

// Use the RootStackParams from your Navigation file
type TransferSuccessScreenRouteProp = RouteProp<RootStackParams, "TransferSuccessScreen">
type TransferSuccessScreenNavigationProp = StackNavigationProp<RootStackParams, "TransferSuccessScreen">

export const TransferSuccessScreen = () => {
  const navigation = useNavigation<TransferSuccessScreenNavigationProp>()
  const route = useRoute<TransferSuccessScreenRouteProp>()
  const { contact, amount } = route.params

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`
  }

  const handleDone = () => {
    // Navigate back to home screen
    navigation.navigate("Home")
  }

  const handleNewTransfer = () => {
    // Navigate back to transfer screen
    navigation.navigate("TransferScreen")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Success Icon */}
      <View style={styles.successIconContainer}>
        <Image
          source={require("../../assets/icons/verify.png")} // Replace with your success icon
          style={styles.successIcon}
        />
      </View>

      {/* Success Message */}
      <Text style={styles.successTitle}>¡Transferencia exitosa!</Text>
      <Text style={styles.successMessage}>
        Has transferido {formatCurrency(amount)} a {contact.name}
      </Text>

      {/* Transfer Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Beneficiario</Text>
          <Text style={styles.detailValue}>{contact.name}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Banco</Text>
          <Text style={styles.detailValue}>{contact.bank}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Cuenta</Text>
          <Text style={styles.detailValue}>{contact.accountNumber}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Monto</Text>
          <Text style={styles.detailValue}>{formatCurrency(amount)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fecha</Text>
          <Text style={styles.detailValue}>{new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Hora</Text>
          <Text style={styles.detailValue}>{new Date().toLocaleTimeString()}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.newTransferButton} onPress={handleNewTransfer}>
          <Text style={styles.newTransferButtonText}>NUEVA TRANSFERENCIA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>FINALIZAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 16,
  },
  successIconContainer: {
    marginTop: 40,
    marginBottom: 24,
  },
  successIcon: {
    width: 80,
    height: 80,
    tintColor: "#28a745",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detailLabel: {
    fontSize: 14,
    color: "#333",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    textAlign: "right",
  },
  buttonContainer: {
    width: "100%",
    marginTop: "auto",
    marginBottom: 16,
  },
  newTransferButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EA0A2A",
    borderRadius: 28,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  newTransferButtonText: {
    color: "#EA0A2A",
    fontSize: 16,
    fontWeight: "600",
  },
  doneButton: {
    backgroundColor: "#EA0A2A",
    borderRadius: 28,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default TransferSuccessScreen
