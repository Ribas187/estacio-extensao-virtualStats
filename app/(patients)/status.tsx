import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import { differenceInYears, format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { ActivityIndicator } from 'react-native';

import {
  Container,
  Wrapper,
  ProfileCard,
  Name,
  CardRow,
  ProfileCardLeft,
  ProfileCardRight,
  InfoView,
  BlackText,
  WhiteText,
  CodeView,
  CodeButton,
  CodeText,
  TitleView,
  DetailsText,
  TimeText,
  DetailsCard,
  GreyText,
  ObsView,
  InfoView2,
  Scroll,
  RemoveButton,
  RemoveButtonText,
} from '@/src/styles/status.styles';
import { usePatients } from '@/src/providers/PatientsProvider';
import api from '@/src/services/api';
import { Header } from '@/src/components/Header';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

interface Hospital {
  nome: string;
}

interface Paciente {
  nome: string;
  nascimento: string;
  sexo: 'M' | 'F';
  leito: string;
  hospital: Hospital;
}

interface StatusInfo {
  paciente: Paciente;
  estado: string;
  hora: string;
  medicamento: string;
  alimentacao: string;
  observacao: string;
}

const Status: React.FC = () => {
  const [statusInfo, setStatusInfo] = useState<StatusInfo>({} as StatusInfo);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const { cod, id } = useLocalSearchParams();

  const { removePatient } = usePatients();

  useEffect(() => {
    async function loadData(): Promise<void> {
      setLoading(true);

      const url = id ? `/stats/${cod}/${id}` : `/stats-patient/last/${cod}`;

      const response = await api.get(url);

      setStatusInfo(response.data);
      setLoading(false);
    }

    loadData();
  }, [cod, id]);

  const timeFormatted = useMemo(() => {
    const dateFormatted = parseISO(statusInfo.hora);

    return statusInfo.hora
      ? format(dateFormatted, "dd/MM/yyyy '-' HH:mm", { locale: ptBR })
      : '';
  }, [statusInfo.hora]);

  const age = useMemo(() => {
    if (!statusInfo.paciente) {
      return '';
    }
    const dateFormatted = parseISO(statusInfo.paciente.nascimento);
    return differenceInYears(new Date(), dateFormatted);
  }, [statusInfo]);

  const handleHistoryNavigate = useCallback(() => {
    router.navigate(`/(patients)/history?cod=${cod}`);
  }, [navigation, cod]);

  const handleCopyCode = useCallback(() => {
    Clipboard.setString(cod as string);
  }, [cod]);

  const handleRemovePatient = useCallback(async () => {
    await removePatient(cod as string);
    router.navigate('/(drawer)/');
  }, [cod, removePatient, navigation]);

  return (
    <Container>
      <Header
        title={id ? 'Ver Mais' : 'Status'}
        left={{ back: true }}
        right={{
          history: true,
          onPress: handleHistoryNavigate,
        }}
      />

      {!loading ? (
        <Scroll>
          <Wrapper>
            <ProfileCard>
              <Name>{statusInfo.paciente.nome}</Name>

              <CardRow>
                <ProfileCardLeft>
                  <InfoView>
                    <BlackText>Idade: </BlackText>
                    <WhiteText>{age} anos</WhiteText>
                  </InfoView>
                  <InfoView>
                    <BlackText>Sexo: </BlackText>
                    <WhiteText>
                      {statusInfo.paciente.sexo === 'F'
                        ? 'Feminino'
                        : 'Masculino'}
                    </WhiteText>
                  </InfoView>
                  <InfoView>
                    <BlackText>Estado clínico: </BlackText>
                    <WhiteText>{statusInfo.estado}</WhiteText>
                  </InfoView>
                  <InfoView>
                    <BlackText>Hospital: </BlackText>
                    <WhiteText>{statusInfo.paciente.hospital.nome}</WhiteText>
                  </InfoView>
                  <InfoView>
                    <BlackText>Leito: </BlackText>
                    <WhiteText>{statusInfo.paciente.leito}</WhiteText>
                  </InfoView>
                </ProfileCardLeft>

                <ProfileCardRight>
                  <Feather name="user" size={100} color="#FFF" />
                </ProfileCardRight>
              </CardRow>
            </ProfileCard>

            <CodeView>
              <CodeButton onPress={handleCopyCode}>
                <CodeText>Copiar código</CodeText>
                <Feather name="copy" size={20} color="#37474f" />
              </CodeButton>
            </CodeView>

            <TitleView>
              <DetailsText>Detalhes:</DetailsText>
              <TimeText>{timeFormatted}</TimeText>
            </TitleView>

            <DetailsCard>
              <InfoView2>
                <BlackText>Medicação: </BlackText>
                <GreyText>{statusInfo.medicamento}</GreyText>
              </InfoView2>
              <InfoView2>
                <BlackText>Alimentação: </BlackText>
                <GreyText>{statusInfo.alimentacao}</GreyText>
              </InfoView2>
              <ObsView>
                <BlackText style={{ marginBottom: 14 }}>Observação: </BlackText>
                <GreyText>{statusInfo.observacao}</GreyText>
              </ObsView>
            </DetailsCard>

            <RemoveButton onPress={handleRemovePatient}>
              <RemoveButtonText>Excluir paciente</RemoveButtonText>
            </RemoveButton>
          </Wrapper>
        </Scroll>
      ) : (
        <ActivityIndicator
          color="#0B74BC"
          size={50}
          style={{ marginTop: 100 }}
        />
      )}
    </Container>
  );
};

export default Status;
