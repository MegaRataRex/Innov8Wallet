"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native"
import VisaCardSVG from "../assets/svgs/VisaCardSVG"
import OneUpCardSVG from "../assets/svgs/OneUpCardSVG"
import WomanCardSVG from "../assets/svgs/WomanCardSVG"
import { Eye, EyeOff, Copy } from "lucide-react-native"

interface CardDetailsModalProps {
  visible: boolean
  onClose: () => void
  cardType: string
  lastFour: string
  isCredit: boolean
  cardColor?: string
}

const CardDetailsModal: React.FC<CardDetailsModalProps> = ({
  visible,
  onClose,
  cardType,
  lastFour,
  //isCredit,
  cardColor = "#EA0A2A",
}) => {
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [showCVC, setShowCVC] = useState(false)

  // Mock data - in a real app, this would come from an API
  const cardNumber = `4781 6123 0480 ${lastFour}`
  const expirationDate = "01/31"
  const cvc = "734"

  const renderCardType = (type: string) => {
    switch (type) {
      case "regularCard":
        return <VisaCardSVG />
      case "oneUpCard":
        return (
          <View style={{ transform: [{ rotate: "270deg" }] }}>
            <OneUpCardSVG />
          </View>
        )
      case "womanCard":
        return <WomanCardSVG />
      default:
        return null
    }
  }

  const getButtonColor = () => {
    switch (cardType) {
      case "oneUpCard":
        return "#8BC34A" // Green color for OneUp
      case "womanCard":
        return "#9C2781" // Purple color for Woman card
      default:
        return "#EA0A2A" // Red for regular card
    }
  }

  const handleCopyCardNumber = () => {
    // In a real app, this would copy the card number to clipboard
    console.log("Copying card number:", cardNumber)
    // You would use Clipboard API here
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {/* Card Image */}
              <View style={styles.cardImageContainer}>{renderCardType(cardType)}</View>

              {/* Card Title */}
              <Text style={styles.cardTitle}>Tarjeta virtual</Text>

              {/* Card Number */}
              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.infoLabel}>Número de tarjeta</Text>
                  <Text style={styles.infoValue}>{showCardNumber ? cardNumber : "•••• •••• •••• " + lastFour}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity onPress={() => setShowCardNumber(!showCardNumber)} style={styles.iconButton}>
                    {showCardNumber ? <EyeOff size={20} color={cardColor} /> : <Eye size={20} color={cardColor} />}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCopyCardNumber} style={styles.iconButton}>
                    <Copy size={20} color={cardColor} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Expiration Date */}
              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.infoLabel}>Fecha de expiración</Text>
                  <Text style={styles.infoValue}>{expirationDate}</Text>
                </View>
              </View>

              {/* CVC */}
              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.infoLabel}>CVC</Text>
                  <Text style={styles.infoValue}>{showCVC ? cvc : "•••"}</Text>
                </View>
                <TouchableOpacity onPress={() => setShowCVC(!showCVC)} style={styles.iconButton}>
                  {showCVC ? <EyeOff size={20} color={cardColor} /> : <Eye size={20} color={cardColor} />}
                </TouchableOpacity>
              </View>

              {/* Turn Off Card Button */}
              <TouchableOpacity
                style={[styles.turnOffButton, { backgroundColor: getButtonColor() }]}
                onPress={() => {
                  console.log("Turn off card")
                  onClose()
                }}
              >
                <Image source={require("../assets/icons/lock-circle.png")} style={styles.powerIcon} />
                <Text style={styles.turnOffButtonText}>Apagar Tarjeta</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  cardImageContainer: {
    width: "80%",
    aspectRatio: 1.6,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
  turnOffButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  turnOffButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  powerIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
    marginRight: 8,
  },
})

export default CardDetailsModal
