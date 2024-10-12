import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Login } from '../pages/login'
import { Welcome } from '../pages/welcome'
import { Home } from '../pages/home'
import { DrawerContent } from "../components/DrawerContent";
import { ForgotPassword } from "../pages/forgotPassword";
import { ChangePassword } from "../pages/changePassword";
import { CreateUser } from "../pages/createUser";
import useAuthStore from "../http/store/useAuth";

const Routes = () => {
    const Stack = createStackNavigator()

    const { isAuthenticated } = useAuthStore()

    return (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            {isAuthenticated &&
                <>
                    <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="ChangePassword" component={ChangePassword} />
                </>
            }
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="CreateUser" component={CreateUser} />
        </Stack.Navigator >
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