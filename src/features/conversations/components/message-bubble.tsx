import { StyleSheet, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

import { Message } from '@/features/conversations/types';

type MessageBubbleProps = {
  message: Message;
  isMe: boolean;
  showSender: boolean;
  senderName?: string;
};

export function MessageBubble({
  message,
  isMe,
  showSender,
  senderName,
}: MessageBubbleProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.containerRight : styles.containerLeft,
      ]}
    >
      <Surface
        elevation={1}
        style={[
          styles.bubble,
          {
            backgroundColor: isMe
              ? theme.colors.primary
              : (theme.colors.elevation?.level1 ?? theme.colors.surface),
          },
        ]}
      >
        {showSender && senderName && (
          <Text
            variant="labelMedium"
            style={[
              styles.sender,
              { color: isMe ? theme.colors.onPrimary : theme.colors.primary },
            ]}
          >
            {senderName}
          </Text>
        )}

        <Text
          variant="bodyMedium"
          style={{
            color: isMe ? theme.colors.onPrimary : theme.colors.onSurface,
          }}
        >
          {message.content}
        </Text>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  containerLeft: {
    justifyContent: 'flex-start',
  },
  containerRight: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sender: {
    marginBottom: 4,
  },
});
