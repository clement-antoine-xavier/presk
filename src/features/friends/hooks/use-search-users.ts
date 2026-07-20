import { useMemo } from 'react';

import { UserItem } from '@/components/friends/types';

import { filterUsers } from '@/features/friends/utils/filter-users';

export function useSearchUsers(
  users: UserItem[],
  search: string,
  excludedUserIds?: string[]
): UserItem[] {
  return useMemo(
    () => filterUsers(users, search, excludedUserIds),
    [users, search, excludedUserIds]
  );
}
