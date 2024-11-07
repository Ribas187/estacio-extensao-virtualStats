import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Container } from '@/src/styles/history.styles';
import { Patient } from '@/src/providers/PatientsProvider';
import api from '@/src/services/api';
import { Header } from '@/src/components/Header';
import { FlatList } from 'react-native';
import PatientHistoryResume from '@/src/components/PatientHistoryResume';

export interface IStatusInfo {
  id: number;
  paciente: Patient;
  hora: string;
  estado: string;
  hospital: string;
}

const History: React.FC = () => {
  const [statsList, setStatsList] = useState<IStatusInfo[]>(
    [] as IStatusInfo[]
  );

  const { params } = useRoute();
  const { cod } = params as { cod: string };

  useEffect(() => {
    async function loadData(): Promise<void> {
      const response = await api.get(`/stats-patient/${cod}`);

      const info = response.data.map((status: any) => {
        const { id, estado, hora, paciente } = status;

        return {
          id,
          paciente,
          hora,
          estado,
          hospital: paciente.hospital.nome,
        };
      });

      setStatsList(info);
    }

    loadData();
  }, [cod]);

  return (
    <Container>
      <Header title="Histórico" left={{ back: true }} />

      <FlatList
        style={{ padding: 10, flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={statsList}
        keyExtractor={(stats) => String(stats.id)}
        renderItem={({ item }) => <PatientHistoryResume data={item} />}
      />
    </Container>
  );
};

export default History;
