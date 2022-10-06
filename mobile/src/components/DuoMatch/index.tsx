import { useState } from 'react';

import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import * as Clipboard from 'expo-clipboard';

import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { Theme } from '../../theme';
import { Heading } from '../Heading';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordUserToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert('Discord Copiado!', `Usuario ${discord} copiado para sua area de transferencia`);
    setIsCopping(false)
  }

  return (
    <Modal
      animationType='fade'
      transparent
      statusBarTranslucent
      {...rest}
    >
      <View
        style={styles.container}>
        <View style={styles.content}>

          <TouchableOpacity
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons
              name="close"
              size={20}
              color= {Theme.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <MaterialIcons
            name='check-circle-outline'
            color={Theme.COLORS.SUCCESS}
            size={64}
          />

          <Heading
            title={`Let's Play`}
            subtitle={`Agora é só começar a jogar`}
            style={{alignItems:'center', marginTop: 24}}
          />

          <Text
            style={styles.label}
          >
            Adicione o Discord
          </Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordUserToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              
              {isCopping ? <ActivityIndicator color={Theme.COLORS.PRIMARY} /> :  discord}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}