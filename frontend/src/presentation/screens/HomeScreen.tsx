import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import {styles} from '../theme/app_themes';
import {Container} from '../../components/Container';
import {CustomBottomNav} from '../../components/CustomBottomNav';
import {AdCard} from '../../components/AdCard';
import Shimmer from '../effects/shimmer';

import { useCards } from '../../hooks/useCards';
import { CardComponent } from '../../components/CardComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CommonActions } from '@react-navigation/native';

// Define the navigation prop type
type NavigationProps = any;

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [name, setName] = useState('');
  const {isLoading, userCards} = useCards();
  const[isLoadingName, setIsLoadingName] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);


  useEffect(() => {
    const fetchName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        if (storedName) {
          setName(storedName);
        }
      } catch (error) {
        console.error('Error fetching name:', error);
      } finally {
        setIsLoadingName(false);
      }
    };

    fetchName();
  }, [setIsLoadingName]);


  const handleNavPress = (screenName: string) => {
    // Handle navigation or actions here
    console.log(`Navigating to ${screenName}`);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = async () => {
    try {
      // Clear any necessary session data
      await AsyncStorage.removeItem('name');
      // Add any other session data that needs to be cleared

      // Close the menu
      setMenuVisible(false);

      // Navigate to login screen
      navigation.dispatch(
        CommonActions.navigate({
          name: 'LoginScreen',
        })
      );
    } catch (error) {
      console.error('Error during logout:', error);
    }
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

  // Menu sections data
  const menuSections = [
    {
      title: 'Favoritos',
      items: [
        { id: 'transferir', label: 'Transferir', icon: require('../../assets/icons/transfer.png') },
        { id: 'retiro', label: 'Retiro sin tarjeta', icon: require('../../assets/icons/withdrawal.png') },
        { id: 'recargas', label: 'Recargas', icon: require('../../assets/icons/recharge.png') },
        { id: 'estado', label: 'Estado de cuenta', icon: require('../../assets/icons/statement.png') },
      ],
      itemsPerRow: 4,
    },
    {
      title: 'Operaciones con cuentas',
      items: [
        { id: 'pago', label: 'Pago de servicios', icon: require('../../assets/icons/pagoServicios.png') },
        { id: 'prestamo', label: 'Préstamo', icon: require('../../assets/icons/prestamo.png') },
        { id: 'apartados', label: 'Apartados', icon: require('../../assets/icons/apartados.png') },
        { id: 'codi', label: 'CoDi', icon: require('../../assets/icons/CoDi.png') },
      ],
      itemsPerRow: 4,
    },
    {
      title: '',
      items: [
        { id: 'mis-cuentas', label: 'Mis cuentas', icon: require('../../assets/icons/user.png') },
        { id: 'deposito', label: 'Depósito de cheques', icon: require('../../assets/icons/depositoCheques.png') },
        { id: 'retirar', label: 'Retirar dinero', icon: require('../../assets/icons/retirarDinero.png') },
        { id: 'inversiones', label: 'Inversiones', icon: require('../../assets/icons/inversiones.png') },
      ],
      itemsPerRow: 4,
    },
    {
      title: '',
      items: [
        { id: 'calendario', label: 'Calendario', icon: require('../../assets/icons/calendar.png') },
        { id: 'configuracion', label: 'Configuración', icon: require('../../assets/icons/configuracion.png') },
        { id: 'divisas', label: 'Cambio de Divisas', icon: require('../../assets/icons/cambioDivisas.png') },
        { id: 'apple', label: 'Agregar a apple wallet', icon: require('../../assets/icons/applePay.png') },
      ],
      itemsPerRow: 4,
    },
    {
      title: '',
      items: [
        { id: 'promociones', label: 'Promociones', icon: require('../../assets/icons/promociones.png') },
        { id: 'ubicaciones', label: 'Ubicaciones', icon: require('../../assets/icons/ubicaciones.png') },
      ],
      itemsPerRow: 2,
    },
    {
      title: 'Soporte',
      items: [
        { id: 'llamar', label: 'Llamar a soporte', icon: require('../../assets/icons/llamarSoporte1.png') },
        { id: 'llamar-alt', label: 'Llamar a soporte', icon: require('../../assets/icons/llamarSoporte2.png') },
        { id: 'preguntas', label: 'Preguntas Frecuentes', icon: require('../../assets/icons/faq.png') },
        { id: 'tutorial', label: 'Tutorial', icon: require('../../assets/icons/tutorial.png') },
      ],
      itemsPerRow: 4,
    },
  ];

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView contentContainerStyle={localStyles.scrollContent}>
        <Container>
          <View style={localStyles.header}>
            <View style={localStyles.userInfo}>
              <View style={localStyles.avatarCircle}>
                <Text style={localStyles.avatarText}>S</Text>
              </View>
              <Text style={[localStyles.welcomeText]}>
                BIENVENID@, {
                  isLoadingName ? (
                    <Shimmer/>
                  ) : (<Text style={localStyles.nameText}>
                   {name}
                  </Text>)}
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
          {isLoading ? (
            <Shimmer/>
          ) : userCards.length > 0 ? (
          <CardComponent cardType={userCards[0].cardType} lastFour={userCards[0].last_four}/>
          ) : (
          <Text style={styles.text}>No cards available</Text>
          )}

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
            <TouchableOpacity
            style={localStyles.actionItem}
            onPress={() => navigation.navigate('TransferScreen')}
            >
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
            <TouchableOpacity
              style={localStyles.actionItem}
              onPress={toggleMenu}
            >
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

      {/* Menu Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={toggleMenu}
      >
        <View style={localStyles.modalOverlay}>
          <Pressable
            style={localStyles.modalBackground}
            onPress={toggleMenu}
          />
          <View style={localStyles.menuContainer}>
            <Text style={localStyles.menuTitle}>Menú</Text>

            <View style={localStyles.userInfoMenu}>
              <Text style={localStyles.userNameMenu}>{name} Tirado</Text>
            </View>

            <ScrollView
              style={localStyles.menuScrollView}
              contentContainerStyle={localStyles.menuScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {menuSections.map((section, sectionIndex) => (
                <View key={`section-${sectionIndex}`} style={localStyles.menuSection}>
                  {section.title ? (
                    <Text style={localStyles.sectionTitleMenu}>{section.title}</Text>
                  ) : null}
                  <View style={[
                    localStyles.menuItemsGrid,
                    section.itemsPerRow === 2 && localStyles.twoItemsRow,
                  ]}>
                    {section.items.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          localStyles.menuItem,
                          section.itemsPerRow === 2 && localStyles.menuItemHalfWidth,
                        ]}
                        onPress={() => {
                          toggleMenu();
                          console.log(`Menu item clicked: ${item.label}`);
                          if (item.id === 'transferir') {
                            navigation.navigate('TransferScreen');
                          }
                        }}
                      >
                        <View>
                          <Image
                            source={item.icon}
                            style={localStyles.menuIcon}
                            resizeMode="contain"
                          />
                        </View>
                        <Text style={localStyles.menuItemLabel}>{item.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={localStyles.logoutButton}
              onPress={handleLogout}
            >
              <Image
                source={require('../../assets/icons/logout.png')}
                style={localStyles.logoutIcon}
              />
              <Text style={localStyles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

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

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: width * 0.85,
    height: height * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    paddingTop: 12,
    paddingBottom: 15,
    alignItems: 'center',
  },
  menuScrollView: {
    width: '100%',
    flex: 1,
  },
  menuScrollContent: {
    paddingBottom: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    alignSelf: 'center',
  },
  userInfoMenu: {
    alignItems: 'center',
    marginBottom: 10,
  },
  userNameMenu: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  userFavoritesLabel: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    width: '100%',
    marginBottom: 15,
  },
  sectionTitleMenu: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  menuItemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  twoItemsRow: {
    justifyContent: 'center', // Center the items in the row
    paddingHorizontal: 20, // Add some padding to space them out
  },
  menuItem: {
    width: '25%', // 4 items per row by default
    alignItems: 'center',
    marginBottom: 12,
  },
  menuItemHalfWidth: {
    width: '40%', // Wider for 2 items per row
    marginHorizontal: '5%', // Add horizontal margin for spacing
  },
  menuIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  menuItemLabel: {
    fontSize: 11,
    textAlign: 'center',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EA0A2A',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 8,
    width: '80%',
  },
  logoutIcon: {
    width: 18,
    height: 18,
    tintColor: 'white',
    marginRight: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
