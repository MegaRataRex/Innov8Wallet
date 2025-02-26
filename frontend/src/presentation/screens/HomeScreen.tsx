import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from '../theme/app_themes';
import { Container } from '../../components/Container';
import VisaCardSVG from '../../assets/svgs/VisaCardSVG';

const icons = {
  transfer: require('../../assets/icons/transfer.png'),
  withdrawal: require('../../assets/icons/withdrawal.png'),
  recharge: require('../../assets/icons/recharge.png'),
  statement: require('../../assets/icons/statement.png'),
  more: require('../../assets/icons/more.png'),
  bell: require('../../assets/icons/bell.png'),
  user: require('../../assets/icons/user.png'),
};

export const HomeScreen = () => {
  return (
    <View style={[styles.background]}>
      <Container>
        <View style={localStyles.header}>
          <View style={localStyles.userInfo}>
            <View style={localStyles.avatarCircle}>
              <Image source={icons.user} style={localStyles.iconSmall} />
            </View>
            <Text style={localStyles.welcomeText}>
              BIENVENIDO, <Text style={localStyles.nameText}>SERGIO</Text>.
            </Text>
          </View>
          <TouchableOpacity style={localStyles.notificationButton}>
            <View style={localStyles.notificationDot} />
            <Image source={icons.bell} style={localStyles.iconSmall} />
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

        <View style={localStyles.bottomNav}>
          <TouchableOpacity style={localStyles.navItem}>
            <Image source={icons.transfer} style={localStyles.icon} />
            <Text style={localStyles.navText}>Transferir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.navItem}>
            <Image source={icons.withdrawal} style={localStyles.icon} />
            <Text style={localStyles.navText}>Retiro sin{'\n'}tarjeta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.navItem}>
            <Image source={icons.recharge} style={localStyles.icon} />
            <Text style={localStyles.navText}>Recargas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.navItem}>
            <Image source={icons.statement} style={localStyles.icon} />
            <Text style={localStyles.navText}>Estado de{'\n'}cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.navItem}>
            <Image source={icons.more} style={localStyles.icon} />
            <Text style={localStyles.navText}>Más</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </View>
  );
};

const localStyles = StyleSheet.create({
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
  iconSmall: {
    width: 20,
    height: 20,
    tintColor: 'white', // For the user and bell icons
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#EA0A2A', // For the bottom navigation icons
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
    padding: 8,
  },
  notificationDot: {
    position: 'absolute',
    right: 4,
    top: 4,
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    color: '#333',
  },
});
