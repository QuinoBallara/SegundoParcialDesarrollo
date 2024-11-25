import { ElementProvider } from "@/context/elementContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ElementProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: 'Planets' }} />
        <Stack.Screen name="element/[id]" options={{ title: 'Planet Details' }} />
        <Stack.Screen name="element/edit/[id]" options={{ title: 'Edit Planet' }} />
      </Stack>
    </ElementProvider>
  )
}
