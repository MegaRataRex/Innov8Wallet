"use client"

import React, { useState, useRef } from "react"
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
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParams } from "../navigation/Navigation"

type WithdrawalScreenNavigationProp = StackNavigationProp<RootStackParams, "WithdrawalScreen">

export const WithdrawalScreen = () => {
  const navigation = useNavigation<WithdrawalScreenNavigationProp>()
  const [amount, setAmount] = useState("")
  const [availableBalance] = useState(19523.0) // This would come from your app state or API

  const inputRef = useRef<TextInput>(null)

  // Focus the input when the screen loads
  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }, [])

  const handleAmountChange = (text: string) => {
    // Only allow numbers and one decimal point
    const regex = /^\d*\.?\d{0,2}$/

    if (text === "" || regex.test(text)) {
      setAmount(text)
    }
  }

  const handleContinue = () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      // Show error - amount must be greater than 0
      return
    }

    if (Number.parseFloat(amount) > availableBalance) {
      // Show error - insufficient funds
      return
    }

    // Navigate to confirmation screen
    navigation.navigate("WithdrawalConfirmationScreen", { amount: Number.parseFloat(amount) })
  }

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`
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
          <Text style={styles.headerTitle}>Retiro sin tarjeta</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Subtitle and Balance */}
        <Text style={styles.subtitle}>¿Que cantidad deseas retirar?</Text>
        <Text style={styles.balanceText}>Saldo disponible: {formatCurrency(availableBalance)}</Text>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            ref={inputRef}
            style={styles.amountInput}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor="#CCCCCC"
            autoFocus={true}
          />
          <TouchableOpacity
            style={[
              styles.continueButton,
              (!amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > availableBalance) &&
                styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > availableBalance}
          >
            <Image source={require("../../assets/icons/right-arrow.png")} style={styles.arrowIcon} />
          </TouchableOpacity>
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
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginHorizontal: 16,
    marginTop: 16,
    textAlign: "center",
  },
  balanceText: {
    fontSize: 16,
    color: "#666",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    textAlign: "center",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 32,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "500",
    color: "#333",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: "500",
    color: "#333",
    padding: 0,
    height: 40,
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
})
