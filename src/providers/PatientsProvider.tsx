import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';

export interface Patient {
  cod: string;
}

interface PatientsContextData {
  list: Patient[];
  loading: boolean;
  addPatient(cod: string): Promise<void>;
  removePatient(cod: string): Promise<void>;
}

const PatientsContext = createContext<PatientsContextData>(
  {} as PatientsContextData
);

export function PatientsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const patients = await AsyncStorage.getItem('@VirtualStats:patients');

      if (patients) {
        setData(JSON.parse(patients));
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const addPatient = useCallback(
    async (cod: string) => {
      const exists = data.findIndex((p) => p.cod === cod);

      if (exists >= 0) {
        Alert.alert('Erro', 'Paciente já está adicionado');
        return;
      }

      const newData = [...data, { cod }];

      await AsyncStorage.setItem(
        '@VirtualStats:patients',
        JSON.stringify(newData)
      );

      setData(newData);
    },
    [data]
  );

  const removePatient = useCallback(
    async (cod: string) => {
      const newData = data.filter((patient) => patient.cod !== cod);

      await AsyncStorage.setItem(
        '@VirtualStats:patients',
        JSON.stringify(newData)
      );

      setData(newData);
    },
    [data]
  );

  return (
    <PatientsContext.Provider
      value={{ list: data, loading, addPatient, removePatient }}
    >
      {children}
    </PatientsContext.Provider>
  );
}

export function usePatients(): PatientsContextData {
  const context = useContext(PatientsContext);

  if (!context) {
    throw new Error('useAuth must be used within a PatientsProvider');
  }

  return context;
}
