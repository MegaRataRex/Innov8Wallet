import { useEffect, useState, useRef } from "react"
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
import {CustomBottomNav} from '../../components/CustomBottomNav';
import {AdCard} from '../../components/AdCard';
import Shimmer from '../effects/shimmer';
import { DebtGraph } from "../../components/DebtGraph"
import MenuModal from "../../components/MenuModal"

import { useCards } from '../../hooks/useCards';
import { CardComponent } from '../../components/CardComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation} from '@react-navigation/native';

// Define the navigation prop type
type NavigationProps = any;

// Define transaction type
interface Transaction {
  id: string
  name: string
  description: string
  amount: number
  date: string
  isIncoming: boolean
}

// Define financial data type
interface FinancialData {
  income: number
  expenses: number
  credit: number
  debit: number
}

// Define debt item type
interface DebtItem {
  id: string
  name: string
  amount: number
  color: string
  category: "creditCard" | "loan"
}

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [name, setName] = useState('');
  const {isLoading, userCards} = useCards();
  const[isLoadingName, setIsLoadingName] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [financialData] = useState<FinancialData>({
    income: 20000,
    expenses: 9913,
    credit: 6763,
    debit: 3150,
  });

  // Debt data
  const [debtData, _setDebtData] = useState<DebtItem[]>([
    {
      id: "oneup",
      name: "Banorte One Up",
      amount: 4523,
      color: "#FFD700", // Yellow
      category: "creditCard",
    },
    {
      id: "mujer",
      name: "Mujer Banorte",
      amount: 2250,
      color: "#9C27B0", // Purple
      category: "creditCard",
    },
    {
      id: "auto",
      name: "Auto estreno Banorte",
      amount: 6550,
      color: "#EA0A2A", // Red
      category: "loan",
    },
  ]);

  const [currentDate, setCurrentDate] = useState("")
  const scrollViewRef = useRef<ScrollView>(null);
  const transactionsScrollViewRef = useRef<ScrollView>(null);

  // Calculate total debt
  const totalDebt = debtData.reduce((total, item) => total + item.amount, 0)

  useEffect(() => {
    // Format current date in Spanish
    const formatCurrentDate = () => {
      const months = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ]
      const now = new Date()
      const day = now.getDate()
      const month = months[now.getMonth()]
      return `${day} ${month}`
    }

    setCurrentDate(formatCurrentDate());
  }, []);

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

  useEffect(() => {
    // Simulate fetching transactions from an API
    const fetchTransactions = async () => {
      try {
        // In a real app, you would fetch this data from your API
        const mockTransactions: Transaction[] = [
          {
            id: "1",
            name: "Amazon",
            description: "Pago con tarjeta",
            amount: 723.0,
            date: "2023-06-15",
            isIncoming: false,
          },
          {
            id: "2",
            name: "SPEI recibido",
            description: "transferencia inter",
            amount: 530.0,
            date: "2023-06-14",
            isIncoming: true,
          },
          {
            id: "3",
            name: "Carl's Jr",
            description: "Pago con tarjeta",
            amount: 169.0,
            date: "2023-06-13",
            isIncoming: false,
          },
          {
            id: "4",
            name: "Nómina",
            description: "Depósito quincenal",
            amount: 8500.0,
            date: "2023-06-01",
            isIncoming: true,
          },
          {
            id: "5",
            name: "Netflix",
            description: "Suscripción mensual",
            amount: 219.0,
            date: "2023-05-28",
            isIncoming: false,
          },
          {
            id: "6",
            name: "Uber",
            description: "Servicio de transporte",
            amount: 145.5,
            date: "2023-05-25",
            isIncoming: false,
          },
        ];

        setTransactions(mockTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error)
      } finally {
        setIsLoadingTransactions(false);
      }
    };

    fetchTransactions();
  }, []);


  const handleNavPress = (screenName: string) => {
    // Handle navigation or actions here
    console.log(`Navigating to ${screenName}`);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateToCardDetails = () => {
    if (userCards.length > 0) {
      navigation.navigate("CardDetailsScreen", {
        cardType: userCards[0].cardType,
        lastFour: userCards[0].last_four,
        transactions: transactions,
      });
    }
  };

  const renderTransactionItem = (item: Transaction) => (
    <TouchableOpacity
      key={item.id}
      style={localStyles.transactionItem}
      onPress={() => console.log(`Transaction clicked: ${item.name}`)}
    >
      <View style={localStyles.transactionInfo}>
        <Text style={[localStyles.transactionName, styles.text]}>{item.name}</Text>
        <Text style={[localStyles.transactionDescription, styles.text]}>{item.description}</Text>
      </View>
      <View style={localStyles.transactionAmountContainer}>
        <View style={localStyles.amountIndicator}>
          <Image
            source={
              item.isIncoming ? require("../../assets/icons/incoming.png") : require("../../assets/icons/outgoing.png")
            }
            style={[localStyles.indicatorIcon, { tintColor: item.isIncoming ? "#28a745" : "#EA0A2A" }]}
          />
        </View>
        <Text style={[localStyles.transactionAmount, styles.text]}>
          {item.isIncoming ? "" : "-"}${item.amount.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const ads = [
    {
      image: require('../../assets/images/ad-nomina.jpg'),
      title: 'Tu Nómina es más fuerte con Banorte',
      description:
        'Cambia tu Nómina a Banorte desde tu celular, en menos de 5 minutos de cotización y conoce todos los beneficios que obtienes al ser parte de nuestra comunidad de clientes exclusivos.',
    },
    {
      image: require('../../assets/images/ad-hipotecario-copy.jpg'),
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
    <SafeAreaView style={styles.background}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={localStyles.scrollContent} nestedScrollEnabled={true}>
        <Container>
          <View style={localStyles.header}>
            <View style={localStyles.userInfo}>
            <TouchableOpacity style={localStyles.avatarCircle} onPress={()=> navigation.navigate('MyAccountScreen')}>
              <Image
                source={require('../../assets/icons/user.png')}
                style={localStyles.avatarIcon}
              />
              </TouchableOpacity>
              <Text style={[localStyles.welcomeText]}>
                BIENVENID@, {
                  isLoadingName ? (
                    <Shimmer/>
                  ) : (<Text style={localStyles.nameText}>
                   {name}
                  </Text>)}
              </Text>
            </View>
            <TouchableOpacity
              style={localStyles.notificationButton}
              onPress={() => navigation.navigate("NotificationsScreen")}
            >
              <Image
                source={require('../../assets/icons/bell.png')}
                style={localStyles.actionIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={[localStyles.sectionTitle, styles.text]}>Cuentas</Text>

          <TouchableOpacity style={localStyles.cardContainer} onPress={navigateToCardDetails} activeOpacity={0.9}>
            {isLoading ? (
              <Shimmer />
            ) : userCards.length > 0 ? (
              <CardComponent cardType={userCards[0].cardType} lastFour={userCards[0].last_four} />
            ) : (
              <Text style={styles.text}>No cards available</Text>
            )}
          </TouchableOpacity>

          <View style={localStyles.accountInfo}>
            <Text style={[localStyles.accountLabel, styles.text]}>
              Cuenta Banorte
            </Text>
            <Text style={[localStyles.balanceLabel, styles.text]}>
              Saldo actual
            </Text>
            <Text style={[styles.text, localStyles.balanceAmount]}>
              $19,523.00
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
            <TouchableOpacity style={localStyles.actionItem} onPress={() => navigation.navigate('WithdrawalScreen')}>
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

        {/* Recent Transactions Section */}
        <Container>
          <View style={localStyles.transactionsHeader}>
            <Text style={[localStyles.sectionTitle, styles.text]}>Mis ultimos movimientos</Text>
            <TouchableOpacity onPress={navigateToCardDetails}>
              <Image source={require("../../assets/icons/arrow-right.png")} style={localStyles.arrowIcon} />
            </TouchableOpacity>
          </View>

          <View style={localStyles.transactionsContainer}>
            {isLoadingTransactions ? (
              <Shimmer />
            ) : transactions.length === 0 ? (
              <Text style={[styles.text, localStyles.noTransactionsText]}>No hay movimientos recientes</Text>
            ) : (
              <ScrollView
                ref={transactionsScrollViewRef}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={localStyles.transactionsScrollContent}
              >
                {transactions.map((item) => renderTransactionItem(item))}
              </ScrollView>
            )}
          </View>
        </Container>

                {/* Financial Future Section */}
                <Container>
          <View style={localStyles.transactionsHeader}>
            <Text style={[localStyles.sectionTitle, styles.text]}>Tu futuro financiero</Text>
            <TouchableOpacity onPress={() => navigation.navigate("FinancialFutureScreen")}>
              <Image source={require("../../assets/icons/arrow-right.png")} style={localStyles.arrowIcon} />
            </TouchableOpacity>
          </View>

          <View style={localStyles.financialContainer}>
            {/* Header with date */}
            <View style={localStyles.financialHeader}>
              <Text style={localStyles.financialSubtitle}>Analisis actual</Text>
              <Text style={localStyles.financialDate}>{currentDate}</Text>
            </View>

            {/* Income */}
            <View style={localStyles.financialItemContainer}>
              <View style={localStyles.financialLabelRow}>
                <Text style={localStyles.financialLabel}>Ingresos</Text>
                <Text style={localStyles.financialAmount}>${financialData.income.toLocaleString()}</Text>
              </View>
              <View style={localStyles.progressBarContainer}>
                <View style={[localStyles.progressBarFill, { width: "100%", backgroundColor: "#EA0A2A" }]} />
              </View>
            </View>

            {/* Expenses */}
            <View style={localStyles.financialItemContainer}>
              <View style={localStyles.financialLabelRow}>
                <Text style={localStyles.financialLabel}>Gastos</Text>
                <Text style={localStyles.financialAmount}>${financialData.expenses.toLocaleString()}</Text>
              </View>
              <View style={[localStyles.progressBarContainer, { backgroundColor: "#EA0A2A" }]}>
                <View
                  style={[
                    localStyles.progressBarFill,
                    {
                      width: `${(financialData.expenses / financialData.income) * 100}%`,
                      backgroundColor: "#FF9800",
                    },
                  ]}
                />
              </View>
            </View>

            {/* Credit */}
            <View style={localStyles.financialLabelRow}>
              <Text style={localStyles.financialLabel}>Crédito</Text>
              <Text style={localStyles.financialAmount}>${financialData.credit.toLocaleString()}</Text>
            </View>

            {/* Debit */}
            <View style={localStyles.financialLabelRow}>
              <Text style={localStyles.financialLabel}>Débito</Text>
              <Text style={localStyles.financialAmount}>${financialData.debit.toLocaleString()}</Text>
            </View>
          </View>
        </Container>

        {/* Debt Zero Section */}
        <Container>
          <View style={localStyles.transactionsHeader}>
            <Text style={[localStyles.sectionTitle, styles.text]}>Deuda cero</Text>
            <TouchableOpacity onPress={() => navigation.navigate("DebtZeroScreen")}>
              <Image source={require("../../assets/icons/arrow-right.png")} style={localStyles.arrowIcon} />
            </TouchableOpacity>
          </View>

          <View style={localStyles.financialContainer}>
            {/* Header with date */}
            <View style={localStyles.financialHeader}>
              <Text style={localStyles.financialSubtitle}>Deuda actual</Text>
              <View style={{ width: 20 }} />
              <Text style={localStyles.financialDate}>{currentDate}</Text>
            </View>

            {/* Credit Cards Section */}
            <Text style={localStyles.debtCategoryTitle}>TDC'S</Text>

            {debtData
              .filter((item) => item.category === "creditCard")
              .map((item) => (
                <View key={item.id} style={localStyles.debtItemRow}>
                  <View style={localStyles.debtItemLeft}>
                    <View style={[localStyles.debtColorIndicator, { backgroundColor: item.color }]} />
                    <Text style={localStyles.debtItemName}>{item.name}</Text>
                  </View>
                  <Text style={localStyles.debtItemAmount}>${item.amount.toLocaleString()}</Text>
                </View>
              ))}

            {/* Loans Section */}
            <Text style={localStyles.debtCategoryTitle}>Prestamos</Text>

            {debtData
              .filter((item) => item.category === "loan")
              .map((item) => (
                <View key={item.id} style={localStyles.debtItemRow}>
                  <View style={localStyles.debtItemLeft}>
                    <View style={[localStyles.debtColorIndicator, { backgroundColor: item.color }]} />
                    <Text style={localStyles.debtItemName}>{item.name}</Text>
                  </View>
                  <Text style={localStyles.debtItemAmount}>${item.amount.toLocaleString()}</Text>
                </View>
              ))}

            {/* Debt Graph */}
            <View style={localStyles.debtGraphContainer}>
              <DebtGraph data={debtData} totalDebt={totalDebt} />
            </View>
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

      {/* Menu Modal Component */}
      <MenuModal visible={menuVisible} onClose={toggleMenu} userName={name} />
    </SafeAreaView>
  );
};

//const { width } = Dimensions.get('window');

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
    //backgroundColor: '#EA0A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarIcon: {
    width: 40,
    height: 40,
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
    //tintColor: '#EA0A2A',
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

  // Transactions styles
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  transactionsList: {
    marginBottom: 16,
  },
  transactionsContainer: {
    height: 215, // Fixed height for the transactions container
    marginBottom: 16,
    //overflow: "hidden",
  },
  transactionsScrollContent: {
    paddingRight: 5, // Add a bit of padding for the scrollbar
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 14,
    color: "#666",
  },
  transactionAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  indicatorIcon: {
    width: 12,
    height: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  noTransactionsText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#666",
  },

  // Financial Future styles
  financialContainer: {
    marginBottom: 16,
  },
  financialHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  financialSubtitle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  financialDate: {
    fontSize: 14,
    color: "#666",
  },
  financialItemContainer: {
    marginBottom: 12,
  },
  financialLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  financialLabel: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  financialAmount: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },

  // Debt Zero styles
  debtCategoryTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginTop: 12,
    marginBottom: 8,
  },
  debtItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  debtItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  debtColorIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  debtItemName: {
    fontSize: 14,
    color: "#000",
  },
  debtItemAmount: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  debtGraphContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
