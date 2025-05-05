"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native"
import { styles as globalStyles } from "../theme/app_themes"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { RootStackParams } from "../navigation/Navigation"
import type { StackNavigationProp } from "@react-navigation/stack"

type SavingsAmountScreenRouteProp = RouteProp<RootStackParams, "SavingsAmountScreen">
type SavingsAmountScreenNavigationProp = StackNavigationProp<RootStackParams, "SavingsAmountScreen">

export const SavingsAmountScreen = () => {
  const navigation = useNavigation<SavingsAmountScreenNavigationProp>()
  const route = useRoute<SavingsAmountScreenRouteProp>()
  const { savingsBoxName } = route.params

  const [amount, setAmount] = useState("")
  const [suggestedSavings] = useState(2500.0) // This would come from user's financial analysis
  const inputRef = useRef<TextInput>(null)

  // Focus the input when the screen loads
  useEffect(() => {
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

    // Pass both the name and amount to the next screen or back to Ahorro360Screen
    navigation.navigate("SavingsPlanConfirmationScreen", {
          savingsBoxName,
          targetAmount: Number.parseFloat(amount),
      })
  }

  return (
    <SafeAreaView style={globalStyles.background}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={localStyles.keyboardAvoidingView}
      >
        {/* Header */}
        <View style={localStyles.header}>
          <TouchableOpacity style={localStyles.backButton} onPress={() => navigation.goBack()}>
            <Image source={require("../../assets/icons/arrow-left-icon.png")} style={localStyles.backIcon} />
          </TouchableOpacity>
          <Text style={localStyles.headerTitle}>Ahorro 360°</Text>
          <View style={localStyles.placeholder} />
        </View>

        {/* Content */}
        <View style={localStyles.content}>
          <Text style={localStyles.title}>¿Que cantidad desea ahorrar?</Text>
          <Text style={localStyles.subtitle}>
            En base a su análisis más reciente, usted cuenta con una posibilidad de ahorro promedio mensual de:{" "}
            <Text style={localStyles.highlightedText}>${suggestedSavings.toFixed(2)}</Text>
          </Text>

          {/* Amount Input */}
          <View style={localStyles.amountContainer}>
            <Text style={localStyles.currencySymbol}>$</Text>
            <TextInput
              ref={inputRef}
              style={localStyles.amountInput}
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor="#CCCCCC"
            />
            <TouchableOpacity
              style={[
                localStyles.continueButton,
                (!amount || Number.parseFloat(amount) <= 0) && localStyles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              disabled={!amount || Number.parseFloat(amount) <= 0}
            >
              <Image source={require("../../assets/icons/right-arrow.png")} style={localStyles.arrowIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const localStyles = StyleSheet.create({
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
  backIcon: {
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
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    lineHeight: 22,
  },
  highlightedText: {
    fontWeight: "600",
    color: "#333",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
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
    width: 50,
    height: 50,
    borderRadius: 25,
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

export default SavingsAmountScreen
