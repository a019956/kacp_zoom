import React, { useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './App.css';

const AppCalendar = () => {
    const [date, setDate] = useState(new Date());

    const onChange = () => {
        setDate(date)
    }

    return (
        <Calendar onChange={onChange} value={this.state.date} />
    );
}

function App() {
  return (
    <div className="App">
      <AppCalendar />
    </div>
  );
}

export default App;
