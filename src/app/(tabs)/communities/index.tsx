import { View, Text, StyleSheet } from 'react-native';

export default function Communities() {
  return (
    <View style={styles.container}>
      <Text>Communities</Text>
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
