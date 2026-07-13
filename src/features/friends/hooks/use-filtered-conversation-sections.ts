import { useMemo } from 'react';

import { ConversationItem } from '@/components/friends/conversation-list-item';

import { filterConversations } from '@/features/friends/utils/filter-conversations';

export function useFilteredConversationSections(
  conversations: ConversationItem[],
  search: string
) {
  return useMemo(() => {
    const filtered = filterConversations(conversations, search);

    if (filtered.length === 0) {
      return [];
    }

    return [
      {
        title: 'Conversations',
        data: filtered.map((item) => ({
          type: 'conversation' as const,
          data: item,
        })),
      },
    ];
  }, [conversations, search]);
}