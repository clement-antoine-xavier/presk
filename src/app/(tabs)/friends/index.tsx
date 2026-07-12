import { SectionList, StyleSheet, View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { AvatarList, FriendAvatarItem } from '@/components/friends/avatar-list';
import { ConversationItem, ConversationListItem } from '@/components/friends/conversation-list-item';

const friends: FriendAvatarItem[] = [
  { id: '1', name: 'Alice Kim', photoUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-1` },
  { id: '2', name: 'Ben Park', photoUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-2` },
  { id: '3', name: 'Chloe Martin', photoUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-3` },
  { id: '4', name: 'David Lee', photoUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-4` },
  { id: '5', name: 'Emma Sun', photoUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-5` },
];

const conversations: ConversationItem[] = [
  {
    id: '1',
    title: 'Alice Kim',
    latestMessage: 'Are you free tonight?',
    participants: [{ id: '1', name: 'Alice Kim', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-1` }],
  },
  {
    id: '2',
    title: 'Weekend Trip',
    latestMessage: 'I uploaded the photos from yesterday.',
    isGroup: true,
    participants: [
      { id: '2', name: 'Ben Park', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-2` },
      { id: '3', name: 'Chloe Martin', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-3` },
    ],
  },
  {
    id: '3',
    title: 'David Lee',
    latestMessage: 'Let’s continue the conversation tomorrow.',
    participants: [
      { id: '4', name: 'David Lee', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-4` }
    ],
  },
  {
    id: '4',
    title: 'Emma Sun',
    latestMessage: 'I’ll send you the details later.',
    participants: [{ id: '5', name: 'Emma Sun', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-5` }],
  },
  {
    id: '5',
    title: 'Frank Wilson',
    latestMessage: 'Thanks for your help!',
    participants: [{ id: '6', name: 'Frank Wilson', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-6` }],
  },
  {
    id: '6',
    title: 'Grace Chen',
    latestMessage: 'See you at the meeting!',
    participants: [{ id: '7', name: 'Grace Chen', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-7` }],
  },
  {
    id: '7',
    title: 'Henry Adams',
    latestMessage: 'I’ll be there in 10 minutes.',
    participants: [{ id: '8', name: 'Henry Adams', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-8` }],
  },
  {
    id: '8',
    title: 'Isabella Brown',
    latestMessage: 'Can you review this document?',
    participants: [{ id: '9', name: 'Isabella Brown', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-9` }],
  },
];

const sections = [
  {
    title: 'Conversations',
    data: conversations.map((item) => ({
      type: 'conversation' as const,
      data: item,
    })),
  },
];

function Friends({ theme }) {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.data.id}
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.headerBlock}>
          <Text
            variant="titleMedium"
            style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
          >
            Latest photos
          </Text>

          <AvatarList
            data={friends}
            onPressItem={(friend) => {
              console.log('friend pressed', friend);
            }}
          />
        </View>
      }
      renderSectionHeader={({ section }) => (
        <Text
          variant="titleMedium"
          style={[styles.sectionTitle, styles.conversationHeader, { color: theme.colors.onSurface }]}
        >
          {section.title}
        </Text>
      )}
      renderItem={({ item }) => {
        if (item.type === 'conversation') {
          return (
            <View style={styles.rowWrapper}>
              <ConversationListItem
                item={item.data}
                onPress={(conversation) => {
                  console.log('conversation pressed', conversation);
                }}
              />
            </View>
          );
        }

        return null;
      }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerBlock: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  conversationHeader: {
    marginBottom: 12,
  },
  rowWrapper: {
    paddingHorizontal: 16,
  },
});

export default withTheme(Friends);