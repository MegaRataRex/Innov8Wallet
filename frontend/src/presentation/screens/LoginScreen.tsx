"use client"

import { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated,
  Easing,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ApiFetcher } from "../../config/adapters/api_fetcher"
import { useNavigation } from "@react-navigation/native"

const LoginScreen = () => {
  const navigation = useNavigation()
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height)

  // Face ID animation states
  const [showFaceIDModal, setShowFaceIDModal] = useState(false)
  const [faceIDStatus, setFaceIDStatus] = useState<"scanning" | "success" | "error">("scanning")
  const scanAnimation = useRef(new Animated.Value(0)).current
  const successOpacity = useRef(new Animated.Value(0)).current

  // Update screen dimensions when orientation changes
  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(Dimensions.get("window").width)
      setScreenHeight(Dimensions.get("window").height)
    }

    Dimensions.addEventListener("change", updateDimensions)

    return () => {
      // Clean up event listener
      // Note: In newer React Native versions, this might need to be updated
      // as the API has changed in recent versions
    }
  }, [])

  interface LoginResponse {
    token: string
    userId: number
    name: string
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isEmailInput, setIsEmailInput] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [showCredentials, setShowCredentials] = useState(false)

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleLogin = async () => {
    try {
      setErrorMessage("")
      const response: LoginResponse = await ApiFetcher.post("/users/login", {
        email,
        password,
      })

      if (response) {
        const firstName = response.name.split(" ")[0].toUpperCase()
        AsyncStorage.setItem("name", firstName)
        AsyncStorage.setItem("token", response.token)
        AsyncStorage.setItem("userId", response.userId.toString())
        navigation.navigate("Home" as never)
        setShowCredentials(false)
        setIsEmailInput(true)
      }
    } catch (error: any) {
      console.error(error)
      setErrorMessage("Correo o contraseña incorrectos. Inténtalo de nuevo.")
    }
  }

  // Face ID animation functions
  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnimation, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  const showSuccessAnimation = () => {
    Animated.timing(successOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  const handleFaceIDLogin = () => {
    // Show the Face ID modal
    setShowFaceIDModal(true)
    setFaceIDStatus("scanning")

    // Start the scanning animation
    startScanAnimation()

    // Simulate a successful scan after 3 seconds
    setTimeout(() => {
      setFaceIDStatus("success")
      showSuccessAnimation()

      // Navigate to Home screen after showing success for 1 second
      setTimeout(() => {
        setShowFaceIDModal(false)
        navigation.navigate("Home" as never)
      }, 1000)
    }, 3000)
  }

  const handleEmergency = () => {
    // Implement emergency functionality
    console.log("Emergency button pressed")
  }

  // Interpolate the scan animation for the face outline
  const scanOpacity = scanAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  })

  return (
    <SafeAreaView style={styles.container}>
      {/* Arc Image - Direct Approach */}
      <View style={styles.arcContainer}>
        <Image
          source={require("../../assets/icons/arc-gradient.png")}
          style={{
            position: "absolute",
            opacity: 0.6,
            resizeMode: "contain",
            width: screenWidth * 0.9,
            height: screenHeight * 0.95,
            right: -screenWidth * 0.0,
            top: screenHeight * 0.3,
          }}
        />
      </View>

      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/icons/g24-2.png")} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>HOLA, SERGIO.</Text>
      </View>

      {/* Face ID Login Option */}
      <View style={styles.faceIdContainer}>
        <Text style={styles.faceIdText}>Inicia sesion con Face ID</Text>
        <TouchableOpacity style={styles.faceIdButton} onPress={handleFaceIDLogin}>
          <Image source={require("../../assets/icons/scan.png")} style={styles.faceIdIcon} />
          <Text style={styles.faceIdLabel}>Face ID</Text>
        </TouchableOpacity>
      </View>

      {/* Credentials Login Option */}
      <TouchableOpacity style={styles.credentialsButton} onPress={() => setShowCredentials(true)}>
        <Text style={styles.credentialsText}>Iniciar con credenciales de acceso</Text>
      </TouchableOpacity>

      {/* Emergency Button */}
      <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergency}>
        <Text style={styles.emergencyText}>EMERGENCIA</Text>
        <Image source={require("../../assets/icons/arrow-up.png")} style={styles.arrowIcon} />
      </TouchableOpacity>

      {/* Credentials Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCredentials}
        onRequestClose={() => setShowCredentials(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Credenciales de acceso</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={isEmailInput ? "Correo" : "Contraseña"}
                value={isEmailInput ? email : password}
                onChangeText={(text) => (isEmailInput ? setEmail(text) : setPassword(text))}
                placeholderTextColor="#666"
                autoCorrect={false}
                secureTextEntry={!isEmailInput}
              />
            </View>

            {errorMessage !== "" && <Text style={styles.errorText}>{errorMessage}</Text>}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowCredentials(false)
                  setIsEmailInput(true)
                  setErrorMessage("")
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => {
                  if (isEmailInput) {
                    if (!validateEmail(email)) {
                      setErrorMessage("Correo inválido. Ingresa un correo válido.")
                      return
                    }
                    setErrorMessage("")
                    setIsEmailInput(false)
                  } else {
                    handleLogin()
                  }
                }}
              >
                <Text style={styles.continueButtonText}>{isEmailInput ? "Continuar" : "Iniciar sesión"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Face ID Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showFaceIDModal}
        onRequestClose={() => setShowFaceIDModal(false)}
      >
        <View style={styles.faceIDModalOverlay}>
          <View style={styles.faceIDModalContent}>
            {faceIDStatus === "scanning" && (
              <>
                <Text style={styles.faceIDModalTitle}>Escaneando Face ID</Text>
                <View style={styles.faceIDScanContainer}>
                  <Animated.View style={[styles.faceIDScanOutline, { opacity: scanOpacity }]}>
                    <Image
                      source={require("../../assets/icons/scan.png")}
                      style={styles.faceIDScanImage}
                      resizeMode="contain"
                    />
                  </Animated.View>
                </View>
                <Text style={styles.faceIDModalSubtitle}>Mirando a la cámara...</Text>
              </>
            )}

            {faceIDStatus === "success" && (
              <Animated.View style={[styles.faceIDSuccessContainer, { opacity: successOpacity }]}>
                <View style={styles.faceIDSuccessIconContainer}>
                  <Image
                    source={require("../../assets/icons/verify.png")}
                    style={styles.faceIDSuccessIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.faceIDSuccessText}>Autenticación exitosa</Text>
              </Animated.View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  logo: {
    width: 225,
    height: 60,
  },
  welcomeSection: {
    marginTop: 80,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  faceIdContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  faceIdText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 20,
  },
  faceIdButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f8f8f8",
  },
  faceIdIcon: {
    width: 20,
    height: 20,
    tintColor: "#E31837",
  },
  faceIdLabel: {
    marginTop: 5,
    fontSize: 12,
    color: "#7D7D7D",
  },
  credentialsButton: {
    marginTop: 15,
    alignItems: "center",
  },
  credentialsText: {
    fontSize: 14,
    color: "#7D7D7D",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  arcContainer: {
    position: "absolute",
    height: "100%",
    right: 0,
    left: 0,
    zIndex: -1, // Ensure it stays behind other elements
    overflow: "hidden",
  },
  redArc: {
    position: "absolute",
    top: "50%", // Position from middle of screen
    // Create a gradient effect with varying opacity
    backgroundColor: "transparent",
    borderColor: "rgba(227, 24, 55, 0.15)",
    borderBottomColor: "rgba(227, 24, 55, 0.03)",
    borderLeftColor: "rgba(227, 24, 55, 0.08)",
    borderTopColor: "rgba(227, 24, 55, 0.15)",
  },
  emergencyButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    alignItems: "center",
  },
  emergencyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E31837",
  },
  arrowIcon: {
    width: 10,
    height: 10,
    tintColor: "#E31837",
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  errorText: {
    color: "#E31837",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E31837",
  },
  cancelButtonText: {
    color: "#E31837",
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#E31837",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  // Face ID Modal Styles
  faceIDModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  faceIDModalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  faceIDModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  faceIDModalSubtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  faceIDScanContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  faceIDScanOutline: {
    width: 120,
    height: 120,
    borderWidth: 3,
    borderColor: "#E31837",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  faceIDScanImage: {
    width: 50,
    height: 50,
    tintColor: "#E31837",
  },
  faceIDSuccessContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  faceIDSuccessIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  faceIDSuccessIcon: {
    width: 60,
    height: 60,
    tintColor: "#4CAF50",
  },
  faceIDSuccessText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
})

export default LoginScreen
