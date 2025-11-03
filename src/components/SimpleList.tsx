import React, { useState } from 'react';
import { ScrollView, RefreshControl, Text, View, StyleSheet } from 'react-native';

const SimpleList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData([...data, `New Item ${data.length + 1}`]);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.content}
    >
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  item: { padding: 16, borderBottomWidth: 1, borderColor: '#ccc' },
});

export default SimpleList;