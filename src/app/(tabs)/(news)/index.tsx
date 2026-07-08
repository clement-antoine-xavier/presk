import { View, Text, StyleSheet } from 'react-native';

export default function News() {
  return (
    <View style={styles.container}>
      <Text>News</Text>
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
