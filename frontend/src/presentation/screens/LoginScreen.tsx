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

const LoginScreen = () => {
  // Logo icons array - assuming these exist in your assets
  const logoIcons = [
    require('../../assets/icons/logo-shape-1.png'),
    require('../../assets/icons/logo-shape-2.png'),
    require('../../assets/icons/logo-shape-3.png'),
  ];

  // Bank name letters array - assuming these exist in your assets
  const bankLetters = [
    require('../../assets/icons/letter-b.png'),
    require('../../assets/icons/letter-a.png'),
    require('../../assets/icons/letter-n.png'),
    require('../../assets/icons/letter-o.png'),
    require('../../assets/icons/letter-r.png'),
    require('../../assets/icons/letter-t.png'),
    require('../../assets/icons/letter-e.png'),
  ];

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
      icon: require('../../assets/icons/more-icon.png'),
      onPress: handleMorePress,
    },
  ];

  return (
    <ImageBackground 
      source={require('../../assets/images/building-background.png')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoShapes}>
            {logoIcons.map((icon, index) => (
              <Image 
                key={`logo-${index}`}
                source={icon}
                style={styles.logoShape}
              />
            ))}
          </View>
          <View style={styles.bankName}>
            {bankLetters.map((letter, index) => (
              <Image
                key={`letter-${index}`}
                source={letter}
                style={styles.bankLetter}
              />
            ))}
          </View>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>HOLA SANTIAGO</Text>
          <Text style={styles.subText}>
            Inicia sesion con tu correo y contraseña.
          </Text>
        </View>

        {/* Login Form Section */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Correo"
              placeholderTextColor="#666"
            />
            {/* You can add the Face ID icon here */}
          </View>
          <Text style={styles.forgotPassword}>
            Tengo problemas para iniciar sesion
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsWrapper}>
          <ActionButtons buttons={actionButtonsConfig} />
        </View>
        
        {/* Card Promotion Section */}
        <View style={styles.cardPromoContainer}>
          <Text style={styles.promoTitle}>DALE A TU NOMINA</Text>
          <Text style={styles.promoText}>
            Tarjeta banorte NOMINA, controla tus gastos directos con nuestra 
            tarjeta especial para asalariados
          </Text>
          <Image 
            source={require('../../assets/images/nomina-card.png')}
            style={styles.cardImage}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
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