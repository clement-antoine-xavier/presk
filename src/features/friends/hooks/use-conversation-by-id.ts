import { useMemo } from 'react';

import { ConversationItem } from '@/components/friends/types';

export function useConversationById(
  conversations: ConversationItem[],
  conversationId: string | undefined
): ConversationItem | undefined {
  return useMemo(
    () =>
      conversations.find(
        (conversation) => conversation.conversation_id === conversationId
      ),
    [conversations, conversationId]
  );
}
