import React, { Component } from "react"
import {
  Container,
  Grid,
  Typography,
  Button,
  Modal,
  TextField,
} from "@material-ui/core"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { Redirect, Link } from "react-router-dom"
import EditIcon from "@material-ui/icons/Edit"
import axios from "axios"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"

const styles = {
  mainDiv: {
    direction: "rtl",
  },
  header: {
    height: "22vh",
    background: "rgb(38,38,227)",
    background:
      "linear-gradient(90deg, rgba(38,38,227,1) 0%, rgba(29,165,208,1) 59%)",
    marginBottom: "20px",
    boxShadow: "1px 1px 10px 1px grey",
  },
  title: {
    color: "white",
    textAlign: "center",
    marginTop: "0px",
    paddingTop: "50px",
  },
  typography: {
    textAlign: "left",
    width: "92%",
    height: "fit-content",
  },
  typo: {
    height: "fit-content",
    paddingRight: "20px",
  },
  grid: {
    padding: "4px",
  },
  commentGrid:{
    paddingTop: "6px",
    height:"30px"
  },
  btn: {
    fontWeight: "bold",
    marginRight:"5px",
    color: "#197FAB",
  },
  modal: {
    margin: "auto",
    position: "absolute",
    top: "35vh",
    left: "15vw",
    backgroundColor: "white",
    width: "70vw",
    height: "fit-content",
    direction: "rtl",
  },
  modalHead: {
    textAlign: "center",
    backgroundColor: "#99D6DF",
    color: "white",
    height: "15vh",
    lineHeight: "15vh",
  },
  h2: {
    marginTop: 0,
  },
  footer: {
    height:"10vh",
    textAlign: "center",
    marginTop: "3vh",
  },
  modalBTN: {
    backgroundColor: "navy",
    margin: "10px",
    marginBottom: "10px",
    color: "white",
  },
  modaldivbtn:{
    textAlign:"left"
  },
  mechanicCom: {
    textAlign:"left",
    width: "230px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "mowrap",
    lineHeight:"30px"
    
  },
  body: {
    paddingTop: "5px",
    paddingBottom: "6px",
    height: "65vh",
    overflowY: "auto",
    overflowX: "hidden",
  },
}

