import { NativeBaseProvider, ScrollView } from 'native-base';
import React, { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { Utility } from '../lib/Utility';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import useCustomHeader from '../lib/components/CustomHeaderComponent';
import { UserProfile } from '../lib/models/UserProfile';
import { useState } from 'react';

const ProfileScreen = ({ route, navigation }: any) => {
    const [userProfile, setUserProfile] = useState<UserProfile>(Utility.GetUserProfile());

    const refreshData = async () => {
        useCustomHeader(navigation.getParent(), `Impostazioni profilo`);
    };
    Utility.OnFocus({ navigation: navigation, onFocusAction: refreshData });

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={[GlobalStyles.container]}>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Nome Tour Leader</Text>
                    <Text style={[styles.text]}>{userProfile.name}</Text>
                </View>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Paese</Text>
                    <Text style={[styles.text]}>{userProfile.surname}</Text>
                </View>
            </ScrollView>
        </NativeBaseProvider>
    )
};

const styles = StyleSheet.create({
    section: {
        paddingBottom: 15
    },
    caption: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 15
    }
});

export default ProfileScreen;