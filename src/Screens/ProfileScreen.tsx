import { FormControl, Input, NativeBaseProvider, ScrollView } from 'native-base';
import React, { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { Utility } from '../lib/Utility';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import useCustomHeader, { useCustomHeaderSaveButton } from '../lib/components/CustomHeaderComponent';
import { UserProfile } from '../lib/models/UserProfile';
import { useEffect, useState } from 'react';
import dataContext from '../lib/models/DataContext';

const ProfileScreen = ({ route, navigation }: any) => {
    const [userProfile, setUserProfile] = useState<UserProfile>(Utility.GetUserProfile());
    const [name, setName] = useState(userProfile.name);
    const [surname, setSurname] = useState(userProfile.surname);
    const [email, setEmail] = useState(userProfile.email);

    const save = () => {
        const profile = new UserProfile();
        profile.name = name.trim();
        profile.surname = surname.trim();
        profile.email = email.trim();
        dataContext.UserProfile.saveData([profile]);
    };

    useEffect(() => {
        useCustomHeaderSaveButton(navigation, `Profilo Tour Leader`, () => save());
    });

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={[GlobalStyles.container]}>
                <FormControl style={GlobalStyles.mt15} isRequired>
                    <FormControl.Label>Nome</FormControl.Label>
                    <Input defaultValue={name} placeholder="es. Mario" onChange={(e: any) => setName(e.nativeEvent.text)}></Input>
                </FormControl>
                <FormControl style={GlobalStyles.mt15} isRequired>
                    <FormControl.Label>Cognome</FormControl.Label>
                    <Input defaultValue={surname} placeholder="es. Rossi" onChange={(e: any) => setSurname(e.nativeEvent.text)}></Input>
                </FormControl>
                <FormControl style={GlobalStyles.mt15} isRequired>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input defaultValue={email} placeholder="es. tl@gmail.com" onChange={(e: any) => setEmail(e.nativeEvent.text)}></Input>
                </FormControl>
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