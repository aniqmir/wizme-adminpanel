import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Table from "../../../components/Table/Table.jsx";

export default function AllItems() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    document.title = "ALL Items";
    axios
      .get(`https://wizme-api.herokuapp.com/admin/item`, {})
      .then(res => {
        setData(res.data.doc);
      })
      .catch(error => {
        console.log(error.response);
      });
  }, []);

  function getData() {
    axios
      .get(`https://wizme-api.herokuapp.com/admin/item`, {})
      .then(res => {
        setData(res.data.doc);
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  if (data.length === 0) {
    return <div>loading</div>;
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={8} sm={12} md={12}>
        <Table data={data} getData={() => getData()} />
      </Grid>
    </Grid>
  );
}
