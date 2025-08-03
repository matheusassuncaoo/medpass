'use client';

import { ReactNode } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Lado esquerdo - Imagem/Banner */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          position: 'relative',
          bgcolor: 'primary.main',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            MedPass
          </Typography>
          <Typography variant="h5" gutterBottom>
            Sistema de Gerenciamento de Filas Médicas
          </Typography>
          <Typography variant="body1">
            Otimize o atendimento, reduza o tempo de espera e melhore a experiência dos pacientes.
          </Typography>
        </Box>
      </Box>

      {/* Lado direito - Formulário */}
      <Box
        sx={{
          flex: { xs: 1, md: 0.6 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography component="h1" variant="h4" gutterBottom>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body1" color="text.secondary" align="center">
                  {subtitle}
                </Typography>
              )}
            </Box>
            {children}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}