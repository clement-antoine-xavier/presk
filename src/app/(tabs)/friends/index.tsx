import { SectionList, StyleSheet, View } from 'react-native';
import { MD3Theme, Text, withTheme } from 'react-native-paper';

import { AvatarList } from '@/components/friends/avatar-list';
import { ConversationListItem } from '@/components/friends/conversation-list-item';

import { friends } from '@/constants/friends';
import { conversations } from '@/constants/conversations';

const sections = [
  {
    title: 'Conversations',
    data: conversations.map((item) => ({
      type: 'conversation' as const,
      data: item,
    })),
  },
];

function Friends({ theme }: { theme: MD3Theme }) {
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