import { ConversationItem } from '@/components/friends/conversation-list-item';

export const conversations: ConversationItem[] = [
  {
    id: '1',
    title: 'Alice Kim',
    latestMessage: 'Are you free tonight?',
    participants: [{ id: '1', name: 'Alice Kim', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-1` }],
  },
  {
    id: '2',
    title: 'Weekend Trip',
    latestMessage: 'I uploaded the photos from yesterday.',
    isGroup: true,
    participants: [
      { id: '2', name: 'Ben Park', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-2` },
      { id: '3', name: 'Chloe Martin', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-3` },
    ],
  },
  {
    id: '3',
    title: 'David Lee',
    latestMessage: 'Let’s continue the conversation tomorrow.',
    participants: [
      { id: '4', name: 'David Lee', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-4` }
    ],
  },
  {
    id: '4',
    title: 'Emma Sun',
    latestMessage: 'I’ll send you the details later.',
    participants: [{ id: '5', name: 'Emma Sun', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-5` }],
  },
  {
    id: '5',
    title: 'Frank Wilson',
    latestMessage: 'Thanks for your help!',
    participants: [{ id: '6', name: 'Frank Wilson', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-6` }],
  },
  {
    id: '6',
    title: 'Grace Chen',
    latestMessage: 'See you at the meeting!',
    participants: [{ id: '7', name: 'Grace Chen', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-7` }],
  },
  {
    id: '7',
    title: 'Henry Adams',
    latestMessage: 'I’ll be there in 10 minutes.',
    participants: [{ id: '8', name: 'Henry Adams', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-8` }],
  },
  {
    id: '8',
    title: 'Isabella Brown',
    latestMessage: 'Can you review this document?',
    participants: [{ id: '9', name: 'Isabella Brown', avatarUrl: `https://api.dicebear.com/10.x/big-smile/png?seed=user-9` }],
  },
];