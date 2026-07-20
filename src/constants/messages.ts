import { Message } from '@/components/friends/types';

export const messages: Message[] = [
  {
    message_id: 'm1',
    conversation_id: '1',
    sender_id: '1',
    content: 'Are you free tonight?',
    created_at: '2026-07-16T18:00:00Z',
  },
  {
    message_id: 'm2',
    conversation_id: '1',
    sender_id: 'me',
    content: 'Yes, what time?',
    created_at: '2026-07-16T18:05:00Z',
  },
  {
    message_id: 'm3',
    conversation_id: '2',
    sender_id: '2',
    content: 'I uploaded the photos from yesterday.',
    created_at: '2026-07-16T17:30:00Z',
  },
  {
    message_id: 'm4',
    conversation_id: '2',
    sender_id: '3',
    content: 'They look great!',
    created_at: '2026-07-16T17:45:00Z',
  },
  {
    message_id: 'm5',
    conversation_id: '3',
    sender_id: '4',
    content: "Let's continue the conversation tomorrow.",
    created_at: '2026-07-16T16:00:00Z',
  },
  {
    message_id: 'm6',
    conversation_id: '4',
    sender_id: '5',
    content: "I'll send you the details later.",
    created_at: '2026-07-16T15:00:00Z',
  },
  {
    message_id: 'm7',
    conversation_id: '5',
    sender_id: '6',
    content: 'Thanks for your help!',
    created_at: '2026-07-16T14:00:00Z',
  },
  {
    message_id: 'm8',
    conversation_id: '6',
    sender_id: '7',
    content: 'See you at the meeting!',
    created_at: '2026-07-16T13:00:00Z',
  },
  {
    message_id: 'm9',
    conversation_id: '7',
    sender_id: '8',
    content: "I'll be there in 10 minutes.",
    created_at: '2026-07-16T12:00:00Z',
  },
  {
    message_id: 'm10',
    conversation_id: '8',
    sender_id: '9',
    content: 'Can you review this document?',
    created_at: '2026-07-16T11:00:00Z',
  },
];
