import * as React from 'react';
import {DashboardView} from "./Views/DashboardView";
import {SettingsView} from "./Views/SettingsView";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Dashboard"
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen name="Dashboard" component={DashboardView}/>
                <Stack.Screen name="Settings" component={SettingsView}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
