'use client';

import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SettingsIcon from '@mui/icons-material/Settings';
import QrCodeIcon from '@mui/icons-material/QrCode';
import MonitorIcon from '@mui/icons-material/Monitor';
import CallIcon from '@mui/icons-material/Call';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Pacientes', icon: <PeopleIcon />, path: '/pacientes' },
  { 
    text: 'Senhas', 
    icon: <ConfirmationNumberIcon />, 
    path: '/senhas',
    subItems: [
      { text: 'Emitir Senha', icon: <QrCodeIcon />, path: '/senhas/emitir' },
      { text: 'Painel de Senhas', icon: <MonitorIcon />, path: '/senhas/painel' },
      { text: 'Chamar Senha', icon: <CallIcon />, path: '/senhas/chamar' },
    ]
  },
  { text: 'Filas', icon: <ConfirmationNumberIcon />, path: '/filas' },
  { text: 'Hospitais', icon: <LocalHospitalIcon />, path: '/hospitais' },
  { text: 'Especialidades', icon: <MedicalServicesIcon />, path: '/especialidades' },
  { text: 'Configurações', icon: <SettingsIcon />, path: '/configuracoes' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleSubMenu = (text: string) => {
    setExpandedMenu(expandedMenu === text ? null : text);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            MedPass
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            boxSizing: 'border-box',
            ...(open ? { width: drawerWidth } : { width: theme.spacing(7) }),
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => {
            const isActive = pathname === item.path || pathname?.startsWith(`${item.path}/`);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedMenu === item.text;
            
            return (
              <Box key={item.text}>
                <ListItem disablePadding>
                  {hasSubItems ? (
                    <ListItemButton 
                      onClick={() => toggleSubMenu(item.text)}
                      sx={{
                        minHeight: 48,
                        bgcolor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                          color: isActive ? 'primary.main' : 'inherit',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text} 
                        sx={{ 
                          opacity: open ? 1 : 0,
                          color: isActive ? 'primary.main' : 'inherit',
                          fontWeight: isActive ? 600 : 400,
                        }} 
                      />
                      {open && hasSubItems && (
                        isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />
                      )}
                    </ListItemButton>
                  ) : (
                    <Link href={item.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          bgcolor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color: isActive ? 'primary.main' : 'inherit',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text} 
                          sx={{ 
                            opacity: open ? 1 : 0,
                            color: isActive ? 'primary.main' : 'inherit',
                            fontWeight: isActive ? 600 : 400,
                          }} 
                        />
                      </ListItemButton>
                    </Link>
                  )}
                </ListItem>
                
                {/* SubMenu Items */}
                {open && hasSubItems && isExpanded && (
                  <List component="div" disablePadding>
                    {item.subItems?.map((subItem) => {
                      const isSubItemActive = pathname === subItem.path;
                      return (
                        <Link 
                          key={subItem.text} 
                          href={subItem.path}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <ListItemButton sx={{ pl: 4, bgcolor: isSubItemActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent' }}>
                            <ListItemIcon 
                              sx={{
                                minWidth: 0,
                                mr: 3,
                                color: isSubItemActive ? 'primary.main' : 'inherit',
                              }}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={subItem.text} 
                              sx={{ 
                                color: isSubItemActive ? 'primary.main' : 'inherit',
                                fontWeight: isSubItemActive ? 600 : 400,
                              }} 
                            />
                          </ListItemButton>
                        </Link>
                      );
                    })}
                  </List>
                )}
              </Box>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}