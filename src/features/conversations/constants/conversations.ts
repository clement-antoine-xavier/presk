import { ConversationItem } from '@/features/conversations/types';

export const initialConversations: ConversationItem[] = [
  {
    conversation_id: '1',
    title: 'Alice Kim',
    latest_message: 'Yes, what time?',
    participants: [
      {
        participant_id: 'p1',
        user_id: '1',
        name: 'Alice Kim',
        avatar_url: 'https://api.dicebear.com/10.x/big-smile/png?seed=user-1',
      },
    ],
  },
  {
    conversation_id: '2',
    title: 'Weekend Trip',
    latest_message: 'They look great!',
    is_group: true,
    participants: [
      {
        participant_id: 'p2',
        user_id: '2',
        name: 'Ben Park',
        avatar_url: 'https://api.dicebear.com/10.x/big-smile/png?seed=user-2',
      },
      {
        participant_id: 'p3',
        user_id: '3',
        name: 'Chloe Martin',
        avatar_url: 'https://api.dicebear.com/10.x/big-smile/png?seed=user-3',
      },
    ],
  },
  {
    conversation_id: '3',
    title: 'David Lee',
    latest_message: "Let's continue the conversation tomorrow.",
    participants: [
      {
        participant_id: 'p4',
        user_id: '4',
        name: 'David Lee',
        avatar_url: 'https://api.dicebear.com/10.x/big-smile/png?seed=user-4',
      },
    ],
  },
  {
    conversation_id: '4',
    title: 'Emma Sun',
    latest_message: "I'll send you the details later.",
    participants: [
      {
        participant_id: 'p5',
        user_id: '5',
        name: 'Emma Sun',
        avatar_url: 'https://api.dicebear.com/10.x/big-smile/png?seed=user-5',
      },
    ],
  },
  {
    conversation_id: '5',
    title: 'Frank Wilson',
    latest_message: 'Thanks for your help!',
    participants: [
      {
        participant_id: 'p6',
        user_id: '6',
        name: 'Frank Wilson',
        avatar_url: 'https://api.dicebear.com/10.x/big-smile/png?seed=user-6',
      },
    ],
  },
  {
    conversation_id: '6',
    title: 'Grace Chen',
    latest_message: 'See you at the meeting!',
    participants: [
      {
        participant_id: 'p7',
        user_id: '7',
        name: 'Grace Chen',
        avatar_url: 'https://api.dicebear.com/10.x/big-smile/png?seed=user-7',
      },
    ],
  },
  {
    conversation_id: '7',
    title: 'Henry Adams',
    latest_message: "I'll be there in 10 minutes.",
    participants: [
      {
        participant_id: 'p8',
        user_id: '8',
        name: 'Henry Adams',
        avatar_url: 'https://api.dicebear.com/10.x/big-smile/png?seed=user-8',
      },
    ],
  },
  {
    conversation_id: '8',
    title: 'Isabella Brown',
    latest_message: 'Can you review this document?',
    participants: [
      {
        participant_id: 'p9',
        user_id: '9',
        name: 'Isabella Brown',
        avatar_url: 'https://api.dicebear.com/10.x/big-smile/png?seed=user-9',
      },
    ],
  },
];
