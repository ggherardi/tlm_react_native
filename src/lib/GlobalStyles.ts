import { StyleSheet } from 'react-native';

export const ThemeColors = {
  primary: '#E22E2D',
  secondary: 'blue',
  white: '#fff',
  inactive: 'gray'
};

const GlobalStyles = StyleSheet.create({
  // Common components styles
  container: {
    padding: 10
  },
  // Colors
  colorPrimary: {
    color: ThemeColors.primary
  },
  colorBgPrimary: {
    backgroundColor: ThemeColors.primary
  },
  colorWhite: {
    color: '#fff'
  },
  // Icons
  iconPrimary: {
    // color: ThemeColors.primary,
    padding: 10
  },
  // Positioning
  selfCenter: {
    alignSelf: 'center',
    // alignContent: 'center',
    // verticalAlign: 'middle',
    // textAlignVertical: 'center'    
  },  
  flexRow: {
    flexDirection: 'row'
  },
  // Padding
  pl5: {
    paddingLeft: 5
  },
  pl10: {
    paddingLeft: 10
  },
  pl15: {
    paddingLeft: 15
  },
  pl20: {
    paddingLeft: 20
  },
  pl25: {
    paddingLeft: 25
  },
  pt5: {
    paddingTop: 5
  },
  pt10: {
    paddingTop: 10
  },
  pt15: {
    paddingTop: 15
  },
  pt20: {
    paddingTop: 20
  },
  pt25: {
    paddingTop: 25
  },
  mt5: {
    marginTop: 5
  },
  mt10: {
    marginTop: 10
  },
  mt15: {
    marginTop: 15
  },
  mt20: {
    marginTop: 20
  },
  mt25: {
    marginTop: 25
  },
  ml1: {
    marginLeft: 1
  },
  ml2: {
    marginLeft: 2
  },
  ml3: {
    marginLeft: 3
  },
  ml4: {
    marginLeft: 4
  },
  ml5: {
    marginLeft: 5
  },
});

export default GlobalStyles;