import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import {
  Container,
  Header,
  LogoImg,
  Wrapper,
  WelcomeCard,
  WelcomeImage,
  WelcomeText,
  StartButton,
  StartButtonText,
} from '@/src/styles/welcome.styles';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Welcome() {
  useEffect(() => {
    async function verify(): Promise<void> {
      const firstTimeValue = await AsyncStorage.getItem(
        '@VirtualStats:first-time'
      );

      if (!firstTimeValue) {
        await AsyncStorage.setItem(
          '@VirtualStats:first-time',
          JSON.stringify(true)
        );
      } else {
        router.navigate('/(drawer)');
      }
    }

    verify();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      <Container>
        <Header>
          <LogoImg source={require('@/src/assets/images/logo.png')} />
        </Header>

        <Wrapper>
          <WelcomeCard>
            <WelcomeImage
              source={require('@/src/assets/images/home-image.png')}
            />

            <WelcomeText>Seja muito bem-vindo ao Virtual Stats</WelcomeText>
          </WelcomeCard>

          <StartButton
            onPress={() => {
              router.navigate('/(drawer)');
            }}
          >
            <StartButtonText>Começar</StartButtonText>
          </StartButton>
        </Wrapper>
      </Container>
    </>
  );
}
