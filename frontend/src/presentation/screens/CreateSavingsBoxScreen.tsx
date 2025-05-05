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
import { useNavigation } from "@react-navigation/native"

export const CreateSavingsBoxScreen = () => {
  const navigation = useNavigation<any>()
  const [savingsBoxName, setSavingsBoxName] = useState("")
  const inputRef = useRef<TextInput>(null)

  // Focus the input when the screen loads
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }, [])

  const handleContinue = () => {
    if (savingsBoxName.trim().length === 0) {
      // Show error or alert that name is required
      return
    }

    navigation.navigate("SavingsAmountScreen", { savingsBoxName: savingsBoxName.trim() })
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
          <Text style={localStyles.title}>Escoge un nombre para tu caja de ahorro</Text>
          <Text style={localStyles.subtitle}>Escoge el nombre con el que visualizaras tu caja de ahorro</Text>

          {/* Input Container */}
          <View style={localStyles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={localStyles.input}
              value={savingsBoxName}
              onChangeText={setSavingsBoxName}
              placeholder=""
              placeholderTextColor="#999"
              autoCapitalize="words"
            />
            <TouchableOpacity
              style={[
                localStyles.continueButton,
                savingsBoxName.trim().length === 0 && localStyles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              disabled={savingsBoxName.trim().length === 0}
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
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
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

export default CreateSavingsBoxScreen
