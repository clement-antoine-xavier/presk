import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Surface, Text, useTheme } from 'react-native-paper';

export type ConversationParticipant = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type ConversationItem = {
  id: string;
  title: string;
  latestMessage: string;
  isGroup?: boolean;
  participants: ConversationParticipant[];
};

type ConversationListItemProps = {
  item: ConversationItem;
  onPress?: (item: ConversationItem) => void;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function PersonAvatar({
  name,
  avatarUrl,
  size,
}: {
  name: string;
  avatarUrl?: string;
  size: number;
}) {
  const theme = useTheme();

  if (avatarUrl) {
    return <Avatar.Image size={size} source={{ uri: avatarUrl }} />;
  }

  return (
    <Avatar.Text
      size={size}
      label={getInitials(name)}
      style={{ backgroundColor: theme.colors.primary }}
      color={theme.colors.onPrimary}
    />
  );
}

function ConversationAvatar({ item }: { item: ConversationItem }) {
  if (!item.isGroup || item.participants.length <= 1) {
    const person = item.participants[0];
    return (
      <PersonAvatar
        name={person?.name ?? item.title}
        avatarUrl={person?.avatarUrl}
        size={52}
      />
    );
  }

  const first = item.participants[0];
  const second = item.participants[1];

  return (
    <View style={styles.groupAvatar}>
      <View style={styles.groupAvatarBack}>
        <PersonAvatar name={second.name} avatarUrl={second.avatarUrl} size={34} />
      </View>
      <View style={styles.groupAvatarFront}>
        <PersonAvatar name={first.name} avatarUrl={first.avatarUrl} size={34} />
      </View>
    </View>
  );
}

export function ConversationListItem({
  item,
  onPress,
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
            {item.latestMessage}
          </Text>
        </View>
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