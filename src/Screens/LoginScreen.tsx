import { Button, FormControl, Input, NativeBaseProvider, ScrollView } from 'native-base';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import GlobalStyles, { ThemeColors } from '../lib/GlobalStyles';
import { Utility } from '../lib/Utility';
import { UserProfile } from '../lib/models/UserProfile';
import React, { useState, useEffect } from 'react';
import dataContext from '../lib/models/DataContext';
import LoginInputComponent from '../lib/components/LoginInputComponent';
import { Images } from '../assets/Images';
import { Constants } from '../lib/Constants';

const LoginScreen = ({ navigation, route }: any) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(Utility.GetUserProfile());
  const [name, setName] = useState(userProfile.name);
  const [surname, setSurname] = useState(userProfile.surname);
  const [email, setEmail] = useState(userProfile.email);
  const [appHeight, setAppHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    if (userProfile && userProfile.name && userProfile.surname && userProfile.email) {
      Utility.ShowSuccessMessage(`Bentornato, ${userProfile.name}`);
      navigation.navigate(Constants.Navigation.Home);
    }
  }, []);

  const login = () => {
    const profile = new UserProfile();
    profile.name = name ? name.trim() : '';
    profile.surname = surname ? surname.trim() : '';
    profile.email = email ? email.trim() : '';
    dataContext.UserProfile.saveData([profile]);
    Utility.ShowSuccessMessage(`Bentornato, ${profile.name}`);
    navigation.navigate(Constants.Navigation.Home);
  };
    console.log(userProfile);
  return (
    <NativeBaseProvider>
        <View style={[styles.container]} onLayout={(e) => setAppHeight(e.nativeEvent.layout.height)}>
          <Image source={Images.tlm_logo.rnSource} style={[styles.image]} />
          <View>
            <FormControl style={GlobalStyles.mt15} isRequired>
              <LoginInputComponent defaultValue={name} placeholder='nome' onChange={(e: any) => setName(e.nativeEvent.text)} />
            </FormControl>
            <FormControl style={GlobalStyles.mt15} isRequired>
              <LoginInputComponent defaultValue={surname} placeholder='cognome' onChange={(e: any) => setSurname(e.nativeEvent.text)} />
            </FormControl>
            <FormControl style={GlobalStyles.mt15} isRequired>
              <LoginInputComponent defaultValue={email} placeholder='email' onChange={(e: any) => setEmail(e.nativeEvent.text)} keyboardType='email-address' />
            </FormControl>
            <Button style={GlobalStyles.mt25} borderRadius={'full'} backgroundColor={ThemeColors.primary} onPress={() => login()}>ACCEDI</Button>
          </View>
        </View>
    </NativeBaseProvider>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    marginTop: -50,
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
});

export default LoginScreen;