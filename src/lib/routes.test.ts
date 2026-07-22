import { routes } from './routes';

describe('routes', () => {
  it('exports static auth routes', () => {
    expect(routes.signIn).toBe('/(auth)/sign-in');
    expect(routes.signUp).toBe('/(auth)/sign-up');
    expect(routes.resetPassword).toBe('/(auth)/reset-password');
  });

  it('exports static conversation routes', () => {
    expect(routes.conversations).toBe('/(app)/(tabs)/conversations');
    expect(routes.newConversation).toBe('/(app)/(tabs)/conversations/new-conversation');
  });

  it('exports static tab routes', () => {
    expect(routes.news).toBe('/(app)/(tabs)/(news)');
    expect(routes.discover).toBe('/(app)/(tabs)/discover');
    expect(routes.communities).toBe('/(app)/(tabs)/communities');
    expect(routes.profile).toBe('/(app)/(tabs)/profile');
  });

  it('exports static modal routes', () => {
    expect(routes.editProfile).toBe('/(modals)/edit-profile');
  });

  it('builds dynamic conversation route with id', () => {
    expect(routes.conversation('abc-123')).toBe(
      '/(app)/(tabs)/conversations/conversation?id=abc-123'
    );
  });

  it('builds dynamic conversation settings route with id', () => {
    expect(routes.conversationSettings('xyz-789')).toBe(
      '/(app)/(tabs)/conversations/conversation-settings?id=xyz-789'
    );
  });
});
