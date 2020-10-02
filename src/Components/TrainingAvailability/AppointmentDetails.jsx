/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { lighten, makeStyles, fade } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Icon, message, Popconfirm } from "antd";
import Grid from "@material-ui/core/Grid";
import "./AppointmentDetails.css";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Divider } from "antd";
import { Select } from "antd";
import { Input } from "antd";
// import { apiurl } from "../../App";
import ScheduleComp from "./ScheduleComp";
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function createData(
  name,
  emp_name,
  type_leave,
  from,
  to,
  leave_reason,
  status
) {
  return { name, emp_name, type_leave, from, to, leave_reason, status };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  console.log("sort", array);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    console.log("order", order);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: "sno", label: "SNo" },
  { id: "from time", label: "From Time" },
  { id: "to time", label: "To Time" },
  { id: "slot duration", label: "Slot Duration" },
  { id: "no of slots", label: "No. of slots" },
  { id: "vip", label: "VIP" },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <Table className="table headertablesub" aria-labelledby="tableTitle">
          <TableHead>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell align="right" style={{ width: "4vw" }}>
                Sno
              </TableCell>
              <TableCell align="right" style={{ width: "5vw" }}>
                From Time
              </TableCell>
              <TableCell align="right" style={{ width: 90 }}>
                To Time
              </TableCell>
              <TableCell align="right" style={{ width: 90 }}>
                Slot Duration
              </TableCell>
              <TableCell align="right" style={{ width: 80 }}>
                No. of slots
              </TableCell>
              <TableCell align="right" style={{ width: 80 }}>
                Training mode
              </TableCell>
              {/* <TableCell align="right" style={{ width: 90 }}>
                Appointment Type
              </TableCell> */}
            </TableRow>
          </TableHead>
        </Table>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },

  title: {
    flex: "0 0 auto",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      "&:focus": {
        width: 200,
      },
    },
  },
}));

export default class Availabilitydetails extends Component {
  constructor(props) {
    super(props);
    function createData(media_title, media_type, upload_on) {
      return { media_title, media_type, upload_on };
    }

    this.state = {
      order: "",
      orderBy: "media_title",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      viewmodal: false,
      doctordetails: [],
      viewdata: null,
      additems: " ",
    };
  }

