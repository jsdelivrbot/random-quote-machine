import React, { Component } from 'react'
import $ from 'jquery';

import '../../styles/style.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: 'Click \'generate\' to generate a quote',
      author: '',
    }

    this.onButtonClickHandler = this.onButtonClickHandler.bind(this);
  }

  render() {
    return (
      <div className="row">
        <h2><u>Random Quote Machine</u></h2>
        <div className="quote">
          <p><em>{this.state.quote}</em></p>
          <p>{this.state.author}</p>
        </div>
        <button className="center-block" onClick={this.onButtonClickHandler}>Generate</button>
        <ul className="list">
          <li><a href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${this.state.quote} ${this.state.author}`} target="_blank"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a></li>
        </ul>
      </div>
    );
  }

  onButtonClickHandler(event) {
    event.preventDefault()
    let _self = this

    $('.quote p').fadeOut(200);

    $.ajax({
      headers: {
        "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
      success({quote, author}) {
        _self.setState({ quote, author: `- ${author}` })
        $('.quote p').fadeIn(200)
      }
    })
  }
}