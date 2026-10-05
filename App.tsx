import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const ROWS = Array.from({ length: 10 }, (_, index) => `Row ${index + 1}`);
const ROW_HEIGHT = 72;

// Mimics what a recycling list does: rows mount stacked at the top, then are
// moved to their real positions in a layout effect, before the first paint.
// Every row fades in when it mounts.
export default function App() {
  const [positioned, setPositioned] = useState(false);

  useLayoutEffect(() => {
    setPositioned(true);
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>entering=FadeIn, cells positioned in a layout effect</Text>
      <View style={styles.list}>
        {ROWS.map((label, index) => (
          <View key={label} style={[styles.cell, { top: positioned ? index * ROW_HEIGHT : 0 }]}>
            <Animated.View entering={FadeIn} style={styles.row}>
              <Text style={styles.label}>{label}</Text>
            </Animated.View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 48, backgroundColor: 'white' },
  title: { fontSize: 16, fontWeight: '600', padding: 12 },
  list: { flex: 1 },
  cell: { position: 'absolute', left: 0, right: 0, height: ROW_HEIGHT },
  row: { height: ROW_HEIGHT, justifyContent: 'center', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#ddd', backgroundColor: '#e8f1ff' },
  label: { fontSize: 18 },
});
