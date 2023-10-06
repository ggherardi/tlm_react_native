OK - Data = Data corrente solo data
OK - Gruppo = Nome Evento
OK - Data Evento = dal data inizio evento al data fine evento
OK - Destinazione = Città

OK - Aggiungere alle impostazioni dell'evento:
OK - Spunta per uso auto?
OK - Località di partenza = Località di partenza (in auto)
OK - Località di arrivo = Località di arrivo (in auto)
OK - Km effettuati => Se compilato compare anche il campo:
OK - Importo forfettario rimborso => sarà compilato con con un default di 0.2€ che potrà essere però modificato manualmente

OK - Eliminare il numero dalla griglia (N.)

OK - Modificare il campo "Descrizione" delle spese in "Note" ed aggiungerlo alla griglia finale del pdf

OK - Eliminare orario dalla data della spesa

OK - Aggiungere all'evento il campo Fondo cassa. Se questo campo viene riempito, quando viene effettuato il calcolo dell'ammontare totale, va anche sottratto l'importo del fondo cassa. Questa informazione è utile soprattutto al TL, di conseguenza devono essere meno evidenziati i campi. Aggiungere campo con fondo cassa e sotto il campo con il totale da cui è stato sottratto il fondo cassa. Eventualmente un'altra griglia sotto a quella principale.

OK - Evidenziare bene il totale del rimborso (con un colore o un font più grande o ambedue)

OK - Eliminare la firma

OK - Aggiungere email allo user profile

OK - Aggiungere un modo per inviare le notifiche all'utente ogni giorno per 3 giorni prima della scadenza dell'evento (data fine evento). Eventualmente tramite notifiche dello smartphone ma anche tramite email. Previo consenso.

OK - Feedback invio mail per segnare che la nota spese è stata inviata -> solo su IOS? Gestito con settaggio manuale

OK - Messaggio di successo dopo salvataggio profilo (o redirect back)

OK - Validazione forms

OK - Fix Altezza pdf viewer

OK - Splash page (https://blog.logrocket.com/building-splash-screens-react-native/ guide for IOS)

OK - Pagina iniziale con creazione profilo

OK - Nuove icone (https://aboutreact.com/react-native-change-app-icon/ guide of IOS)

ricerca eventi e spese

modifica spese

istruzioni e informazioni

OK - Gestione permessi

OK - Validazione rimborso chilometrico

OK - Dark theme e modalità notte non si vedono le scritte!

CAMBIARE LE LINEE DA DEBUG A RELEASE IN NOTIFICATIONS!

OK - Riconoscimento bordi quando si fa la foto degli scontrini per tagliare fuori il resto

OK - Grafica spese

OK - Reimpostare le date delle notifiche correttamente da Home (dalla barra orizzontale gialla)

OK - Se spesa inviata, togliere la possibilità di inviare il pdf

OK - Nome pdf il nome TL prende solo nome anziché cognome

OK - Suggerire all'utente che si possono scorrere le barre orizzontali per eliminare o modificare

CHANGES

OK - Icona automobile che porta a uno Screen contenente unicamente i dati del rimborso chilometrico (eliminarlo dal salvataggio degli eventi)

OK - Icone foto e gallery nere anziché rosse

OK - Cambiare "hai ricevuto" in "rimborso"

OK - Cambiare icona in PDF in testo "inviare"

OK - Inserire voci nuove (con voce "altro" rendere obbligatoria descrizione)

OK - Testo da inserire sopra gli eventi e sotto la scritta "Tutti gli eventi": Se non hai sostenuto spese, avvisa comunque TLM

OK - Testo email: Mail inviata dall'APP "Nota spese TLM"

- In nuova spesa, lasciare di default vuota la data della spesa, ma sempre obbligatoria

- Aggiungere data rimborso chilometrico

- Cliccando su whatsapp, su alcuni dispositivi, da la scritta "Link alla chat non valido"

- Hint swipe solo dopo creazione evento e creazione spesa

BUG

OK - Non si riesce ad accedere alla gallery per selezionare le foto

verificare che lo scontrino non abbia l'iva con la virgola

testare con schermo zoomato (accessibilità)

OK - le foto non vengono aggiunte correttamente al PDF (controllare anche la chiusura del pdf, errore su android studio)


npm i @react-navigation/native
npm i @react-navigation/native-stack
npm i react-native-screens
npm i react-native-safe-area-context

npm i --save @fortawesome/react-native-fontawesome @fortawesome/fontawesome-svg-core react-native-svg

npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
npm i --save @fortawesome/free-regular-svg-icons

npm i @react-native-community/datetimepicker
npm i react-native-mmkv
npm i native-base

npm i --save react-native-swipe-list-view
npm i react-native-gesture-handler
npm i --save '@react-navigation/bottom-tabs'
npm i --save react-native-vision-camera => I should probably delete this, since react-native-image-picker does it better
npm i --save react-native-image-picker
npm i --save react-native-sectioned-multi-select
npm i --save react-native-vector-icons
npm i --save @types/react-native-vector-icons
npm i --save react-native-email
npm i --save react-native-fetch-blob
npm i --save react-native-html-to-pdf
npm i --save react-native-pdf
npm i --save react-native-blob-util
npm i --save react-native-splash-screen
npm i --save react-native-flash-message
npm i --save react-native-select-dropdown
npm i --save react-native-push-notification
npm i --save @types/react-native-push-notification
npm i --save react-native-document-scanner-plugin
yarn add @bam.tech/react-native-image-resizer (FROM CMD)
npm i --save @react-native-firebase/app
npm i --save @react-native-firebase/ml => TO DELETE
npm i --save react-native-ml-kit 
npm i --save @react-native-ml-kit/text-recognition
npm i --save react-native-mlkit-ocr

# TO NEXT: fixing all expenses formatting

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
