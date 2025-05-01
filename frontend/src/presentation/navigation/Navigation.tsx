import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { TransferScreen } from '../screens/TransferScreen';
import { TransferAmountScreen } from '../screens/TransferAmountScreen';
import { TransferConfirmationScreen } from '../screens/TransferConfirmationScreen';
import { TransferSuccessScreen } from '../screens/TransferSuccessScreen';
import { WithdrawalScreen } from '../screens/WithdrawalScreen';
import { WithdrawalConfirmationScreen } from '../screens/WithdrawalConfirmationScreen';
import { AddContactScreen } from '../screens/AddContactScreen';
import { ContactDetailsScreen } from '../screens/ContactDetailsScreen';
import { CardDetailsScreen } from '../screens/CardDetailsScreen';
import { FinancialFutureScreen } from '../screens/FinancialFutureScreen';
import { DebtZeroScreen } from '../screens/DebtZeroScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { MyAccountScreen } from '../screens/MyAccountScreen';

export type RootStackParams = {
  Home: undefined
  LoginScreen: undefined
  Chat: undefined
  CardDetailsScreen: {
    cardType: string
    lastFour: string
    transactions: Array<{
      id: string
      name: string
      description: string
      amount: number
      date: string
      isIncoming: boolean
    }>
  }
  FinancialFutureScreen: undefined
  DebtZeroScreen: undefined
  NotificationsScreen: undefined
  TransferScreen:
    | {
        newContact?: {
          id: string
          name: string
          bank: string
          accountType: string
          accountNumber: string
        }
      }
    | undefined
  WithdrawalScreen: undefined
  WithdrawalConfirmationScreen: {
    amount: number
  }
  AddContactScreen: undefined
  ContactDetailsScreen: {
    accountNumber: string
    bankInfo: {
      bankName: string
      accountType: string
    }
  }
  TransferAmountScreen: {
    contact: {
      id: string
      name: string
      bank: string
      accountType: string
      accountNumber: string
    }
  }
  TransferConfirmationScreen: {
    contact: {
      id: string
      name: string
      bank: string
      accountType: string
      accountNumber: string
    }
    amount: number
  }
  TransferSuccessScreen: {
    contact: {
      id: string
      name: string
      bank: string
      accountType: string
      accountNumber: string
    }
    amount: number
  }
  MyAccountScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="CardDetailsScreen" component={CardDetailsScreen} />
      <Stack.Screen name="FinancialFutureScreen" component={FinancialFutureScreen} />
      <Stack.Screen name="DebtZeroScreen" component={DebtZeroScreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Stack.Screen name="TransferScreen" component={TransferScreen} />
      <Stack.Screen name="WithdrawalScreen" component={WithdrawalScreen} />
      <Stack.Screen name="WithdrawalConfirmationScreen" component={WithdrawalConfirmationScreen} />
      <Stack.Screen name="AddContactScreen" component={AddContactScreen} />
      <Stack.Screen name="ContactDetailsScreen" component={ContactDetailsScreen} />
      <Stack.Screen name="TransferAmountScreen" component={TransferAmountScreen} />
      <Stack.Screen name="TransferConfirmationScreen" component={TransferConfirmationScreen} />
      <Stack.Screen name="TransferSuccessScreen" component={TransferSuccessScreen} />
      <Stack.Screen name="MyAccountScreen" component={MyAccountScreen} />
    </Stack.Navigator>
  );
};
