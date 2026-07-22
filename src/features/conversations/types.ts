export type ConversationParticipant = {
  participant_id: string;
  user_id: string;
  name: string;
  avatar_url?: string;
};

export type ConversationItem = {
  conversation_id: string;
  title: string;
  latest_message: string;
  is_group?: boolean;
  participants: ConversationParticipant[];
};

export type Message = {
  message_id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export type UserItem = {
  user_id: string;
  name: string;
  avatar_url?: string;
};
