import { filterConversations } from './filter-conversations';
import { ConversationItem } from '@/features/conversations/types';

function createConversation(overrides: Partial<ConversationItem> = {}): ConversationItem {
  return {
    conversation_id: 'c1',
    title: 'Project Team',
    latest_message: 'See you tomorrow',
    participants: [
      { participant_id: 'p1', user_id: 'u1', name: 'Alice' },
      { participant_id: 'p2', user_id: 'u2', name: 'Bob' },
    ],
    ...overrides,
  };
}

describe('filterConversations', () => {
  it('returns all items when search query is empty', () => {
    const items = [createConversation(), createConversation({ conversation_id: 'c2' })];

    expect(filterConversations(items, '')).toEqual(items);
  });

  it('matches conversation title case-insensitively', () => {
    const item = createConversation({ title: 'Weekend Plans' });

    expect(filterConversations([item], 'weekend')).toEqual([item]);
    expect(filterConversations([item], 'WEEKEND')).toEqual([item]);
  });

  it('matches latest message case-insensitively', () => {
    const item = createConversation({ latest_message: 'Please review the document' });

    expect(filterConversations([item], 'document')).toEqual([item]);
    expect(filterConversations([item], 'DOCUMENT')).toEqual([item]);
  });

  it('matches participant names case-insensitively', () => {
    const item = createConversation({
      participants: [
        { participant_id: 'p1', user_id: 'u1', name: 'Charlie' },
        { participant_id: 'p2', user_id: 'u2', name: 'Diana' },
      ],
    });

    expect(filterConversations([item], 'charlie')).toEqual([item]);
    expect(filterConversations([item], 'DIANA')).toEqual([item]);
  });

  it('trims whitespace from search query', () => {
    const item = createConversation({ title: 'Design Sync' });

    expect(filterConversations([item], '  design  ')).toEqual([item]);
  });

  it('returns an empty array when nothing matches', () => {
    const item = createConversation({ title: 'Only Title' });

    expect(filterConversations([item], 'nonexistent')).toEqual([]);
  });

  it('includes item when query matches any searchable field', () => {
    const byTitle = createConversation({ conversation_id: 'c-title', title: 'Release Notes' });
    const byMessage = createConversation({
      conversation_id: 'c-message',
      title: 'Unrelated',
      latest_message: 'Release is live',
    });
    const byParticipant = createConversation({
      conversation_id: 'c-participant',
      title: 'Unrelated',
      latest_message: 'Unrelated',
      participants: [{ participant_id: 'p1', user_id: 'u1', name: 'Release Manager' }],
    });

    expect(filterConversations([byTitle, byMessage, byParticipant], 'release')).toEqual([
      byTitle,
      byMessage,
      byParticipant,
    ]);
  });

  it('supports partial word matching', () => {
    const item = createConversation({ latest_message: 'The quick brown fox' });

    expect(filterConversations([item], 'quick')).toEqual([item]);
    expect(filterConversations([item], 'bro')).toEqual([item]);
  });

  it('ignores items with falsy searchable fields except participant names', () => {
    const item = createConversation({
      conversation_id: 'c-empty',
      title: '',
      latest_message: '',
      participants: [{ participant_id: 'p1', user_id: 'u1', name: 'Eve' }],
    });

    expect(filterConversations([item], 'eve')).toEqual([item]);
    expect(filterConversations([item], 'empty')).toEqual([]);
  });
});
