import { Stack, useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper';

export default function FriendsLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Friends',
          headerRight: () => (
            <Appbar.Action
              icon="plus"
              onPress={() => router.push('/friends/new-conversation')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="conversation"
        options={({ route }) => ({
          title: 'Conversation',
          headerRight: () => (
            <Appbar.Action
              icon="cog-outline"
              onPress={() =>
                router.push({
                  pathname: '/friends/conversation-settings',
                  params: { id: route.params?.id },
                })
              }
            />
          ),
        })}
      />
      <Stack.Screen name="new-conversation" options={{ title: 'New conversation' }} />
      <Stack.Screen name="conversation-settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
