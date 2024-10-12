import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Drawer } from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Drawer />
          <Toast />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </QueryClientProvider>
  );
}
