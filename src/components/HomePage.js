import React, { Component } from "react"
import {
  Container,
  Grid,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import MenuIcon from "@material-ui/icons/Menu"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"
const styles = {
  maindiv: {
    direction: "rtl",
  },
  dateDivStyle: {
    color: "white",
    direction: "rtl",
    position: "absolute",
    top: "60px",
    right: "15px",
  },

  headOfPage: {
    height: "20vh",
    marginBottom: "20px",
    background:
      "linear-gradient(183deg, rgba(38,38,227,1) 0%, rgba(29,165,208,1) 59%)",
    boxShadow: "1px 1px 10px 1px grey",
  },
  headerTitle: {
    display: "inline",
  },
  table: {
    height: "65vh",
    overflow: "scroll",
    overflowX: "hidden",
  },
  menuButton: {
    position: "absolute",
    right: "5px",
    top: "15px",
  },
  titleSection: {
    color: "#30BDD9",
    fontWeight: "bold",
    fontSize: "medium",
  },

  linkstyle: {
    textDecoration: "none",
    color: "black",
  },
  btn: {
    backgroundColor: "trasparent",
    color: "blue",
    fontWeight: "bold",
    marginTop: "30px",
    border: "4px solid rgb(38,38,227,1)",
  },
  typo: {
    width: "90%",
    height: "40px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "mowrap",
  },
  // typo: {
  //   height: "60px",
  //   display: "-webkit-box",
  //   "-webkit-line-clamp": 4,
  //   "-webkit-box-orient": "vertical",
  //   overflow: "hidden",
  //   "text-overflow": "ellipsis",
  // },
}

export default class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      right: false,
      check: false,
    }
  }

  componentDidMount = () => {
    this.GetInitialData()
  }

  GetInitialData = () => {
    axios
      .get("http://localhost:5000/mechanicroute")
      .then((res) => {
        this.setState({ data: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  toggleDrawer = (open) => (event) => {
    console.log(event)
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    this.setState({ right: open })
  }

  list = () => (
    <div
      role="presentation"
      onClick={this.toggleDrawer(false)}
      onKeyDown={this.toggleDrawer(false)}
    >
      <List>
        {["התנתק"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  MarkAsDone = (id, open) => {
    this.state.data.map((customer) => {
      if (customer.idschedule === id) {
        let update = {
          id: customer.idschedule,
          comment: this.state.mechanicComment,
          status: open,
        }
        axios
          .post("http://localhost:5000/updateclientstatus", update)
          .then((res) => {
            console.log(res)
            this.GetInitialData()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  checkbox = (customer) =>
    customer.status === 0 ? (
      <input
        onChange={() => this.MarkAsDone(customer.idschedule, 1)}
        type="checkbox"
      />
    ) : (
      <input
        onChange={() => this.MarkAsDone(customer.idschedule, 0)}
        type="checkbox"
        checked
      />
    )

  render() {
    return (
      <div style={styles.maindiv}>
        <header style={styles.headOfPage}>
          <Container>
            <Button style={styles.menuButton} onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </Button>
            <Drawer
              anchor="right"
              open={this.state.right}
              onClose={this.toggleDrawer(false)}
            >
              {this.list()}
            </Drawer>

            <div style={styles.dateDivStyle}>
              <h3 style={{ margin: "0px" }}>הלוז שלך לתאריך:</h3>
              <h2 style={{ margin: "0px" }}>06-01-21</h2>
            </div>
          </Container>
        </header>
        <Container>
          <div>
            <Grid container spacing={3}>
              <Grid item xs={1}>
                <section style={styles.titleSection}></section>
              </Grid>
              <Grid item xs={5}>
                <section style={styles.titleSection}>שם</section>
              </Grid>
              <Grid item xs={6}>
                <section style={styles.titleSection}>כתובת</section>
              </Grid>
            </Grid>
            <hr style={{ width: "100%" }} />
            <div style={styles.table}>
              {this.state.data.map((customer, key) => {
                return (
                  <div key={key}>
                    <Grid container spacing={3}>
                      <Grid item xs={1}>
                        {this.checkbox(customer)}
                      </Grid>

                      <Grid item xs={5}>
                        <Link
                          style={styles.linkstyle}
                          to={{
                            pathname: "/CustomerPage",
                            state: { customer },
                          }}
                        >
                          <Typography noWrap={true} style={styles.typo}>
                            {customer.name}
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography noWrap={true} style={styles.typo}>
                          {customer.address}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider
                      style={{ marginTop: "4px", marginBottom: "4px" }}
                    />
                    {/* <hr style={{ width: "100%" }} /> */}
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
