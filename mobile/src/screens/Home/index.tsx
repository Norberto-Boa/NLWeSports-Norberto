import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native'

import { Image, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/Logo-nlw-esports.png';
import { Background } from '../../components/Background';

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';


export function Home() {
  const navigation = useNavigation()

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    fetch('http://192.168.100.5:4444/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })

  }, [])

  return (
    <Background>

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.con}>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <Heading
            title="Encontre seu duo!"
            subtitle="Selecione o game que deseja jogar..."
          />

          <FlatList
            data={games}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return <GameCard
                data={item}
                onPress={() => handleOpenGame(item)}
              />
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
        </ScrollView>

      </SafeAreaView>
    </Background>
  );
}