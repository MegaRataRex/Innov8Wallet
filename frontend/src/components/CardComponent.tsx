import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import VisaCardSVG from '../assets/svgs/VisaCardSVG';
import OneUpCardSVG from '../assets/svgs/OneUpCardSVG';
import WomanCardSVG from '../assets/svgs/WomanCardSVG';

interface CardProps{
  cardType : string,
  lastFour: string,
}

export const CardComponent: React.FC<CardProps> = ({cardType, lastFour}) => {
  // Component code...


  const renderCardType = () => {
    switch (cardType) {
      case 'regularCard':
        return <VisaCardSVG />;
      case 'oneUpCard':
        return <OneUpCardSVG />;
      case 'womanCard':
        return <WomanCardSVG />;
      default:
        return <Text>Unknown Card Type</Text>; // Fallback
      }
    };
    return (
        <View style={styles.cardWrapper}>
          {renderCardType()}
          <Text style={styles.cardNumber}>**** {lastFour}</Text>
        </View>
    );
  };
  const styles = StyleSheet.create({
    cardWrapper: {
      position: 'relative', // Allows absolute positioning inside
    },
    cardNumber: {
      position: 'absolute',
      bottom: 10, // Positioning at the bottom
      left: 15, // Positioning at the left
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff', // Assuming a dark background, adjust as needed
      backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slight transparency for visibility
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 5,
    },
    unknownCard: {
      color: 'red',
      fontSize: 14,
    },
  });

  export default CardComponent;
