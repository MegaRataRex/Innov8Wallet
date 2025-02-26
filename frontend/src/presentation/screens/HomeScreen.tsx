import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles } from '../theme/app_themes';
import { Container } from '../../components/Container';
import VisaCardSVG from '../../assets/svgs/VisaCardSVG';
import { CustomBottomNav } from '../../components/CustomBottomNav';

export const HomeScreen = () => {
  const handleNavPress = (screenName: string) => {
    // Handle navigation or actions here
    console.log(`Navigating to ${screenName}`);
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={localStyles.scrollContent}>
        <Container>
          <View style={localStyles.header}>
            <View style={localStyles.userInfo}>
              <View style={localStyles.avatarCircle}>
                <Text style={localStyles.avatarText}>S</Text>
              </View>
              <Text style={localStyles.welcomeText}>
                BIENVENIDO, <Text style={localStyles.nameText}>SERGIO</Text>.
              </Text>
            </View>
            <TouchableOpacity style={localStyles.notificationButton}>
              <View style={localStyles.notificationDot} />
              <Text style={localStyles.notificationIcon}>🔔</Text>
            </TouchableOpacity>
          </View>

          <Text style={localStyles.sectionTitle}>Cuentas</Text>

          <View style={localStyles.cardContainer}>
            <VisaCardSVG />
          </View>

          <View style={localStyles.accountInfo}>
            <Text style={localStyles.accountLabel}>Cuenta Banorte</Text>
            <Text style={localStyles.balanceLabel}>Saldo actual</Text>
            <Text style={localStyles.balanceAmount}>$19,523.00</Text>
          </View>

          <View style={localStyles.quickActions}>
            <TouchableOpacity style={localStyles.actionItem}>
              <Image source={require('../../assets/icons/transfer.png')} style={localStyles.actionIcon} />
              <Text style={localStyles.actionText}>Transferir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionItem}>
              <Image source={require('../../assets/icons/withdrawal.png')} style={localStyles.actionIcon} />
              <Text style={localStyles.actionText}>Retiro sin{'\n'}tarjeta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionItem}>
              <Image source={require('../../assets/icons/recharge.png')} style={localStyles.actionIcon} />
              <Text style={localStyles.actionText}>Recargas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionItem}>
              <Image source={require('../../assets/icons/statement.png')} style={localStyles.actionIcon} />
              <Text style={localStyles.actionText}>Estado de{'\n'}cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionItem}>
              <Image source={require('../../assets/icons/more.png')} style={localStyles.actionIcon} />
              <Text style={localStyles.actionText}>Más</Text>
            </TouchableOpacity>
          </View>
        </Container>
      </ScrollView>
      <CustomBottomNav onPress={handleNavPress} />
    </View>
  );
};

const localStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 60, // Add padding to account for the nav bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EA0A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '400',
  },
  nameText: {
    color: '#EA0A2A',
    fontWeight: '600',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationDot: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EA0A2A',
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  accountInfo: {
    marginBottom: 32,
  },
  accountLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actionItem: {
    alignItems: 'center',
    width: '20%', // Adjust based on your layout needs
    marginBottom: 16,
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
    tintColor: '#EA0A2A',
  },
  actionText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
});
