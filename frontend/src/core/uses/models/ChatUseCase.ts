import {HttpAdapter} from '../../../config/adapters/http_adapter';
import {Card} from '../../../interfaces/cardClass';
import {ChatMessage} from '../../../interfaces/chatMessage';

export const getChatResponse = async (
  fetcher: HttpAdapter,
  userId: string,
): Promise<ChatMessage> => {
  try {
    const cards = await fetcher.get<ChatMessage>(
      `https://continual-rhino-451822-t8.uw.r.appspot.com//cards/${userId}`,
    );

    return cards;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching data: Get User Cards');
  }
};
