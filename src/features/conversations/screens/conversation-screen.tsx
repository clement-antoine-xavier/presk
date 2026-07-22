import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { IconButton, MD3Theme, Text, withTheme } from 'react-native-paper';
import { useLocalSearchParams, useNavigation } from 'expo-router';

import { MessageBubble } from '@/features/conversations/components/message-bubble';
import { ControlledTextInput } from '@/components/ui/controlled-text-input';

import { users } from '@/features/conversations/constants/users';
import { useConversationsStore } from '@/features/conversations/store/conversations-store';
import { useConversationById } from '@/features/conversations/hooks/use-conversation-by-id';
import { useConversationMessages } from '@/features/conversations/hooks/use-conversation-messages';

type ConversationFormValues = {
  message: string;
};

function ConversationScreen({ theme }: { theme: MD3Theme }) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const { conversations, messages, sendMessage } = useConversationsStore();

  const conversation = useConversationById(conversations, id);
  const threadMessages = useConversationMessages(messages, id ?? '');

  useEffect(() => {
    if (conversation) {
      navigation.setOptions({ title: conversation.title });
    }
  }, [conversation, navigation]);

  const participantMap = useMemo(() => {
    const map = new Map(users.map((user) => [user.user_id, user]));
    conversation?.participants.forEach((participant) => {
      if (!map.has(participant.user_id)) {
        map.set(participant.user_id, {
          user_id: participant.user_id,
          name: participant.name,
          avatar_url: participant.avatar_url,
        });
      }
    });
    return map;
  }, [conversation]);

  const { control, handleSubmit, reset } = useForm<ConversationFormValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSend = (values: ConversationFormValues) => {
    if (!id) {
      return;
    }
    sendMessage(id, values.message);
    reset({ message: '' });
  };

  if (!conversation) {
    return (
      <View
        style={[styles.screen, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.centered}>
          <Text
            variant="bodyLarge"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Conversation not found.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[
        styles.screen,
        { backgroundColor: theme.colors.background },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        data={threadMessages}
        keyExtractor={(item) => item.message_id}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isMe = item.sender_id === 'me';
          const sender = participantMap.get(item.sender_id);

          return (
            <MessageBubble
              message={item}
              isMe={isMe}
              showSender={!!conversation.is_group && !isMe}
              senderName={sender?.name}
            />
          );
        }}
      />

      <View
        style={[
          styles.inputBar,
          {
            backgroundColor:
              theme.colors.elevation?.level1 ?? theme.colors.surface,
            borderTopColor: theme.colors.outlineVariant,
          },
        ]}
      >
        <ControlledTextInput
          control={control}
          name="message"
          placeholder="Message"
          multiline
          maxLength={1000}
          style={styles.textInput}
          contentStyle={styles.textInputContent}
          underlineColorAndroid="transparent"
        />

        <IconButton
          icon="send"
          mode="contained"
          iconColor={theme.colors.onPrimary}
          containerColor={theme.colors.primary}
          size={24}
          onPress={handleSubmit(onSend)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  messagesContainer: {
    padding: 16,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  textInput: {
    flex: 1,
    maxHeight: 120,
    backgroundColor: 'transparent',
  },
  textInputContent: {
    paddingHorizontal: 0,
  },
});

export default withTheme(ConversationScreen);
