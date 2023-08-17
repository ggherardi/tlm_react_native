import { NativeBaseProvider, VStack } from 'native-base';
import React, { StyleSheet, Text, View } from 'react-native';
import GlobalStyles, { ThemeColors } from '../GlobalStyles';
import { color } from 'native-base/lib/typescript/theme/styled-system';

interface ICustomHeaderComponent {
    title: string;
    subtitle?: string;
}

const CustomHeaderComponent = ({ title, subtitle }: ICustomHeaderComponent) => {
    return (
        <NativeBaseProvider>
            <View>
                {subtitle != undefined && subtitle != "" ? (
                    <VStack>
                        <Text style={[styles.eventName, GlobalStyles.colorWhite]}>{title}</Text>
                        <Text style={[GlobalStyles.colorWhite, { maxWidth: "70%" }]} numberOfLines={1}>{subtitle}</Text>
                    </VStack>
                ) : (
                    <Text style={[styles.eventName, GlobalStyles.colorWhite]}>{title}</Text>
                )}
            </View>
        </NativeBaseProvider>
    )
}

const useCustomHeader = (navigation: any, title: string, subtitle?: string) => {
    navigation.setOptions({
        headerTitle: () => <CustomHeaderComponent title={title} subtitle={subtitle} />,
        backgroundColor: ThemeColors.primary,
        statusBarColor: ThemeColors.primary,
        headerStyle: {
            backgroundColor: ThemeColors.primary
        },
        headerTintColor: ThemeColors.white        
    })
}

const styles = StyleSheet.create({
    eventName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
})

export default useCustomHeader;