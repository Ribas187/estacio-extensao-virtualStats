import React from 'react';
import { PatientsProvider } from './PatientsProvider';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <PatientsProvider>{children}</PatientsProvider>;
}
