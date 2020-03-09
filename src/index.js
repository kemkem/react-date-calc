import React from "react";
import ReactDOM from "react-dom";
import Calendar from "react-calendar";

//import App from "./App";

class App extends React.Component {
  state = {
    result: "none yet",
    days: "all",
    dateFrom2: new Date(),
    dateTo2: new Date(),
    dateFrom: "",
    dateTo: ""
  };

  handleReq = event => {
    event.preventDefault();

    const url =
      "https://2c8309a4.ngrok.io/days/between?dateFrom=" +
      this.state.dateFrom +
      "&dateTo=" +
      this.state.dateTo +
      "&enumDays=" +
      this.state.days;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ result: data.days });
      })
      .catch(err => {
        console.log("some error", err.message);
        this.setState({ error: err });
      });
  };

  handleChangeDateFrom = event => {
    console.log(event.currentTarget.value);
    this.setState({ dateFrom: event.currentTarget.value });
  };

  handleChangeDateTo = event => {
    console.log(event.currentTarget.value);
    this.setState({ dateTo: event.currentTarget.value });
  };

  handleChangeDateFrom2 = date => {
    console.log(date.getFullYear());
    const month =
      date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    const days = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    const fullDate = "" + date.getFullYear() + "-" + month + "-" + days;
    this.setState({ dateFrom: fullDate });
  };

  handleChangeDateTo2 = date => {
    console.log(date.getFullYear());
    const month =
      date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    const days = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    const fullDate = "" + date.getFullYear() + "-" + month + "-" + days;
    this.setState({ dateTo: fullDate });
  };

  handleChangeDays = event => {
    console.log(event.currentTarget.value);
    this.setState({ days: event.currentTarget.value });
  };

  render() {
    const title = "Date calculator";
    const daysOptions = ["all", "weekdays", "workdays"];
    return (
      <div>
        <h1>{title}</h1>
        <Calendar
          onChange={this.handleChangeDateFrom2}
          value={this.state.dateFrom2}
        />
        <Calendar
          onChange={this.handleChangeDateTo2}
          value={this.state.dateTo2}
        />
        <form onSubmit={this.handleReq}>
          <input
            value={this.state.dateFrom}
            onChange={this.handleChangeDateFrom}
            type="text"
            placeholder="dateFrom"
          />
          <input
            value={this.state.dateTo}
            onChange={this.handleChangeDateTo}
            type="text"
            placeholder="dateTo"
          />
          <select
            value={this.state.days}
            onChange={this.handleChangeDays}
            type="text"
            placeholder="dateDays"
          >
            {daysOptions.map(opt => (
              <option value={opt}>{opt}</option>
            ))}
          </select>
          <button>request</button>
        </form>
        <p>
          Your result <i>{this.state.result}</i>
        </p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
