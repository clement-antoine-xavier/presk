import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Divider,
  IconButton,
  MD3Theme,
  Surface,
  Switch,
  Text,
  withTheme,
} from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ControlledTextInput } from '@/components/ui/controlled-text-input';
import { UserAvatar } from '@/features/conversations/components/person-avatar';

import { useConversationsStore } from '@/features/conversations/store/conversations-store';
import { useConversationById } from '@/features/conversations/hooks/use-conversation-by-id';
import { ConversationParticipant } from '@/features/conversations/types';

type ConversationSettingsFormValues = {
  title: string;
};

function ConversationSettingsScreen({ theme }: { theme: MD3Theme }) {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { conversations, updateConversationTitle, removeParticipant } =
    useConversationsStore();
  const conversation = useConversationById(conversations, id);

  const { control, handleSubmit } = useForm<ConversationSettingsFormValues>({
    defaultValues: {
      title: conversation?.title ?? '',
    },
  });

  const participants = useMemo(
    () => conversation?.participants ?? [],
    [conversation]
  );

  const handleSave = useCallback(
    (values: ConversationSettingsFormValues) => {
      if (!id) {
        return;
      }
      updateConversationTitle(id, values.title);
      router.back();
    },
    [id, router, updateConversationTitle]
  );

  const handleRemoveParticipant = useCallback(
    (participantId: string) => {
      if (!id) {
        return;
      }
      removeParticipant(id, participantId);
    },
    [id, removeParticipant]
  );

  if (!conversation) {
    return (
      <View
        style={[styles.screen, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.centered}>
          <Text
            variant="bodyLarge"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Conversation not found.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Surface
          elevation={1}
          style={[
            styles.section,
            {
              backgroundColor:
                theme.colors.elevation?.level1 ?? theme.colors.surface,
            },
          ]}
        >
          <Text
            variant="titleSmall"
            style={[styles.sectionTitle, { color: theme.colors.primary }]}
          >
            Conversation name
          </Text>

          <ControlledTextInput
            control={control}
            name="title"
            label="Name"
            style={styles.textInput}
          />
        </Surface>

        <Surface
          elevation={1}
          style={[
            styles.section,
            {
              backgroundColor:
                theme.colors.elevation?.level1 ?? theme.colors.surface,
            },
          ]}
        >
          <Text
            variant="titleSmall"
            style={[styles.sectionTitle, { color: theme.colors.primary }]}
          >
            Participants
          </Text>

          <FlatList
            data={participants}
            keyExtractor={(item) => item.participant_id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <ParticipantRow
                participant={item}
                theme={theme}
                onRemove={() => handleRemoveParticipant(item.participant_id)}
              />
            )}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            ListEmptyComponent={
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                No participants.
              </Text>
            }
          />
        </Surface>

        <Surface
          elevation={1}
          style={[
            styles.section,
            styles.row,
            {
              backgroundColor:
                theme.colors.elevation?.level1 ?? theme.colors.surface,
            },
          ]}
        >
          <Text
            variant="bodyLarge"
            style={{ color: theme.colors.onSurface }}
          >
            Group conversation
          </Text>

          <Switch value={!!conversation.is_group} disabled />
        </Surface>

        <Button
          mode="contained"
          onPress={handleSubmit(handleSave)}
          style={styles.saveButton}
        >
          Save
        </Button>
      </ScrollView>
    </View>
  );
}

type ParticipantRowProps = {
  participant: ConversationParticipant;
  theme: MD3Theme;
  onRemove: () => void;
};

function ParticipantRow({ participant, theme, onRemove }: ParticipantRowProps) {
  return (
    <View style={styles.participantRow}>
      <UserAvatar
        user={{
          user_id: participant.user_id,
          name: participant.name,
          avatar_url: participant.avatar_url,
        }}
        size={40}
      />

      <Text
        variant="bodyLarge"
        numberOfLines={1}
        style={[styles.participantName, { color: theme.colors.onSurface }]}
      >
        {participant.name}
      </Text>

      <IconButton
        icon="close"
        size={20}
        iconColor={theme.colors.error}
        onPress={onRemove}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  section: {
    borderRadius: 18,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  participantName: {
    flex: 1,
  },
  divider: {
    marginVertical: 4,
  },
  saveButton: {
    marginTop: 8,
  },
});

export default withTheme(ConversationSettingsScreen);
