import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParams } from '../navigation/Navigation';

// Define the route params type
//type TransferSuccessScreenRouteProp = RouteProp<RootStackParams, "TransferSuccessScreen">

type TransferSuccessScreenNavigationProp = StackNavigationProp<RootStackParams, 'TransferSuccessScreen'>

export const TransferSuccessScreen = () => {
  const navigation = useNavigation<TransferSuccessScreenNavigationProp>();
  //const route = useRoute<TransferSuccessScreenRouteProp>()

  const handleViewReceipt = () => {
    // In a real app, this would navigate to a receipt screen or open a PDF
    console.log('View receipt');
  };

  const handleFinish = () => {
    // Navigate back to the home screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/icons/arrow-left-icon.png')} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transferir</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Success Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.successTitle}>LISTO</Text>
        <Text style={styles.successMessage}>Se a realizado la operación con éxito</Text>

        {/* Success Icon */}
        <View style={styles.iconContainer}>
            <View style={styles.successIconInner}>
              <Image source={require('../../assets/icons/verify.png')} style={styles.checkIcon} />
          </View>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.viewReceiptButton} onPress={handleViewReceipt}>
          <Text style={styles.viewReceiptText}>Ver recibo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={handleFinish}>
          <Text style={styles.confirmButtonText}>CONFIRMAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 60,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 200,
  },
  successIconInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: 100,
    height: 100,
  },
  bottomContainer: {
    padding: 24,
    alignItems: 'center',
  },
  viewReceiptButton: {
    marginBottom: 16,
  },
  viewReceiptText: {
    fontSize: 16,
    color: '#EA0A2A',
    textDecorationLine: 'none',
  },
  confirmButton: {
    backgroundColor: '#EA0A2A',
    borderRadius: 28,
    height: 56,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
