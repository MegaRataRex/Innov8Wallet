"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
  FlatList,
  type ListRenderItemInfo,
} from "react-native"
import { styles } from "../theme/app_themes"
import { useNavigation } from "@react-navigation/native"
import VisaCardSVG from "../../assets/svgs/VisaCardSVG"
import OneUpCardSVG from "../../assets/svgs/OneUpCardSVG"
import WomanCardSVG from "../../assets/svgs/WomanCardSVG"
import CardDetailsModal from "../../components/CardDetailsModal"
import MenuModal from "../../components/MenuModal"

// Define transaction type
interface Transaction {
  id: string
  name: string
  description: string
  amount: number
  date: string
  isIncoming: boolean
}

// Define card type
interface Card {
  id: string
  cardType: string
  lastFour: string
  isCredit: boolean
  creditUsed?: number
  creditLimit?: number
  balance?: number
  cardName?: string
  cardColor?: string
}

interface CardDetailsScreenProps {
  route: {
    params: {
      cardType: string
      lastFour: string
      transactions: Transaction[]
    }
  }
}

export const CardDetailsScreen: React.FC<CardDetailsScreenProps> = ({ route }) => {
  const { cardType, lastFour, transactions } = route.params
  const navigation = useNavigation()
  const [activeCardIndex, setActiveCardIndex] = useState(1)
  const [paymentInfoExpanded, setPaymentInfoExpanded] = useState(true)
  const [cardDetailsModalVisible, setCardDetailsModalVisible] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const scrollX = useRef(new Animated.Value(0)).current
  const flatListRef = useRef<FlatList>(null)

   // Mock data for multiple cards - reordered with debit card in the middle
   const cards = useMemo(
    () => [
      {
        id: "1",
        cardType: "oneUpCard",
        lastFour: "1234",
        isCredit: true,
        creditUsed: 4523.0,
        creditLimit: 6000.0,
        cardName: "TDC One Up",
        cardColor: "#8BC34A", // Green color for OneUp
      },
      {
        id: "2",
        cardType: "regularCard",
        lastFour: "9873",
        isCredit: false,
        balance: 19523.0,
      },
      {
        id: "3",
        cardType: "womanCard",
        lastFour: "5374",
        isCredit: true,
        creditUsed: 2250.0,
        creditLimit: 6000.0,
        cardName: "TDC Mujer Banorte",
        cardColor: "#9C2781", // Purple color for Woman card
      },
    ],
    [],
  );

  // Find initial card index based on route params
  useEffect(() => {
    const initialIndex = cards.findIndex((card) => card.cardType === cardType && card.lastFour === lastFour)
    if (initialIndex !== -1) {
      setActiveCardIndex(initialIndex)
      // Scroll to the initial card with a slight delay to ensure the FlatList is rendered
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: initialIndex, animated: false })
      }, 100)
    }
  }, [cardType, lastFour, cards])

  const renderCardType = (type: string) => {
    switch (type) {
      case "regularCard":
        return <VisaCardSVG />
      case "oneUpCard":
        return <OneUpCardSVG />
      case "womanCard":
        return <WomanCardSVG />
      default:
        return <Text style={styles.text}>Unknown Card Type</Text>
    }
  }

  const renderTransactionItem = (item: Transaction) => (
    <View key={item.id} style={localStyles.transactionItem}>
      <View style={localStyles.transactionInfo}>
        <Text style={[localStyles.transactionName, styles.text]}>{item.name}</Text>
        <Text style={[localStyles.transactionDescription, styles.text]}>{item.description}</Text>
      </View>
      <View style={localStyles.transactionAmountContainer}>
        <Image
          source={
            item.isIncoming ? require("../../assets/icons/incoming.png") : require("../../assets/icons/outgoing.png")
          }
          style={localStyles.indicatorIcon}
        />
        <Text style={localStyles.transactionAmount}>
          ${item.amount.toFixed(2)}
        </Text>
      </View>
    </View>
  )

  const renderCardItem = ({ item }: ListRenderItemInfo<Card>) => {
    return (
      <TouchableOpacity
        style={localStyles.cardItem}
        onPress={() => setCardDetailsModalVisible(true)}
        activeOpacity={0.8}
      >
        <View style={localStyles.cardWrapper}>{renderCardType(item.cardType)}</View>
      </TouchableOpacity>
    )
  }

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false,
    listener: (event: any) => {
      const { contentOffset, layoutMeasurement } = event.nativeEvent
      const newIndex = Math.round(contentOffset.x / layoutMeasurement.width)
      if (newIndex !== activeCardIndex) {
        setActiveCardIndex(newIndex)
      }
    },
  })

  const togglePaymentInfo = () => {
    setPaymentInfoExpanded(!paymentInfoExpanded)
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  const renderCardInfo = () => {
    const activeCard = cards[activeCardIndex];

    if (activeCard.isCredit) {
      // Credit card info
      const creditPercentage = (activeCard.creditUsed! / activeCard.creditLimit!) * 100;
      const isOneUpCard = activeCard.cardType === "oneUpCard";

      // For OneUp card, we'll use a gradient-like effect with multiple colors
      const oneUpGradientStyle = {
        backgroundColor: "transparent",
        position: "relative" as const,
        overflow: "hidden" as const,
      }

      return (
        <>
          <Text style={localStyles.creditCardTitle}>{activeCard.cardName}</Text>
          <Text style={localStyles.creditLabel}>Crédito utilizado</Text>
          <Text style={localStyles.creditAmount}>${activeCard.creditUsed!.toFixed(2)}</Text>

          {/* Credit usage bar - now using solid colors */}
          <View style={localStyles.creditBarContainer}>
            <Text style={localStyles.creditBarLabel}>Uso</Text>
            <View style={localStyles.creditBarBackground}>
              {isOneUpCard ? (
                <View style={[localStyles.creditBarFill, oneUpGradientStyle, { width: `${creditPercentage}%` }]}>
                  {/* Multiple color segments for OneUp card */}
                  <View
                    style={[localStyles.gradientSegment, { backgroundColor: "#FF5252", left: "0%", width: "20%" }]}
                  />
                  <View
                    style={[localStyles.gradientSegment, { backgroundColor: "#FF9800", left: "20%", width: "20%" }]}
                  />
                  <View
                    style={[localStyles.gradientSegment, { backgroundColor: "#FFEB3B", left: "40%", width: "20%" }]}
                  />
                  <View
                    style={[localStyles.gradientSegment, { backgroundColor: "#4CAF50", left: "60%", width: "20%" }]}
                  />
                  <View
                    style={[localStyles.gradientSegment, { backgroundColor: "#2196F3", left: "80%", width: "20%" }]}
                  />
                </View>
              ) : (
                <View
                  style={[localStyles.creditBarFill, { width: `${creditPercentage}%`, backgroundColor: "#9C2781" }]}
                />
              )}
            </View>
            <Text style={localStyles.creditBarLabel}>Límite</Text>
          </View>
          <Text style={localStyles.creditLimitText}>Línea de crédito ${activeCard.creditLimit!.toFixed(0)}</Text>

          {/* Credit card actions */}
          <View style={localStyles.creditCardActions}>
            <TouchableOpacity style={localStyles.creditActionItem}>
              <Image source={require("../../assets/icons/applePay.png")} style={localStyles.creditActionIcon} />
              <Text style={localStyles.creditActionText}>Agregar...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.creditActionItem} onPress={() => setCardDetailsModalVisible(true)}>
              <Image source={require("../../assets/icons/virtual-card.png")} style={localStyles.creditActionIcon} />
              <Text style={localStyles.creditActionText}>Tarjeta...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.creditActionItem}>
              <Image source={require("../../assets/icons/pay-card.png")} style={localStyles.creditActionIcon} />
              <Text style={localStyles.creditActionText}>Pagar t...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.creditActionItem}>
              <Image source={require("../../assets/icons/block-card.png")} style={localStyles.creditActionIcon} />
              <Text style={localStyles.creditActionText}>Bloquear...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.creditActionItem}>
              <Image source={require("../../assets/icons/estado-cuenta.png")} style={localStyles.creditActionIcon} />
              <Text style={localStyles.creditActionText}>Estado de...</Text>
            </TouchableOpacity>
          </View>

          {/* Payment info section */}
          <TouchableOpacity
            style={[localStyles.paymentInfoHeader, { marginBottom: paymentInfoExpanded ? 12 : 24 }]}
            onPress={togglePaymentInfo}
          >
            <Text style={localStyles.paymentInfoTitle}>Información de pago</Text>
            <Image
              source={require("../../assets/icons/arrow-down.png")}
              style={[localStyles.chevronIcon, { transform: [{ rotate: paymentInfoExpanded ? "180deg" : "0deg" }] }]}
            />
          </TouchableOpacity>

          {paymentInfoExpanded ? (
            <View style={localStyles.paymentInfoContent}>
              <Text style={localStyles.paymentDetailsTitle}>Detalles de pago</Text>

              <View style={localStyles.paymentInfoRow}>
                <Text style={localStyles.paymentInfoLabel}>Fecha límite de pago</Text>
                <Text style={localStyles.paymentInfoValue}>3 de marzo</Text>
              </View>
              <View style={localStyles.paymentInfoRow}>
                <Text style={localStyles.paymentInfoLabel}>Fecha de corte</Text>
                <Text style={localStyles.paymentInfoValue}>10 de febrero</Text>
              </View>

              <Text style={localStyles.paymentOptionsTitle}>Opciones de pago</Text>

              <View style={localStyles.paymentInfoRow}>
                <Text style={localStyles.paymentInfoLabel}>Pago para no generar intereses</Text>
                <Text style={localStyles.paymentInfoValue}>${activeCard.creditUsed!.toFixed(2)}</Text>
              </View>
              <View style={localStyles.paymentInfoRow}>
                <Text style={localStyles.paymentInfoLabel}>Pago mínimo</Text>
                <Text style={localStyles.paymentInfoValue}>$0.00</Text>
              </View>
              <Text style={localStyles.interestNote}>*Pagos menores generan intereses</Text>
            </View>
          ): null}
        </>
      )
    } else {
      // Debit card info
      return (
        <>
          <Text style={localStyles.accountLabel}>Cuenta Banorte</Text>
          <Text style={localStyles.balanceLabel}>Saldo actual</Text>
          <Text style={localStyles.balanceAmount}>${activeCard.balance!.toFixed(2)}</Text>

          {/* Quick Actions */}
          <View style={localStyles.quickActions}>
            <TouchableOpacity
              style={localStyles.actionItem}
              onPress={() => navigation.navigate("TransferScreen" as never)}
            >
              <Image
                source={require("../../assets/icons/transfer.png")}
                style={localStyles.actionIcon}
              />
              <Text style={localStyles.actionText}>Transferir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={localStyles.actionItem}
              onPress={() => navigation.navigate("WithdrawalScreen" as never)}
            >
              <Image
                source={require("../../assets/icons/withdrawal.png")}
                style={localStyles.actionIcon}
              />
              <Text style={localStyles.actionText}>Retiro sin{"\n"}tarjeta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionItem}>
              <Image
                source={require("../../assets/icons/recharge.png")}
                style={localStyles.actionIcon}
              />
              <Text style={localStyles.actionText}>Recargas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionItem}>
              <Image
                source={require("../../assets/icons/statement.png")}
                style={localStyles.actionIcon}
              />
              <Text style={localStyles.actionText}>Estado de{"\n"}cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.actionItem} onPress={toggleMenu}>
              <Image
                source={require("../../assets/icons/more.png")}
                style={localStyles.actionIcon}
              />
              <Text style={localStyles.actionText}>Más</Text>
            </TouchableOpacity>
          </View>
        </>
      )
    }
  }

  // Function to get card indicator dots
  const renderCardIndicators = () => {
    return (
      <View style={localStyles.cardIndicators}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={[
              localStyles.cardIndicator,
              {
                backgroundColor: activeCardIndex === index ? "#EA0A2A" : "#D1D1D1",
                width: activeCardIndex === index ? 20 : 8,
              },
            ]}
          />
        ))}
      </View>
    )
  }

  const activeCard = cards[activeCardIndex]

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView contentContainerStyle={localStyles.scrollContent}>
        {/* Header with back button */}
        <View style={localStyles.header}>
          <TouchableOpacity style={localStyles.backButton} onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/icons/arrow-left-icon.png")}
              style={localStyles.backIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Card Carousel */}
        <View style={localStyles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={cards}
            renderItem={renderCardItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            decelerationRate="fast"
            snapToInterval={Dimensions.get("window").width}
            snapToAlignment="center"
            contentContainerStyle={localStyles.carouselContent}
            initialScrollIndex={1} // Start with the middle card (debit)
            getItemLayout={(_, index) => ({
              length: Dimensions.get("window").width,
              offset: Dimensions.get("window").width * index,
              index,
            })}
          />

          {/* Card indicators */}
          {renderCardIndicators()}
        </View>

        {/* Card Info - Animated for smooth transitions */}
        <Animated.View
          style={[
            localStyles.cardInfoContainer,
            {
              opacity: scrollX.interpolate({
                inputRange: cards.map((_, i) => i * Dimensions.get("window").width),
                outputRange: cards.map((_, i) => (i === activeCardIndex ? 1 : 0)),
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          {renderCardInfo()}
        </Animated.View>

        {/* Transactions Section */}
        <View style={localStyles.transactionsSection}>
          <Text style={localStyles.sectionTitle}>Movimientos</Text>

          <View style={localStyles.transactionsList}>{transactions.map((item) => renderTransactionItem(item))}</View>

          <TouchableOpacity style={localStyles.viewAllButton}>
            <Text style={localStyles.viewAllText}>VER TODOS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Card Details Modal */}
      <CardDetailsModal
        visible={cardDetailsModalVisible}
        onClose={() => setCardDetailsModalVisible(false)}
        cardType={activeCard.cardType}
        lastFour={activeCard.lastFour}
        isCredit={activeCard.isCredit}
        cardColor={activeCard.cardColor || "#EA0A2A"}
      />

      {/* Menu Modal */}
      <MenuModal
        visible={menuVisible}
        onClose={toggleMenu}
        userName="Usuario" // You might want to pass the actual user name here
      />
    </SafeAreaView>
  )
}

const { width } = Dimensions.get("window")

const localStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  carouselContainer: {
    marginVertical: 20,
  },
  carouselContent: {
    alignItems: "center",
  },
  cardItem: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  cardWrapper: {
    // Styles for the card wrapper
  },
  cardInfoContainer: {
    marginBottom: 24,
  },
  cardIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  cardIndicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  // Debit card styles
  accountLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#000",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 32,
  },
  actionItem: {
    alignItems: "center",
    width: "20%",
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
  },
  // Credit card styles
  creditCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#000",
  },
  creditLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  creditAmount: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  creditBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  creditBarLabel: {
    fontSize: 12,
    color: "#666",
  },
  creditBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  creditBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  creditBarImageContainer: {
    height: "100%",
    borderRadius: 4,
    overflow: "hidden",
  },
  gradientSegment: {
    position: "absolute",
    height: "100%",
    top: 0,
  },
  creditBarImageWrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 4,
  },
  creditLimitText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  creditCardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  creditActionItem: {
    alignItems: "center",
    width: "20%",
  },
  creditActionIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
    //tintColor: "#9C2781",
  },
  creditActionText: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
  },
  paymentInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 24,
  },
  paymentInfoTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  chevronIcon: {
    width: 10,
    height: 10,
    //tintColor: "#666",
  },
  paymentInfoContent: {
    marginBottom: 24,
  },
  paymentInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  paymentInfoLabel: {
    fontSize: 14,
    color: "#666",
  },
  paymentInfoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  // Transactions styles
  transactionsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#000",
  },
  transactionsList: {
    marginBottom: 20,
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
    color: "#000",
  },
  transactionDescription: {
    fontSize: 14,
    color: "#666",
  },
  transactionAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicatorIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  viewAllButton: {
    backgroundColor: "#EA0A2A",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  viewAllText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  paymentDetailsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  paymentOptionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginTop: 16,
    marginBottom: 12,
  },
  interestNote: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#666",
    marginTop: 4,
  },
})
