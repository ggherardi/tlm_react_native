import React from 'react-native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Constants } from '../lib/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ThemeColors } from '../lib/GlobalStyles';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import AllEventsScreen from './AllEventsScreen';
import NewEventScreen from './NewEventScreen';
import ProfileScreen from './ProfileScreen';
import PlaceholderScreen from './PlaceholderScreen';
import { NavigationFakeButtonComponent } from '../lib/components/NavigationFakeButtonComponent';
import { useEffect } from 'react';
import NavigationHelper from '../lib/NavigationHelper';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation, route }: any) => {
    useEffect(() => {
        NavigationHelper.setHomeBaseNavigation(navigation);
    }, []);

    const commonTabOptions: BottomTabNavigationOptions = {
        lazy: true,
        headerShown: false,
    }    

    // @ts-ignore
    const newEventTabOptions = ({ navigation }) => ({        
        tabBarButton: () => <NavigationFakeButtonComponent icon={'plus'} pressFunction={() => { console.log(navigation.getState()); navigation.getParent().navigate(Constants.Navigation.NewEvent)}} />
    });
    
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({ tabBarIcon: ({ focused, color, size }) => {
                let tabIcon: IconProp = "trash";
                switch (route.name) {
                    case Constants.Navigation.AllEvents:
                        tabIcon = "folder-tree"
                    break;
                    case Constants.Navigation.UserProfile:
                        tabIcon = "user";
                    break;
                }
                return <FontAwesomeIcon icon={tabIcon} color={focused ? ThemeColors.primary : ThemeColors.inactive} />
            },            
            tabBarActiveTintColor: ThemeColors.primary,
            tabBarInactiveTintColor: 'gray',
        })}>
            <Tab.Screen
                name={"Tutti gli eventi"}
                component={AllEventsScreen}
                options={commonTabOptions}></Tab.Screen>
            <Tab.Screen             
                name={Constants.Navigation.NewEvent} 
                component={PlaceholderScreen}
                options={newEventTabOptions}></Tab.Screen>
            <Tab.Screen                
                name={Constants.Navigation.UserProfile}
                component={ProfileScreen}         
                options={commonTabOptions}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default HomeScreen;