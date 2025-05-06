"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
} from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParams } from "../navigation/Navigation"

// Use the RootStackParams from your Navigation file
type TransferConfirmationScreenRouteProp = RouteProp<RootStackParams, "TransferConfirmationScreen">
type TransferConfirmationScreenNavigationProp = StackNavigationProp<RootStackParams, "TransferConfirmationScreen">

export const TransferConfirmationScreen = () => {
  const navigation = useNavigation<TransferConfirmationScreenNavigationProp>()
  const route = useRoute<TransferConfirmationScreenRouteProp>()
  const { contact, amount } = route.params

  // Generate a random reference number (in a real app, this would come from the backend)
  const [referenceNumber, _setReferenceNumber] = useState(Math.floor(100000 + Math.random() * 900000).toString())

  // Mock data for the transfer details
  const [transferDetails] = useState({
    clabe: "****5303",
    transferType: "SPEI",
    destinationEntity: contact.bank,
    when: "Ahora",
    concept: "Transferencia",
  })

  // State for editable values
  const [editedAmount, setEditedAmount] = useState(amount.toString())
  const [editedConcept, setEditedConcept] = useState(transferDetails.concept)
  const [editedReferenceNumber, setEditedReferenceNumber] = useState(referenceNumber)

  // State for editing mode
  const [editingAmount, setEditingAmount] = useState(false)
  const [editingConcept, setEditingConcept] = useState(false)
  const [editingReferenceNumber, setEditingReferenceNumber] = useState(false)

  // Toggle functions for editing
  const toggleEditAmount = () => {
    setEditingAmount(!editingAmount)
    if (editingAmount) {
      // Validate and update amount when finishing edit
      const newAmount = Number.parseFloat(editedAmount)
      if (!isNaN(newAmount) && newAmount > 0) {
        // In a real app, you would update the route params or a global state
      } else {
        // Reset to original value if invalid
        setEditedAmount(amount.toString())
      }
    }
  }

  const toggleEditConcept = () => {
    setEditingConcept(!editingConcept)
  }

  const toggleEditReferenceNumber = () => {
    setEditingReferenceNumber(!editingReferenceNumber)
    if (editingReferenceNumber) {
      // Validate reference number (should be 6 digits)
      if (!/^\d{6}$/.test(editedReferenceNumber)) {
        setEditedReferenceNumber(referenceNumber)
      }
    }
  }

  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === "string" ? Number.parseFloat(value) : value
    return `$${numValue.toFixed(2)}`
  }

  const handleConfirm = () => {
    // In a real app, you would call an API to process the transfer
    // Then navigate to a success screen with the edited values
    console.log("Transfer confirmed")
    navigation.navigate("TransferSuccessScreen", {
      contact,
      amount: Number.parseFloat(editedAmount),
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/icons/arrow-left-icon.png")} // Replace with your back arrow icon
              style={styles.backArrow}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transferir</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Confirmation Title */}
        <Text style={styles.confirmTitle}>Confirma la operación</Text>
        <Text style={styles.confirmSubtitle}>
          Vas a transferir {formatCurrency(editedAmount)} a {contact.name}
        </Text>

        {/* Contact Card */}
        <View style={styles.contactCard}>
          <View style={styles.contactIconContainer}>
            <Image
              source={require("../../assets/icons/user.png")} // Replace with your user icon
              style={styles.contactIcon}
            />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactDetails}>
              {contact.bank} - {contact.accountType} {contact.accountNumber}
            </Text>
          </View>
        </View>

        {/* Transfer Details */}
        <View style={styles.detailsContainer}>
          {/* Amount */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Monto</Text>
            <View style={styles.detailValueContainer}>
              {editingAmount ? (
                <TextInput
                  style={styles.editInput}
                  value={editedAmount}
                  onChangeText={setEditedAmount}
                  keyboardType="numeric"
                  autoFocus
                  onBlur={toggleEditAmount}
                />
              ) : (
                <Text style={styles.detailValue}>{formatCurrency(editedAmount)}</Text>
              )}
              <TouchableOpacity style={styles.editButton} onPress={toggleEditAmount}>
                <Image
                  source={require("../../assets/icons/edit.png")} // Replace with your edit icon
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Concept */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Concepto</Text>
            <View style={styles.detailValueContainer}>
              {editingConcept ? (
                <TextInput
                  style={styles.editInput}
                  value={editedConcept}
                  onChangeText={setEditedConcept}
                  autoFocus
                  onBlur={toggleEditConcept}
                />
              ) : (
                <Text style={styles.detailValue}>{editedConcept}</Text>
              )}
              <TouchableOpacity style={styles.editButton} onPress={toggleEditConcept}>
                <Image
                  source={require("../../assets/icons/edit.png")} // Replace with your edit icon
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Reference Number */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Número de referencia</Text>
            <View style={styles.detailValueContainer}>
              {editingReferenceNumber ? (
                <TextInput
                  style={styles.editInput}
                  value={editedReferenceNumber}
                  onChangeText={setEditedReferenceNumber}
                  keyboardType="numeric"
                  maxLength={6}
                  autoFocus
                  onBlur={toggleEditReferenceNumber}
                />
              ) : (
                <Text style={styles.detailValue}>{editedReferenceNumber}</Text>
              )}
              <TouchableOpacity style={styles.editButton} onPress={toggleEditReferenceNumber}>
                <Image
                  source={require("../../assets/icons/edit.png")} // Replace with your edit icon
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* CLABE */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>CLABE</Text>
            <Text style={styles.detailValue}>{transferDetails.clabe}</Text>
          </View>

          {/* Transfer Type */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tipo de transferencia</Text>
            <Text style={styles.detailValue}>{transferDetails.transferType}</Text>
          </View>

          {/* Destination Entity */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Entidad destino</Text>
            <Text style={styles.detailValue}>{transferDetails.destinationEntity}</Text>
          </View>

          {/* When */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cuándo</Text>
            <Text style={styles.detailValue}>{transferDetails.when}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>CONFIRMAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
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
  confirmTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginTop: 16,
  },
  confirmSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    marginHorizontal: 16,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contactIcon: {
    width: 40,
    height: 40,
    tintColor: "#EA0A2A",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  contactDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  detailsContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
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
  detailValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    textAlign: "right",
  },
  editButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  editIcon: {
    width: 16,
    height: 16,
    tintColor: "#EA0A2A",
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  confirmButton: {
    backgroundColor: "#EA0A2A",
    borderRadius: 28,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  editInput: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#EA0A2A",
    padding: 0,
    minWidth: 100,
    textAlign: "right",
  },
})

export default TransferConfirmationScreen
