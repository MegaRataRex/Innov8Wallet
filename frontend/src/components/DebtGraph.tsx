import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import Svg, { Path, Circle } from "react-native-svg"

interface DebtItem {
  id: string
  name: string
  amount: number
  color: string
  category: "creditCard" | "loan"
}

interface DebtGraphProps {
  data: DebtItem[]
  totalDebt: number
}

export const DebtGraph: React.FC<DebtGraphProps> = ({ data, totalDebt }) => {
  const radius = 70
  const strokeWidth = 12
  const center = radius + strokeWidth
  const size = center * 2

  // Calculate the arc paths for each segment
  const calculateArcPath = (startAngle: number, endAngle: number, radius: number, center: number): string => {
    // Convert angles from degrees to radians
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    // Calculate start and end points
    const startX = center + radius * Math.cos(startRad)
    const startY = center + radius * Math.sin(startRad)
    const endX = center + radius * Math.cos(endRad)
    const endY = center + radius * Math.sin(endRad)

    // Determine if the arc should be drawn the long way around
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

    // Create the arc path
    return `M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`
  }

  // Calculate segments
  let startAngle = -90 // Start from the top (12 o'clock position)
  const segments = data.map((item) => {
    const percentage = item.amount / totalDebt
    const sweepAngle = 360 * percentage
    const endAngle = startAngle + sweepAngle

    const segment = {
      ...item,
      startAngle,
      endAngle,
      path: calculateArcPath(startAngle, endAngle, radius, center),
    }

    startAngle = endAngle
    return segment
  })

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <Circle cx={center} cy={center} r={radius} stroke="#f0f0f0" strokeWidth={strokeWidth} fill="white" />

        {/* Draw segments using Path instead of Circle with strokeDasharray */}
        {segments.map((segment) => (
          <Path key={segment.id} d={segment.path} fill={segment.color} stroke="none" />
        ))}

        {/* White center circle to create donut effect */}
        <Circle cx={center} cy={center} r={radius - strokeWidth} fill="white" />
      </Svg>

      {/* Total debt amount in the center */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalAmount}>${totalDebt.toLocaleString()}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 180,
  },
  totalContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
})
