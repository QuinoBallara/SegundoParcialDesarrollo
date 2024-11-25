import React, { useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View, Image, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useElements } from "@/context/elementContext";
import DropdownComponent from "@/components/Dropdown/Dropdown";
import ImageSelection from "@/components/ImagePicker/ImagePicker";
import CameraButton from "@/components/Camera/CameraButton";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

export default function Index() {
  const { elements, getElements, deleteElement } = useElements();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchElements = async () => {
      await getElements();
      setIsLoading(false);
    };

    fetchElements();
  }, []);

  const elementOptions = useMemo(() => [{ label: 'Any', value: '0' }, ...elements.map((element: any) => ({ label: element.name, value: element.id }))], [elements]);
  const [selectedElement, setSelectedElement] = useState('0');
  const filteredElements = useMemo(() => {
    if (selectedElement === '0') return elements;
    return elements.filter((element: any) => element.id.toString() === selectedElement);
  }, [selectedElement, elements]);

  const handleDelete = async (id: string) => {
    await deleteElement(id);
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.content}>
          <DropdownComponent data={elementOptions} handleSelection={setSelectedElement} />
          <FlatList
            data={filteredElements}
            style={{ width: "100%" }}
            keyExtractor={(element) => element.id.toString()}
            renderItem={({ item: element }) => (
              <View style={styles.contentContainer}>
                <GestureHandlerRootView>
                  <Swipeable
                    renderRightActions={() => (
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDelete(element.id)}
                      >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                    )}
                  >
                    <TouchableOpacity
                      key={element.id}
                      onPress={() => router.push({ pathname: "/element/[id]", params: { id: element.id } })}
                      style={styles.container}
                    >
                      <View style={styles.elementCard}>
                        <Text style={styles.elementName}>{element.name}</Text>
                        <Image
                          source={{ uri: element.image || "https://via.placeholder.com/100" }}
                          style={styles.elementImage}
                        />
                      </View>
                    </TouchableOpacity>
                  </Swipeable>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  contentContainer: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
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
  },
  elementCard: {
    alignItems: "center",
  },
  elementName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  elementImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
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