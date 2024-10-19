import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Drawer } from './src/routes';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';

export const navigationRef = createNavigationContainerRef();
export default function App() {
  const queryClient = new QueryClient();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BottomSheetModalProvider>
        <NavigationContainer ref={navigationRef}>
          <StatusBar style="light" />
          <Drawer />
          <Toast />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </QueryClientProvider>
  );
}
