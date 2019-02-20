'use strict';

import dropdown from './components/dropdown';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.msg = "test";
  }

  render() {
    console.log(this.exampleProp)
    return (
      <div>
      Example: {this.msg}
      </div>
      <dropdown/>

    );
  }
}



ReactDOM.render(<Root/>, document.getElementById('homePage'));
