import React, { Component } from "react"
import { ExcelRenderer, OutTable } from "react-excel-renderer"
import axios from "axios"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import "./App.css"

const styles = {
  import: {},
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cols: [],
      Route: [],
      mechanic: "",
    }
  }

  fileHandler = (event) => {
    let fileObj = event.target.files[0]
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err)
      } else {
        let route = resp.rows.filter((row) => row.length > 2)
        console.log(resp.rows[0][0])
        route = route.slice(1, route.length)
        let obj = { date: resp.rows[0][0], schedule: route }
        console.log(obj)
        this.setState({
          cols: resp.cols,
          Route: obj,
        })
      }
    })
  }

  UploadRoute = () => {
    console.log(this.state.Route)
    let Route = this.state.Route
    axios
      .post("http://localhost:5000/schedule", Route)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  ChooseMechanic = (id) => {
    this.setState({ mechanic: id })
  }

  render() {
    return (
      <div>
        <div>
          <div className="names">
            <Button
              size="large"
              className="mechanicBTN"
              variant="outlined"
              color="primary"
              onClick={() => this.ChooseMechanic(0)}
            >
              עדן
            </Button>
            <Button
              size="large"
              className="mechanicBTN"
              variant="outlined"
              color="primary"
              onClick={() => this.ChooseMechanic(1)}
            >
              אלחנן
            </Button>
            <Button
              size="large"
              className="mechanicBTN"
              variant="outlined"
              color="primary"
              onClick={() => this.ChooseMechanic(2)}
            >
              מעוז
            </Button>
            <Button
              size="large"
              className="mechanicBTN"
              variant="outlined"
              color="primary"
              onClick={() => this.ChooseMechanic(3)}
            >
              דוריאל
            </Button>
          </div>
          <div className="flex-container">
            <div>
              <input
                onChange={this.fileHandler}
                type="file"
                accept=".xls,.xlsx"
              />
              <button
                onClick={() =>
                  this.UploadRoute(this.state.Route, this.state.mechanic)
                }
              >
                שלח
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
