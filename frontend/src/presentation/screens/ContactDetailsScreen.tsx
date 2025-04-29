"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { RootStackParams } from "../navigation/Navigation"

type ContactDetailsScreenRouteProp = RouteProp<RootStackParams, "ContactDetailsScreen">

export const ContactDetailsScreen = () => {
  const navigation = useNavigation<any>()
  const route = useRoute<ContactDetailsScreenRouteProp>()
  const { accountNumber, bankInfo } = route.params

  const [contactName, setContactName] = useState("")
  const inputRef = useRef<TextInput>(null)

  // Focus the input when the screen loads
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }, [])

  // Format the account number for display (add spaces every 4 digits)
  const formattedAccountNumber = accountNumber.replace(/(.{4})/g, "$1 ").trim()

  // Handle continue button press
  const handleContinue = () => {
    if (contactName.trim() === "") {
      // Show error - name is required
      return
    }

    // Create a new contact object
    const newContact = {
      id: String(Date.now()), // Generate a unique ID
      name: contactName,
      bank: bankInfo.bankName,
      accountType: bankInfo.accountType,
      accountNumber: `****${accountNumber.slice(-4)}`, // Mask the account number
    }

    // Save the contact to the TransferScreen (this happens in the background)
    navigation.navigate("TransferScreen", { newContact })

    // Immediately navigate to the TransferAmountScreen with the new contact
    navigation.navigate("TransferAmountScreen", { contact: newContact })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={require("../../assets/icons/arrow-left-icon.png")} style={styles.backArrow} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transferir</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Nombre del destinatario</Text>

          {/* Input Container */}
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={contactName}
              onChangeText={setContactName}
              placeholder=""
              autoFocus={true}
            />
            <TouchableOpacity
              style={[styles.continueButton, contactName.trim() === "" && styles.continueButtonDisabled]}
              onPress={handleContinue}
              disabled={contactName.trim() === ""}
            >
              <Image source={require("../../assets/icons/right-arrow.png")} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          {/* Account Details */}
          <View style={styles.accountDetailsContainer}>
            <View style={styles.accountDetailRow}>
              <Text style={styles.accountDetailLabel}>CLABE</Text>
              <Text style={styles.accountDetailValue}>{formattedAccountNumber}</Text>
            </View>
            <View style={styles.accountDetailRow}>
              <Text style={styles.accountDetailLabel}>Entidad Bancaria</Text>
              <Text style={styles.accountDetailValue}>{bankInfo.bankName}</Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  keyboardAvoidingView: {
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  continueButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EA0A2A",
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
  accountDetailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
  },
  accountDetailRow: {
    marginBottom: 16,
  },
  accountDetailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  accountDetailValue: {
    fontSize: 14,
    color: "#666",
  },
})
