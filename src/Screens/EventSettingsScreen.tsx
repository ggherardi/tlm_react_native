import { NativeBaseProvider, ScrollView } from 'native-base';
import React, { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { Utility } from '../lib/Utility';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { GetCurrency } from '../lib/data/Currencies';
import useCustomHeader from '../lib/components/CustomHeaderComponent';

const EventSettingsScreen = ({ route, navigation }: any) => {
    const event: BusinessEvent = route.params[0];    

    const refreshData = async () => {
        useCustomHeader(navigation.getParent(), event.name, "Impostazioni evento");
    };
    Utility.OnFocus({ navigation: navigation, onFocusAction: refreshData });

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={[GlobalStyles.container]}>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Nome evento</Text>
                    <Text style={[styles.text]}>{event.name}</Text>
                </View>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Paese</Text>
                    <Text style={[styles.text]}>{event.country?.name}</Text>
                </View>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Descrizione evento</Text>
                    <Text style={[styles.text]}>{event.description}</Text>
                </View>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Date evento</Text>
                    <Text style={[styles.text]}>{Utility.FormatDateDDMMYYYY(event.startDate as string)} - {Utility.FormatDateDDMMYYYY(event.endDate as string)}</Text>
                </View>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Valuta principale</Text>
                    <Text style={[styles.text]}>{event.mainCurrency?.name} ({event.mainCurrency?.symbol})</Text>
                </View>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Valute aggiuntive</Text>
                    {event.currencies && event.currencies.length && event.currencies.map(currency => (
                        <Text style={[styles.text]} key={`currency_${currency?.code}`}>{currency?.name} ({currency?.symbol})</Text>
                    ))}                    
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

export default EventSettingsScreen;