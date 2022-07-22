import * as React from 'react';
import { Box, Button, ClickAwayListener, ListItemIcon } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import AssetChart from './AssetChart';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import TokenList from '../Modal/TokenList';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TokenIcon from '@mui/icons-material/Token';
import Vault from '../../assets/images/vault-svgrepo-com.svg';
import WalletDashboard from './WalletDashboard';
import TokenDashboard from './TokenDashboard';
import VaultDashboard from './VaultDashboard';
import MyProfile from './MyProfile';
import url from '../../serverUrl';

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

function DashboardContent({ user, pecuCoins }) {
  const navigate = useNavigate();
  const [tokenCreated, setTokenCreated] = React.useState([]);
  const [pendingToken, setPendingTokens] = React.useState([]);
  const [totalCoins, setTotalCoins] = React.useState('');
  const [totalValue, setTotalValue] = React.useState('');
  const [nftCount, setNftCount] = React.useState('');
  const [totalCoinsVault, setTotalCoinsVault] = React.useState('');
  const username = user.username;
  const wallet = JSON.parse(
    localStorage.getItem('hootdex_secretcookie_wallet')
  );
  const [modal, setModal] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    setModal(e);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getMyCoins = (id) => {
    if (id) {
      axios
        .post(`${url}/wallet/getMycoins`, {
          user_id: id
        })
        .then((res) => {
          const { total_coins, value } = res.data;
          setTotalCoins(total_coins);
          setTotalValue(value);
        });
    }
  };

  const getMyCoinsVault = (id) => {
    if (id) {
      axios
        .post(`${url}/vault/getCoins`, {
          uid: id
        })
        .then((res) => {
          const { coin } = res.data;
          setTotalCoinsVault(coin);
        });
    }
  };

  const getNftCount = (email) => {
    if (email) {
      axios
        .post(`${url}/vault/getNftCount`, {
          email: email
        })
        .then((res) => {
          const { nft } = res.data;
          setNftCount(nft);
        });
    }
  };
  useEffect(() => {
    if (username) {
      axios.get(`${url}/hootdex/token/${username}`).then((res) => {
        setTokenCreated(res.data.reverse());
      });
      console.log(username);
      axios
        .get(`${url}/hootdex/token-buying-request/${username}`)
        .then((res) => {
          setPendingTokens(res.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (wallet && wallet.uid) {
      getMyCoins(wallet.uid);
    }
  }, [wallet]);

  useEffect(() => {
    let data = localStorage.getItem('hootdex_secretcookie');
    data = JSON.parse(data);
    if (data && data.user_id) {
      getMyCoinsVault(data.user_id);
      getNftCount(data.email);
    }
  });
  const [openD, setOpenD] = React.useState(false);
  const [tier, setTier] = React.useState(user.tier || 2);
  const toggleDrawer = () => {
    setOpenD(!openD);
  };
  const [tab, setTab] = React.useState('Vault');
  return (
    <>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <Box>
          <ClickAwayListener onClickAway={() => setOpenD(false)}>
            <Drawer
              variant="permanent"
              open={openD}
              sx={{ border: 'none' }}
              onClose={() => setOpenD(!openD)}
              PaperProps={{
                style: { border: 'none', borderRight: '2px solid #01402b' }
              }}
            >
              <List
                sx={{
                  backgroundColor: '#04251a',
                  // background:
                  //   "linear-gradient(to bottom, #01402b, #023927, #033223, #032c1e, #04251a)",
                  width: '100%',
                  height: '100vh',
                  overflowX: 'hidden'
                }}
              >
                <ListItemButton
                  sx={{
                    color: 'white',
                    // width: "95%",
                    mb: 1,
                    borderBottom: '1px solid #091e17',
                    borderTop: '1px solid #091e17'
                  }}
                  onClick={toggleDrawer}
                  // className={`${tab === 'Vault' && "button-hover"}`}
                >
                  <ListItemIcon sx={{ color: '#00071a' }}>
                    {openD === false && (
                      <MenuIcon sx={{ width: 40, height: 40 }} />
                    )}
                    {openD && (
                      <ChevronLeftIcon
                        sx={{ width: 40, height: 40, textAlign: 'end' }}
                      />
                    )}
                  </ListItemIcon>
                </ListItemButton>{' '}
                <ListItemButton
                  sx={{
                    color: 'white',
                    backgroundColor: `${tab === 'Vault' ? '' : '#00071a'}`,
                    borderTopRightRadius: '20px',
                    borderBottomRightRadius: '20px',
                    width: '95%',
                    mb: 1,
                    border: '1px solid #091e17'
                  }}
                  onClick={() => setTab('Vault')}

                  // className={`${tab === 'Vault' && "button-hover"}`}
                >
                  <ListItemIcon>
                    <img src={Vault} alt="vault icon" />
                  </ListItemIcon>
                  <ListItemText primary="Vault" />
                </ListItemButton>
                <ListItemButton
                  sx={{
                    color: 'white',
                    backgroundColor: `${tab === 'Wallet' ? '' : '#00071a'}`,
                    borderTopRightRadius: '20px',
                    borderBottomRightRadius: '20px',
                    width: '95%',
                    mb: 1,
                    border: '1px solid #091e17'
                  }}
                  onClick={() => setTab('Wallet')}
                >
                  <ListItemIcon>
                    <AccountBalanceWalletIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Wallet" />
                </ListItemButton>
                {tier === 0 && (
                  <ListItemButton
                    sx={{
                      color: 'white',
                      backgroundColor: `${tab === 'Users' ? '' : '#00071a'}`,
                      borderTopRightRadius: '20px',
                      borderBottomRightRadius: '20px',
                      width: '95%',
                      mb: 1,
                      border: '1px solid #091e17'
                    }}
                    onClick={() => setTab('Users')}
                  >
                    <ListItemIcon>
                      <GroupIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItemButton>
                )}
                <ListItemButton
                  sx={{
                    color: 'white',
                    backgroundColor: `${tab === 'Token' ? '' : '#00071a'}`,
                    borderTopRightRadius: '20px',
                    borderBottomRightRadius: '20px',
                    width: '95%',
                    mb: 1,
                    border: '1px solid #091e17'
                  }}
                  onClick={() => setTab('Token')}
                >
                  <ListItemIcon>
                    <TokenIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Tokens" />
                </ListItemButton>
                <ListItemButton
                  sx={{
                    color: 'white',
                    backgroundColor: `${tab === 'Profile' ? '' : '#00071a'}`,
                    borderTopRightRadius: '20px',
                    borderBottomRightRadius: '20px',
                    width: '95%',
                    mb: 1,
                    border: '1px solid #091e17'
                  }}
                  onClick={() => setTab('Profile')}
                >
                  <ListItemIcon>
                    <AccountCircleIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItemButton>
              </List>
            </Drawer>
          </ClickAwayListener>
        </Box>
        {/* showing dashboard based on user tier level */}
        <Box sx={{ flex: 1, mt: 1 }}>
          {/* wallet dashboard */}
          {tab === 'Wallet' && (
            <WalletDashboard user={user} pecuCoins={pecuCoins} />
          )}
          {/* Token Dashboard  */}
          {tab === 'Token' && (
            <TokenDashboard user={user} pecuCoins={pecuCoins} />
          )}
          {/* Vault dashboard */}
          {tab === 'Vault' && (
            <VaultDashboard user={user} pecuCoins={pecuCoins} />
          )}
          {tab === 'Profile' && <MyProfile user={user} />}
        </Box>
      </div>
    </>
  );
}

export default function Tier2Dashboard({ user, pecuCoins }) {
  return <DashboardContent user={user} pecuCoins={pecuCoins} />;
}
