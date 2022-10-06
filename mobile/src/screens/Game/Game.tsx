import { useEffect, useState } from 'react';

import { Background } from '../../components/Background';
import { useRoute } from '@react-navigation/native'

import logoImg from '../../assets/Logo-nlw-esports.png'

import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import { View, TouchableOpacity, Image, FlatList, Text, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Theme } from '../../theme';
import { Heading } from '../../components/Heading';
import { useNavigation } from '@react-navigation/native';
import { DuoCard } from '../../components/DuoCard';
import { DuoCardProps } from '../../components/DuoCard/index';
import { DuoMatch } from "../../components/DuoMatch";


export function Game() {
  const [duo, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://192.168.100.5:4444/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => {
        setDuos(data)
      })

  }, [])

  async function getDiscordUser(adsId:string) {
    fetch(`http://192.168.100.5:4444/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => {
        setDiscordDuoSelected(data.discord)
      })
  }

  const Route = useRoute();
  const game = Route.params as GameParams;

  function handleReturn() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView
        style={styles.container}

      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleReturn}
          >
            <Entypo
              name='chevron-small-left'
              color={Theme.COLORS.CAPTION_300}
              size={24}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />

        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />



        <Heading
          title={game.title}
          subtitle={'Conecte-se e comece a jogar'}
        />

        <FlatList
          data={duo}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => { getDiscordUser(item.id) }}
            />
          )}
          horizontal
          style={[styles.ContainerList]}
          contentContainerStyle={[duo.length != 0 ? styles.ContentList : styles.emptyContainer]}
          showsHorizontalScrollIndicator={true}
          ListEmptyComponent={() => (
            <Text style={styles.empyListText}>
              No ads available for this game
            </Text>
          )}
        >

        </FlatList>

        <DuoMatch
          visible={discordDuoSelected.length > 0 }
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>

  );
}