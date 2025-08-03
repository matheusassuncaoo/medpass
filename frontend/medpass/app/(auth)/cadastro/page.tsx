'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment, 
  IconButton,
  Divider,
  Alert,
  Grid,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email as EmailIcon, 
  Lock as LockIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  MedicalServices as MedicalServicesIcon
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema de validação
const cadastroSchema = z.object({
  // Dados pessoais
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  telefone: z.string().min(10, 'Telefone inválido'),
  
  // Dados profissionais
  hospital: z.string().min(1, 'Hospital é obrigatório'),
  especialidade: z.string().min(1, 'Especialidade é obrigatória'),
  cargo: z.string().min(1, 'Cargo é obrigatório'),
  
  // Dados de acesso
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirme sua senha'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type CadastroFormData = z.infer<typeof cadastroSchema>;

const steps = ['Dados Pessoais', 'Dados Profissionais', 'Dados de Acesso'];

export default function CadastroPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors }, trigger, getValues } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      hospital: '',
      especialidade: '',
      cargo: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: (keyof CadastroFormData)[] = [];
    
    // Definir campos a serem validados com base no passo atual
    if (activeStep === 0) {
      fieldsToValidate = ['nome', 'email', 'telefone'];
    } else if (activeStep === 1) {
      fieldsToValidate = ['hospital', 'especialidade', 'cargo'];
    }
    
    // Validar campos do passo atual
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (data: CadastroFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulando cadastro bem-sucedido
      console.log('Cadastro realizado com sucesso:', data);
      
      // Redirecionar para o login
      router.push('/login');
    } catch (err) {
      setError('Erro ao realizar cadastro. Por favor, tente novamente.');
      console.error('Erro ao fazer cadastro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Renderizar o formulário com base no passo atual
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="nome"
                  label="Nome Completo"
                  autoFocus
                  error={!!errors.nome}
                  helperText={errors.nome?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
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

            <Controller
              name="telefone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="telefone"
                  label="Telefone"
                  error={!!errors.telefone}
                  helperText={errors.telefone?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </>
        );
      case 1:
        return (
          <>
            <Controller
              name="hospital"
              control={control}
              render={({ field }) => (
                <FormControl 
                  fullWidth 
                  margin="normal" 
                  error={!!errors.hospital}
                >
                  <InputLabel id="hospital-label">Hospital</InputLabel>
                  <Select
                    {...field}
                    labelId="hospital-label"
                    id="hospital"
                    label="Hospital"
                    startAdornment={
                      <InputAdornment position="start">
                        <BusinessIcon color="action" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value=""><em>Selecione</em></MenuItem>
                    <MenuItem value="hospital-a">Hospital A</MenuItem>
                    <MenuItem value="hospital-b">Hospital B</MenuItem>
                    <MenuItem value="hospital-c">Hospital C</MenuItem>
                  </Select>
                  {errors.hospital && (
                    <FormHelperText>{errors.hospital.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="especialidade"
              control={control}
              render={({ field }) => (
                <FormControl 
                  fullWidth 
                  margin="normal"
                  error={!!errors.especialidade}
                >
                  <InputLabel id="especialidade-label">Especialidade</InputLabel>
                  <Select
                    {...field}
                    labelId="especialidade-label"
                    id="especialidade"
                    label="Especialidade"
                    startAdornment={
                      <InputAdornment position="start">
                        <MedicalServicesIcon color="action" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value=""><em>Selecione</em></MenuItem>
                    <MenuItem value="cardiologia">Cardiologia</MenuItem>
                    <MenuItem value="ortopedia">Ortopedia</MenuItem>
                    <MenuItem value="pediatria">Pediatria</MenuItem>
                    <MenuItem value="clinica-geral">Clínica Geral</MenuItem>
                  </Select>
                  {errors.especialidade && (
                    <FormHelperText>{errors.especialidade.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="cargo"
              control={control}
              render={({ field }) => (
                <FormControl 
                  fullWidth 
                  margin="normal"
                  error={!!errors.cargo}
                >
                  <InputLabel id="cargo-label">Cargo</InputLabel>
                  <Select
                    {...field}
                    labelId="cargo-label"
                    id="cargo"
                    label="Cargo"
                  >
                    <MenuItem value=""><em>Selecione</em></MenuItem>
                    <MenuItem value="medico">Médico</MenuItem>
                    <MenuItem value="enfermeiro">Enfermeiro</MenuItem>
                    <MenuItem value="recepcionista">Recepcionista</MenuItem>
                    <MenuItem value="administrador">Administrador</MenuItem>
                  </Select>
                  {errors.cargo && (
                    <FormHelperText>{errors.cargo.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </>
        );
      case 2:
        return (
          <>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirmar Senha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleToggleConfirmPasswordVisibility}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout 
      title="Criar Conta" 
      subtitle="Preencha os dados para se cadastrar"
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

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
        {renderStepContent()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Voltar
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Próximo
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            ou
          </Typography>
        </Divider>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Já tem uma conta?
          </Typography>
          <Link href="/login" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" fullWidth>
              Fazer login
            </Button>
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
}