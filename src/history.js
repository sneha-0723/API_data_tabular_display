import "./App.css";
import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(2),
    color: "white",
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    backgroundColor: "white",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function History() {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [title, settitle] = React.useState("NIL");
  const [reddit, setreddit] = React.useState("NIL");
  const [article, setarticle] = React.useState("NIL");
  const [wikipedia, setwike] = React.useState("NIL");
  const [date, setdate] = React.useState("NIL");
  const [flight, setflight] = React.useState("NIL");

  const handleClickOpen = (e, data) => {
    setOpen(true);
    handlen(data);
    console.log(data.flight_number);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlen = (data) => {
    settitle(data.title);
    setarticle(data.links.article);
    setreddit(data.links.reddit);
    setwike(data.links.wikipedia);
    setdate(data.event_date_utc);
  };

  const columns = [
    {
      title: "ID",
      field: "id",
      align: "center",
      filterPlaceholder: "filter-by-id",
      sorting: false,
      emptyValue: () => <em>NULL</em>,
    },
    {
      title: "TITLE",
      field: "title",
      align: "center",
      filterPlaceholder: "filter by news",
      sorting: false,
      emptyValue: () => <em>NULL</em>,
    },
    {
      title: "EVENT DATE",
      field: "event_date_utc",
      filterPlaceholder: "date-picker",
      align: "center",
      type: "date",
      defaultSort: "desc",
      dateSetting: { locale: "en-GB" },
      emptyValue: () => <em>NULL</em>,
    },
    {
      title: "EVENT DATE(unix)",
      field: "event_date_unix",
      align: "center",
      filtering: false,
      export:false,
      emptyValue: () => <em>NULL</em>,
    },
    {
      title: "FLIGHT NUMBER",
      field: "flight_number",
      filterPlaceholder: "filter by flight_no",
      align: "center",
      emptyValue: () => <em>NULL</em>,
    },
  ];
  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/history")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        setData(res);
      });
  }, []);

  return (
    <div>
      <h1 align="center">SPACE-X DETAILS</h1>
      <h4 align="center" style={{color:"blue", fontSize:"20px"}}>HISTORY DATA</h4>
      <hr></hr>
      <MaterialTable
        options={{
          searchFieldVariant: "outlined",
          searchFieldAlignment: "right",
          searchAutoFocus: true,
          paging: true,
          pageSizeOptions: [3, 5, 10, 20, 50, 100],
          paginationType: "stepped",
          paginationPosition: "top",
          filtering: true,
          exportButton:true,
          exportAllData:true,
          rowStyle: (data, index) =>
            index % 2 == 0
              ? { background: "#e6e6fa" }
              : { background: "#cbc3e3" },
          headerStyle: {
            background: "#e0b0ff",
            fontWeight: "bold",
            fontStyle: "italics",
          },
        }}
        actions={[
          {
            icon: () => (
              <Button color="primary" variant="contained">
                ARTICLES
              </Button>
            ),

            onClick: (e, data) => {
              handleClickOpen(e, data);
            },
          },
        ]}
        title="Space-x HISTORY"
        data={data}
        columns={columns}
        
      />
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle
          onClose={handleClose}
          style={{
            color: "white",
            fontWeight: "500",
            backgroundColor: "black",
          }}
        >
          DETAILS
        </DialogTitle>
        <DialogContent   dividers>
          <Typography gutterBottom>
            <b>TITLE: </b>: {title}
          </Typography>
          <Typography gutterBottom>
            <b>EVENT DATE: </b>
            <a type="date">{date}</a>
          </Typography>
          <Typography gutterBottom>
            <b>ARTICLE: </b>{" "}
            <a href={article} target="_blank">
              Check out article
            </a>
          </Typography>
          <Typography gutterBottom>
            <b>REDDIT: </b>{" "}
            <a href={reddit} target="_blank">
              Reddit
            </a>
          </Typography>
          <Typography gutterBottom>
            <b>WIKEPEDIA: </b>
            <a href={wikipedia} target="_blank">
              Wikepedia
            </a>
          </Typography>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "black", color: "white" }}>
          <Button
            autoFocus
            onClick={handleClose}
            style={{ color: "white", backgroundColor: "blue" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default History;
