import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 16
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 28,
    justifyContent: 'space-between'
  },

  logo: {
    width: 72,
    height: 40
  },

  right: {
    height: 20,
    width: 20
  },

  cover: {
    width: 311,
    height: 160,
    borderRadius: 8,
    marginTop: 32,
    overflow: 'hidden'
  },

  ContainerList: {
    width: '100%'
  },

  ContentList: {
    paddingLeft: 32,
    paddingRight: 64,
    alignItems: 'flex-start'
  },

  empyListText: {
    color: Theme.COLORS.CAPTION_300,
    fontSize: Theme.FONT_SIZE.MD,
    fontFamily: Theme.FONT_FAMILY.BOLD,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'center'
  }

});