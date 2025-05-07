import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Message} from '../../components/Message';
import {ChatInput} from '../../components/ChatInput';
import {Container} from '../../components/Container';
import {MayaService} from '../../services/mayaService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  isLoading?: boolean;
}

export const ChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get userId from AsyncStorage
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(parseInt(storedUserId, 10));
        } else {
          console.error('No userId found in AsyncStorage');
          // You might want to handle this case (redirect to login, etc.)
        }
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    getUserId();

    // Initial greeting message from Maya
    const initialMessage = {
      id: '1',
      text: '¡Hola! ¿En qué puedo ayudarte?',
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages([initialMessage]);
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !userId) return;

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Add temporary loading message
    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: 'Estoy pensando...',
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isLoading: true,
    };

    setMessages(prevMessages => [...prevMessages, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      // Call Maya API service
      const response = await MayaService.askMaya(userId, text);

      // Remove loading message and add actual response
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => !msg.isLoading);
        return [
          ...filteredMessages,
          {
            id: (Date.now() + 2).toString(),
            text: response.response,
            isUser: false,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ];
      });
    } catch (error) {
      console.error('Error getting response from Maya:', error);

      // Remove loading message and add error message
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => !msg.isLoading);
        return [
          ...filteredMessages,
          {
            id: (Date.now() + 2).toString(),
            text: 'Lo siento, tuve un problema al procesar tu mensaje. ¿Podrías intentarlo de nuevo?',
            isUser: false,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({item}: {item: ChatMessage}) => {
    if (item.isLoading) {
      return (
        <View style={[styles.loadingContainer, styles.botMessageContainer]}>
          <ActivityIndicator size="small" color="#E31837" />
          <Text style={styles.loadingText}>{item.text}</Text>
        </View>
      );
    }

    return (
      <Message
        text={item.text}
        isUser={item.isUser}
        timestamp={item.timestamp}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Container>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image
              source={require('../../assets/icons/arrow-left-icon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Maya convergency</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={require('../../assets/icons/user-icon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Chat Messages */}
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
        />

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} />
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileButton: {
    padding: 8,
  },
  messagesList: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#E31837', // Banorte red color
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 16,
    maxWidth: '80%',
  },
  botMessageContainer: {
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
});
