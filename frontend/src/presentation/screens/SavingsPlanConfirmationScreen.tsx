"use client"
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar, TextInput } from "react-native"
import { styles as globalStyles } from "../theme/app_themes"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { RootStackParams } from "../navigation/Navigation"
import type { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"

type SavingsPlanConfirmationScreenRouteProp = RouteProp<RootStackParams, "SavingsPlanConfirmationScreen">
type SavingsPlanConfirmationScreenNavigationProp = StackNavigationProp<RootStackParams, "SavingsPlanConfirmationScreen">

export const SavingsPlanConfirmationScreen = () => {
  const navigation = useNavigation<SavingsPlanConfirmationScreenNavigationProp>()
  const route = useRoute<SavingsPlanConfirmationScreenRouteProp>()
  const { savingsBoxName, targetAmount } = route.params

  // Calculate the target date (2 years from now)
  const targetDate = new Date()
  targetDate.setFullYear(targetDate.getFullYear() + 2)
  const formattedDate = `${String(targetDate.getDate()).padStart(2, "0")}/${String(targetDate.getMonth() + 1).padStart(2, "0")}/${targetDate.getFullYear()}`

  // State variables - moved to the top before any functions that use them
  const [editingName, setEditingName] = useState(false)
  const [editingReason, setEditingReason] = useState(false)
  const [editingAmount, setEditingAmount] = useState(false)
  const [editingDate, setEditingDate] = useState(false)

  const [editedName, setEditedName] = useState(savingsBoxName)
  const [editedReason, setEditedReason] = useState(
    savingsBoxName.toLowerCase().includes("carro")
      ? "Enganche para un carro nuevo"
      : `Fondos para ${savingsBoxName.toLowerCase()}`,
  )
  const [editedAmount, setEditedAmount] = useState(targetAmount.toString())
  const [editedDate, setEditedDate] = useState(formattedDate)

  // Helper functions to handle editing
  const toggleEditName = () => {
    setEditingName(!editingName)
  }

  const toggleEditReason = () => {
    setEditingReason(!editingReason)
  }

  const toggleEditAmount = () => {
    setEditingAmount(!editingAmount)
    if (editingAmount) {
      const newAmount = Number.parseFloat(editedAmount)
      if (!isNaN(newAmount) && newAmount > 0) {
        // Update target amount and recalculate monthly contribution
        //const newMonthlyContribution = Math.ceil(newAmount / 24)
        // In a real app, you would update all related state here
      }
    }
  }

  const toggleEditDate = () => {
    setEditingDate(!editingDate)
    if (editingDate) {
      // Validate date format when finishing edit
      const isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(editedDate)
      if (!isValidDate) {
        // If invalid, reset to default format
        setEditedDate(formattedDate)
      }
    }
  }

  // Calculate monthly contribution based on amount and date
  const calculateMonthlyContribution = () => {
    const newTargetAmount = Number.parseFloat(editedAmount)

    // Parse the edited date to calculate months until target
    const dateParts = editedDate.split("/")
    if (dateParts.length === 3) {
      const targetDay = Number.parseInt(dateParts[0], 10)
      const targetMonth = Number.parseInt(dateParts[1], 10) - 1 // Months are 0-indexed in JS Date
      const targetYear = Number.parseInt(dateParts[2], 10)

      const targetDate = new Date(targetYear, targetMonth, targetDay)
      const currentDate = new Date()

      // Calculate months between dates
      const monthsDiff =
        (targetDate.getFullYear() - currentDate.getFullYear()) * 12 + (targetDate.getMonth() - currentDate.getMonth())

      // Use at least 1 month to avoid division by zero
      const monthsUntilTarget = Math.max(1, monthsDiff)

      // Return monthly contribution based on actual months until target
      return Math.ceil(newTargetAmount / monthsUntilTarget)
    }

    // Fallback to 24 months if date format is invalid
    return Math.ceil(newTargetAmount / 24)
  }

  // Handle confirm button press
  const handleConfirm = () => {
    // Calculate the new monthly contribution based on edited amount and date
    const newTargetAmount = Number.parseFloat(editedAmount)

    // Parse the edited date to calculate months until target
    const dateParts = editedDate.split("/")
    if (dateParts.length === 3) {
      const targetDay = Number.parseInt(dateParts[0], 10)
      const targetMonth = Number.parseInt(dateParts[1], 10) - 1 // Months are 0-indexed in JS Date
      const targetYear = Number.parseInt(dateParts[2], 10)

      const targetDate = new Date(targetYear, targetMonth, targetDay)
      const currentDate = new Date()

      // Calculate months between dates
      const monthsDiff =
        (targetDate.getFullYear() - currentDate.getFullYear()) * 12 + (targetDate.getMonth() - currentDate.getMonth())

      // Use at least 1 month to avoid division by zero
      const monthsUntilTarget = Math.max(1, monthsDiff)

      // Calculate monthly contribution based on actual months until target
      const newMonthlyContribution = Math.ceil(newTargetAmount / monthsUntilTarget)

      // Navigate to Ahorro360Screen with the new savings box using edited values
      navigation.navigate("Ahorro360Screen", {
        newSavingsBox: {
          name: editedName,
          targetAmount: newTargetAmount,
          monthlySavings: newMonthlyContribution,
          targetDate: editedDate,
        },
      })
    } else {
      // Fallback to 24 months if date format is invalid
      const newMonthlyContribution = Math.ceil(newTargetAmount / 24)

      navigation.navigate("Ahorro360Screen", {
        newSavingsBox: {
          name: editedName,
          targetAmount: newTargetAmount,
          monthlySavings: newMonthlyContribution,
          targetDate: editedDate,
        },
      })
    }
  }

  return (
    <SafeAreaView style={globalStyles.background}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      {/* Header */}
      <View style={localStyles.header}>
        <TouchableOpacity style={localStyles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/icons/arrow-left-icon.png")} style={localStyles.backIcon} />
        </TouchableOpacity>
        <Text style={localStyles.headerTitle}>Ahorro 360°</Text>
        <View style={localStyles.placeholder} />
      </View>

      {/* Content */}
      <View style={localStyles.content}>
        <Text style={localStyles.title}>Plan de ahorro personalizado</Text>

        {/* Savings Plan Details */}
        <View style={localStyles.detailsContainer}>
          <View style={localStyles.detailRow}>
            <Text style={localStyles.detailLabel}>Nombre:</Text>
            <View style={localStyles.detailValueContainer}>
              {editingName ? (
                <TextInput
                  style={localStyles.editInput}
                  value={editedName}
                  onChangeText={setEditedName}
                  autoFocus
                  onBlur={toggleEditName}
                />
              ) : (
                <Text style={localStyles.detailValue}>{editedName}</Text>
              )}
              <TouchableOpacity onPress={toggleEditName}>
                <Image source={require("../../assets/icons/edit.png")} style={localStyles.editIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={localStyles.detailRow}>
            <Text style={localStyles.detailLabel}>Motivo:</Text>
            <View style={localStyles.detailValueContainer}>
              {editingReason ? (
                <TextInput
                  style={localStyles.editInput}
                  value={editedReason}
                  onChangeText={setEditedReason}
                  autoFocus
                  onBlur={toggleEditReason}
                />
              ) : (
                <Text style={localStyles.detailValue}>{editedReason}</Text>
              )}
              <TouchableOpacity onPress={toggleEditReason}>
                <Image source={require("../../assets/icons/edit.png")} style={localStyles.editIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={localStyles.detailRow}>
            <Text style={localStyles.detailLabel}>Cantidad a lograr:</Text>
            <View style={localStyles.detailValueContainer}>
              {editingAmount ? (
                <TextInput
                  style={localStyles.editInput}
                  value={editedAmount}
                  onChangeText={setEditedAmount}
                  keyboardType="numeric"
                  autoFocus
                  onBlur={toggleEditAmount}
                />
              ) : (
                <Text style={localStyles.detailValue}>${Number.parseFloat(editedAmount).toLocaleString()}</Text>
              )}
              <TouchableOpacity onPress={toggleEditAmount}>
                <Image source={require("../../assets/icons/edit.png")} style={localStyles.editIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={localStyles.detailRow}>
            <Text style={localStyles.detailLabel}>Fecha establecida:</Text>
            <View style={localStyles.detailValueContainer}>
              {editingDate ? (
                <TextInput
                  style={localStyles.editInput}
                  value={editedDate}
                  onChangeText={setEditedDate}
                  autoFocus
                  onBlur={toggleEditDate}
                />
              ) : (
                <Text style={localStyles.detailValue}>{editedDate}</Text>
              )}
              <TouchableOpacity onPress={toggleEditDate}>
                <Image source={require("../../assets/icons/edit.png")} style={localStyles.editIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Personalized Contribution Plan */}
        <View style={localStyles.contributionPlanContainer}>
          <Text style={localStyles.contributionPlanTitle}>Plan personalizado de aportación</Text>

          <View style={localStyles.contributionRow}>
            <Text style={localStyles.contributionLabel}>Aportacion mensual:</Text>
            <Text style={localStyles.contributionValue}>${calculateMonthlyContribution().toLocaleString()}</Text>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={localStyles.confirmButton} onPress={handleConfirm}>
          <Text style={localStyles.confirmButtonText}>CONFIRMAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const localStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    marginBottom: 24,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  detailValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    marginRight: 8,
  },
  editIcon: {
    width: 16,
    height: 16,
    tintColor: "#EA0A2A",
  },
  contributionPlanContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contributionPlanTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
    textAlign: "center",
  },
  contributionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  contributionLabel: {
    fontSize: 16,
    color: "#333",
  },
  contributionValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#EA0A2A",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  editInput: {
    fontSize: 16,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#EA0A2A",
    padding: 0,
    minWidth: 120,
    marginRight: 8,
  },
})

export default SavingsPlanConfirmationScreen
