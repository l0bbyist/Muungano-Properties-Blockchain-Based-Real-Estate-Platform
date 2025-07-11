import React from "react";
import { connect } from "react-redux";
import { confirmTransactionRequest } from "./actions";
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
const ConfirmTransaction = (props) => {
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
          <h5>Confirm Transaction</h5>
          <ul className="address-list">
            <li>
              <span>Transaction Value:</span>
              {formatCurrency(
                convertWeiToVND(props.transaction.transferPrice)
              )}{" "}
              TZS
            </li>
            <li>
              <span>Deposit Amount:</span>
              {formatCurrency(
                convertWeiToVND(props.transaction.depositPrice)
              )}{" "}
              TZS
            </li>
            <li>
              <span>Remaining Amount:</span>
              {formatCurrency(
                convertWeiToVND(
                  props.transaction.transferPrice -
                    props.transaction.depositPrice
                )
              )}{" "}
              TZS
            </li>
            <li>
              <span>Personal Income Tax:</span>
              {formatCurrency(
                convertWeiToVND(props.transaction.transferPrice * 0.02)
              )}{" "}
              TZS
            </li>
            <li>
              <span>Amount Received:</span>
              {formatCurrency(
                convertWeiToVND(
                  props.transaction.transferPrice -
                    props.transaction.depositPrice -
                    props.transaction.transferPrice * 0.02
                )
              )}{" "}
              TZS
            </li>
          </ul>
          <h6>Note</h6>
          <ul className="address-list">
            <li>
              By agreeing to confirm this transaction, you must comply with the requirements of the terms of the contract!
            </li>
          </ul>
        </div>
        {props.transaction.state == "PAYMENT_REQUEST" && !props.checkExpired && (
          <button
            className="btn v3 float-right mt-5 "
            onClick={handleClickOpen}
          >
            <i className="ion-android-"></i> Confirm Transaction
          </button>
        )}
      </div>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Confirm Transaction
        </DialogTitle>
        <DialogContent dividers>
          <div className="agent-details">
            <h5>Mnunuzi</h5>
            <ol className="address-list">
              <li>
                a) Pay the seller in full, on time and in the agreed manner.
              </li>
              <li>
                b) Muuzaji anathibitisha kuwa kiwanja kinamilikiwa kihalali kwa jina lake na hakina mgogoro wowote wa kisheria. 
              </li>
              <li>
                c) Mnunuzi atapatiwa nakala halisi au zilizothibitishwa za hati ya umiliki pamoja na nyaraka zote muhimu za ardhi.
              </li>
              <li>
                d) Mnunuzi ana haki ya kufanya uhakiki wa umiliki na mipaka ya kiwanja kupitia Wizara ya Ardhi au Serikali za Mitaa kabla ya kumalizia malipo.
              </li>
              <li>
                e) Kiwanja kinauzwa bila kuwa na rehani, deni la ardhi (land rent), au wajibu mwingine wa kifedha.
              </li>
              <li>
                f) Iwapo utagundulika udanganyifu kwenye mchakato au nyaraka, mnunuzi ana haki ya kughairi muamala na kudai fidia.
              </li>
            </ol>
          </div>
          <div className="agent-details">
            <h5>Muuzaji</h5>
            <ol className="address-list">
              <li>
                a) Muuzaji anahakikisha kuwa yeye ndiye mmiliki halali na peke yake wa kiwanja na ana mamlaka ya kuuza.
              </li>
              <li>
                b) Muuzaji anathibitisha kuwa hakuna mtu mwingine anayedai umiliki wa kiwanja hicho, ikiwemo migogoro ya kifamilia au mirathi.
              </li>
              <li>
                c) Muuzaji atatoa maelezo yote ya kweli kuhusu historia ya kiwanja, matumizi yaliyopita, na wamiliki wa awali (kama walikuwepo). 
              </li>
              <li>
                d) Muuzaji atashirikiana na mnunuzi katika mchakato mzima wa kuhamisha hati ya kiwanja kwa jina la mnunuzi, ikiwemo kusaini nyaraka zote zinazohitajika. 
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
              props.confirmTransactionRequest(props.transaction);
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

// };

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmTransactionRequest: (idTransaction) => {
      dispatch(confirmTransactionRequest(idTransaction));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTransaction);
