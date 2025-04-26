import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"

interface TransactionItemProps {
  id: string
  name: string
  description: string
  amount: number
  isIncoming: boolean
  onPress?: () => void
}

export const TransactionItem = ({ name, description, amount, isIncoming, onPress }: TransactionItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.amountContainer}>
        <View style={[styles.indicator, isIncoming ? styles.incomingIndicator : styles.outgoingIndicator]}>
          <Image
            source={isIncoming ? require("../assets/icons/incoming.png") : require("../assets/icons/outgoing.png")}
            style={styles.indicatorIcon}
          />
        </View>
        <Text style={[styles.amount, isIncoming ? styles.incomingAmount : styles.outgoingAmount]}>
          {isIncoming ? "" : "-"}${amount.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  incomingIndicator: {
    backgroundColor: "#e6f7e6",
  },
  outgoingIndicator: {
    backgroundColor: "#ffebeb",
  },
  indicatorIcon: {
    width: 12,
    height: 12,
    tintColor: "#EA0A2A",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
  incomingAmount: {
    color: "#28a745",
  },
  outgoingAmount: {
    color: "#EA0A2A",
  },
})
