import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function Addthemes() {
  const [url, setUrl] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [itemName, setItemname] = React.useState("");
  const [color, setColor] = React.useState("");
  const [fontSize, setFontSize] = React.useState("");
  const [fontFamily, setFontFamily] = React.useState("");

  useEffect(() => {
    document.title = "Add Themes";
  }, []);

  function changeImage(e) {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);

    axios
      .post(`https://wizme-api.herokuapp.com/api/upload`, formData)
      .then(res => {
        if (res) {
          console.log(res.data);
          setUrl(res.data);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  function createtheme() {
    axios
      .post(`https://wizme-api.herokuapp.com/admin/item`, {
        itemUrl: url,
        itemName: itemName,
        itemPrice: price,
        itemType: "theme",
        themeProperties: {
          color: color,
          fontSize: fontSize,
          fontFamily: fontFamily
        }
      })
      .then(res => {
        if (res) {
          console.log(res);
          setUrl("");
          setPrice("");
          setItemname("");
          setColor("");
          setFontSize("");
          setFontFamily("");
          //   props.history.push("/dashboard");
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2">
          Upload Image
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <div className="custom-file" style={{ width: "200px", height: "10px" }}>
          <input
            type="file"
            className="custom-file-input"
            id="validatedCustomFile"
            onChange={e => changeImage(e)}
            required
          />
          <label className="custom-file-label" htmlFor="validatedCustomFile">
            Choose file...
          </label>
          <div className="invalid-feedback">
            Example invalid custom file feedback
          </div>
        </div>
      </Grid>
      <Grid item xs={6}>
        <img
          src={
            url.length !== 0
              ? url
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png"
          }
          style={{ width: "100%", height: "auto" }}
          alt={url !== "" ? url : "No Image"}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-price"
          label="Price"
          value={price}
          margin="normal"
          variant="outlined"
          onChange={e => setPrice(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-itemname"
          label="Item Name"
          value={itemName}
          margin="normal"
          variant="outlined"
          onChange={e => setItemname(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-color"
          label="Color"
          value={color}
          margin="normal"
          variant="outlined"
          onChange={e => setColor(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-fontsize"
          label="Font Size"
          value={fontSize}
          margin="normal"
          variant="outlined"
          onChange={e => setFontSize(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-fontfamily"
          label="Font-Family"
          value={fontFamily}
          margin="normal"
          variant="outlined"
          onChange={e => setFontFamily(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4} container spacing={0} justify="center">
        <Button
          disabled={url ? false : true}
          variant="contained"
          style={{ width: "75%" }}
          onClick={() => createtheme()}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
}
