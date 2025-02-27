import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import ActionButtons from '../../components/ActionButton';
import {styles} from '../theme/app_themes';

const LoginScreen = () => {
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

  return (
    <ImageBackground
      source={require('../../assets/images/building-background.png')}
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
          <Text style={localStyles.welcomeText}>HOLA SANTIAGO</Text>
          <Text style={localStyles.subText}>
            Inicia sesion con tu correo y contraseña.
          </Text>
        </View>

        {/* Login Form Section */}
        <View style={localStyles.formContainer}>
          <View style={localStyles.inputContainer}>
            <TextInput
              style={localStyles.input}
              placeholder="Correo"
              placeholderTextColor="#666"
            />
            {/* You can add the Face ID icon here */}
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
});

export default LoginScreen;