export default class CustomerPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      mechanicComment: "",
    }
  }

  OpenModal = (toggle) => {
    this.setState({ modal: toggle })
  }

  AddMechanicComment = (e) => {
    this.setState({ mechanicComment: e.target.value })
  }

  updateClientStatus = () => {
    let update = {
      id: this.props.location.state.customer.idschedule,
      comment: this.state.mechanicComment,
      status: 1,
    }
    axios
      .post("http://localhost:5000/updateclientstatus", update)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div style={styles.mainDiv}>
        <header style={styles.header}>
          <h2 style={styles.title}>
            {this.props.location.state.customer.name}
          </h2>
        </header>
        <Container>
          <div style={styles.body}>
            <Grid container spacing={3}>
              <Grid style={styles.grid} item xs={4}>
                <Typography style={styles.typo}>
                  <b>בושם:</b>
                </Typography>
              </Grid>
              <Grid style={styles.grid} item xs={8}>
                <Typography style={styles.typography}>
                  {this.props.location.state.customer.smel}
                </Typography>
              </Grid>

              <hr style={{ width: "90%" }} />
              <Grid style={styles.grid} item xs={3}>
                <Typography style={styles.typo}>
                  <b>מערכת:</b>
                </Typography>
              </Grid>
              <Grid style={styles.grid} item xs={9}>
                <Typography style={styles.typography}>
                  {this.props.location.state.customer.machine}
                </Typography>
              </Grid>

              <hr style={{ width: "90%" }} />
              <Grid style={styles.grid} item xs={3}>
                <Typography style={styles.typo}>
                  <b>סולם:</b>
                </Typography>
              </Grid>
              <Grid style={styles.grid} item xs={9}>
                <Typography style={styles.typography}>
                  {this.props.location.state.customer.ladder}
                </Typography>
              </Grid>

              <hr style={{ width: "90%" }} />
              <Grid style={styles.grid} item xs={3}>
                <Typography style={styles.typo}>
                  <b>פעולה:</b>
                </Typography>
              </Grid>
              <Grid style={styles.grid} item xs={9}>
                <Typography style={styles.typography}>
                  {this.props.location.state.customer.action}
                </Typography>
              </Grid>

              <hr style={{ width: "90%" }} />
              <Grid style={styles.grid} item xs={4}>
                <Typography style={styles.typo}>
                  <b>הערות לקוח:</b>
                </Typography>
              </Grid>
              <Grid style={styles.grid} item xs={8}>
                <Typography style={styles.typography}>
                  {this.props.location.state.customer.clientComplain}
                </Typography>
              </Grid>

              <hr style={{ width: "90%" }} />
              <Grid style={styles.grid} item xs={4}>
                <Typography style={styles.typo}>
                  <b>הערת מנהל:</b>
                </Typography>
              </Grid>
              <Grid style={styles.grid} item xs={8}>
                <Typography style={styles.typography}>
                  {this.props.location.state.customer.managercomment}
                </Typography>
              </Grid>

              <hr style={{ width: "90%" }} />
              <Grid style={styles.grid} item xs={3}>
                <Typography style={styles.typo}>
                  <b>גבייה:</b>
                </Typography>
              </Grid>
              <Grid style={styles.grid} item xs={9}>
                <Typography style={styles.typography}>
                  {this.props.location.state.customer.charge}
                </Typography>
              </Grid>

              <hr style={{ width: "90%" }} />
              <Grid style={styles.grid} item xs={3}>
                <Typography style={styles.typo}>
                  <b>איש קשר:</b>
                </Typography>
              </Grid>
              <Grid style={styles.commentGrid} item xs={9}>
                <Typography style={styles.typography}>
                  {this.props.location.state.customer.contact}
                </Typography>
              </Grid>
              <hr style={{ width: "90%" }} />

              <Grid style={styles.grid} item xs={4}>
                <Button onClick={() => this.OpenModal(true)} style={styles.btn}>
                  <EditIcon style={{marginLeft:"5px"}} fontSize="small" />הוסף הערה 
                </Button>
              </Grid>
              <Grid style={styles.grid} item xs={8}>
                <Typography noWrap={true} style={styles.mechanicCom}>
                  {this.state.mechanicComment}
                </Typography>
              </Grid>
            </Grid>
            <Modal
              open={this.state.modal}
              onClose={() => this.OpenModal(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={styles.modal}>
                <header style={styles.modalHead}>
                  <h2 style={styles.h2}>מה יש לך להוסיף?</h2>
                </header>
                <footer style={styles.footer}>
                  <TextField
                    onChange={this.AddMechanicComment}
                    id="outlined-textarea"
                    label="כתוב כאן"
                    placeholder="Placeholder"
                    multiline
                    variant="outlined"
                  />
                  <br />
                </footer>
                <div style={styles.modaldivbtn}>
                <Button
                  style={styles.modalBTN}
                  onClick={() => this.OpenModal(false)}
                >
                  הוסף
                </Button>
                </div>
              </div>
            </Modal>
          </div>
          <footer>
            <Grid container spacing={1}>
              <Grid style={{ textAlign: "center" }} item xs={6}>
                <Link style={{ color: "blue" }} to="/">
                  <ArrowForwardIosIcon fontSize={"large"} />
                </Link>
              </Grid>
              <Grid style={{ textAlign: "center" }} item xs={6}>
                <Link
                  onClick={() => {
                    this.updateClientStatus()
                  }}
                  style={{ color: "blue" }}
                  to={{
                    pathname: "/",
                  }}
                >
                  <CheckCircleOutlineIcon fontSize={"large"} />
                </Link>
              </Grid>
            </Grid>
          </footer>
        </Container>
      </div>
    )
  }
}
