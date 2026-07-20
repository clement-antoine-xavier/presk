import { useCallback, useMemo, useState } from 'react';

import {
  ConversationItem,
  ConversationParticipant,
  Message,
  UserItem,
} from '@/features/conversations/types';
import { initialConversations } from '@/features/conversations/constants/conversations';
import { initialMessages } from '@/features/conversations/constants/messages';

const CURRENT_USER_ID = 'me';

type ConversationsState = {
  conversations: ConversationItem[];
  messages: Message[];
};

export type ConversationsStore = ConversationsState & {
  sendMessage: (conversationId: string, content: string) => void;
  createConversation: (
    participants: ConversationParticipant[],
    title?: string
  ) => ConversationItem;
  updateConversationTitle: (conversationId: string, title: string) => void;
  removeParticipant: (conversationId: string, participantId: string) => void;
};

let globalState: ConversationsState = {
  conversations: [...initialConversations],
  messages: [...initialMessages],
};
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function setConversations(
  updater: (previous: ConversationItem[]) => ConversationItem[]
) {
  globalState = { ...globalState, conversations: updater(globalState.conversations) };
  notify();
}

function setMessages(updater: (previous: Message[]) => Message[]) {
  globalState = { ...globalState, messages: updater(globalState.messages) };
  notify();
}

export function useConversationsStore(): ConversationsStore {
  const [, forceRender] = useState(0);

  const subscribe = useCallback(() => {
    const listener = () => forceRender((previous) => previous + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useMemo(() => {
    subscribe();
  }, [subscribe]);

  const sendMessage = useCallback((conversationId: string, content: string) => {
    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }

    const newMessage: Message = {
      message_id: `m-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: CURRENT_USER_ID,
      content: trimmed,
      created_at: new Date().toISOString(),
    };

    setMessages((previous) => [...previous, newMessage]);
    setConversations((previous) =>
      previous.map((item) =>
        item.conversation_id === conversationId
          ? { ...item, latest_message: trimmed }
          : item
      )
    );
  }, []);

  const createConversation = useCallback(
    (participants: ConversationParticipant[], title?: string) => {
      const isGroup = participants.length > 1;
      const conversationTitle =
        title?.trim() ||
        (isGroup ? 'Group conversation' : participants[0]?.name ?? 'Conversation');

      const newConversation: ConversationItem = {
        conversation_id: `c-${Date.now()}`,
        title: conversationTitle,
        latest_message: '',
        is_group: isGroup,
        participants,
      };

      setConversations((previous) => [newConversation, ...previous]);
      return newConversation;
    },
    []
  );

  const updateConversationTitle = useCallback(
    (conversationId: string, title: string) => {
      const trimmed = title.trim();
      if (!trimmed) {
        return;
      }

      setConversations((previous) =>
        previous.map((item) =>
          item.conversation_id === conversationId
            ? { ...item, title: trimmed }
            : item
        )
      );
    },
    []
  );

  const removeParticipant = useCallback(
    (conversationId: string, participantId: string) => {
      setConversations((previous) =>
        previous.map((item) =>
          item.conversation_id === conversationId
            ? {
                ...item,
                participants: item.participants.filter(
                  (participant) => participant.participant_id !== participantId
                ),
              }
            : item
        )
      );
    },
    []
  );

  return {
    conversations: globalState.conversations,
    messages: globalState.messages,
    sendMessage,
    createConversation,
    updateConversationTitle,
    removeParticipant,
  };
}

export function createParticipantsFromUsers(
  selectedUsers: UserItem[]
): ConversationParticipant[] {
  return selectedUsers.map((user, index) => ({
    participant_id: `p-${Date.now()}-${index}`,
    user_id: user.user_id,
    name: user.name,
    avatar_url: user.avatar_url,
  }));
}
