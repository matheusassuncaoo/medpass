'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Aqui você pode verificar se o usuário está autenticado
    // Por enquanto, vamos apenas redirecionar para a página de login
    const redirectTimer = setTimeout(() => {
      router.push('/login');
    }, 1500);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'primary.main',
        color: 'white',
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        MedPass
      </Typography>
      <Typography variant="h5" gutterBottom>
        Sistema de Gerenciamento de Filas Médicas
      </Typography>
      <Box sx={{ mt: 4 }}>
        <CircularProgress color="inherit" />
      </Box>
    </Box>
  );
}
