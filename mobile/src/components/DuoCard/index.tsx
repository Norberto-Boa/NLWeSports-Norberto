import { View, Text, TouchableOpacity, Image } from 'react-native';

import { DuoInfo } from '../DuoInfo';

import { Theme } from '../../theme';
import { styles } from './styles';

import Icon from 'react-native-ionicons';
export interface DuoCardProps{
  id: string,
  hourEnd: string,
  hourStart: string,
  name: string,
  useVoiceChannel: boolean,
  weekDays: string[],
  yearsPlaying: 2
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  
  return (
    <View style={styles.container}>
      
      <DuoInfo
        label='Nome'
        value={data.name}
    
      />
      <DuoInfo
        label='Tempo de jogo'
        value={`${data.yearsPlaying} anos`}
    
      />
      <DuoInfo
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
    
      />
      <DuoInfo
        label='Chamada de audio?'
        value={`${data.useVoiceChannel ? 'Sim' : 'Não'}`}
        colorValue={`${data.useVoiceChannel ? Theme.COLORS.SUCCESS : Theme.COLORS.ALERT }`}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
      >
        <Text
          style={styles.buttonTitle}
        >
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}