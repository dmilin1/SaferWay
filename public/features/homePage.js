'use strict';


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.msg = 'THIS IS MY REACT EXAMPLE TEXT' ;
  }

  render() {
    console.log(this.exampleProp)
    return (
      <div>
      Example: {this.msg}
      </div>
    );
  }
}



ReactDOM.render(<Root/>, document.getElementById('homePage'));
