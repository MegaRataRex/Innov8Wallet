import {HttpAdapter} from '../../config/adapters/http_adapter';
import {Card} from '../models/cardClass';

export const getUserCards = async (
  fetcher: HttpAdapter,
  userId: string,
): Promise<Card[]> => {
  try {
    const cards = await fetcher.get(
      `https://continual-rhino-451822-t8.uw.r.appspot.com/cards/${userId}`,
    );

    return [];
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching data: Get User Cards');
  }
};
