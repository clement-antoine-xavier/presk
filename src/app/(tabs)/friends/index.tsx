import { useForm, useWatch } from 'react-hook-form';
import { SectionList, StyleSheet, View } from 'react-native';
import { MD3Theme, Text, withTheme } from 'react-native-paper';

import { ControlledSearchbar } from '@/components/form/controlled-searchbar';
import { AvatarList } from '@/components/friends/avatar-list';
import { ConversationListItem } from '@/components/friends/conversation-list-item';

import { conversations } from '@/constants/conversations';
import { friends } from '@/constants/friends';
import { useFilteredConversationSections } from '@/features/friends/hooks/use-filtered-conversation-sections';

type FriendsFormValues = {
  search: string;
};

function Friends({ theme }: { theme: MD3Theme }) {
  const { control } = useForm<FriendsFormValues>({
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
      keyExtractor={(item) => item.data.id}
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
              console.log('friend pressed', friend);
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
                console.log('conversation pressed', conversation);
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

export default withTheme(Friends);