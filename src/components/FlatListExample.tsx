import React, { useState, useCallback } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Alert,
  RefreshControl,
  ViewToken,
} from "react-native";

interface ItemData {
  id: string;
  title: string;
}

const DATA: ItemData[] = Array.from({ length: 100 }, (_, i) => ({
  id: i.toString(),
  title: `Item ${i}`,
}));

const FlatListExample = () => {
  const [refreshing, setRefreshing] = useState(false);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    waitForInteraction: true,
  };

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        Alert.alert(
          "Visible",
          `Item ${viewableItems[0].item?.title} is now visible`
        );
      }
    },
    []
  );

  const getItemLayout = (
    data: ArrayLike<ItemData> | null | undefined,
    index: number
  ) => ({
    length: 50,
    offset: 50 * index,
    index,
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <FlatList<ItemData>
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.title}</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      ListHeaderComponent={<Text style={styles.header}>Daftar Item</Text>}
      ListFooterComponent={<Text style={styles.footer}>Akhir Daftar</Text>}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    height: 50,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
  },
  header: { padding: 16, fontWeight: "bold" },
  footer: { padding: 16, textAlign: "center", color: "gray" },
});

export default FlatListExample;
