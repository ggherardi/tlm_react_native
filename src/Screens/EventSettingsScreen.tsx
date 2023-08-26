import { NativeBaseProvider, ScrollView } from 'native-base';
import React, { Text, View } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { Utility } from '../lib/Utility';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { GetCurrency } from '../lib/data/Currencies';

const EventSettingsScreen = ({ route, navigation }: any) => {
    const event: BusinessEvent = route.params[0];    
    console.log(event);
    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={[GlobalStyles.container]}>
                <View>
                    <Text>Nome evento</Text>
                    <Text>{event.name}</Text>
                </View>
                <View>
                    <Text>Descrizione evento</Text>
                    <Text>{event.description}</Text>
                </View>
                <View>
                    <Text>Date evento</Text>
                    <Text>{Utility.FormatDateDDMMYYYY(event.startDate as string)} - {Utility.FormatDateDDMMYYYY(event.endDate as string)}</Text>
                </View>
                <View>
                    <Text>Valuta principale</Text>
                    {/* <Text>{event.}</Text> */}
                </View>
            </ScrollView>
        </NativeBaseProvider>
    )
};

export default EventSettingsScreen;