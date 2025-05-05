"use client"

import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native"
import { styles } from "../theme/app_themes"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Plus } from "lucide-react-native"

// Define savings box type
interface SavingsBox {
  id: string
  name: string
  amount: number
  monthlySavings: number
  icon: "plane" | "car"
  targetDate?: string
}

export const Ahorro360Screen = () => {
  const navigation = useNavigation<any>()
  const route = useRoute<any>();

  // Ref to track processed savings box to avoid duplicates
  const processedSavingsBoxRef = useRef<string | null>(null)

  // Savings boxes data
  const [savingsBoxes, setSavingsBoxes] = useState<SavingsBox[]>([
    {
      id: "1",
      name: "Viaje a Cancún",
      amount: 1200.0,
      monthlySavings: 600.0,
      icon: "plane",
    },
    {
      id: "2",
      name: "Carro nuevo",
      amount: 12500.0,
      monthlySavings: 5000.0,
      icon: "car",
    },
  ])

  // Check if we have a new savings box from the route params
  useEffect(() => {
    if (route.params?.newSavingsBox) {
      const { name, targetAmount, monthlySavings, targetDate } = route.params.newSavingsBox

      // Create a unique identifier for this savings box
      const savingsBoxId = `${name}-${targetAmount}-${Date.now()}`

      // Check if we've already processed this savings box
      if (processedSavingsBoxRef.current !== savingsBoxId) {
        // Create a new savings box with the provided name and amount
        const newBox: SavingsBox = {
          id: `${Date.now()}`, // Use timestamp for unique ID
          name: name,
          amount: targetAmount,
          monthlySavings: monthlySavings || Math.round(targetAmount / 10), // Use provided monthly savings or calculate
          icon: name.toLowerCase().includes("viaje") ? "plane" : "car", // Simple logic to determine icon
          targetDate: targetDate,
        }

        // Add the new savings box to the list using functional update
        setSavingsBoxes((prevBoxes) => [...prevBoxes, newBox])

        // Mark this savings box as processed
        processedSavingsBoxRef.current = savingsBoxId

        // Clear the route params to avoid adding the same box multiple times
        navigation.setParams({ newSavingsBox: undefined })
      }
    }
  }, [route.params?.newSavingsBox, navigation])

  // Calculate total monthly savings
  const totalMonthlySavings = savingsBoxes.reduce((total, box) => total + box.monthlySavings, 0)

  // This is the function you need to replace with your own icons
  const renderIcon = (iconType: string) => {
    // Replace this switch statement with your own icons
    switch (iconType) {
      case "plane":
        // Replace with your plane icon
        return <Image source={require("../../assets/icons/travel.png")} style={localStyles.savingsBoxIcon} />
      case "car":
        // Replace with your car icon
        return <Image source={require("../../assets/icons/car.png")} style={localStyles.savingsBoxIcon} />
      default:
        return null
    }
  }

  const handleCreateNewSavingsBox = () => {
    navigation.navigate("CreateSavingsBoxScreen")
  }

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView contentContainerStyle={localStyles.scrollContent}>
        {/* Header */}
        <View style={localStyles.header}>
          <TouchableOpacity style={localStyles.backButton} onPress={() => navigation.navigate('Home')}>
            <Image source={require("../../assets/icons/arrow-left-icon.png")} style={localStyles.backIcon} />
          </TouchableOpacity>
          <Text style={localStyles.headerTitle}>Ahorro360</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Savings Boxes Section */}
        <View style={localStyles.savingsSection}>
          <Text style={localStyles.sectionTitle}>Cajas de ahorro activas:</Text>

          {/* Savings Boxes List */}
          {savingsBoxes.map((box) => (
            <TouchableOpacity key={box.id} style={localStyles.savingsBox} activeOpacity={0.7}>
              <View style={localStyles.savingsBoxContent}>
                {/* This is where the icon is rendered */}
                <View style={localStyles.iconContainer}>{renderIcon(box.icon)}</View>
                <View style={localStyles.savingsBoxInfo}>
                  <Text style={localStyles.savingsBoxName}>{box.name}</Text>
                  <Text style={localStyles.savingsBoxAmount}>${box.amount.toFixed(2)}</Text>
                  <Text style={localStyles.savingsBoxMonthly}>Ahorro mensual: ${box.monthlySavings.toFixed(2)}</Text>
                  {box.targetDate && <Text style={localStyles.savingsBoxDate}>Fecha objetivo: {box.targetDate}</Text>}
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Total Monthly Savings */}
          <View style={localStyles.totalSavingsContainer}>
            <Text style={localStyles.totalSavingsLabel}>Ahorro total mensual:</Text>
            <Text style={localStyles.totalSavingsAmount}>${totalMonthlySavings.toFixed(2)}</Text>
          </View>

          {/* Create New Savings Box Button */}
          <TouchableOpacity style={localStyles.newSavingsButton} onPress={handleCreateNewSavingsBox}>
            <View style={localStyles.newSavingsButtonContent}>
              <Plus size={20} color="#EA0A2A" />
              <Text style={localStyles.newSavingsButtonText}>Nueva Caja de ahorro</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const localStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#EA0A2A",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  savingsSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 16,
  },
  savingsBox: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  savingsBoxContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 16,
  },
  savingsBoxIcon: {
    width: 24,
    height: 24,
    //tintColor: "#EA0A2A", // You can adjust or remove this tint color as needed
  },
  savingsBoxInfo: {
    flex: 1,
  },
  savingsBoxName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
  },
  savingsBoxAmount: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  savingsBoxMonthly: {
    fontSize: 14,
    color: "#666",
  },
  savingsBoxDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  totalSavingsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  totalSavingsLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  totalSavingsAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  newSavingsButton: {
    marginTop: 8,
  },
  newSavingsButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  newSavingsButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#EA0A2A",
    marginLeft: 8,
  },
})

export default Ahorro360Screen
