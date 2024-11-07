import { Feather } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Listagem',
            drawerIcon: ({ size, color }) => (
              <Feather name="list" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: 'Sobre',
            drawerIcon: ({ size, color }) => (
              <Feather name="info" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
