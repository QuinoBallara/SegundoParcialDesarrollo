import React, { useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View, Image, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { useElements } from "@/context/elementContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Star from "@/components/Star/Star";
import Tag from "@/components/Tag/Tag";

export default function Index() {
  const { elements, getElements, deleteElement, toggleFavourite } = useElements();
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();

  const filteredElements = useMemo(() => {
    return elements
      .slice()
      .sort((a: any, b: any) => {
        if (a.favourite && !b.favourite) return -1;
        if (!a.favourite && b.favourite) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [elements]);

  useEffect(() => {
    const fetchElements = async () => {
      await getElements();
      setIsLoading(false);
    };

    fetchElements();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }



  return (
    <GestureHandlerRootView style={{ flex: 1, marginTop: '10%', width: width }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={filteredElements}
            style={{ width: "100%" }}
            keyExtractor={(element) => element.id.toString()}
            renderItem={({ item: element }) => (
              <View style={styles.contentContainer}>
                <GestureHandlerRootView>
                  <View style={styles.star}>
                    <TouchableOpacity key={element.id} onPress={() => { toggleFavourite(element.id); }}>
                      <Star favourite={element.favourite} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    key={element.id}
                    onPress={() => router.push({ pathname: "/element/[id]", params: { id: element.id } })}
                    style={styles.container}
                  >
                    <View style={styles.headerCard}>
                      <Text style={styles.elementName}>{element.name}</Text>
                      <View style={styles.detsCard}>
                        <Tag difficulty={element.difficulty} />
                      </View>
                    </View>
                    <Text style={styles.elementDescription}>{element.description}</Text>

                  </TouchableOpacity>
                </GestureHandlerRootView>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  detsCard: {

    flexDirection: 'column'
  },
  star: {
    position: 'absolute',
    right: 30,
    top: 24,
    zIndex: 1
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    minWidth: '70%',
    maxWidth: '70%',
  },
  elementName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  elementDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
