import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { LoginScreen } from './src/screens/AutheticationScreen';
import { MapScreen } from './src/screens/MapScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';


export type RootStackParamList = {
    LoginScreen: undefined;
    MapScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
    // <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen" 
            screenOptions={{headerShown: false, stackPresentation: "transparentModal"}}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="MapScreen" component={MapScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    // </SafeAreaView>
    );
};

export default App;




