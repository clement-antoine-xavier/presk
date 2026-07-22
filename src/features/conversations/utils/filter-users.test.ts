import { filterUsers } from './filter-users';
import { UserItem } from '@/features/conversations/types';

function createUser(overrides: Partial<UserItem> = {}): UserItem {
  return {
    user_id: 'u1',
    name: 'Alice',
    ...overrides,
  };
}

describe('filterUsers', () => {
  it('returns all items when search query is empty and no exclusions are provided', () => {
    const items = [createUser(), createUser({ user_id: 'u2', name: 'Bob' })];

    expect(filterUsers(items, '')).toEqual(items);
  });

  it('matches user name case-insensitively', () => {
    const item = createUser({ name: 'Charlie' });

    expect(filterUsers([item], 'charlie')).toEqual([item]);
    expect(filterUsers([item], 'CHARLIE')).toEqual([item]);
  });

  it('trims whitespace from search query', () => {
    const item = createUser({ name: 'Diana' });

    expect(filterUsers([item], '  diana  ')).toEqual([item]);
  });

  it('excludes users by id', () => {
    const alice = createUser({ user_id: 'u1', name: 'Alice' });
    const bob = createUser({ user_id: 'u2', name: 'Bob' });

    expect(filterUsers([alice, bob], '', ['u1'])).toEqual([bob]);
  });

  it('returns an empty array when all users are excluded', () => {
    const alice = createUser({ user_id: 'u1', name: 'Alice' });
    const bob = createUser({ user_id: 'u2', name: 'Bob' });

    expect(filterUsers([alice, bob], '', ['u1', 'u2'])).toEqual([]);
  });

  it('excludes users and filters by search query together', () => {
    const alice = createUser({ user_id: 'u1', name: 'Alice' });
    const bob = createUser({ user_id: 'u2', name: 'Bob' });
    const charlie = createUser({ user_id: 'u3', name: 'Charlie' });

    expect(filterUsers([alice, bob, charlie], 'a', ['u1'])).toEqual([charlie]);
  });

  it('returns an empty array when no name matches', () => {
    const item = createUser({ name: 'Alice' });

    expect(filterUsers([item], 'bob')).toEqual([]);
  });

  it('returns excluded users only when query is empty', () => {
    const alice = createUser({ user_id: 'u1', name: 'Alice' });
    const bob = createUser({ user_id: 'u2', name: 'Bob' });

    expect(filterUsers([alice, bob], '', ['u2'])).toEqual([alice]);
  });

  it('supports partial name matching', () => {
    const item = createUser({ name: 'Alexander' });

    expect(filterUsers([item], 'alex')).toEqual([item]);
    expect(filterUsers([item], 'ander')).toEqual([item]);
  });
});
