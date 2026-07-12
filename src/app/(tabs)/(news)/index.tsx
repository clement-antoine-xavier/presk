import { withTheme } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

function News({ theme }) {
  return (
    <View style={styles.container}>
      <Text>News</Text>
      <Text>Important news</Text>
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

export default withTheme(News);
