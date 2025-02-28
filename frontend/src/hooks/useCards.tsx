import {useEffect, useState} from 'react';
import {Card} from '../core/models/cardClass';
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

const userId = await getUserId();

export const useCards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userCards, setUserCards] = useState<Card[]>([]);

  useEffect(() => {
  initialLoad();

  }, []);

  const initialLoad = async () => {
    const userCards = UseCases.getUserCards(ApiFetcher,userId);
  };
};
