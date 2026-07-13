import { ConversationItem } from '@/components/friends/conversation-list-item';

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

    const haystack = [
      item.title,
      item.latestMessage,
      participantNames,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });
}