import ReactLightCalendar,{Component} from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'
import React from "react";
import './calendar.css'
const DAY_LABELS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const MONTH_LABELS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aûot', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

class Calendar extends  React.Component {
  constructor(props) {
    super(props);
    const date = new Date()
    const startDate = date.getTime()
    this.state = {
       startDate,// Today
      endDate: new Date(startDate).setDate(date.getDate()) // Today + 6 days
    }
  }

  onChange = (startDate, endDate) => this.setState({ startDate, endDate })

  render = () => {
    const { startDate, endDate } = this.state

    return (
        <ReactLightCalendar startDate={startDate} endDate={endDate} onChange={this.onChange}/>

    )
  }
}
export default Calendar;
// endDate={endDate}
 // <ReactLightCalendar startDate={startDate}  endDate={endDate} onChange={this.onChange}