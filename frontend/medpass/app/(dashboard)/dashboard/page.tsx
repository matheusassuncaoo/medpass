'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  IconButton,
  LinearProgress
} from '@mui/material';
import { 
  People as PeopleIcon,
  LocalHospital as LocalHospitalIcon,
  MedicalServices as MedicalServicesIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  Refresh as RefreshIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';

// Dados simulados para o dashboard
const mockData = {
  stats: {
    pacientesHoje: 145,
    pacientesOntem: 132,
    tempoMedioEspera: '18 min',
    tempoMedioAtendimento: '12 min',
    senhasEmitidas: 156,
    senhasAtendidas: 142,
    senhasAguardando: 14,
  },
  proximasSenhas: [
    { id: 'A123', tipo: 'Prioritário', especialidade: 'Cardiologia', tempoEspera: '5 min' },
    { id: 'B456', tipo: 'Normal', especialidade: 'Clínica Geral', tempoEspera: '12 min' },
    { id: 'A124', tipo: 'Prioritário', especialidade: 'Ortopedia', tempoEspera: '18 min' },
    { id: 'B457', tipo: 'Normal', especialidade: 'Pediatria', tempoEspera: '25 min' },
  ],
  especialidadesMaisProcuradas: [
    { nome: 'Clínica Geral', atendimentos: 45, variacao: 5 },
    { nome: 'Pediatria', atendimentos: 32, variacao: -2 },
    { nome: 'Cardiologia', atendimentos: 28, variacao: 8 },
    { nome: 'Ortopedia', atendimentos: 22, variacao: 3 },
  ],
};

export default function Dashboard() {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);

  // Simulação de atualização de dados
  const refreshData = () => {
    setLoading(true);
    // Simulando uma chamada de API
    setTimeout(() => {
      setData({
        ...mockData,
        stats: {
          ...mockData.stats,
          pacientesHoje: mockData.stats.pacientesHoje + Math.floor(Math.random() * 5),
          senhasEmitidas: mockData.stats.senhasEmitidas + Math.floor(Math.random() * 3),
          senhasAtendidas: mockData.stats.senhasAtendidas + Math.floor(Math.random() * 3),
        }
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />} 
            onClick={refreshData}
            disabled={loading}
          >
            Atualizar
          </Button>
        </Box>
        
        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {/* Cards de estatísticas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <PeopleIcon />
                  </Avatar>
                  <Typography variant="h6" component="div">
                    Pacientes Hoje
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {data.stats.pacientesHoje}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.stats.pacientesHoje > data.stats.pacientesOntem ? (
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                      <ArrowUpwardIcon fontSize="small" />
                      {Math.round((data.stats.pacientesHoje - data.stats.pacientesOntem) / data.stats.pacientesOntem * 100)}% em relação a ontem
                    </Box>
                  ) : (
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                      <ArrowDownwardIcon fontSize="small" />
                      {Math.round((data.stats.pacientesOntem - data.stats.pacientesHoje) / data.stats.pacientesOntem * 100)}% em relação a ontem
                    </Box>
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                    <ConfirmationNumberIcon />
                  </Avatar>
                  <Typography variant="h6" component="div">
                    Senhas Emitidas
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {data.stats.senhasEmitidas}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.stats.senhasAtendidas} atendidas ({Math.round(data.stats.senhasAtendidas / data.stats.senhasEmitidas * 100)}%)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                    <AccessTimeIcon />
                  </Avatar>
                  <Typography variant="h6" component="div">
                    Tempo Médio Espera
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {data.stats.tempoMedioEspera}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Atendimento: {data.stats.tempoMedioAtendimento}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
                    <ConfirmationNumberIcon />
                  </Avatar>
                  <Typography variant="h6" component="div">
                    Em Espera
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {data.stats.senhasAguardando}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(data.stats.senhasAguardando / data.stats.senhasEmitidas * 100)}% do total emitido
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Gráficos e listas */}
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card>
              <CardHeader title="Próximas Senhas" />
              <Divider />
              <CardContent>
                <List>
                  {data.proximasSenhas.map((senha) => (
                    <ListItem key={senha.id} divider>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: senha.tipo === 'Prioritário' ? 'error.main' : 'primary.main' }}>
                          {senha.id.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={<Typography variant="subtitle1">{senha.id} - {senha.especialidade}</Typography>}
                        secondary={<Typography variant="body2">{senha.tipo} • Espera: {senha.tempoEspera}</Typography>}
                      />
                      <Button variant="contained" size="small">
                        Chamar
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid xs={12} md={6}>
            <Card>
              <CardHeader title="Especialidades Mais Procuradas" />
              <Divider />
              <CardContent>
                <List>
                  {data.especialidadesMaisProcuradas.map((especialidade) => (
                    <ListItem key={especialidade.nome} divider>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <MedicalServicesIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={<Typography variant="subtitle1">{especialidade.nome}</Typography>}
                        secondary={<Typography variant="body2">{especialidade.atendimentos} atendimentos hoje</Typography>}
                      />
                      {especialidade.variacao > 0 ? (
                        <Box sx={{ color: 'success.main', display: 'flex', alignItems: 'center' }}>
                          <ArrowUpwardIcon fontSize="small" />
                          <Typography variant="body2">{especialidade.variacao}%</Typography>
                        </Box>
                      ) : (
                        <Box sx={{ color: 'error.main', display: 'flex', alignItems: 'center' }}>
                          <ArrowDownwardIcon fontSize="small" />
                          <Typography variant="body2">{Math.abs(especialidade.variacao)}%</Typography>
                        </Box>
                      )}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}