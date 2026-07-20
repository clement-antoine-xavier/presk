import { useCallback, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, MD3Theme, Text, withTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { ControlledSearchbar } from '@/components/ui/controlled-searchbar';
import { ControlledTextInput } from '@/components/ui/controlled-text-input';
import { AvatarList } from '@/features/conversations/components/avatar-list';
import { UserListItem } from '@/features/conversations/components/user-list-item';

import { users } from '@/features/conversations/constants/users';
import { useSearchUsers } from '@/features/conversations/hooks/use-search-users';
import { useConversationsStore, createParticipantsFromUsers } from '@/features/conversations/store/conversations-store';
import { useFindExistingConversation } from '@/features/conversations/hooks/use-find-existing-conversation';
import { routes } from '@/lib/routes';
import { UserItem } from '@/features/conversations/types';

type NewConversationFormValues = {
  search: string;
  title: string;
};

function NewConversationScreen({ theme }: { theme: MD3Theme }) {
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

  const { conversations, createConversation } = useConversationsStore();
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

  const firstSelectedUser = selectedUsers[0];
  const existingSingleConversation = useFindExistingConversation(
    conversations,
    firstSelectedUser?.user_id
  );

  const handleCreate = useCallback(
    (values: NewConversationFormValues) => {
      if (selectedUsers.length === 0) {
        return;
      }

      if (selectedUsers.length === 1 && existingSingleConversation) {
        router.push(routes.conversation(existingSingleConversation.conversation_id));
        return;
      }

      const trimmedTitle = values.title.trim();
      const conversationTitle =
        selectedUsers.length === 1 ? selectedUsers[0].name : trimmedTitle || 'Group conversation';

      const participants = createParticipantsFromUsers(selectedUsers);
      const newConversation = createConversation(participants, conversationTitle);

      router.push(routes.conversation(newConversation.conversation_id));
    },
    [createConversation, existingSingleConversation, router, selectedUsers]
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

export default withTheme(NewConversationScreen);
