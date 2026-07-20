import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { UserAvatar } from './person-avatar';
import { UserItem } from '@/features/conversations/types';

type AvatarListProps = {
  data: UserItem[];
  onPressItem?: (item: UserItem) => void;
};

export function AvatarList({ data, onPressItem }: AvatarListProps) {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.user_id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPressItem?.(item)}
          style={styles.item}
          hitSlop={8}
        >
          <UserAvatar user={item} size={56} />

          <Text
            variant="labelMedium"
            numberOfLines={1}
            style={styles.name}
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
