import { Pressable, StyleSheet } from 'react-native';
import { Checkbox, MD3Theme, Surface, Text, withTheme } from 'react-native-paper';

import { UserAvatar } from './person-avatar';
import { UserItem } from './types';

type UserListItemProps = {
  user: UserItem;
  selected: boolean;
  onPress: (user: UserItem) => void;
  theme: MD3Theme;
};

function UserListItem({
  user,
  selected,
  onPress,
  theme,
}: UserListItemProps) {
  return (
    <Pressable onPress={() => onPress(user)}>
      <Surface
        elevation={1}
        style={[
          styles.container,
          {
            backgroundColor: selected
              ? theme.colors.primaryContainer
              : (theme.colors.elevation?.level1 ?? theme.colors.surface),
          },
        ]}
      >
        <UserAvatar user={user} size={48} />

        <Text
          variant="titleMedium"
          numberOfLines={1}
          style={[
            styles.name,
            { color: selected ? theme.colors.onPrimaryContainer : theme.colors.onSurface },
          ]}
        >
          {user.name}
        </Text>

        <Checkbox
          status={selected ? 'checked' : 'unchecked'}
          color={theme.colors.primary}
          uncheckedColor={theme.colors.outline}
        />
      </Surface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
  },
  name: {
    flex: 1,
  },
});

export default withTheme(UserListItem);
