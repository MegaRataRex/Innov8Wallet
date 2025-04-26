import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Message} from '../../components/Message';
import {ChatInput} from '../../components/ChatInput';
import {Container} from '../../components/Container';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export const ChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
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

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    // Here you would typically handle the AI response
    // For now, we'll just add a simple response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Estoy procesando tu mensaje...',
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Container>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image source={require('../../assets/icons/arrow-left-icon.png')} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Maya convergency</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image source={require('../../assets/icons/user-icon.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* Chat Messages */}
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Message
              text={item.text}
              isUser={item.isUser}
              timestamp={item.timestamp}
            />
          )}
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
  },
});
