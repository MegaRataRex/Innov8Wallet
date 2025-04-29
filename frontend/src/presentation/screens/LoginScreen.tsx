'use client';

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, Modal, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiFetcher } from '../../config/adapters/api_fetcher';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  // Update screen dimensions when orientation changes
  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateDimensions);

    return () => {
      // Clean up event listener
      // Note: In newer React Native versions, this might need to be updated
      // as the API has changed in recent versions
    };
  }, []);

  interface LoginResponse {
    token: string
    userId: number
    name: string
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailInput, setIsEmailInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    try {
      setErrorMessage('');
      const response: LoginResponse = await ApiFetcher.post('/users/login', {
        email,
        password,
      });

      if (response) {
        const firstName = response.name.split(' ')[0].toUpperCase();
        AsyncStorage.setItem('name', firstName);
        AsyncStorage.setItem('token', response.token);
        AsyncStorage.setItem('userId', response.userId.toString());
        navigation.navigate('Home' as never);
        setShowCredentials(false);
        setIsEmailInput(true);
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage('Correo o contraseña incorrectos. Inténtalo de nuevo.');
    }
  };

  const handleFaceIDLogin = () => {
    // Implement Face ID login logic here
    console.log('Face ID login pressed');
  };

  const handleEmergency = () => {
    // Implement emergency functionality
    console.log('Emergency button pressed');
  };

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
        <Image source={require('../../assets/icons/g24-2.png')} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>HOLA, SERGIO.</Text>
      </View>

      {/* Face ID Login Option */}
      <View style={styles.faceIdContainer}>
        <Text style={styles.faceIdText}>Inicia sesion con Face ID</Text>
        <TouchableOpacity style={styles.faceIdButton} onPress={handleFaceIDLogin}>
          <Image source={require('../../assets/icons/scan.png')} style={styles.faceIdIcon} />
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
        <Image source={require('../../assets/icons/arrow-up.png')} style={styles.arrowIcon} />
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
                placeholder={isEmailInput ? 'Correo' : 'Contraseña'}
                value={isEmailInput ? email : password}
                onChangeText={(text) => (isEmailInput ? setEmail(text) : setPassword(text))}
                placeholderTextColor="#666"
                autoCorrect={false}
                secureTextEntry={!isEmailInput}
              />
            </View>

            {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowCredentials(false);
                  setIsEmailInput(true);
                  setErrorMessage('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => {
                  if (isEmailInput) {
                    if (!validateEmail(email)) {
                      setErrorMessage('Correo inválido. Ingresa un correo válido.');
                      return;
                    }
                    setErrorMessage('');
                    setIsEmailInput(false);
                  } else {
                    handleLogin();
                  }
                }}
              >
                <Text style={styles.continueButtonText}>{isEmailInput ? 'Continuar' : 'Iniciar sesión'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  logo: {
    width: 225,
    height: 60,
  },
  welcomeSection: {
    marginTop: 80,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  faceIdContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  faceIdText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  faceIdButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8f8f8',
  },
  faceIdIcon: {
    width: 20,
    height: 20,
    tintColor: '#E31837',
  },
  faceIdLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#7D7D7D',
  },
  credentialsButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  credentialsText: {
    fontSize: 14,
    color: '#7D7D7D',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  arcContainer: {
    position: 'absolute',
    //right: 0, // Ensure container extends to right edge
    //left: 0, // Ensure container extends to left edge
    height: '100%',
    //width: '100%',
    right: 0,
    left: 0,
    zIndex: -1, // Ensure it stays behind other elements
    overflow: 'hidden',
  },
  redArc: {
    position: 'absolute',
    top: '50%', // Position from middle of screen
    // Create a gradient effect with varying opacity
    backgroundColor: 'transparent',
    borderColor: 'rgba(227, 24, 55, 0.15)',
    borderBottomColor: 'rgba(227, 24, 55, 0.03)',
    borderLeftColor: 'rgba(227, 24, 55, 0.08)',
    borderTopColor: 'rgba(227, 24, 55, 0.15)',
  },
  emergencyButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  emergencyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E31837',
  },
  arrowIcon: {
    width: 10,
    height: 10,
    tintColor: '#E31837',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
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
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#E31837',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E31837',
  },
  cancelButtonText: {
    color: '#E31837',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#E31837',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
