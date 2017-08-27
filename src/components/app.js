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
          <p dangerouslySetInnerHTML={{__html: this.state.quote}}></p>
          <p>{this.state.author}</p>
        </div>
        <button className="center-block" onClick={this.onButtonClickHandler}>Generate</button>
      </div>
    );
  }

  onButtonClickHandler(event) {
    event.preventDefault()
    let _self = this

    $('.quote p').fadeOut(200);

    $.ajax({
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=?',
      type: 'GET',
      cache: false,
      success(data) {
        _self.setState({
          quote: data[0].content,
          author: data[0].title
        })

        $('.quote p').fadeIn(500)
      }
    })
  }
}