import React from "react";
import { connect } from "react-redux";
import { acceptTransactionRequest } from "./action";
import TransactionInfo from "../../../TransactionInfo";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { convertWeiToVND } from "../../../../utils/convertCurrency";
import formatCurrency from "../../../../utils/formatCurrency";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const AcceptTransaction = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h4 className="">Overview</h4>
      <TransactionInfo />
      {props.transaction.state == "DEPOSIT_REQUEST" && !props.checkExpired && (
        <button className="btn v3 float-right mt-5 " onClick={handleClickOpen}>
          <i className="ion-android-"></i> Kubali
        </button>
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Kubali
        </DialogTitle>
        <DialogContent dividers>
          <div className="agent-details">
            <h5>Deposit Value</h5>
            <ul className="address-list">
              <li>
                <span>Amount Received:</span>
                {formatCurrency(
                  convertWeiToVND(props.transaction.depositPrice)
                )}{" "}
                TZS
              </li>
            </ul>
          </div>
          <div className="agent-details">
            <h5>Note:</h5>
            <ul className="address-list">
              <li>
                With this confirmation you will receive the deposit, and the property will be transferred if the buyer pays the full transaction amount.
              </li>
            </ul>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              props.acceptTransactionRequest(props.transaction.idInBlockchain);
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    acceptTransactionRequest: (idTransaction) => {
      dispatch(acceptTransactionRequest(idTransaction));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptTransaction);
