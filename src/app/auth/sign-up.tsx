import { withTheme } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

function SignUp({ theme }) {
  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme(SignUp);
