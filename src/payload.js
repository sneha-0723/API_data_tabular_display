import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
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
    color: "white"
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
    width: 300,
    backgroundColor: "white",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Payload() {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "ID",
      field: `tableData.id`,
      align: "center",
      filterPlaceholder: "Filter by id",
      emptyValue: () => <em>NULL</em>,
    },
    {
      title: "PAYLOAD_ID",
      field: "payload_id",
      filterPlaceholder: "Payload ID",
      emptyValue: () => <em>NULL</em>,
    },
    {
      title: "MANUFACTURER",
      field: "manufacturer",
      filterPlaceholder: "Manufacturer",
      align: "center",
      emptyValue: () => <em>NULL</em>,
    },
    {
      title: "NATIONALITY",
      field: "nationality",
      filterPlaceholder: "Nationality",
      emptyValue: () => <em>NULL</em>,
    },

    { title: "ORBIT", filterPlaceholder: "Orbit", field: "orbit", emptyValue: () => <em>NULL</em> },
    {
      title: "PAYLOAD_TYPE",
      field: "payload_type",
      filterPlaceholder: "Payload Type",
      emptyValue: () => <em>NULL</em>,
    },
  ];
  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/payloads")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
  }, []);
  const [open, setOpen] = React.useState(false);
  const [n, setn] = React.useState("NIL");
  const [orbit, setorbit] = React.useState("NIL");
  const [customers, setcustomer] = React.useState("NIL");
  const [ref_sys, setrefsys] = React.useState("NIL");
  const [regime, setregime] = React.useState("NIL");
  const [payload, setpayload] = React.useState("NIL");
  const [man, setman] = React.useState("NIL");

  const handleClickOpen = (e, data) => {
    setOpen(true);
    handlen(data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlen = (data) => {
      setn(data.nationality);


  

    setorbit(data.orbit);

    setcustomer(data.customers[0]);
    setrefsys(data.orbit_params.reference_system);
    setregime(data.orbit_params.regime);
    setpayload(data.payload_id);
    setman(data.manufacturer);
    
  };

  return (
    <div>
      
      <h1 align="center" >SPACE-X DETAILS</h1>
      <h4 align="center" style={{color:"blue", fontSize:"20px"}} >PAYLOAD DATA</h4>
    
      
      <hr></hr>
     
      <MaterialTable
        title="Space-x Payload"
        actions={[
          {
            icon: () => (
              <Button color="primary" variant="contained">
                DETAILS
              </Button>
            ),
            tooltip: "View more",
            onClick: (e, data) => {
              handleClickOpen(e, data);
              console.log(n);
            },
          },
        ]}
        options={{
          searchFieldVariant: "outlined",
          searchFieldAlignment: "right",
          searchAutoFocus: true,
          filtering: true,
          exportButton:true,
          exportAllData:true,
          paging:true,
           
            paginationType:"stepped",
            paginationPosition:"top",
            pageSizeOptions:[3,5,10,20,50,100],
          
        
          
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
        <DialogContent dividers>
          <Typography gutterBottom>
            <b>Payload ID: </b>: {payload}
          </Typography>
          <Typography gutterBottom>
            <b>Manufacturer: </b>{man}
          </Typography>
          <Typography gutterBottom>
            <b>Nationality: </b> {n}
          </Typography>
          <Typography gutterBottom>
            <b>Orbit: </b>
            {orbit}
          </Typography>
          <Typography gutterBottom>
            <b>Customers:</b> {customers}
          </Typography>
          <Typography gutterBottom>
            <b>Refernce System:</b> {ref_sys}
          </Typography>
          <Typography gutterBottom>
            <b>Regime:</b> {regime}
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

export default Payload;
