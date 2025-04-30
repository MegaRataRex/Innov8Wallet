import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles as globalStyles } from '../theme/app_themes';

interface NotificationItem {
  id: string
  type: 'transfer' | 'purchase' | 'account' | 'support'
  title: string
  description: string
  date: string
  account?: string
}

export const NotificationsScreen = () => {
  const navigation = useNavigation();

  const notifications: NotificationItem[] = [
    {
      id: '1',
      type: 'transfer',
      title: 'Transferencia interbancaria',
      description: 'Realizaste una transferencia desde la aplicación móvil a otra entidad bancaria.',
      date: '26/02/2025',
      account: 'Cuenta **5123',
    },
    {
      id: '2',
      type: 'purchase',
      title: 'Compra con TDC',
      description: 'Compra con TDC en TUFESA MU $197.00',
      date: '26/02/2025',
      account: 'Cuenta **5123',
    },
    {
      id: '3',
      type: 'account',
      title: 'Tienes un nuevo nivel de cuenta',
      description: 'Tu cuenta ahora tiene nivel básico.',
      date: '26/02/2025',
    },
    {
      id: '4',
      type: 'support',
      title: 'Programaste una llamada con soporte',
      description:
        'Acabas de programar una llamada con soporte a las 19:00 hrs. Un asesor se pondrá en contacto contigo.',
      date: '26/02/2025',
    },
    {
      id: '5',
      type: 'transfer',
      title: 'Transferencia interbancaria',
      description: 'Realizaste una transferencia desde la aplicación móvil a otra entidad bancaria.',
      date: '26/02/2025',
      account: 'Cuenta **5123',
    },
    {
      id: '6',
      type: 'transfer',
      title: 'Transferencia interbancaria',
      description: 'Realizaste una transferencia desde la aplicación móvil a otra entidad bancaria.',
      date: '26/02/2025',
      account: 'Cuenta **5123',
    },
    {
      id: '7',
      type: 'transfer',
      title: 'Transferencia interbancaria',
      description: 'Realizaste una transferencia desde la aplicación móvil a otra entidad bancaria.',
      date: '26/02/2025',
      account: 'Cuenta **5123',
    },
  ];

  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case 'transfer':
        return (
          <View style={styles.transferIconContainer}>
            <Image source={require('../../assets/icons/transfer.png')} style={styles.transferIcon} />
          </View>
        );
      case 'purchase':
        return (
          <View style={styles.transferIconContainer}>
            <Image source={require('../../assets/icons/transfer.png')} style={styles.transferIcon} />
          </View>
        );
      case 'account':
        return (
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icons/user.png')} style={styles.icon} />
          </View>
        );
      case 'support':
        return (
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icons/llamarSoporte1.png')} style={styles.icon} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={globalStyles.background}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/icons/arrow-left-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            {renderNotificationIcon(notification.type)}
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>{notification.description}</Text>
              <View style={styles.notificationFooter}>
                <Text style={styles.notificationDate}>{notification.date}</Text>
                {notification.account && <Text style={styles.notificationAccount}>{notification.account}</Text>}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transferIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transferIcon: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
  },
  notificationAccount: {
    fontSize: 12,
    color: '#999',
  },
});
