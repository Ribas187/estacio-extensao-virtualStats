import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { Container, Title, LeftButton, RightButton } from './styles';
import { Feather, MaterialIcons } from '@expo/vector-icons';

interface IHeaderProps {
  title?: string;
  left?: {
    back?: boolean;
  };
  right?: {
    onPress(): void;
    history?: boolean;
  };
}

export function Header(props: IHeaderProps) {
  const { title, left = {}, right } = props;

  const navigation = useNavigation();

  const handleLeftButton = useCallback(() => {
    if (left.back) {
      navigation.goBack();
      return;
    }

    const action = DrawerActions.openDrawer();

    navigation.dispatch(action);
  }, [navigation, left]);

  return (
    <Container>
      <LeftButton onPress={handleLeftButton}>
        <Feather
          name={left.back ? 'arrow-left' : 'menu'}
          size={30}
          color="#fff"
        />
      </LeftButton>

      <Title>{title}</Title>

      <RightButton onPress={right?.onPress}>
        {right?.history && (
          <MaterialIcons name="history" size={30} color="#fff" />
        )}
      </RightButton>
    </Container>
  );
}
