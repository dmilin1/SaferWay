'use strict';


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.msg = props.msg ;
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



ReactDOM.render(<Root msg="test message"/>, document.getElementById('exampleReactComponent'));
