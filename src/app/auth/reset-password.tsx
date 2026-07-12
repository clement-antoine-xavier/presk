import { StyleSheet, Text, View } from 'react-native';
import { MD3Theme, withTheme } from 'react-native-paper';

function ResetPassword({ theme }: { theme: MD3Theme }) {
  return (
    <View style={styles.container}>
      <Text>Reset Password</Text>
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

export default withTheme(ResetPassword);
