import { Avatar, useTheme } from 'react-native-paper';

import { UserItem } from '@/features/conversations/types';

type PersonAvatarProps = {
  name: string;
  avatar_url?: string;
  size: number;
};

export type UserAvatarProps = {
  user: UserItem;
  size: number;
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

export function PersonAvatar({ name, avatar_url, size }: PersonAvatarProps) {
  const theme = useTheme();

  if (avatar_url) {
    return <Avatar.Image size={size} source={{ uri: avatar_url }} />;
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

export function UserAvatar({ user, size }: UserAvatarProps) {
  return (
    <PersonAvatar name={user.name} avatar_url={user.avatar_url} size={size} />
  );
}
