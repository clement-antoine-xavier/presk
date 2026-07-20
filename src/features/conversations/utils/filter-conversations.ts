import { ConversationItem } from '@/features/conversations/types';

export function filterConversations(
  items: ConversationItem[],
  search: string
): ConversationItem[] {
  const query = search.trim().toLowerCase();

  if (!query) {
    return items;
  }

  return items.filter((item) => {
    const participantNames = item.participants.map((p) => p.name).join(' ');

    const haystack = [item.title, item.latest_message, participantNames]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });
}
