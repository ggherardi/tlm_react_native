import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColorScheme } from 'react-native';
import React, { useEffect } from 'react';
import HomeScreen from './src/Screens/HomeScreen';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Constants } from './src/lib/Constants';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons/faBeerMugEmpty'
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar'
import { faArrowDown, faArrowDownLong, faArrowRotateLeft, faCalendarDay, faCalendarWeek, faCamera, faCheck, faCheckCircle, faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faCircleInfo, faCircleNotch, faCog, faExclamation, faExclamationCircle, faFileCirclePlus, faFilePdf, faFloppyDisk, faFolderPlus, faFolderTree, faHourglassEmpty, faHourglassEnd, faHourglassHalf, faHourglassStart, faPaperPlane, faPencil, faPlus, faSave, faSearch, faTable, faTableCells, faTableCellsLarge, faTableColumns, faTableList, faTableTennis, faTimeline, faTrash, faUpload, faUser, faWarning, faX, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import NewEventScreen from './src/Screens/NewEventScreen';
import EventHomeScreen from './src/Screens/EventHomeScreen';
import { ThemeColors } from './src/lib/GlobalStyles';
import ViewPdfScreen from './src/Screens/ViewPdfScreen';
import EditEventScreen from './src/Screens/EditEventScreen';
import SplashScreen from 'react-native-splash-screen';
import AllEventsScreen from './src/Screens/AllEventsScreen';
import NewExpenseReportScreen from './src/Screens/NewExpenseReportScreen';
import FlashMessage from 'react-native-flash-message';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import LoginScreen from './src/Screens/LoginScreen';

library.add(fab, faSquareCheck, faBeerMugEmpty, faCalendar, faCalendarDay, faTrash, faPlus,
  faCalendarWeek, faTable, faTableCells, faTableList, faTableColumns, faTableCellsLarge, faTableTennis,
  faTimeline, faCamera, faUpload, faX, faSearch, faChevronDown, faChevronLeft, faChevronRight, faChevronUp,
  faCheck, faSave, faFloppyDisk, faCog, faPaperPlane, faFilePdf, faUser, faPencil, faFolderPlus, faFolderTree,
  faArrowDown, faArrowDownLong, faFileCirclePlus, faCheckCircle, faXmarkCircle, faCircleInfo, faExclamationCircle,
  faCircle, faCircleNotch, faHourglassStart, faHourglassHalf, faHourglassEmpty, faHourglassEnd, faArrowRotateLeft)

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

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <NavigationContainer theme={TLMTheme}>
        <Stack.Navigator>
          <Stack.Screen name={Constants.Navigation.LoginScreen} component={LoginScreen} options={loginScreenOptions} />
          <Stack.Screen name={Constants.Navigation.Home} component={HomeScreen} options={commonOptions} />
          <Stack.Screen name={Constants.Navigation.AllEvents} component={AllEventsScreen} options={commonOptions} />
          <Stack.Screen name={Constants.Navigation.NewEvent} component={NewEventScreen} options={commonOptions} />
          <Stack.Screen name={Constants.Navigation.EventHome} component={EventHomeScreen} options={commonOptions} />
          <Stack.Screen name={Constants.Navigation.ViewPdf} component={ViewPdfScreen} options={commonOptions} />
          <Stack.Screen name={Constants.Navigation.EditEventScreen} component={EditEventScreen} options={commonOptions} />
          <Stack.Screen name={Constants.Navigation.NewExpenseReport} component={NewExpenseReportScreen} options={commonOptions} />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position='top' />
    </>
  );
}

const loginScreenOptions = {
  headerShown: false,
  statusBarColor: ThemeColors.white
}

const commonOptions = {
  headerStyle: {
    backgroundColor: ThemeColors.primary
  },
  backgroundColor: ThemeColors.primary,
  statusBarColor: ThemeColors.primary,
  headerTintColor: ThemeColors.white
}

export default App;
