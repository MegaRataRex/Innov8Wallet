"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native"
import { styles } from "../theme/app_themes"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Copy } from "lucide-react-native"
import LinearGradient from "react-native-linear-gradient"

export const MyAccountScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState("Usuario")
  const [loginDate, setLoginDate] = useState("")
  const [clientId] = useState("19238018") // This would typically come from an API or secure storage

  useEffect(() => {
    // Fetch user name from AsyncStorage
    const fetchUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("name")
        if (storedName) {
          setName(storedName)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    // Format current date and time for login display
    const formatCurrentDateTime = () => {
      const now = new Date()
      const day = String(now.getDate()).padStart(2, "0")
      const month = String(now.getMonth() + 1).padStart(2, "0")
      const year = now.getFullYear()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")

      return `${day}-${month}-${year} ${hours}:${minutes} Vía móvil`
    }

    fetchUserData()
    setLoginDate(formatCurrentDateTime())
  }, [])

  const handleCopyClientId = () => {
    // In a real app, this would copy the client ID to clipboard
    console.log("Copying client ID:", clientId)
    // You would use Clipboard API here
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={localStyles.container}>
        {/* Header with back button */}
        <TouchableOpacity style={localStyles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/icons/arrow-left-icon.png")} style={localStyles.backIcon} />
        </TouchableOpacity>

        {/* User Profile Section */}
        <View style={localStyles.profileSection}>
          <View style={localStyles.avatarContainer}>
            <View style={localStyles.avatar}>
              <Image source={require("../../assets/icons/user-red.png")} style={localStyles.avatarIcon} />
            </View>
          </View>
          <Text style={localStyles.userName}>{name} Tirado</Text>
        </View>

        {/* Client Details Section */}
        <View style={localStyles.detailsSection}>
          <Text style={localStyles.sectionTitle}>Detalles de cliente</Text>

          <View style={localStyles.detailRow}>
            <Text style={localStyles.detailLabel}>ID de Cliente</Text>
            <View style={localStyles.idContainer}>
              <Text style={localStyles.detailValue}>{clientId}</Text>
              <TouchableOpacity onPress={handleCopyClientId} style={localStyles.copyButton}>
                <Copy size={16} color="#EA0A2A" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={localStyles.detailRow}>
            <Text style={localStyles.detailLabel}>Ingreso</Text>
            <Text style={localStyles.detailValue}>{loginDate}</Text>
          </View>
        </View>

        {/* Banorte Mobile Profile Section */}
        <View style={localStyles.profileBanorteSection}>
          <Text style={localStyles.sectionTitle}>Perfil Banorte Móvil</Text>
          <Text style={localStyles.profileDescription}>
            Mejora tu perfil y disfruta todos los beneficios que Banorte Móvil tiene para ti.
          </Text>

          <LinearGradient
            colors={["#EA0A2A", "#FF6B6B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={localStyles.levelContainer}
          >
            <Text style={localStyles.levelText}>NIVEL BÁSICO</Text>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  )
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#EA0A2A",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    //backgroundColor: "#EA0A2A",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: {
    width: 80,
    height: 80,
    //tintColor: "white",
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
  },
  detailsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#000",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  idContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyButton: {
    marginLeft: 8,
    padding: 4,
  },
  profileBanorteSection: {
    marginBottom: 30,
  },
  profileDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
    lineHeight: 20,
  },
  levelContainer: {
    backgroundColor: "#EA0A2A",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  levelText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
})

export default MyAccountScreen
