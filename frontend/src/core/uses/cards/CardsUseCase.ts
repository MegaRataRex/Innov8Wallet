import {HttpAdapter} from '../../../config/adapters/http_adapter';
import { Card } from '../../../interfaces/cardClass';

export const getUserCards = async (
  fetcher: HttpAdapter,
  userId: string,
): Promise<Card[]> => {
  try {
    const cards = await fetcher.get<Card[]>(
      `https://continual-rhino-451822-t8.uw.r.appspot.com/transactions/cards/${userId}`,
    );

    return cards;


  } catch (error) {
    console.log(error);
    throw new Error('Error fetching data: Get User Cards');
  }
};
