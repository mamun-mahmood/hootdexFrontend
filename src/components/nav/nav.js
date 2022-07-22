import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

import ConnectWallet from '../Modal/ConnectWallet';
import {
  Avatar,
  Button,
  ClickAwayListener,
  div,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';
import url from '../../serverUrl';
export default function Nav({ fetchWallet, wallet }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [showSugesstion, setShowSugesstion] = useState(false);
  const findUser = async () => {
    let data = localStorage.getItem('hootdex_secretcookie');
    if (data) {
      setUser(JSON.parse(data));
    }
  };
  const location = useLocation();
  useEffect(() => {
    setUser(null);
    findUser();
  }, [location]);

  useEffect(() => {
    findUser();
  }, []);
  const [searchKey, setSearchKey] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (searchKey) {
    //   fetchToken(searchKey);
    // } else fetchToken("all");
  };
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
  const fetchToken = (target) => {
    if (target === 'all') {
      setLoading(true);
      axios
        .get(`${url}/hootdex/available-tokens`)
        .then((res) => {
          setTokens(res.data);

          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      setTokens(tokens.filter((each) => each.symbol === target));
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchToken('all');
  }, []);
  return (
    <>
      <div container spacing={1} className="nav">
        <div item sm={6} md={6} lg={2} className="">
          <Link to="/" className="logo__header">
            <img src={logo} alt="nav_logo" width={200} />
          </Link>
        </div>
        <div item sm={6} md={6} lg={2} sx={{ textAlign: 'end' }}>
          <Link to="/wallet">
            {' '}
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                textTransform: 'capitalize',
                m: 1
              }}
            >
              Ecosystem
            </Button>
          </Link>
          <Link to="/Community">
            {' '}
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                textTransform: 'capitalize',
                m: 1
              }}
            >
              Community
            </Button>
          </Link>
        </div>
        <Box sx={{ width: 500 }}>
          <form
            style={{
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center'
            }}
            className="form-control"
            onSubmit={handleSubmit}
          >
            <ClickAwayListener onClickAway={() => setShowSugesstion(false)}>
              <input
                style={{
                  width: '100%',
                  height: '0.8rem'
                }}
                onClick={() => setShowSugesstion(true)}
                className="border searchField "
                type="text"
                placeholder="Search for token..."
                name="searchKey"
                value={searchKey}
                autocomplete="off"
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </ClickAwayListener>
          </form>
          {/* <div className="search-sugesstion-container"> */}
          {showSugesstion && (
            <TableContainer
              sx={{
                backgroundColor: '#1a1b1f',
                // mt: "70px",
                borderBottomLeftRadius: '1rem',
                borderBottomRightRadius: '1rem',
                position: 'absolute',
                // left: 0,
                maxWidth: 500,
                animation: 'fadeIn 0.4s ease-in-out'
                // mt:"1px"
              }}
              className="borderGrey hide-scrollbar "
              component={Paper}
            >
              {tokens.length ? (
                <Table
                  sx={{
                    [`& .${tableCellClasses.root}`]: {
                      borderBottom: ' 1px solid #1e2128'
                    },
                    width: '100%'
                  }}
                >
                  <TableHead className="">
                    <TableRow className="">
                      {/* {poolTableAttributes.map((e, index) => ( */}
                      {/* <TableCell className="twhite" component="th" scope="row">
                    #
                  </TableCell> */}
                      <TableCell className="twhite">Name</TableCell>
                      <TableCell className="twhite" align="center">
                        Price
                      </TableCell>
                      <TableCell className="twhite" align="center">
                        Available Tokens
                      </TableCell>
                      <TableCell className="twhite" align="center">
                        Volume
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tokens.length &&
                      tokens.map((each, index) => (
                        <TableRow key={each.id}>
                          {/* <TableCell className="twhite" component="th" scope="row">
                    {each.id}
                  </TableCell> */}
                          <TableCell className="twhite" align="left">
                            <Link to={`/t/${each.tokenName}`}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <Avatar
                                  className="rounded"
                                  src={`${url}/hootdex/images/${each?.logo_src}`}
                                  alt="token logo"
                                  style={{ width: '20px', height: '20px' }}
                                />
                                <Avatar
                                  className="rounded"
                                  src={`https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico`}
                                  alt="token logo"
                                  style={{ width: '20px', height: '20px' }}
                                />
                                <span
                                  style={{
                                    marginLeft: '1rem',
                                    fontSize: '20px'
                                  }}
                                >
                                  {each.tokenName}{' '}
                                  <small style={{ color: '#696c75' }}>
                                    ({`${each.tokenSymbol}/PECU`})
                                  </small>
                                </span>
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell className="twhite green" align="left">
                            {each.tokenPrice}
                          </TableCell>
                          <TableCell className="twhite yellow" align="left">
                            {each.totalToken}
                          </TableCell>
                          <TableCell className="twhite pink" align="left">
                            {each.investementAmount}
                          </TableCell>
                        </TableRow>
                      ))}

                    {/* <TablePagination
                sx={{ color: "white" }}
                rowsPerPageOptions={[10, 50]}
                onChange={(e) => setRows(e)}
              /> */}
                  </TableBody>
                </Table>
              ) : (
                <p style={{ textAlign: 'center', color: 'white' }}>
                  Nothing to show !
                </p>
              )}
            </TableContainer>
          )}
        </Box>
        {/* </div> */}
        <div item xs={6} md={6} lg={2}>
          {true ? (
            <>
              {JSON.parse(
                localStorage.getItem('hootdex_secretcookie_wallet')
              ) ? (
                <Link to="">
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'white',
                      textTransform: 'capitalize'
                    }}
                    onClick={() => {
                      localStorage.removeItem('hootdex_secretcookie_wallet');
                      fetchWallet();
                    }}
                  >
                    Disconnect Wallet
                  </Button>
                </Link>
              ) : (
                <Link to="">
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'white',
                      textTransform: 'capitalize'
                    }}
                    onClick={handleOpen}
                  >
                    Connect Wallet
                  </Button>
                </Link>
              )}
              <Link to="/">
                {' '}
                <Button
                  variant="outlined"
                  sx={{
                    color: 'white',
                    textTransform: 'capitalize',
                    m: 1
                  }}
                >
                  Tokens
                </Button>
              </Link>
              <Link to="/Developers">
                {' '}
                <Button
                  variant="outlined"
                  sx={{
                    color: 'white',
                    textTransform: 'capitalize',
                    m: 1
                  }}
                >
                  Developers
                </Button>
              </Link>
              <Link to="/dashboard">
                {' '}
                <Button
                  variant="outlined"
                  sx={{
                    color: 'white',
                    textTransform: 'capitalize',
                    m: 1
                  }}
                >
                  MVault
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              {' '}
              <Button
                variant="outlined"
                sx={{
                  color: 'white',
                  textTransform: 'capitalize',
                  m: 1
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
        {/* < className="">
        <Link to="/wallet">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              Ecosystem
            </Button>
          </Link>
          <Link to="/Community">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              Community
            </Button>
          </Link>
          <Link to="/">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              Tokens
            </Button>
          </Link>
          <Link to="/Developers">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              Developers
            </Button>
          </Link>
          <Link to="/Blog">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              Blog
            </Button>
          </Link>
          <Link to="/Faq">
            {" "}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                textTransform: "capitalize",
                m: 1,
              }}
            >
              FAQ
            </Button>
          </Link>
         
        </div> */}
      </div>
      <ConnectWallet
        setOpen={setOpen}
        open={open}
        fetchWallet={fetchWallet}
        wallet={wallet}
      />
    </>
  );
}
