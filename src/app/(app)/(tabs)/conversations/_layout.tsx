import { Stack, useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper';

import { routes } from '@/lib/routes';

export default function ConversationsLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Conversations',
          headerRight: () => (
            <Appbar.Action
              icon="plus"
              onPress={() => router.push(routes.newConversation)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="conversation"
        options={({ route }) => ({
          title: 'Conversation',
          headerRight: () => {
            const conversationId = (route as { params?: { id?: string } }).params?.id;
            return (
              <Appbar.Action
                icon="cog-outline"
                onPress={() =>
                  router.push(
                    routes.conversationSettings(conversationId ?? '')
                  )
                }
              />
            );
          },
        })}
      />
      <Stack.Screen
        name="new-conversation"
        options={{ title: 'New conversation' }}
      />
      <Stack.Screen
        name="conversation-settings"
        options={{ title: 'Settings' }}
      />
    </Stack>
  );
}
