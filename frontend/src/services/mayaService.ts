import {ApiFetcher} from '../config/adapters/api_fetcher';

export interface MayaResponse {
  response: string;
}

export interface MayaAdviceRequest {
  userId: number;
  action: string;
}

export class MayaService {
  // Consultar a Maya (asistente financiero)
  static async askMaya(userId: number, message: string): Promise<MayaResponse> {
    try {
      return await ApiFetcher.post<MayaResponse>('/maya', {
        userId,
        message,
      });
    } catch (error) {
      console.error('Error al consultar a Maya:', error);
      throw error;
    }
  }

  // Obtener consejos financieros basados en acción del usuario
  static async getAdvice(
    userId: number,
    action: string,
  ): Promise<MayaResponse> {
    try {
      return await ApiFetcher.post<MayaResponse>('/maya/advice', {
        userId,
        action,
      });
    } catch (error) {
      console.error('Error al obtener consejo financiero:', error);
      throw error;
    }
  }
}
