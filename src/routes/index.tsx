import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Login } from '../pages/login'
import { Welcome } from '../pages/welcome'
import { Home } from '../pages/home'
import { DrawerContent } from "../components/DrawerContent";

const Routes = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

const Drawer = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Routes" component={Routes} />
        </Drawer.Navigator>
    );
}

export { Drawer }