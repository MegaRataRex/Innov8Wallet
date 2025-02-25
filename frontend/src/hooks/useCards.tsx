import {useEffect, useState} from 'react';
import {Card} from '../core/models/cardClass';
import * as UseCases from '../core/uses';

export const useCards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userCards, setUserCards] = useState<Card[]>([]);

  useEffect(() => {}, []);

  const initialLoad = async () => {
    const userCards = UseCases.getUserCards();
  };
};
