import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';

import {
  Container,
  AddButton,
  ModalView,
  CloseButton,
  ModalText,
  CodInput,
  ModalAddButton,
  ModalAddButtonText,
  ModalWrapper,
} from '@/src/styles/home.styles';
import api from '@/src/services/api';
import { usePatients } from '@/src/providers/PatientsProvider';
import { PatientResume } from '@/src/components/PatientResume';
import { Feather } from '@expo/vector-icons';
import { Header } from '@/src/components/Header';

export default function Paciente() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cod, setCod] = useState('');
  const [loading, setLoading] = useState(false);

  const { addPatient, list } = usePatients();

  const handleAddCod = useCallback(() => {
    if (!cod) {
      Alert.alert('Erro', 'Precisa preencher o código');
      return;
    }

    setLoading(true);

    api
      .get(`/patients/${cod}`)
      .then(() => {
        addPatient(cod).then(() => {
          setIsModalVisible(false);
        });
      })
      .catch(() => {
        Alert.alert('Erro', 'Código inválido');
      })
      .finally(() => {
        setLoading(false);
        setCod('');
      });
  }, [addPatient, cod]);

  return (
    <Container>
      <Header title="Consultar Paciente" />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        style={{ padding: 10, flex: 1 }}
        keyExtractor={(patient) => patient.cod}
        renderItem={({ item }) => <PatientResume cod={item.cod} />}
      />

      <Modal isVisible={isModalVisible} backdropOpacity={0.3}>
        <ModalWrapper>
          <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
            <CloseButton>
              <Feather name="x" size={30} color="#fff" />
            </CloseButton>
          </TouchableWithoutFeedback>
          <ModalView>
            <ModalText>Insira o Código:</ModalText>

            <CodInput onChangeText={(e) => setCod(e)} value={cod} />

            <TouchableWithoutFeedback onPress={handleAddCod} disabled={loading}>
              <ModalAddButton>
                {!loading ? (
                  <ModalAddButtonText>Concluir</ModalAddButtonText>
                ) : (
                  <ActivityIndicator />
                )}
              </ModalAddButton>
            </TouchableWithoutFeedback>
          </ModalView>
        </ModalWrapper>
      </Modal>

      <AddButton onPress={() => setIsModalVisible(true)}>
        <Feather name="plus" size={40} color="#fff" />
      </AddButton>
    </Container>
  );
}
