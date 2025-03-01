import {useEffect, useState} from 'react';
import {Card} from '../interfaces/cardClass';
import * as UseCases from '../core/uses';
import { ApiFetcher } from '../config/adapters/api_fetcher';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId || ''; // Ensures it's always a string
  } catch (error) {
    console.error('Error retrieving userId:', error);
    return ''; // Fallback to an empty string
  }
};


export const useCards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userCards, setUserCards] = useState<Card[]>([]);

  useEffect(() => {
    // Get user ID and then load cards
    const loadData = async () => {
      const id = await getUserId();
      initialLoad(id);
    };
    loadData();
  }, []);

  const initialLoad = async (id: string) => {
    const userCardsPromise = UseCases.getUserCards(ApiFetcher, id);
    const [userAllCards] = await Promise.all([userCardsPromise]);
    console.log(userAllCards);
    setUserCards(userAllCards);
    setIsLoading(false);
  };

  return {
    isLoading,
    userCards,
  };
};
