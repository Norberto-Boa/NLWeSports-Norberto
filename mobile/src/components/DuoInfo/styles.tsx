import { StyleSheet } from 'react-native';
import { Theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16
  },
  label: {
    color: Theme.COLORS.CAPTION_300,
    fontSize: Theme.FONT_SIZE.SM,
    fontFamily: Theme.FONT_FAMILY.REGULAR,
    marginBottom: 4
  },
  value: {
    fontSize: Theme.FONT_SIZE.SM,
    fontFamily: Theme.FONT_FAMILY.BOLD,
  }
});