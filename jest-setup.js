process.env.EXPO_PUBLIC_SUPABASE_URL = 'http://localhost:54321';
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

global.IS_REACT_ACT_ENVIRONMENT = true;

const mockedAuth = {
  getSession: jest.fn(),
  onAuthStateChange: jest.fn(() => ({
    data: { subscription: { unsubscribe: jest.fn() } },
  })),
  signInWithPassword: jest.fn(),
  signUp: jest.fn(),
  signOut: jest.fn(),
  resetPasswordForEmail: jest.fn(),
  updateUser: jest.fn(),
  exchangeCodeForSession: jest.fn(),
};

jest.mock('@/services/supabase', () => ({
  supabase: { auth: mockedAuth },
}));

jest.mock('react-native-paper', () => {
  const React = require('react');
  const { View, Text, TextInput, Pressable } = require('react-native');

  const SimplePressable = React.forwardRef(function SimplePressable({ children, onPress, testID, ...props }, ref) {
    return React.createElement(View, { ref, testID, accessibilityRole: 'button', ...props, onResponderRelease: onPress }, children);
  });

  const Button = React.forwardRef(function Button({ children, onPress, testID, loading, disabled, ...props }, ref) {
    return React.createElement(
      SimplePressable,
      { ref, onPress, testID, accessibilityRole: 'button', accessibilityState: { busy: loading }, disabled: loading || disabled, ...props },
      loading ? React.createElement(Text, { testID: `${testID}-loading` }, 'Loading') : null,
      React.createElement(Text, null, children)
    );
  });

  function HelperText({ children, testID, type }) {
    return React.createElement(Text, { testID, accessibilityLabel: type }, children);
  }

  const PaperTextInput = React.forwardRef(function PaperTextInput(props, ref) {
    const { label, onChangeText, onBlur, value, secureTextEntry: _secureTextEntry, ...rest } = props;
    React.useImperativeHandle(ref, () => ({}));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { testID, ...inputProps } = rest;
    return React.createElement(
      View,
      { testID: props.testID, onChangeText, onBlur, ...inputProps },
      [
        label ? React.createElement(Text, { key: 'label', testID: `${props.testID}-label` }, label) : null,
        React.createElement(Text, { key: 'value', testID: `${props.testID}-value` }, value ?? ''),
      ]
    );
  });

  function withTheme(Component) {
    return function ThemedComponent(props) {
      return React.createElement(Component, {
        ...props,
        theme: { colors: { onSurface: '#000', onSurfaceVariant: '#666', primary: '#000' } },
      });
    };
  }

  return {
    __esModule: true,
    Button,
    HelperText,
    Text: React.forwardRef(function PaperText({ children, ...props }, ref) {
      return React.createElement(Text, { ref, ...props }, children);
    }),
    TextInput: PaperTextInput,
    withTheme,
    MD3Theme: {},
    MD3LightTheme: { colors: { primary: '#fff' }, dark: false },
    MD3DarkTheme: { colors: { primary: '#000' }, dark: true },
    adaptNavigationTheme: ({ reactNavigationLight, reactNavigationDark }) => ({
      LightTheme: reactNavigationLight,
      DarkTheme: reactNavigationDark,
    }),
  };
});

jest.mock('expo-router', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
    }),
    useLocalSearchParams: () => ({}),
    Redirect: function Redirect({ href }) {
      return React.createElement(Text, { testID: `redirect-${href}` }, href);
    },
    Link: ({ children }) => children,
  };
});
