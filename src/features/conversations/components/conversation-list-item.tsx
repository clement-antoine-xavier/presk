import { Pressable, StyleSheet, View } from 'react-native';
import { IconButton, Surface, Text, useTheme } from 'react-native-paper';

import { PersonAvatar } from './person-avatar';
import { ConversationItem } from '@/features/conversations/types';

type ConversationListItemProps = {
  item: ConversationItem;
  onPress?: (item: ConversationItem) => void;
  onCameraPress?: (item: ConversationItem) => void;
};

function ConversationAvatar({ item }: { item: ConversationItem }) {
  if (!item.is_group || item.participants.length <= 1) {
    const person = item.participants[0];
    return (
      <PersonAvatar
        name={person?.name ?? item.title}
        avatar_url={person?.avatar_url}
        size={52}
      />
    );
  }

  const first = item.participants[0];
  const second = item.participants[1];

  return (
    <View style={styles.groupAvatar}>
      <View style={styles.groupAvatarBack}>
        <PersonAvatar name={second.name} avatar_url={second.avatar_url} size={34} />
      </View>
      <View style={styles.groupAvatarFront}>
        <PersonAvatar name={first.name} avatar_url={first.avatar_url} size={34} />
      </View>
    </View>
  );
}

export function ConversationListItem({
  item,
  onPress,
  onCameraPress,
}: ConversationListItemProps) {
  const theme = useTheme();

  return (
    <Pressable onPress={() => onPress?.(item)}>
      <Surface
        elevation={1}
        style={[
          styles.container,
          {
            backgroundColor:
              theme.colors.elevation?.level1 ?? theme.colors.surface,
          },
        ]}
      >
        <ConversationAvatar item={item} />

        <View style={styles.textBlock}>
          <Text
            variant="titleMedium"
            numberOfLines={1}
            style={{ color: theme.colors.onSurface }}
          >
            {item.title}
          </Text>

          <Text
            variant="bodyMedium"
            numberOfLines={1}
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {item.latest_message}
          </Text>
        </View>

        <IconButton
          icon="camera-outline"
          size={22}
          mode="contained-tonal"
          iconColor={theme.colors.primary}
          containerColor={theme.colors.secondaryContainer}
          onPress={(event) => {
            event.stopPropagation();
            onCameraPress?.(item);
          }}
        />
      </Surface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 76,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  groupAvatar: {
    width: 52,
    height: 52,
    position: 'relative',
  },
  groupAvatarBack: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  groupAvatarFront: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
});
