import { NativeBaseProvider, ScrollView } from 'native-base';
import React, { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../lib/GlobalStyles';
import { Utility } from '../lib/Utility';
import { BusinessEvent } from '../lib/models/BusinessEvent';
import { useCustomHeaderWithButtonAsync } from '../lib/components/CustomHeaderComponent';
import { Constants } from '../lib/Constants';
import { useState } from 'react';
import dataContext from '../lib/models/DataContext';

const EventSettingsScreen = ({ route, navigation }: any) => {
    const [event, setEvent] = useState<BusinessEvent>(route.params[0]);

    const refreshData = async () => {
        useCustomHeaderWithButtonAsync(navigation.getParent(), event.name, () => { navigation.navigate(Constants.Navigation.EditEventScreen, { event: event }) }, 'pencil', 'Impostazioni evento');
        let refreshedEvent = Utility.GetEvent(event.id);
        if (refreshedEvent) {
            setEvent(refreshedEvent);
        }
    };

    Utility.OnFocus({ navigation: navigation, onFocusAction: refreshData });
    console.log(event);
    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={[GlobalStyles.container]}>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Nome evento</Text>
                    <Text style={[styles.text]}>{event.name}</Text>
                </View>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Destinazione (città)</Text>
                    <Text style={[styles.text]}>{event.city}</Text>
                </View>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Date evento</Text>
                    <Text style={[styles.text]}>{Utility.FormatDateDDMMYYYY(event.startDate as string)} - {Utility.FormatDateDDMMYYYY(event.endDate as string)}</Text>
                </View>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Descrizione evento</Text>
                    <Text style={[styles.text]}>{event.description}</Text>
                </View>
                <View style={[styles.section]}>
                    <Text style={[styles.caption]}>Fondo cassa</Text>
                    <Text style={[styles.text]}>{event.cashFund ? Number(event.cashFund).toFixed(2) : '0.00'} {event.mainCurrency.symbol}</Text>
                </View>
                {event.needCarRefund && (
                    <View>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Dati relativi al rimborso chilometrico:</Text>
                        <View style={[styles.section]}>
                            <Text style={[styles.caption]}>Località di partenza</Text>
                            <Text style={[styles.text]}>{event.refundStartingCity}</Text>
                        </View>
                        <View style={[styles.section]}>
                            <Text style={[styles.caption]}>Località di partenza</Text>
                            <Text style={[styles.text]}>{event.refundArrivalCity}</Text>
                        </View>
                        <View style={[styles.section]}>
                            <Text style={[styles.caption]}>KM percorsi</Text>
                            <Text style={[styles.text]}>{Number(event.totalTravelledKms).toFixed(2)}</Text>
                        </View>
                        <View style={[styles.section]}>
                            <Text style={[styles.caption]}>Importo rimborso forfetario</Text>
                            <Text style={[styles.text]}>{Number(event.travelRefundForfait).toFixed(2)} {event.mainCurrency.symbol}</Text>
                        </View>
                    </View>
                )}
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