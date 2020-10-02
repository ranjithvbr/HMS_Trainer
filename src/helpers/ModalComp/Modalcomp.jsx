import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import './Modalcomp.css';
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class Modalcomp extends React.Component {
  constructor(props) {
    super(props);
  console.log(props);
    this.state = {open: true,};
  }
  

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.props.closemodal(false);
    // this.setState({ open: false });
  };

  render() {

    return (
      <div className="modaldiv">
       
        <Dialog className="Dialogmodal"
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.visible}
           maxWidth={this.props.xswidth ? 'xs' : 'md'}
           fullWidth={true}
           disableBackdropClick={false}
        >
          <DialogTitle id="customized-dialog-title" className="Modaltiltle" onClose={this.handleClose}>
            <span className = "modal_tittle">{this.props.title}</span>
          </DialogTitle>
          <DialogContent dividers className="DialogContent">
           {this.props.children}
          </DialogContent>
   
        </Dialog>
      </div>
    );
  }
}

export default Modalcomp;