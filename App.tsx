/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Text, useColorScheme } from 'react-native';
import React from 'react';
import Home from './src/Home';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Constants } from './src/lib/Constants';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons/faBeerMugEmpty'
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import NewEvent from './src/NewEvent';
import { ThemeColors } from './src/lib/GlobalStyles';

library.add(fab, faSquareCheck, faBeerMugEmpty, faCalendar, faCalendarDay)

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const TLMTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff'
    },
  };

  return (
    <NavigationContainer theme={TLMTheme}>
      <Stack.Navigator>
        <Stack.Screen name={Constants.Navigation.Home} component={Home} />
        <Stack.Screen name={Constants.Navigation.NewEvent} component={NewEvent} options={{ title: 'Crea nuovo evento', headerTintColor: ThemeColors.primary }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;