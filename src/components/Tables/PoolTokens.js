import React from "react";
import {
  Avatar,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const PoolTokens = () => {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
  const fetchToken = (target) => {
    if (target === "all") {
      setLoading(true);
      axios
        .get("https://api.pecunovus.net/hootdex/available-tokens")
        .then((res) => {
          setTokens(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      setTokens(tokens.filter((each) => each.tokenName === target));
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchToken("all");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TableContainer
        sx={{
          backgroundColor: "#1a1b1f",
          mt: 5,
          borderRadius: "1rem",
        }}
        component={Paper}
      >
        <div className="">
          <p
            style={{
              color: "rgb(195, 197, 203)",
              fontSize: "1.4rem",
              fontWeight: "600",
              textAlign: "center",
              backgroundColor: "#21242b",
            }}
          >
          Tokens
          </p>
              {loading && <LinearProgress color="inherit" />}
        </div>
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: " 1px solid #1e2128",
            },
          }}
        >
          <TableHead className="">
            <TableRow className="">
              {/* {poolTableAttributes.map((e, index) => ( */}
              <TableCell className="twhite" component="th" scope="row">
                #
              </TableCell>
              <TableCell className="twhite">Name</TableCell>
              <TableCell className="twhite" align="left">
                Price
              </TableCell>
              <TableCell className="twhite" align="left">
                Available Tokens
              </TableCell>
              <TableCell className="twhite" align="left">
                Volume
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.length &&
              tokens.map((each, index) => (
                <TableRow key={each.id}>
                  <TableCell className="twhite" component="th" scope="row">
                    {each.id}
                  </TableCell>
                  <TableCell className="twhite" align="left">
                    <Link to={`/t/${each.tokenName}`}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          className="rounded"
                          src={`https://api.pecunovus.net/hootdex/images/${each?.logo_src}`}
                          alt="token logo"
                        />
                        <span style={{ marginLeft: "1rem", fontSize: "20px" }}>
                          {each.tokenName}{" "}
                          <small style={{ color: "#696c75" }}>
                            ({each.tokenSymbol})
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
      </TableContainer>
    </>
  );
};

export default PoolTokens;
