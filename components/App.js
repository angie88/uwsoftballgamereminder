var React = require('react');
var ReactDOM = require('react-dom');
var Schedule = require('./Schedule');

var App = React.createClass({
  render: function () {
    return (
      <div id='App'>
        <Schedule />
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
