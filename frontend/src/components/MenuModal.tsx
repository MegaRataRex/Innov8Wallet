import type React from "react"
import { useEffect, useState} from "react"
import { View, Text, StyleSheet, Modal, Pressable, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CommonActions, useNavigation } from "@react-navigation/native"

// Define menu item type
interface MenuItem {
  id: string
  label: string
  icon: any // Image source
}

// Define menu section type
interface MenuSection {
  title: string
  items: MenuItem[]
  itemsPerRow: number
}

interface MenuModalProps {
  visible: boolean
  onClose: () => void
  userName: string
  menuSections?: MenuSection[]
}

const MenuModal: React.FC<MenuModalProps> = ({ visible, onClose, menuSections = defaultMenuSections }) => {
  const navigation = useNavigation<any>()
  const [name, setName] = useState('');
  const[_isLoadingName, setIsLoadingName] = useState(true);

  const handleLogout = async () => {
    try {
      // Clear any necessary session data
      await AsyncStorage.removeItem("name")
      // Add any other session data that needs to be cleared

      // Close the menu
      onClose()

      // Navigate to login screen
      navigation.dispatch(
        CommonActions.navigate({
          name: "LoginScreen",
        }),
      )
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

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

  const handleMenuItemPress = (itemId: string) => {
    onClose()
    console.log(`Menu item clicked: ${itemId}`)

    // Handle navigation based on item ID
    switch (itemId) {
      case "transferir":
        navigation.navigate("TransferScreen")
        break
      case "retiro":
        navigation.navigate("WithdrawalScreen")
        break
      case "mi-cuenta":
        navigation.navigate("MyAccountScreen")
        break
      case "configuracion":
        navigation.navigate("SettingsScreen")
        break
      default:
        // For items without specific navigation
        break
    }
  }

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Pressable style={styles.modalBackground} onPress={onClose} />
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Menú</Text>

          <View style={styles.userInfoMenu}>
            <Text style={styles.userNameMenu}>{name} Tirado</Text>
          </View>

          <ScrollView
            style={styles.menuScrollView}
            contentContainerStyle={styles.menuScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {menuSections.map((section, sectionIndex) => (
              <View key={`section-${sectionIndex}`} style={styles.menuSection}>
                {section.title ? <Text style={styles.sectionTitleMenu}>{section.title}</Text> : null}
                <View style={[styles.menuItemsGrid, section.itemsPerRow === 2 && styles.twoItemsRow]}>
                  {section.items.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.menuItem, section.itemsPerRow === 2 && styles.menuItemHalfWidth]}
                      onPress={() => handleMenuItemPress(item.id)}
                    >
                      <View>
                        <Image source={item.icon} style={styles.menuIcon} resizeMode="contain" />
                      </View>
                      <Text style={styles.menuItemLabel}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Image source={require("../assets/icons/logout.png")} style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

// Default menu sections data
const defaultMenuSections = [
  {
    title: "Favoritos",
    items: [
      { id: "transferir", label: "Transferir", icon: require("../assets/icons/transfer.png") },
      { id: "retiro", label: "Retiro sin tarjeta", icon: require("../assets/icons/withdrawal.png") },
      { id: "recargas", label: "Recargas", icon: require("../assets/icons/recharge.png") },
      { id: "estado", label: "Estado de cuenta", icon: require("../assets/icons/statement.png") },
    ],
    itemsPerRow: 4,
  },
  {
    title: "Operaciones con cuentas",
    items: [
      { id: "pago", label: "Pago de servicios", icon: require("../assets/icons/pagoServicios.png") },
      { id: "prestamo", label: "Préstamo", icon: require("../assets/icons/prestamo.png") },
      { id: "apartados", label: "Apartados", icon: require("../assets/icons/apartados.png") },
      { id: "codi", label: "CoDi", icon: require("../assets/icons/CoDi.png") },
    ],
    itemsPerRow: 4,
  },
  {
    title: "",
    items: [
      { id: "mi-cuenta", label: "Mi cuenta", icon: require("../assets/icons/user.png") },
      { id: "deposito", label: "Depósito de cheques", icon: require("../assets/icons/depositoCheques.png") },
      { id: "retirar", label: "Retirar dinero", icon: require("../assets/icons/retirarDinero.png") },
      { id: "inversiones", label: "Inversiones", icon: require("../assets/icons/inversiones.png") },
    ],
    itemsPerRow: 4,
  },
  {
    title: "",
    items: [
      { id: "calendario", label: "Calendario", icon: require("../assets/icons/calendar.png") },
      { id: "configuracion", label: "Configuración", icon: require("../assets/icons/configuracion.png") },
      { id: "divisas", label: "Cambio de Divisas", icon: require("../assets/icons/cambioDivisas.png") },
      { id: "apple", label: "Agregar a apple wallet", icon: require("../assets/icons/applePay.png") },
    ],
    itemsPerRow: 4,
  },
  {
    title: "",
    items: [
      { id: "promociones", label: "Promociones", icon: require("../assets/icons/promociones.png") },
      { id: "ubicaciones", label: "Ubicaciones", icon: require("../assets/icons/ubicaciones.png") },
    ],
    itemsPerRow: 2,
  },
  {
    title: "Soporte",
    items: [
      { id: "llamar", label: "Llamar a soporte", icon: require("../assets/icons/llamarSoporte1.png") },
      { id: "llamar-alt", label: "Llamar a soporte", icon: require("../assets/icons/llamarSoporte2.png") },
      { id: "preguntas", label: "Preguntas Frecuentes", icon: require("../assets/icons/faq.png") },
      { id: "tutorial", label: "Tutorial", icon: require("../assets/icons/tutorial.png") },
    ],
    itemsPerRow: 4,
  },
]

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContainer: {
    width: width * 0.85,
    height: height * 0.8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    paddingTop: 12,
    paddingBottom: 15,
    alignItems: "center",
  },
  menuScrollView: {
    width: "100%",
    flex: 1,
  },
  menuScrollContent: {
    paddingBottom: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    alignSelf: "center",
  },
  userInfoMenu: {
    alignItems: "center",
    marginBottom: 10,
  },
  userNameMenu: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 3,
  },
  menuSection: {
    width: "100%",
    marginBottom: 15,
  },
  sectionTitleMenu: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  menuItemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  twoItemsRow: {
    justifyContent: "center", // Center the items in the row
    paddingHorizontal: 20, // Add some padding to space them out
  },
  menuItem: {
    width: "25%", // 4 items per row by default
    alignItems: "center",
    marginBottom: 12,
  },
  menuItemHalfWidth: {
    width: "40%", // Wider for 2 items per row
    marginHorizontal: "5%", // Add horizontal margin for spacing
  },
  menuIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  menuItemLabel: {
    fontSize: 11,
    textAlign: "center",
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EA0A2A",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 8,
    width: "80%",
  },
  logoutIcon: {
    width: 18,
    height: 18,
    tintColor: "white",
    marginRight: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default MenuModal
