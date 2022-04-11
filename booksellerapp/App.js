import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import BookScreen from './src/pages/Books';
import CartsScreen from './src/pages/Carts'
import CartIcon from './src/component/CartIcon';
import { BookSellerProvider } from './src/context';
const Stack=createStackNavigator();
export default function App() {
  return (
    <BookSellerProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Book'  component={BookScreen}
options={{
  headerRight:()=><CartIcon/>,
  title:"Book"
}}

        />
        <Stack.Screen name='Carts' component={CartsScreen}
          options={
            { 
              //headerTintColor:"red"
            }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
    </BookSellerProvider>
  );
}

