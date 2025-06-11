import React from "react";
import { connect } from "react-redux";
import { paymentRequest } from "./action";
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
const Payment = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="agent-details">
          <h5>Transaction Value</h5>
          <ul className="address-list">
            <li>
              <span>Transfer Amount:</span>
              {formatCurrency(
                convertWeiToVND(
                  props.transaction.transferPrice -
                    props.transaction.depositPrice
                )
              )}{" "}
              TZS
            </li>
            <li>
              <span>Registration Tax:</span>
              {formatCurrency(
                convertWeiToVND(props.transaction.transferPrice * 0.005)
              )}{" "}
              TZS
            </li>
            <li>
              <span>Total Amount:</span>
              {formatCurrency(
                convertWeiToVND(
                  props.transaction.transferPrice -
                    props.transaction.depositPrice +
                    props.transaction.transferPrice * 0.005
                )
              )}{" "}
              TZS
            </li>
          </ul>
        </div>
        <div className="agent-details">
          <h5>Note:</h5>
          <ul className="address-list">
            <li>
              With this confirmation you will transfer the transaction amount to the seller and wait for confirmation to complete the receipt of the property.
            </li>
            <li>
              You can cancel the transaction if the seller has not confirmed and reclaim your deposit.
            </li>
          </ul>
        </div>

        {props.transaction.state == "DEPOSIT_CONFIRMED" && !props.checkExpired && (
          <button
            className="btn v3 float-right mt-5 "
            onClick={handleClickOpen}
          >
            <i className="ion-android-"></i> Malizia Transfer
          </button>
        )}
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Malizia Transfer
        </DialogTitle>
        <DialogContent dividers>
          <div className="agent-details">
            <h5>Mnunuzi</h5>
            <ol className="address-list">
              <li>
                a)Pay the seller in full, on time and in the agreed manner;
              </li>
              <li>
                b) ;
              </li>
              <li>
                c) ;
              </li>
              <li>
                d) 
              </li>
            </ol>
          </div>
          <div className="agent-details">
            <h5>Buyer's Guarantee</h5>
            <ol className="address-list">
              <li>
                a) ;
              </li>
              <li>
                b) ;
              </li>
              <li>
                c) ;
              </li>
              <li>
                d) 
              </li>
            </ol>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              props.paymentRequest(props.transaction);
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
  return { transaction: state.transaction.data };
};

const mapDispatchToProps = (dispatch) => {
  return {
    paymentRequest: (idTransaction) => {
      dispatch(paymentRequest(idTransaction));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
