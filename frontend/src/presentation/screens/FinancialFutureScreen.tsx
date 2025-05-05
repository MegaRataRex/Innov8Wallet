"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView,} from "react-native"
import { styles } from "../theme/app_themes"
import { useNavigation } from "@react-navigation/native"

// Define expense category type
interface ExpenseCategory {
  id: string
  name: string
  amount: number
  icon: any
}

// Define financial data type
interface FinancialData {
  income: number
  expenses: number
  credit: number
  debit: number
  totalBalance: number
  categories: ExpenseCategory[]
}

export const FinancialFutureScreen = () => {
  const navigation = useNavigation<any>();

  // Financial data state
  const [financialData] = useState<FinancialData>({
    income: 20000,
    expenses: 9913,
    credit: 6763,
    debit: 3150,
    totalBalance: 19523,
    categories: [
      {
        id: "casa",
        name: "Casa",
        amount: 1500,
        icon: require("../../assets/icons/house.png"),
      },
      {
        id: "retiros",
        name: "Retiros y otros pagos",
        amount: 1800,
        icon: require("../../assets/icons/receipt-text.png"),
      },
      {
        id: "transporte",
        name: "Transporte y viajes",
        amount: 600,
        icon: require("../../assets/icons/airplane.png"),
      },
      {
        id: "educacion",
        name: "Educación",
        amount: 400,
        icon: require("../../assets/icons/education.png"),
      },
      {
        id: "comida",
        name: "Comida",
        amount: 2000,
        icon: require("../../assets/icons/food.png"),
      },
    ],
  })

  // Calculate total expenses from categories
  const totalCategoryExpenses = financialData.categories.reduce((total, category) => total + category.amount, 0);

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView contentContainerStyle={localStyles.scrollContent}>
        {/* Header */}
        <View style={localStyles.header}>
          <TouchableOpacity style={localStyles.backButton} onPress={() => navigation.navigate('Home')}>
            <Image source={require("../../assets/icons/arrow-left-icon.png")} style={localStyles.backIcon} />
          </TouchableOpacity>
          <Text style={localStyles.headerTitle}>Tu futuro financiero</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Balance Card */}
        <View style={localStyles.balanceCard}>
          <View style={localStyles.balanceContent}>
            <Text style={localStyles.balanceLabel}>Balance total</Text>
            <Text style={localStyles.balanceAmount}>${financialData.totalBalance.toFixed(2)}</Text>
          </View>
          <View style={localStyles.refreshIconContainer}>
            <Image source={require("../../assets/icons/export.png")} style={localStyles.refreshIcon} />
          </View>
        </View>

        {/* Financial Summary Section */}
        <View style={localStyles.financialContainer}>
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

        {/* Expenses by Category Section */}
        <View style={localStyles.categoriesContainer}>
          <Text style={localStyles.categoriesTitle}>Gastos por categoría</Text>

          {/* Category Items */}
          {financialData.categories.map((category) => (
            <View key={category.id} style={localStyles.categoryItem}>
              <View style={localStyles.categoryIconContainer}>
                <Image source={category.icon} style={localStyles.categoryIcon} />
              </View>
              <View style={localStyles.categoryDetails}>
                <Text style={localStyles.categoryName}>{category.name}</Text>
                <View style={localStyles.categoryProgressContainer}>
                  <View
                    style={[
                      localStyles.categoryProgressBar,
                      { width: `${(category.amount / financialData.expenses) * 100}%` },
                    ]}
                  />
                </View>
              </View>
              <Text style={localStyles.categoryAmount}>${category.amount.toLocaleString()}</Text>
            </View>
          ))}

          {/* Total */}
          <View style={localStyles.categoryTotalContainer}>
            <Text style={localStyles.categoryTotalLabel}>Total:</Text>
            <Text style={localStyles.categoryTotalAmount}>${totalCategoryExpenses.toLocaleString()}</Text>
          </View>
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

          <TouchableOpacity style={localStyles.bottomButton} onPress={()=> navigation.navigate('Ahorro360Screen')}>
            <View style={localStyles.bottomButtonIconContainer}>
              <Image source={require("../../assets/icons/ahorro.png")} style={localStyles.bottomButtonIcon} />
            </View>
            <Text style={localStyles.bottomButtonText}>Ahorro{"\n"}360</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

//const { width } = Dimensions.get("window")

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
  balanceCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceContent: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  refreshIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
  },
  refreshIcon: {
    width: 20,
    height: 20,
    tintColor: "#4CAF50",
  },

  // Financial Summary styles
  financialContainer: {
    marginBottom: 24,
  },
  financialItemContainer: {
    marginBottom: 12,
  },
  financialLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  // Categories styles
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryIconContainer: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    //tintColor: "#EA0A2A",
  },
  categoryDetails: {
    flex: 1,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  categoryProgressContainer: {
    height: 6,
    backgroundColor: "#FFEBEE",
    borderRadius: 3,
    overflow: "hidden",
  },
  categoryProgressBar: {
    height: "100%",
    backgroundColor: "#FFCDD2",
    borderRadius: 3,
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  categoryTotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  categoryTotalLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  categoryTotalAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  // Bottom buttons styles
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
    //tintColor: "#EA0A2A",
  },
  bottomButtonText: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
  },
})
