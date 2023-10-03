import React from 'react';
import { Linking } from 'react-native';

export const LinkHelper = {
  OpenWhatsapp: () => {
    Linking.openURL(`whatsapp://send`);
  },
}