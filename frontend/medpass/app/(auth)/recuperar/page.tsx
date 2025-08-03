'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment, 
  Divider,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Paper
} from '@mui/material';
import { 
  Email as EmailIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema de validação
const emailSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
});

const codeSchema = z.object({
  code: z.string().min(6, 'Código deve ter pelo menos 6 caracteres'),
});

type EmailFormData = z.infer<typeof emailSchema>;
type CodeFormData = z.infer<typeof codeSchema>;

const steps = ['Email', 'Verificação', 'Concluído'];

export default function RecuperarPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { 
    control: emailControl, 
    handleSubmit: handleSubmitEmail, 
    formState: { errors: emailErrors } 
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const { 
    control: codeControl, 
    handleSubmit: handleSubmitCode, 
    formState: { errors: codeErrors } 
  } = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmitEmail = async (data: EmailFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Armazenar o email para uso posterior
      setEmail(data.email);
      
      // Avançar para o próximo passo
      setActiveStep(1);
      
      console.log('Email enviado:', data.email);
    } catch (err) {
      setError('Erro ao enviar email. Por favor, tente novamente.');
      console.error('Erro ao enviar email:', err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitCode = async (data: CodeFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Avançar para o próximo passo
      setActiveStep(2);
      
      console.log('Código verificado:', data.code);
    } catch (err) {
      setError('Código inválido. Por favor, tente novamente.');
      console.error('Erro ao verificar código:', err);
    } finally {
      setLoading(false);
    }
  };

  // Renderizar o conteúdo com base no passo atual
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box component="form" onSubmit={handleSubmitEmail(onSubmitEmail)} sx={{ width: '100%' }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Digite seu email para receber um código de recuperação de senha.
            </Typography>
            
            <Controller
              name="email"
              control={emailControl}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  autoFocus
                  error={!!emailErrors.email}
                  helperText={emailErrors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Código'}
            </Button>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button variant="text">
                  Voltar para o login
                </Button>
              </Link>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box component="form" onSubmit={handleSubmitCode(onSubmitCode)} sx={{ width: '100%' }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Digite o código de 6 dígitos enviado para <strong>{email}</strong>.
            </Typography>
            
            <Controller
              name="code"
              control={codeControl}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="code"
                  label="Código de Verificação"
                  autoFocus
                  error={!!codeErrors.code}
                  helperText={codeErrors.code?.message}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Verificar Código'}
            </Button>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Button 
                variant="text" 
                onClick={() => {
                  setActiveStep(0);
                  setError(null);
                }}
              >
                Voltar
              </Button>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              bgcolor: 'success.light',
              color: 'success.contrastText',
              width: 80,
              height: 80,
              borderRadius: '50%',
              margin: '0 auto 24px'
            }}>
              <CheckIcon fontSize="large" />
            </Box>
            
            <Typography variant="h5" gutterBottom>
              Recuperação Concluída!
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 4 }}>
              Uma nova senha foi enviada para o seu email. Use-a para fazer login e depois altere para uma senha de sua preferência.
            </Typography>

            <Link href="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" fullWidth>
                Voltar para o Login
              </Button>
            </Link>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout 
      title="Recuperar Senha" 
      subtitle="Siga os passos para recuperar sua senha"
    >
      {error && (
        <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
          {error}
        </Alert>
      )}

      <Box sx={{ width: '100%', mb: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {renderStepContent()}
    </AuthLayout>
  );
}