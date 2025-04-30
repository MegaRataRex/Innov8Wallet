'use client';

import { useState, useRef, useEffect } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const AddContactScreen = () => {
  const navigation = useNavigation<any>();
  const [accountNumber, setAccountNumber] = useState('');
  const inputRef = useRef<TextInput>(null);

  // Focus the input when the screen loads
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const handleAccountNumberChange = (text: string) => {
    // Only allow numbers
    const regex = /^\d*$/;
    if (text === '' || regex.test(text)) {
      setAccountNumber(text);
    }
  };

  // Handle continue button press
  const handleContinue = () => {
    if (accountNumber.length < 10) {
      // Show error - account number too short
      return;
    }

    // In a real app, you would validate the account number format
    // and then fetch bank information based on the account number

    // For now, we'll mock the bank information based on the first few digits
    const bankInfo = {
      bankName: 'BBVA México',
      accountType: 'Debito',
    };

    // Simple mock logic to determine bank based on first digits
    if (accountNumber.startsWith('1')) {
      bankInfo.bankName = 'Banorte';
    } else if (accountNumber.startsWith('2')) {
      bankInfo.bankName = 'Santander';
    } else if (accountNumber.startsWith('3')) {
      bankInfo.bankName = 'HSBC';
    } else if (accountNumber.startsWith('4')) {
      bankInfo.bankName = 'Citibanamex';
    } else if (accountNumber.startsWith('5')) {
      bankInfo.bankName = 'NU MEXICO';
    }

    // Navigate to contact details screen
    navigation.navigate('ContactDetailsScreen', { accountNumber, bankInfo });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/icons/arrow-left-icon.png')} style={styles.backArrow} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transferir</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Nuevo destinatario</Text>
          <Text style={styles.subtitle}>Ingresa el número de cuenta; CLABE, Tarjeta o celular del beneficiario</Text>

          {/* Input Container */}
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={accountNumber}
              onChangeText={handleAccountNumberChange}
              keyboardType="number-pad"
              placeholder=""
              autoFocus={true}
            />
            <TouchableOpacity
              style={[styles.continueButton, accountNumber.length < 10 && styles.continueButtonDisabled]}
              onPress={handleContinue}
              disabled={accountNumber.length < 10}
            >
              <Image source={require('../../assets/icons/right-arrow.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: 24,
    height: 24,
    tintColor: '#EA0A2A',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
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
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EA0A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
});
