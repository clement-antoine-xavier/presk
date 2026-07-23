import type { Href } from 'expo-router';

export const routes = {
  signIn: '/(auth)/sign-in' as Href,
  signUp: '/(auth)/sign-up' as Href,
  resetPassword: '/(auth)/reset-password' as Href,
  checkEmail: '/(auth)/check-email' as Href,
  updatePassword: '/(modals)/update-password' as Href,
  conversations: '/(app)/(tabs)/conversations' as Href,
  conversation: (id: string) =>
    `/(app)/(tabs)/conversations/conversation?id=${id}` as Href,
  newConversation: '/(app)/(tabs)/conversations/new-conversation' as Href,
  conversationSettings: (id: string) =>
    `/(app)/(tabs)/conversations/conversation-settings?id=${id}` as Href,
  news: '/(app)/(tabs)/(news)' as Href,
  discover: '/(app)/(tabs)/discover' as Href,
  communities: '/(app)/(tabs)/communities' as Href,
  profile: '/(app)/(tabs)/profile' as Href,
  editProfile: '/(modals)/edit-profile' as Href,
} as const;
