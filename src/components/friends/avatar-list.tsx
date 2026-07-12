import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

export type FriendAvatarItem = {
  id: string;
  name: string;
  photoUrl?: string;
};

type AvatarListProps = {
  data: FriendAvatarItem[];
  onPressItem?: (item: FriendAvatarItem) => void;
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

export function AvatarList({ data, onPressItem }: AvatarListProps) {
  const theme = useTheme();

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPressItem?.(item)}
          style={styles.item}
          hitSlop={8}
        >
          {item.photoUrl ? (
            <Avatar.Image size={56} source={{ uri: item.photoUrl }} />
          ) : (
            <Avatar.Text
              size={56}
              label={getInitials(item.name)}
              style={{ backgroundColor: theme.colors.primary }}
              color={theme.colors.onPrimary}
            />
          )}

          <Text
            variant="labelMedium"
            numberOfLines={1}
            style={[styles.name, { color: theme.colors.onSurface }]}
          >
            {item.name}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  item: {
    width: 72,
    marginRight: 16,
    alignItems: 'center',
  },
  name: {
    marginTop: 8,
    textAlign: 'center',
  },
});