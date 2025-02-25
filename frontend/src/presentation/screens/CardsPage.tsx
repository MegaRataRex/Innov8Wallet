import { useState, useRef } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { ArrowLeft } from "react-native-feather"

interface Card {
  id: string
  type: "debit" | "credit"
  number: string
  balance?: number
  creditUsed?: number
  creditLimit?: number
  design: {
    background: string
    pattern?: string
    logo: "visa" | "mastercard"
    gradientColors?: string[]
  }
  name: string
}

const cards: Card[] = [
  {
    id: "1",
    type: "debit",
    number: "9873",
    balance: 19523.0,
    design: {
      background: "#EC1C2D",
      logo: "visa",
    },
    name: "Cuenta Banorte",
  },
  {
    id: "2",
    type: "credit",
    number: "5374",
    creditUsed: 2250.0,
    creditLimit: 6000,
    design: {
      background: "#7E22CE",
      pattern:
        "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L3N2Zz4=')",
      logo: "mastercard",
      gradientColors: ["#D946EF", "#7E22CE"],
    },
    name: "TDC Mujer Banorte",
  },
  {
    id: "3",
    type: "credit",
    number: "7821",
    creditUsed: 4523.0,
    creditLimit: 5000,
    design: {
      background: "linear-gradient(to right, #9333EA, #EC4899, #EAB308)",
      logo: "visa",
      gradientColors: ["#EF4444", "#22C55E"],
    },
    name: "TDC One Up",
  },
]

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const CARD_WIDTH = 360
const CARD_GAP = SCREEN_WIDTH - CARD_WIDTH

export default function CardsPage() {
  const navigation = useNavigation()
  const [activeCard, setActiveCard] = useState<Card>(cards[0])
  const scrollViewRef = useRef<ScrollView>(null)

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const activeIndex = Math.round(contentOffsetX / (CARD_WIDTH + CARD_GAP))
    setActiveCard(cards[activeIndex])
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="black" width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* Cards Scroll Container */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {cards.map((card) => (
          <View key={card.id} style={styles.cardContainer}>
            <View
              style={[
                styles.card,
                { backgroundColor: card.design.background },
                activeCard.id === card.id ? styles.activeCard : styles.inactiveCard,
              ]}
            >
              <View style={styles.cardContent}>
                <View style={styles.logoContainer}>
                  {card.design.logo === "mastercard" ? (
                    <View style={styles.mastercardLogo}>
                      <View style={[styles.mastercardCircle, { backgroundColor: "#FF0000" }]} />
                      <View style={[styles.mastercardCircle, { backgroundColor: "#FFAA00" }]} />
                    </View>
                  ) : (
                    <View style={styles.visaLogo}>
                      <View style={styles.visaLogoInner} />
                    </View>
                  )}
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardNumber}>•••• {card.number}</Text>
                  <Text style={styles.cardType}>{card.design.logo.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Card Info */}
      <View style={styles.cardInfoContainer}>
        <Text style={styles.cardName}>{activeCard.name}</Text>
        <Text style={styles.balanceLabel}>{activeCard.type === "debit" ? "Saldo actual" : "Crédito utilizado"}</Text>
        <Text style={styles.balanceAmount}>
          ${activeCard.type === "debit" ? activeCard.balance?.toFixed(2) : activeCard.creditUsed?.toFixed(2)}
        </Text>

        {activeCard.type === "credit" && (
          <View style={styles.creditInfo}>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${(activeCard.creditUsed! / activeCard.creditLimit!) * 100}%`,
                    backgroundColor: activeCard.design.gradientColors?.[0],
                  },
                ]}
              />
            </View>
            <View style={styles.creditLabels}>
              <Text style={styles.creditLabel}>Uso</Text>
              <Text style={styles.creditLabel}>Límite</Text>
            </View>
            <Text style={styles.creditLimit}>Línea de crédito ${activeCard.creditLimit?.toFixed(0)}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    padding: 24,
  },
  scrollContent: {
    paddingHorizontal: CARD_GAP / 2,
  },
  cardContainer: {
    width: CARD_WIDTH,
    paddingHorizontal: CARD_GAP / 2,
  },
  card: {
    aspectRatio: 1.58,
    borderRadius: 24,
    padding: 24,
    justifyContent: "space-between",
  },
  activeCard: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  inactiveCard: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  logoContainer: {
    marginBottom: 48,
  },
  mastercardLogo: {
    flexDirection: "row",
    marginLeft: -16,
  },
  mastercardCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    opacity: 0.9,
  },
  visaLogo: {
    width: 40,
    height: 32,
    backgroundColor: "rgba(255, 255, 224, 0.8)",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  visaLogoInner: {
    width: 32,
    height: 24,
    backgroundColor: "rgba(255, 255, 150, 0.9)",
    borderRadius: 2,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardNumber: {
    color: "white",
    opacity: 0.8,
    fontSize: 14,
  },
  cardType: {
    color: "white",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "300",
  },
  cardInfoContainer: {
    padding: 24,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  creditInfo: {
    marginTop: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  creditLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  creditLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  creditLimit: {
    fontSize: 14,
    color: "#6B7280",
  },
})