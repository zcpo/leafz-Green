'use client';

import { useContext } from 'react';
import { AuthContext } from '@/components/auth/AuthProvider';
import { useUser as useFirebaseUser } from '@/firebase';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useUser = useFirebaseUser;
