import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/index';

export const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: Theme.COLORS.SHAPE,
    borderRadius: 8,
    padding: 20,
    marginRight: 16,
    alignItems: 'center'
  },
  button: {
    width: '100%',
    height: 36,
    borderRadius: 6,
    backgroundColor: Theme.COLORS.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTitle: {
    color: Theme.COLORS.TEXT,
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: Theme.FONT_SIZE.SM 
  }
});