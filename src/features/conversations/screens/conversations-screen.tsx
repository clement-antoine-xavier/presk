import { useForm, useWatch } from 'react-hook-form';
import { SectionList, StyleSheet, View } from 'react-native';
import { MD3Theme, Text, withTheme } from 'react-native-paper';

import { ControlledSearchbar } from '@/components/ui/controlled-searchbar';
import { AvatarList } from '@/features/conversations/components/avatar-list';
import { ConversationListItem } from '@/features/conversations/components/conversation-list-item';
import { friends } from '@/features/conversations/constants/friends';
import { useConversationsStore } from '@/features/conversations/store/conversations-store';
import { useFilteredConversationSections } from '@/features/conversations/hooks/use-filtered-conversation-sections';
import { routes } from '@/lib/routes';
import { useRouter } from 'expo-router';

type ConversationsFormValues = {
  search: string;
};

function ConversationsScreen({ theme }: { theme: MD3Theme }) {
  const router = useRouter();
  const { conversations } = useConversationsStore();

  const { control } = useForm<ConversationsFormValues>({
    defaultValues: {
      search: '',
    },
  });

  const search = useWatch({
    control,
    name: 'search',
    defaultValue: '',
  });

  const sections = useFilteredConversationSections(conversations, search);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.data.conversation_id}
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.headerBlock}>
          <ControlledSearchbar
            control={control}
            name="search"
            placeholder="Search friends"
            style={styles.searchbar}
            inputStyle={styles.searchbarInput}
          />

          <Text
            variant="titleMedium"
            style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
          >
            Latest photos
          </Text>

          <AvatarList
            data={friends}
            onPressItem={(friend) => {
              router.push(routes.conversation(friend.user_id));
            }}
          />
        </View>
      }
      renderSectionHeader={({ section }) => (
        <Text
          variant="titleMedium"
          style={[
            styles.sectionTitle,
            styles.conversationHeader,
            { color: theme.colors.onSurface },
          ]}
        >
          {section.title}
        </Text>
      )}
      renderItem={({ item }) => {
        if (item.type !== 'conversation') {
          return null;
        }

        return (
          <View style={styles.rowWrapper}>
            <ConversationListItem
              item={item.data}
              onPress={(conversation) => {
                router.push(routes.conversation(conversation.conversation_id));
              }}
              onCameraPress={(conversation) => {
                router.push(routes.conversation(conversation.conversation_id));
              }}
            />
          </View>
        );
      }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <Text
          style={[
            styles.emptyText,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          No conversations found
        </Text>
      }
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
  searchbar: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchbarInput: {
    minHeight: 0,
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
  separator: {
    height: 12,
  },
  emptyText: {
    marginHorizontal: 16,
    marginTop: 8,
  },
});

export default withTheme(ConversationsScreen);
