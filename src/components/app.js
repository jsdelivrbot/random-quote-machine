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
        <h1>Random Quote Machine</h1>
        <div className="quote">
          <div>
            <p dangerouslySetInnerHTML={{__html: this.state.quote}} />
            <p>{this.state.author}</p>
          </div>
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
          author: `- ${data[0].title}`
        })

        $('.quote p').fadeIn(500)
      }
    })
  }
}