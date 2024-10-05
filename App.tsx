import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Drawer } from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
  return (
    <BottomSheetModalProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Drawer />
      </NavigationContainer>
    </BottomSheetModalProvider>
  );
}
