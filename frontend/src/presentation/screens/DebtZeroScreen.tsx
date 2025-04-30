"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native"
import { styles } from "../theme/app_themes"
import { useNavigation } from "@react-navigation/native"
import { DebtGraph } from "../../components/DebtGraph"

// Define debt item type
interface DebtItem {
  id: string
  name: string
  amount: number
  color: string
  category: "creditCard" | "loan"
}

// Define credit item type
interface CreditItem {
  id: string
  name: string
  amount: number
  icon: any
  info: string
}

export const DebtZeroScreen = () => {
  const navigation = useNavigation();

  // Debt data
  const [debtData] = useState<DebtItem[]>([
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
  ])

  // Active credits data
  const [activeCredits] = useState<CreditItem[]>([
    {
      id: "auto",
      name: "Auto-Estreno Banorte",
      amount: 6550,
      icon: require("../../assets/icons/car.png"),
      info: "9 Meses restantes con pago mínimo",
    },
    {
      id: "mujer",
      name: "TDC Banorte Mujer",
      amount: 4523,
      icon: require("../../assets/icons/card.png"),
      info: "Fecha límite de pago: 3 de marzo",
    },
    {
      id: "oneup",
      name: "TDC Banorte One Up",
      amount: 2250,
      icon: require("../../assets/icons/card.png"),
      info: "Fecha límite de pago: 3 de marzo",
    },
  ])

  // Calculate total debt
  const totalDebt = debtData.reduce((total, item) => total + item.amount, 0)

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView contentContainerStyle={localStyles.scrollContent}>
        {/* Header */}
        <View style={localStyles.header}>
          <TouchableOpacity style={localStyles.backButton} onPress={() => navigation.goBack()}>
            <Image source={require("../../assets/icons/arrow-left-icon.png")} style={localStyles.backIcon} />
          </TouchableOpacity>
          <Text style={localStyles.headerTitle}>Deuda cero</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Debt Summary Section */}
        <View style={localStyles.debtSummaryContainer}>
          <Text style={localStyles.sectionTitle}>Deuda cero</Text>
          <Text style={localStyles.debtSubtitle}>Deuda actual</Text>

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

        {/* Active Credits Section */}
        <View style={localStyles.activeCreditsSectionContainer}>
          <Text style={localStyles.sectionTitle}>Créditos activos</Text>

          {activeCredits.map((credit) => (
            <View key={credit.id} style={localStyles.creditItemContainer}>
              <View style={localStyles.creditItemContent}>
                <View style={localStyles.creditIconContainer}>
                  <Image source={credit.icon} style={localStyles.creditIcon} />
                </View>
                <View style={localStyles.creditMainContent}>
                  <View style={localStyles.creditDetails}>
                    <Text style={localStyles.creditName}>{credit.name}</Text>
                    <Text style={localStyles.creditAmount}>${credit.amount.toLocaleString()}</Text>
                  </View>
                  <Text style={localStyles.creditInfo} numberOfLines={2}>
                    {credit.info}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Buttons */}
        <View style={localStyles.bottomButtonsContainer}>
          <TouchableOpacity style={localStyles.bottomButton}>
            <View style={localStyles.bottomButtonIconContainer}>
              <Image source={require("../../assets/icons/flag.png")} style={localStyles.bottomButtonIcon} />
            </View>
            <Text style={localStyles.bottomButtonText}>Establecer{"\n"}meta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={localStyles.bottomButton}>
            <View style={localStyles.bottomButtonIconContainer}>
              <Image source={require("../../assets/icons/chart.png")} style={localStyles.bottomButtonIcon} />
            </View>
            <Text style={localStyles.bottomButtonText}>Generar{"\n"}Análisis</Text>
          </TouchableOpacity>

          <TouchableOpacity style={localStyles.bottomButton}>
            <View style={localStyles.bottomButtonIconContainer}>
              <Image source={require("../../assets/icons/flag.png")} style={localStyles.bottomButtonIcon} />
            </View>
            <Text style={localStyles.bottomButtonText}>Establecer{"\n"}meta</Text>
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
    debtSummaryContainer: {
      backgroundColor: "white",
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#000",
      marginBottom: 12,
    },
    debtSubtitle: {
      fontSize: 14,
      color: "#666",
      marginBottom: 16,
    },
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
    activeCreditsSectionContainer: {
      marginBottom: 24,
    },
    creditItemContainer: {
      backgroundColor: "white",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    creditItemContent: {
      flexDirection: "row",
      alignItems: "center",
      height: 60, // Fixed height to ensure consistent sizing
    },
    creditIconContainer: {
      marginRight: 12,
    },
    creditIcon: {
      width: 32,
      height: 32,
      tintColor: "#EA0A2A",
    },
    creditMainContent: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    creditDetails: {
      flex: 1,
    },
    creditName: {
      fontSize: 14,
      fontWeight: "500",
      color: "#000",
      marginBottom: 4,
    },
    creditAmount: {
      fontSize: 16,
      fontWeight: "600",
      color: "#000",
    },
    creditInfo: {
      fontSize: 12,
      color: "#666",
      textAlign: "right",
      width: "45%", // Allocate fixed width for the info text
    },
    bottomButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
    },
    bottomButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
    },
    bottomButtonIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "#FFF",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
      borderWidth: 1,
      borderColor: "#EA0A2A",
    },
    bottomButtonIcon: {
      width: 20,
      height: 20,
      tintColor: "#EA0A2A",
    },
    bottomButtonText: {
      fontSize: 12,
      textAlign: "center",
      color: "#000",
    },
  })  