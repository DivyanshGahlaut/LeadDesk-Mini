import React from 'react';
import { AuthPage } from '@/components/ui/auth-page';

export default function Login({ onLoginSuccess, onGoHome }) {
  return (
    <AuthPage
      onLoginSuccess={onLoginSuccess}
      onGoHome={onGoHome}
    />
  );
}
