import {ApiFetcher} from '../config/adapters/api_fetcher';

// Definición de interfaces basadas en los modelos del backend
export interface Transaction {
  id?: number;
  user_id: number;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
  description: string;
  sub_category?: string;
  payment_method_id: number;
  beneficiary?: string;
}

export interface Subscription extends Transaction {
  nextChargeDate: string;
}

export interface SavingsGoal {
  goalAmount: number;
  deadline: string;
  currentSavings: number;
  userIncome?: number;
}

export interface RetirementPlan {
  expectedRetirementAge: number;
  lifeExpectancy: number;
  desiredAnnualIncome: number;
  currentSavings: number;
}

export interface Card {
  id: number;
  last_four: string;
  type: string;
  exp_date: string;
  cardType: string;
  brand: string;
}

export interface TransferFunds {
  userId: number;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  description?: string;
}

// Clase de servicio para manejar transacciones
export class TransactionService {
  // Obtener todas las transacciones del usuario
  static async getTransactions(userId: number): Promise<Transaction[]> {
    try {
      return await ApiFetcher.get<Transaction[]>('/transactions/transactions', {
        params: {userId: userId},
      });
    } catch (error) {
      console.error('Error al obtener transacciones:', error);
      throw error;
    }
  }

  // Añadir una nueva transacción
  static async addTransaction(
    transaction: Transaction | Transaction[],
  ): Promise<{message: string; insertedCount: number}> {
    try {
      // Fix: Wrap the transaction in an object with a data property
      return await ApiFetcher.post<{message: string; insertedCount: number}>(
        '/',
        {data: transaction},
      );
    } catch (error) {
      console.error('Error al añadir transacción:', error);
      throw error;
    }
  }

  // Obtener suscripciones del usuario
  static async getSubscriptions(): Promise<Subscription[]> {
    try {
      return await ApiFetcher.get<Subscription[]>('/subscriptions');
    } catch (error) {
      console.error('Error al obtener suscripciones:', error);
      throw error;
    }
  }

  // Calcular plan de ahorros a corto plazo
  static async calculateSavings(savingsGoal: SavingsGoal): Promise<{
    monthlySavings: number;
    monthsRemaining: number;
    feasibility: string;
    adjustments: string;
  }> {
    try {
      return await ApiFetcher.post<any>('/savings', {goal: savingsGoal});
    } catch (error) {
      console.error('Error al calcular ahorros:', error);
      throw error;
    }
  }

  // Calcular plan de ahorros para retiro
  static async calculateRetirementSavings(
    retirementPlan: RetirementPlan,
  ): Promise<{
    requiredSavings: number;
    monthlySavingsRequired: number;
    yearsToRetirement: number;
    suggestions: string;
  }> {
    try {
      return await ApiFetcher.post<any>('/savings', {plan: retirementPlan});
    } catch (error) {
      console.error('Error al calcular ahorros para retiro:', error);
      throw error;
    }
  }

  // Obtener tarjetas del usuario
  static async getCards(userId: number): Promise<Card[]> {
    try {
      return await ApiFetcher.get<Card[]>(`/cards/${userId}`);
    } catch (error) {
      console.error('Error al obtener tarjetas:', error);
      throw error;
    }
  }

  // Realizar transferencia entre cuentas
  static async transferFunds(
    transferData: TransferFunds,
  ): Promise<{message: string}> {
    try {
      return await ApiFetcher.post<{message: string}>('/transfer', {
        transfer: transferData,
      });
    } catch (error) {
      console.error('Error al realizar transferencia:', error);
      throw error;
    }
  }
}
