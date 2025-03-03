import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ActionButtons from '../../components/ActionButton';
import {styles} from '../theme/app_themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiFetcher } from '../../config/adapters/api_fetcher';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  interface LoginResponse {
    token: string;
    userId: number;
    name: string
  }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailInput, setIsEmailInput] = useState(true);
  // Logo icons array - assuming these exist in your asset

  const logo = require('../../assets/icons/g24.png');

  // Handle button presses
  const handleInfoPress = () => {
    console.log('Info button pressed');
  };

  const handleQrPress = () => {
    console.log('QR button pressed');
  };

  const handleSupportPress = () => {
    console.log('Support button pressed');
  };

  const handleMorePress = () => {
    console.log('More button pressed');
  };

  // Action buttons configuration
  const actionButtonsConfig = [
    {
      icon: require('../../assets/icons/info-icon.png'),
      onPress: handleInfoPress,
    },
    {
      icon: require('../../assets/icons/qr-icon.png'),
      onPress: handleQrPress,
    },
    {
      icon: require('../../assets/icons/support-icon.png'),
      onPress: handleSupportPress,
    },
    {
      icon: require('../../assets/icons/key-icon.png'),
      onPress: handleMorePress,
    },
  ];

  const handleLogin = async () => {
    try {
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
        // Navigate to the next screen if necessary
      } else {
      }
    } catch (error) {
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/building-background.jpg')}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        {/* Logo Section */}
        <View style={localStyles.logoContainer}>
          <View style={localStyles.logoShapes}>
            <Image source={logo} />
          </View>
        </View>

        {/* Welcome Section */}
        <View style={localStyles.welcomeSection}>
          <Text style={localStyles.welcomeText}>HOLA USUARIO</Text>
          <Text>{isEmailInput ? 'Ingresa tu correo' : 'Password'}</Text>
        </View>

        {/* Login Form Section */}
        <View style={localStyles.formContainer}>
          <View style={localStyles.inputRow}>
          <TextInput
              style={localStyles.input}
              placeholder={isEmailInput ? 'Correo' : 'Contraseña'}
              value={isEmailInput ? email : password}
              onChangeText={(text) => (isEmailInput ? setEmail(text) : setPassword(text))}
              placeholderTextColor="#666"
              autoCorrect={false}
            />
            <TouchableOpacity style={localStyles.loginButton}  onPress={() => {
            if (isEmailInput) {
              setIsEmailInput(false);  // Switch to password input
            } else {
            handleLogin();  // Call login function
            }
            }}>
              <Text style={localStyles.loginButtonText}>{isEmailInput ? 'Sig.' : 'Login'}</Text>
            </TouchableOpacity>
            </View>
          <Text style={localStyles.forgotPassword}>
            Tengo problemas para iniciar sesion
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={localStyles.actionButtonsWrapper}>
          <ActionButtons buttons={actionButtonsConfig} />
        </View>

        {/* Card Promotion Section */}
        <View style={localStyles.cardPromoContainer}>
          <Text style={localStyles.promoTitle}>DALE A TU NOMINA</Text>
          <Text style={localStyles.promoText}>
            Tarjeta banorte NOMINA, controla tus gastos directos con nuestra
            tarjeta especial para asalariados
          </Text>
          <Image
            source={require('../../assets/images/nomina-card.png')}
            style={localStyles.cardImage}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  logoShapes: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  logoShape: {
    width: 30,
    height: 30,
    marginHorizontal: 2,
  },
  bankName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankLetter: {
    width: 20,
    height: 25,
    marginHorizontal: 1,
  },
  welcomeSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 30,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 16,
  },
  forgotPassword: {
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  actionButtonsWrapper: {
    marginTop: 'auto', // This pushes the buttons to the bottom
    paddingVertical: 20,
  },
  cardPromoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E31837',
    marginBottom: 8,
  },
  promoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  loginButton: {
    backgroundColor: '#E31837',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
