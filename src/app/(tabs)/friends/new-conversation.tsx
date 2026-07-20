import { useCallback, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { Button, MD3Theme, Text, withTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { ControlledSearchbar } from '@/components/form/controlled-searchbar';
import { ControlledTextInput } from '@/components/form/controlled-text-input';
import { AvatarList } from '@/components/friends/avatar-list';
import UserListItem from '@/components/friends/user-list-item';

import { users } from '@/constants/users';
import { conversations as initialConversations } from '@/constants/conversations';
import { useSearchUsers } from '@/features/friends/hooks/use-search-users';
import { ConversationItem, UserItem } from '@/components/friends/types';

type NewConversationFormValues = {
  search: string;
  title: string;
};

function NewConversation({ theme }: { theme: MD3Theme }) {
  const router = useRouter();
  const { control, handleSubmit } = useForm<NewConversationFormValues>({
    defaultValues: {
      search: '',
      title: '',
    },
  });

  const search = useWatch({
    control,
    name: 'search',
    defaultValue: '',
  });

  const [conversations, setConversations] = useState(initialConversations);
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());

  const filteredUsers = useSearchUsers(users, search);

  const sortedUsers = useMemo(
    () => [...filteredUsers].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredUsers]
  );

  const selectedUsers = useMemo(
    () => users.filter((user) => selectedUserIds.has(user.user_id)),
    [selectedUserIds]
  );

  const isGroup = selectedUsers.length > 1;

  const toggleUser = useCallback((user: UserItem) => {
    setSelectedUserIds((previous) => {
      const next = new Set(previous);
      if (next.has(user.user_id)) {
        next.delete(user.user_id);
      } else {
        next.add(user.user_id);
      }
      return next;
    });
  }, []);

  const handleCreate = useCallback(
    (values: NewConversationFormValues) => {
      if (selectedUsers.length === 0) {
        return;
      }

      if (selectedUsers.length === 1) {
        const singleUser = selectedUsers[0];
        const existing = conversations.find(
          (conversation) =>
            !conversation.is_group &&
            conversation.participants.length === 1 &&
            conversation.participants[0]?.user_id === singleUser.user_id
        );

        if (existing) {
          router.push({
            pathname: '/friends/conversation',
            params: { id: existing.conversation_id },
          });
          return;
        }
      }

      const trimmedTitle = values.title.trim();
      const conversationTitle =
        selectedUsers.length === 1 ? selectedUsers[0].name : trimmedTitle || 'Group conversation';

      const newConversation: ConversationItem = {
        conversation_id: `c-${Date.now()}`,
        title: conversationTitle,
        latest_message: '',
        is_group: selectedUsers.length > 1,
        participants: selectedUsers.map((user, index) => ({
          participant_id: `p-${Date.now()}-${index}`,
          user_id: user.user_id,
          name: user.name,
          avatar_url: user.avatar_url,
        })),
      };

      setConversations((previous) => [newConversation, ...previous]);

      router.push({
        pathname: '/friends/conversation',
        params: { id: newConversation.conversation_id },
      });
    },
    [conversations, router, selectedUsers]
  );

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <ControlledSearchbar
        control={control}
        name="search"
        placeholder="Search users"
        style={styles.searchbar}
      />

      {selectedUsers.length > 0 && (
        <View style={styles.selectedBlock}>
          <AvatarList
            data={selectedUsers}
            onPressItem={(user) => toggleUser(user)}
          />
        </View>
      )}

      {isGroup && (
        <ControlledTextInput
          control={control}
          name="title"
          label="Conversation name"
          placeholder="Group name"
          style={styles.titleInput}
        />
      )}

      <FlatList
        data={sortedUsers}
        keyExtractor={(item) => item.user_id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <UserListItem
            user={item}
            selected={selectedUserIds.has(item.user_id)}
            onPress={toggleUser}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text
            style={[
              styles.emptyText,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            No users found.
          </Text>
        }
      />

      <View
        style={[
          styles.footer,
          {
            backgroundColor:
              theme.colors.elevation?.level1 ?? theme.colors.surface,
            borderTopColor: theme.colors.outlineVariant,
          },
        ]}
      >
        <Button
          mode="contained"
          disabled={selectedUsers.length === 0}
          onPress={handleSubmit(handleCreate)}
          style={styles.createButton}
        >
          {selectedUsers.length === 1 ? 'Start conversation' : 'Create group'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  searchbar: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  selectedBlock: {
    marginBottom: 8,
  },
  titleInput: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  separator: {
    height: 12,
  },
  emptyText: {
    marginTop: 8,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  createButton: {
    width: '100%',
  },
});

export default withTheme(NewConversation);
