import { UserItem } from '@/features/conversations/types';

export function filterUsers(
  items: UserItem[],
  search: string,
  excludedUserIds?: string[]
): UserItem[] {
  const query = search.trim().toLowerCase();
  const excluded = new Set(excludedUserIds ?? []);

  return items.filter((item) => {
    if (excluded.has(item.user_id)) {
      return false;
    }

    if (!query) {
      return true;
    }

    return item.name.toLowerCase().includes(query);
  });
}
