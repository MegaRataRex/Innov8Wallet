import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Bell, ArrowRight, RefreshCcw, Hand, CreditCard, Calendar } from "react-native-feather"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigation/Navigation';

type LoginPageNavigationProp = NativeStackNavigationProp<RootStackParams, 'Cards'>;

export default function HomePage() {
  const navigation = useNavigation<LoginPageNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>{/* User icon */}</View>
          <Text style={styles.welcomeText}>
            BIENVENIDO, <Text style={styles.userName}>SERGIO</Text>
          </Text>
        </View>
        <Bell stroke="#EC1C2D" width={24} height={24} />
      </View>

      {/* Accounts Section */}
      <View style={styles.accountsSection}>
        <TouchableOpacity style={styles.sectionHeader} onPress={() => navigation.navigate("Cards")}>
          <Text style={styles.sectionTitle}>Cuentas</Text>
          <ArrowRight stroke="#EC1C2D" width={20} height={20} />
        </TouchableOpacity>

        {/* Credit Card Preview */}
        <TouchableOpacity style={styles.cardPreview} onPress={() => navigation.navigate("Cards")}>
          {/* Card content */}
        </TouchableOpacity>

        <View style={styles.balanceInfo}>
          <Text style={styles.balanceLabel}>Cuenta Banorte</Text>
          <Text style={styles.balanceSubLabel}>Saldo actual</Text>
          <Text style={styles.balanceAmount}>$19,523.00</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {[
            { icon: RefreshCcw, label: "Transferir" },
            { icon: Hand, label: "Prestamo" },
            { icon: CreditCard, label: "CVV din..." },
            { icon: Calendar, label: "Estado de" },
            { icon: () => <Text>•••</Text>, label: "Más" },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.actionButton}>
              <View style={styles.actionButtonIcon}>
                <item.icon stroke="#EC1C2D" width={20} height={20} />
              </View>
              <Text style={styles.actionButtonLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Other sections (Recent Transactions, Calendar, Investments, Advertisements) would go here */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EC1C2D",
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: "#111827",
  },
  userName: {
    color: "#EC1C2D",
  },
  accountsSection: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    margin: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginRight: 8,
  },
  cardPreview: {
    aspectRatio: 1.58,
    backgroundColor: "#EC1C2D",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  balanceInfo: {
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  balanceSubLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    alignItems: "center",
  },
  actionButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  actionButtonLabel: {
    fontSize: 12,
    textAlign: "center",
  },
})

