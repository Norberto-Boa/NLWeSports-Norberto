import { StyleSheet } from 'react-native';
import { Theme } from '../../theme';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.OVERLAY
  },
  
  content: {
    width: 311,
    backgroundColor: Theme.COLORS.SHAPE,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  label: {
    color: Theme.COLORS.TEXT,
    fontSize: Theme.FONT_SIZE.MD,
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    marginTop: 24,
    marginBottom: 8
  },

  discordButton: {
    width: 231,
    height: 48,
    backgroundColor: Theme.COLORS.BACKGROUND_900,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 32
  },

  discord: {
    color: Theme.COLORS.TEXT,
    fontSize: Theme.FONT_SIZE.MD,
    fontFamily: Theme.FONT_FAMILY.REGULAR
  },

  closeIcon: {
    alignSelf: 'flex-end',
    margin: 16,

  }
});