  handleChange = (event) => {
    console.log("sdfdsfsadfsdfsdf", event.target.name);

    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => console.log("asldfjasdkfjskdlfj", this.state)
    );
  };



  handleHomeChange = (event) => {
    console.log(event.target.checked);
    this.setState({
      home: event.target.checked ? 1 : 0,
      lang:0,
      loc:0,
    });
  };

  handleLangChange = (event) => {
    console.log(event.target.checked);
    this.setState({
      lang: event.target.checked ? 2 : 0,
      home:0,
      loc:0,
    });
  };

  handleLocChange = (event) => {
    console.log(event.target.checked);
    this.setState({
      loc: event.target.checked ? 3 : 0,
      home:0,
      lang:0,
    });
  };




  handleRequestSort = (event, property) => {
    const isDesc =
      this.state.orderBy === property && this.state.order === "desc";
    this.setState({ order: isDesc ? "asc" : "desc" });
    this.setState({ orderBy: property });
  };

  closemodal = () => {
    this.setState({ viewmodal: false });
  };



  handleClick = (event, name) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected.push(this.state.selected, name);
    } else if (selectedIndex === 0) {
      // newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      // newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      // newSelected = newSelected.concat(
      //   selected.slice(0, selectedIndex),
      //   selected.slice(selectedIndex + 1),
      // );
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  handleChangeDense(event) {
    this.setState({ dense: event.target.checked });
  }
  componentWillMount() {
    //this.loadDoctorDetails();
  }
  ViewDetails = (data) => {
    console.log("viewdata", data);
    this.setState({ viewmodal: true, viewdata: data });
  };
  DeleteData = (data) => {
    console.log("deletedata", data);
  };
  receiveapprovaldata = (data, data1) => {
    console.log("receiveapproval", data);
    console.log("data1", data1);
    if (data1 == 1) {
      this.setState({ viewmodal: false });
      message.success("Your Leave Approved");
      this.loadVendorDetails();
    } else if (data1 == 2) {
      this.setState({ viewmodal: false });
      message.success("Your Leave Rejected");
      this.loadVendorDetails();
    }
  };
  receivedocdelete = (data) => {
    console.log("receivedocdelete", data);
    if (data.status == 0) {
      this.setState({ viewmodal: false });
      message.success(data.msg);
      this.loadDoctorDetails();
    }
  };
  sendapprovadata = (data) => {
    if (data.status == 0) {
      this.setState({ viewmodal: false });
      message.success(data.msg);
      this.loadDoctorDetails();
    }
  };

  emptydelete=()=>{
    alert("test")
  }

  render() {
    const isSelected = (name) => this.state.selected.indexOf(name) !== -1;
    var store = [];
    const { trainingModeDetails } = this.props

    console.log(trainingModeDetails,"trainingModeDetails")

    store.push(
      ...this.state.doctordetails,
      <div>
        <div className="AvailabilityDetailsDiv">
          <TableRow>
            <TableCell
              component="th"
              id={""}
              scope="row"
              padding="none"
              style={{ width: "15vw" }}
            >
              <div className="Availability-sno-wrapper"> {"1"} </div>
            </TableCell>
            <TableCell align="right" style={{ width: "25vw" }}>
              <Input
                value={this.state.fromTime}
                onChange={this.handleChange}
                style={{ width: 90 }}
              />
            </TableCell>

            <TableCell align="right" style={{ width: "25vw" }}>
              <Input value={this.state.toTime} style={{ width: 90 }} />
            </TableCell>

            <TableCell align="right" className="Abi" style={{ width: "25vw" }}>
              <Input value={this.state.slotduration} style={{ width: 60 }} />
              <label className="slot-duration-unit_label">Min</label>
            </TableCell>

            <TableCell align="right" style={{ width: "12vw" }}>
              <div className="no_of_slots_data">
                <Input value={this.state.NoOfslots} style={{ width: 60 }} />
              </div>
            </TableCell>
            <TableCell align="right" style={{ width: "12vw" }}>
              <div className="training_category_fourth">
                {trainingModeDetails &&trainingModeDetails.includes(1) &&
                <>
                <Checkbox
                  checked={this.state.home}
                  className="checkbox_height"
                  onChange={this.handleHomeChange}
                  value={1}
                />
                <div className="icon_name">
                  <HomeIcon className="home_icon_clr" />
                  <p>Home</p>
                </div>
                </>
                }
                {trainingModeDetails && trainingModeDetails.includes(2) &&
                <>
                <Checkbox
                  checked={this.state.lang}
                  className="checkbox_height"
                  onChange={this.handleLangChange}
                  value={2}
                />
                <div>
                  <LanguageIcon className="lang_icon_clr" />
                  <p>Online</p>
                </div>
                </>
                }
                {trainingModeDetails && trainingModeDetails.includes(3) &&
                <>
                <Checkbox
                  checked={this.state.loc}
                  className="checkbox_height"
                  onChange={this.handleLocChange}
                  value={3}
                />
                <div>
                  <LocationOnIcon className="location_icon_clr" />
                  <p>Center</p>
                </div>
                </>
              }
              </div>
            </TableCell>
            {/* <TableCell align="right" style={{ width: "13vw" }}>
              <div>
                <Select
                  className="availability-clinic-toggledropdown"
                  defaultValue="Vip"
                  style={{ width: 110 }}
                  onChange={handleChange}
                >
                  <Option
                    className="availability-clinic-toggledropdown"
                    value="regular"
                    id="2"
                  >
                    Regular
                  </Option>
                  <Option
                    className="availability-clinic-toggledropdown"
                    value="vip"
                    id="1"
                  >
                    Vip
                  </Option>
                </Select>{" "}
              </div>
            </TableCell> */}
          </TableRow>

          <TableRow hover role="checkbox">
            <TableCell align="right" colSpan={8}>
              <FormGroup row className="Availability-checkbox-row-div">
                <FormControlLabel
                  style={{ width: 80 }}
                  control={<Checkbox value="checkedA" />}
                  label="All"
                />
                <FormControlLabel
                  style={{ width: 80 }}
                  control={<Checkbox value="checkedA" />}
                  label="SUN"
                />
                <FormControlLabel
                  style={{ width: 80 }}
                  control={<Checkbox value="checkedA" />}
                  label="MON"
                />
                <FormControlLabel
                  style={{ width: 80 }}
                  control={<Checkbox value="checkedA" />}
                  label="TUE"
                />
                <FormControlLabel
                  style={{ width: 80 }}
                  control={<Checkbox value="checkedA" />}
                  label="WED"
                />
                <FormControlLabel
                  style={{ width: 80 }}
                  control={<Checkbox value="checkedA" />}
                  label="THU"
                />
                <FormControlLabel
                  style={{ width: 80 }}
                  control={<Checkbox value="checkedA" />}
                  label="FRI"
                />
                <FormControlLabel
                  style={{ width: 80 }}
                  control={<Checkbox value="checkedA" />}
                  label="SAT"
                />
              </FormGroup>
              <div className="delete_container">
                <Button className="save_btn">Save</Button>
                {/* <EditIcon className="edit_icon"/> */}
                <DeleteIcon className="delete_icon" onClick={this.emptydelete} />
              </div>
            </TableCell>
          </TableRow>
        </div>
      </div>
    );

    const { appDetails } = this.props;
    return (
      <div className="AvailabilityDetailsDiv">
        <div className="tableWrapper">
          <Table
            className="table"
            aria-labelledby="tableTitle"
            size={this.state.dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={this.state.selected.length}
              order={this.state.order}
              orderBy={this.state.orderBy}
              // onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={appDetails.length}
            />
            <TableBody>
              {stableSort(
                appDetails,
                getSorting(this.state.order, this.state.orderBy)
              )
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map((row, index, item) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  console.log("rendering", row);
                  return (
                    <ScheduleComp {...this.props} index={index} data={row} trainingModeDetails = {this.props.trainingModeDetails} />
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={appDetails.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}
