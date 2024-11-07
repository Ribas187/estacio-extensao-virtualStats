import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Wrapper = styled.View`
  padding: 20px 14px;
`;

export const ProfileCard = styled.View.attrs({})`
  background: #0b74bc;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 3px 4px 2px rgba(0, 0, 0, 0.161);
`;

export const Name = styled.Text`
  font-family: 'Roboto-Medium';
  align-self: center;
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
`;

export const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ProfileCardLeft = styled.View`
  max-width: 50%;
`;

export const ProfileCardRight = styled.View``;

export const InfoView = styled.View`
  flex-direction: row;
  margin: 2px 0;
`;

export const BlackText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 15px;
`;

export const WhiteText = styled.Text`
  font-family: 'Roboto-Regular';
  color: #fff;
  font-size: 15px;
`;

export const CodeView = styled.View`
  margin: 10px 0;
`;

export const CodeButton = styled(RectButton)`
  margin: 10px 0;
  flex-direction: row;
  align-items: center;
  margin-right: auto;
`;

export const CodeText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 16px;
  margin-right: 10px;
  color: #37474f;
`;

export const TitleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 18px;
`;

export const DetailsText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 18px;
  color: #37474f;
`;

export const TimeText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 15px;
  color: #090909;
`;

export const DetailsCard = styled.View.attrs({})`
  padding: 18px 20px;
  border-radius: 8px;
  box-shadow: 3px 4px 2px rgba(0, 0, 0, 0.161);
  background: #fff;
`;

export const InfoView2 = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

export const GreyText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 15px;
  color: #455a64;
  flex: 1;
`;

export const ObsView = styled.View`
  margin-bottom: 10px;
`;

export const RemoveButton = styled.TouchableOpacity`
  align-self: center;
  margin-top: 15px;
`;

export const RemoveButtonText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 14px;
  color: #0b74bc;
`;
