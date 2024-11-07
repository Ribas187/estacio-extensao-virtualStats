import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  padding: 18px 18px 18px;
  width: 100%;
  background: #0b74bc;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  margin-bottom: 18px;
  font-family: 'Roboto-Medium';
  font-size: 20px;
  color: #fff;
`;

export const LeftButton = styled(RectButton)`
  margin-bottom: 18px;
  margin-left: 10px;
`;

export const RightButton = styled(RectButton)`
  min-width: 30px;
`;
