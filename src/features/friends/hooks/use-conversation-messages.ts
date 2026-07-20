import { useMemo } from 'react';

import { Message } from '@/components/friends/types';

export function useConversationMessages(
  messages: Message[],
  conversationId: string
): Message[] {
  return useMemo(
    () =>
      messages
        .filter((message) => message.conversation_id === conversationId)
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ),
    [messages, conversationId]
  );
}
