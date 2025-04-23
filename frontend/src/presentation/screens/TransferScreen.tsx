import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define a type for the contact object
interface Contact {
    id: string;
    name: string;
    bank: string;
    accountType: string;
    accountNumber: string;
  }

// Mock data for contacts
const CONTACTS: Contact[] = [
  { id: '1', name: 'Dulce', bank: 'NU MEXICO', accountType: 'Debito', accountNumber: '****2339' },
  { id: '2', name: 'Emiliano', bank: 'BBVA MEXICO', accountType: 'Debito', accountNumber: '****2339' },
  { id: '3', name: 'Manuel Eduardo', bank: 'BBVA MEXICO', accountType: 'Debito', accountNumber: '****3142' },
  { id: '4', name: 'Nayheli', bank: 'Banorte', accountType: 'Debito', accountNumber: '****2939' },
  { id: '5', name: 'Ricardo', bank: 'Banorte', accountType: 'Debito', accountNumber: '****0953' },
  { id: '6', name: 'Zendaya', bank: 'Banorte', accountType: 'Debito', accountNumber: '****2312' },
];

export const TransferScreen = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(CONTACTS);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredContacts(CONTACTS);
    } else {
      const filtered = CONTACTS.filter(
        contact =>
          contact.name.toLowerCase().includes(text.toLowerCase()) ||
          contact.bank.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  const handleContactPress = (contact: Contact) => {
    // Navigate to transfer amount screen or handle the transfer process
    navigation.navigate('TransferAmountScreen', { contact });
    //console.log(`Selected contact: ${contact.name}`);
    // Example: navigation.navigate('TransferAmount', { contact });
  };

  const renderContactItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => handleContactPress(item)}
    >
      <View style={styles.avatarContainer}>
      <Image
          source={require('../../assets/icons/user.png')}
          style={styles.avatar}
        />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.accountInfo}>
          {item.bank} - {item.accountType} {item.accountNumber}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../assets/icons/arrow-left-icon.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transferir</Text>
        <View style={styles.placeholder} />
      </View>
      {/* Subtitle */}
      <Text style={styles.subtitle}>¿A quién le quieres transferir dinero?</Text>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
      <Image
          source={require('../../assets/icons/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
      </View>
      {/* Contacts List */}
      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contactsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40, // To balance the header
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchIcon: {
    width: 15,
    height: 15,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  contactsList: {
    paddingHorizontal: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  accountInfo: {
    fontSize: 14,
    color: '#666',
  },
});
