import { StyleSheet } from 'react-native';
import { Theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 32,
  },
  title: {
    color: Theme.COLORS.TEXT,
    fontSize: Theme.FONT_SIZE.LG,
    fontFamily: Theme.FONT_FAMILY.BLACK
  },
  subtitle: {
    color: Theme.COLORS.CAPTION_300,
    fontSize: Theme.FONT_SIZE.MD,
    fontFamily: Theme.FONT_FAMILY.REGULAR
  }
});