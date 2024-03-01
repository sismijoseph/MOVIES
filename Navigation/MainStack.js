import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoviesList from '../Screens/MoviesList/MoviesList';
import MovieDetails from '../Screens/MovieDetails/MovieDetails';


const Stack = createNativeStackNavigator();
const screenOptions = {
    headerShown: false,
};

function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={screenOptions}
                initialRouteName='MoviesList'>
                <Stack.Screen name="MoviesList" component={MoviesList} />
                <Stack.Screen name="MovieDetails" component={MovieDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainStack;