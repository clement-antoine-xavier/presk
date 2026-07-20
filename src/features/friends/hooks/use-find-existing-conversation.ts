import { useMemo } from 'react';

import { ConversationItem } from '@/components/friends/types';

export function useFindExistingConversation(
  conversations: ConversationItem[],
  userId: string | undefined
): ConversationItem | undefined {
  return useMemo(
    () =>
      conversations.find((conversation) =>
        !conversation.is_group &&
        conversation.participants.length === 1 &&
        conversation.participants[0]?.user_id === userId
      ),
    [conversations, userId]
  );
}
