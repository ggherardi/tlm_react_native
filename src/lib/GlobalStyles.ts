import { StyleSheet } from 'react-native';

const ThemeColors = {
  primary: '#E22E2D'
};

const GlobalStyles = StyleSheet.create({
  // Colors
  colorPrimary: {
    color: ThemeColors.primary
  },
  colorBgPrimary: {
    backgroundColor: ThemeColors.primary
  },
  // Icons
  iconPrimary: {
    color: ThemeColors.primary,
    padding: 10
  },
  // Buttons
  btnPrimary: {
    width: '50%',
    color: '#fff',
    backgroundColor: ThemeColors.primary
  },
  // Positioning
  selfCenter: {
    alignSelf: 'center'
  },
  // Padding
  p1: {
    padding: 1
  },
  p2: {
    padding: 2
  },
  p3: {
    padding: 3
  },
  p4: {
    padding: 4
  },
  p5: {
    padding: 5
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