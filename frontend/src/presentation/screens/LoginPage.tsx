"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { ArrowRight, Info, QrCode, Headphones, Key, CreditCard } from "react-native-feather"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigation/Navigation';

type LoginPageNavigationProp = NativeStackNavigationProp<RootStackParams, 'Home'>;


export default function LoginPage() {
  const navigation = useNavigation<LoginPageNavigationProp>();
  const [isPasswordStep, setIsPasswordStep] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = () => {
    if (!isPasswordStep) {
      setIsPasswordStep(true)
    } else {
      navigation.navigate("Home")
    }
  }

  const handleFaceID = () => {
    // Handle Face ID authentication
    navigation.navigate("Home")
  }

  return (
    <ScrollView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>BANORTE</Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>HOLA SANTIAGO</Text>
          <Text style={styles.formSubtitle}>Inicia sesion con tu correo y contraseña.</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputIndicator}>
            <View style={[styles.indicatorDot, { backgroundColor: "#EC1C2D" }]} />
            <View style={[styles.indicatorDot, { backgroundColor: isPasswordStep ? "#EC1C2D" : "white" }]} />
          </View>
          <TextInput
            style={styles.input}
            placeholder={isPasswordStep ? "Contraseña" : "Correo"}
            secureTextEntry={isPasswordStep}
            value={isPasswordStep ? "" : email}
            onChangeText={(text) => !isPasswordStep && setEmail(text)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <ArrowRight stroke="#EC1C2D" width={24} height={24} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.faceIdButton} onPress={handleFaceID}>
          {/* Face ID icon */}
          <Text style={styles.faceIdText}>Face ID</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.troubleText}>Tengo problemas para iniciar sesion</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actionButtonsContainer}>
        {[
          { icon: Info, label: "Info" },
          { icon: QrCode, label: "QR" },
          { icon: Headphones, label: "Support" },
          { icon: Key, label: "Security" },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.actionButton}>
            <item.icon stroke="white" width={32} height={32} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Card */}
      <View style={styles.bottomCard}>
        <Text style={styles.bottomCardTitle}>DALE A TU NOMINA</Text>
        <Text style={styles.bottomCardText}>
          Tarjeta banorte NOMINA, controla tus gastos directos con nuestra tarjeta especial para asalariados mugrosos
          como tu
        </Text>
        <View style={styles.bottomCardImageContainer}>
          <CreditCard stroke="white" width={80} height={80} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  logoContainer: {
    padding: 24,
    paddingTop: 48,
  },
  logo: {
    color: "#EC1C2D",
    fontSize: 32,
    fontWeight: "bold",
  },
  formContainer: {
    padding: 24,
    marginTop: 64,
  },
  formHeader: {
    marginBottom: 24,
  },
  formTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  formSubtitle: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  inputIndicator: {
    position: "absolute",
    left: -16,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 9999,
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  submitButton: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  faceIdButton: {
    width: 140,
    height: 56,
    backgroundColor: "white",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  faceIdText: {
    color: "#6B7280",
    fontSize: 12,
  },
  troubleText: {
    color: "white",
    fontSize: 16,
    fontStyle: "italic",
  },
  actionButtonsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#EC1C2D",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  bottomCard: {
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  bottomCardTitle: {
    color: "#EC1C2D",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bottomCardText: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 16,
  },
  bottomCardImageContainer: {
    width: 256,
    height: 160,
    backgroundColor: "#111827",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
})

