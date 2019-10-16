import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Delete from "@material-ui/icons/DeleteForever";
import { IconButton } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

export default function SimpleTable(props) {
  const classes = useStyles();

  function deleteItem(id) {
    axios
      .delete(`https://wizme-api.herokuapp.com/admin/item/${id}`, {})
      .then(res => {
        console.log(res);
        props.getData();
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">Item Price</TableCell>
            <TableCell align="right">Item Type</TableCell>
            <TableCell align="right">Item Image</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(row => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.itemName}
              </TableCell>
              <TableCell align="right">{row.itemPrice}</TableCell>
              <TableCell align="right">{row.itemType}</TableCell>
              <TableCell align="right">
                <img
                  src={row.itemUrl}
                  style={{ width: "40px", height: "40px" }}
                  alt={row.itemName}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => deleteItem(row._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
