import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Animated, { FadeIn } from 'react-native-reanimated';

const ROWS = Array.from({ length: 30 }, (_, index) => `Row ${index + 1}`);

// Every row fades in when it mounts. With Reduce Motion on, the entering
// animation should be skipped and the row should simply be visible.
const Row = ({ label }: { label: string }) => (
  <Animated.View entering={FadeIn} style={styles.row}>
    <Text style={styles.label}>{label}</Text>
  </Animated.View>
);

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>FlashList rows with entering=FadeIn</Text>
      <FlashList data={ROWS} keyExtractor={item => item} renderItem={({ item }) => <Row label={item} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 48, backgroundColor: 'white' },
  title: { fontSize: 16, fontWeight: '600', padding: 12 },
  row: { height: 72, justifyContent: 'center', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#ddd', backgroundColor: '#e8f1ff' },
  label: { fontSize: 18 },
});
