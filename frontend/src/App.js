import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';
import './App.css';

// Páginas
import ConfiguracoesSistema from './pages/ConfiguracoesSistema';
import PlanoContasPage from './pages/PlanoContasPage';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' },
  },
});

function HomePage() {
  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Sistema de Contabilidade
      </Typography>
      <Typography variant="h5" gutterBottom color="text.secondary">
        Bem-vindo ao sistema
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          size="large"
          component={Link}
          to="/plano-contas"
          sx={{ mr: 2 }}
          startIcon={<AccountTreeIcon />}
        >
          Acessar Plano de Contas
        </Button>
        <Button 
          variant="outlined" 
          size="large"
          component={Link}
          to="/configuracoes"
          startIcon={<SettingsIcon />}
        >
          Configurações
        </Button>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router
            future={{
             v7_startTransition: true,
             v7_relativeSplatPath: true,
      }}>

        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Sistema de Contabilidade
              </Typography>
              <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
                 Home
              </Button>
              <Button color="inherit" component={Link} to="/plano-contas" startIcon={<AccountTreeIcon />}>
               Plano de Contas
              </Button>
              <Button color="inherit" component={Link} to="/configuracoes" startIcon={<SettingsIcon />}>
               Configurações
              </Button>
            </Toolbar>
          </AppBar>

          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/plano-contas" element={<PlanoContasPage />} />
              <Route path="/configuracoes" element={<ConfiguracoesSistema />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;