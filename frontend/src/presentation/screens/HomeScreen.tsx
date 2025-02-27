import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from '../theme/app_themes';
import {Container} from '../../components/Container';
import VisaCardSVG from '../../assets/svgs/VisaCardSVG';
import {CustomBottomNav} from '../../components/CustomBottomNav';
import {AdCard} from '../../components/AdCard';
import Shimmer from '../effects/shimmer';
import {Shield} from 'lucide-react-native';

export const HomeScreen = () => {
  const handleNavPress = (screenName: string) => {
    // Handle navigation or actions here
    console.log(`Navigating to ${screenName}`);
  };

  const ads = [
    {
      image: require('../../assets/images/ad-nomina.jpg'),
      title: 'Tu Nómina es más fuerte con Banorte',
      description:
        'Cambia tu Nómina a Banorte desde tu celular, en menos de 5 minutos de cotización y conoce todos los beneficios que obtienes al ser parte de nuestra comunidad de clientes exclusivos.',
    },
    {
      image: require('../../assets/images/ad-hipotecario.jpg'),
      title: 'TRANSFIERE TU CRÉDITO HIPOTECARIO A BANORTE',
      description:
        'te otorgamos un monto adicional para que uses como más te convenga. Mejor aún, disfruta de una Liquidez en transferir a Banorte el crédito hipotecario que tienes en otro Banco.',
    },
    {
      image: require('../../assets/images/ad-salud.png'),
      title: 'PIEZA FUNDAMENTAL EN LA SALUD Y BIENESTAR PARA TU CUERPO',
      description:
        'Su desarrollo y mantenimiento ayudan en la salud metabólica, mental, ósea y en el desempeño físico. Haz hancia para más información y conoce más al respecto.',
    },
  ];

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={localStyles.scrollContent}>
        <Container>
          <View style={localStyles.header}>
            <View style={localStyles.userInfo}>
              <View style={localStyles.avatarCircle}>
                <Text style={localStyles.avatarText}>S</Text>
              </View>
              <Text style={[localStyles.welcomeText]}>
                BIENVENIDO, <Text style={localStyles.nameText}>SERGIO</Text>.
              </Text>
            </View>
            <TouchableOpacity style={localStyles.notificationButton}>
              <Image
                source={require('../../assets/icons/bell.png')}
                style={localStyles.actionIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={[localStyles.sectionTitle, styles.text]}>Cuentas</Text>

          <View style={localStyles.cardContainer}>
            <VisaCardSVG />
          </View>

          <View style={localStyles.accountInfo}>
            <Text style={[localStyles.accountLabel, styles.text]}>
              Cuenta Banorte
            </Text>
            <Text style={[localStyles.balanceLabel, styles.text]}>
              Saldo actual
            </Text>
            <Text style={[styles.text, localStyles.balanceAmount]}>
              $19,522.00
            </Text>
          </View>

          <View style={localStyles.quickActions}>
            <TouchableOpacity style={localStyles.actionItem}>
              <Image
                source={require('../../assets/icons/transfer.png')}
                style={localStyles.actionIcon}
              />
              <Text style={[localStyles.actionText, styles.text]}>
                Transferir
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionItem}>
              <Image
                source={require('../../assets/icons/withdrawal.png')}
                style={localStyles.actionIcon}
              />
              <Text style={[localStyles.actionText, styles.text]}>
                Retiro sin{'\n'}tarjeta
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionItem}>
              <Image
                source={require('../../assets/icons/recharge.png')}
                style={localStyles.actionIcon}
              />
              <Text style={[localStyles.actionText, styles.text]}>
                Recargas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionItem}>
              <Image
                source={require('../../assets/icons/statement.png')}
                style={localStyles.actionIcon}
              />
              <Text style={[localStyles.actionText, styles.text]}>
                Estado de{'\n'}cuenta
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionItem}>
              <Image
                source={require('../../assets/icons/more.png')}
                style={localStyles.actionIcon}
              />
              <Text style={[localStyles.actionText, styles.text]}>Más</Text>
            </TouchableOpacity>
          </View>
        </Container>
        <View style={localStyles.adsSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={localStyles.adsScrollContent}>
            {ads.map((ad, index) => (
              <AdCard
                key={index}
                image={ad.image}
                title={ad.title}
                description={ad.description}
                onPress={() => console.log(`Ad ${index + 1} clicked`)}
              />
            ))}
          </ScrollView>
        </View>
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
    color: 'black',
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
    color: 'black',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '600',
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
    color: 'black',
  },
  adsSection: {
    marginTop: 32,
  },
  adsScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
