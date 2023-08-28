import React, { Pressable } from 'react-native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Constants } from '../lib/Constants';
import EventScreen from './EventScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import NewExpenseReportScreen from './NewExpenseReportScreen';
import { ThemeColors } from '../lib/GlobalStyles';
import EventHistoryScreen from './EventHistoryScreen';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import EventSettingsScreen from './EventSettingsScreen';

const Tab = createBottomTabNavigator();

const EventHomeScreen = ({ navigation, route }: any) => {   
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let tabIcon: IconProp = "trash";
                switch (route.name) {
                    case Constants.Navigation.Event:
                        tabIcon = "table-list"
                    break;
                    case Constants.Navigation.NewExpenseReport:
                        tabIcon = "plus";
                    break;
                    case Constants.Navigation.EventSettingsScreen:
                        tabIcon = "cog";
                    break;
                }
                return <FontAwesomeIcon icon={tabIcon} color={focused ? ThemeColors.primary : ThemeColors.inactive} />
            },            
            tabBarActiveTintColor: ThemeColors.primary,
            tabBarInactiveTintColor: 'gray',
        })}>
            <Tab.Screen
                name={"Nota spese"}
                component={EventScreen}
                initialParams={[route.params.event]}
                options={commonTabOptions}></Tab.Screen>
            <Tab.Screen 
                name={Constants.Navigation.NewExpenseReport} 
                component={NewExpenseReportScreen}
                initialParams={[route.params.event]}
                options={commonTabOptions}></Tab.Screen>
            <Tab.Screen
                name={Constants.Navigation.EventSettingsScreen}
                component={EventSettingsScreen}         
                initialParams={[route.params.event]}       
                options={commonTabOptions}></Tab.Screen>
        </Tab.Navigator>
    )
}

const commonTabOptions: BottomTabNavigationOptions = {
    lazy: true,
    headerShown: false,    
}

export default EventHomeScreen;