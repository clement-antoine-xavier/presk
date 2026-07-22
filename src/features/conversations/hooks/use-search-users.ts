import { useMemo } from 'react';

import { UserItem } from '@/features/conversations/types';

import { filterUsers } from '@/features/conversations/utils/filter-users';

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
