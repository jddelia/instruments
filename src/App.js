import React, { Component } from 'react';
import SampleLibrary from './tonejs-instruments-master/Tonejs-Instruments';
import Header from './components/Header';
import Note from './components/Note';
import Navbar from './components/Navbar';
import About from './components/About';
import Control from './components/Control';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInstr: "guitar-acoustic",
      instrument: null,
      notes: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInstrumentChange = this.handleInstrumentChange.bind(this);
  }

  componentDidMount() {
    // Create instrument
    this.setState({
      instrument: SampleLibrary.load({
        instruments: this.state.selectedInstr,
        minify: true
      }),
      notes: SampleLibrary[this.state.selectedInstr] ? SampleLibrary[this.state.selectedInstr]: []
    });
  }

  handleClick(note) {
    // Play note from instrument
    this.state.instrument.toMaster();

    this.state.instrument.triggerAttack(note);
  }

  handleInstrumentChange(instrument, index) {
    this.setState((prevState, props) => ({
      selectedInstr: instrument
    }), () => {
      this.setState({
        instrument: SampleLibrary.load({
          instruments: this.state.selectedInstr,
          minify: true
        }),
        notes: SampleLibrary[this.state.selectedInstr]
      });
    });
  }

  render() {
    let notesArr = [];
    for (let note in this.state.notes) {
      notesArr.push(note)
    }

    const notes = notesArr.map((note, index) => {
      return (
        <Note key={index} note={note} onClick={this.handleClick} />
      );
    })
    
    return (
      <div className="">
        <Navbar />
        <Header />
        <div className="container">
          <About />
          <Control onChange={this.handleInstrumentChange} />
          <div className="chords">
            {notes}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
