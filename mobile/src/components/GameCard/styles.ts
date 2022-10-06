import { StyleSheet } from 'react-native';
import { Theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginRight: 24,
  },
  cover: {
    width: 240,
    height: 320,
    justifyContent: 'flex-end',
    borderRadius: 8,
    overflow: 'hidden'
  },
  footer: {
    width: '100%',
    height: 120,
    padding: 16,
    justifyContent:'flex-end'
  },

  name: {
    color: Theme.COLORS.TEXT,
    fontSize: Theme.FONT_SIZE.MD,
    fontFamily: Theme.FONT_FAMILY.BOLD,
    marginBottom: 4,
  },
  ads: {
    color: Theme.COLORS.CAPTION_300,
    fontSize: Theme.FONT_SIZE.MD,
    fontFamily: Theme.FONT_FAMILY.REGULAR
  }
});