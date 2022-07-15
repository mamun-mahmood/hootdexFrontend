import React, {  useState } from "react";

import {
  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
const ConnectWallet = ({ fetchWallet, wallet, setOpen, open }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    msg: "",
    type: "",
    loading: false,
  });
  const [email, setEmail] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    
    if (email) {
      setLoading(true);
      axios
        .post(`https://api.pecunovus.net/hootdex/connect-wallet`,{private_key:email})
        .then((res) => {
          setLoading(false);
          if (res.data) {
            localStorage.setItem(
              "hootdex_secretcookie_wallet",
              JSON.stringify(res.data)
            );
            fetchWallet();
            setAlert({
              msg: "Wallet Connected!",
              type: "success",
              show: true,
            });
            setTimeout(() => {
              handleClose();
              setAlert({
                msg: "Wallet Connected!",
                type: "success",
                show: false,
              });
            }, 1000);
          } else {
            setAlert({
              msg: "No account found with this key!",
              type: "error",
              show: true,
            });
            setTimeout(() => {
              setAlert({
                msg: "No account found with this key!",
                type: "error",
                show: false,
              });
            }, 3000);
          }
        })
        .catch((err) => {
          setLoading(false);
          setAlert({
            msg: "No account found with this key!",
            type: "error",
            show: true,
          });
          setTimeout(() => {
            setAlert({
              msg: "No account found with this key!",
              type: "error",
              show: false,
            });
          }, 3000);
        });
    } else {
      setAlert({
        msg: "Enter your private key!",
        type: "error",
        show: true,
      });
      setTimeout(() => {
        setAlert({
          msg: "Enter your private key!",
          type: "error",
          show: false,
        });
      }, 3000);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{borderRadius: '1rem'}}
      >
        {" "}
        <div style={{ backgroundColor: "black", borderRadius: '1rem'}} className="border">
          <DialogTitle
            className="twhite tcenter fontS22"
            id="alert-dialog-title"
          >
            Connect your wallet
          </DialogTitle>
          <Divider sx={{ backgroundColor: "#091e17", height: "2px" }} />
          {loading && <LinearProgress />}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Collapse in={alert.show} sx={{ maxWidth: 400, position: "fixed" }}>
              <Alert
                variant="outlined"
                severity={alert.type}
                sx={{ mb: 2, backgroundColor: "white", fontSize: "18px" }}
              >
                {alert.msg}
              </Alert>
            </Collapse>
          </div>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p style={{ color: "white", marginLeft: "15px" }}>Wallet Name</p>
              <input
                className="border inputfWW"
                type="text"
                name="walletName"
              />
            </DialogContentText>
            <DialogContentText id="alert-dialog-description" sx={{ mt: 1 }}>
              <p style={{ color: "white", marginLeft: "15px" }}>Private Key</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="border inputfWW"
                type="text"
                name="email"
                required
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="border"
              sx={{ color: "white" }}
              onClick={handleSubmit}
              autoFocus
            >
              Connect
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default ConnectWallet;
