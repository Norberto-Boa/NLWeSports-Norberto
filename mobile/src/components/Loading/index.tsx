import { View, ActivityIndicator } from 'react-native';
import { Theme } from '../../theme';

import { styles } from './styles';

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Theme.COLORS.PRIMARY} size={50} />
    </View>
  );
}