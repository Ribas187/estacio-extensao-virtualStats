import { RectButton } from 'react-native-gesture-handler';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #f9f9f9;
`;

export const ModalWrapper = styled.View.attrs({})`
  align-items: center;
  justify-content: center;
  background-color: #0b74bc;
  height: 250px;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 5px 2px rgba(0, 0, 0, 0.161);
`;

export const ModalView = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`;

export const CloseButton = styled(RectButton)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const ModalText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 20px;
  color: #fff;
`;

export const CodInput = styled.TextInput`
  border: 2px solid #fff;
  width: 100%;
  border-radius: 8px;
  margin: 15px 0;
  height: 48px;
  padding: 0 10px;
  color: #fff;
  font-size: 15px;
  font-family: 'Roboto-Regular';
`;

export const ModalAddButton = styled(RectButton)`
  background-color: #fff;
  padding: 15px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const ModalAddButtonText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 18px;
  color: #133a57;
`;

export const AddButton = styled(TouchableOpacity).attrs({})`
  position: absolute;
  right: 25px;
  bottom: 25px;
  background: #0b74bc;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 6px rgba(0, 0, 0, 0.161);
`;
