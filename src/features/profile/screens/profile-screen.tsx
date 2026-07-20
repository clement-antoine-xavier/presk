import { StyleSheet, Text, View } from 'react-native';
import { MD3Theme, withTheme } from 'react-native-paper';

function ProfileScreen({ theme }: { theme: MD3Theme }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.onSurface }}>Profile</Text>
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

export default withTheme(ProfileScreen);
