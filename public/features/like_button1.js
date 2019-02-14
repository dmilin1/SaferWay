
'use strict';

class LikeButton1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      <button onClick={() => this.setState({ liked: true }) }>
        Like
      </button>
    );
  }
}

let domContainer1 = document.querySelector('#like_button_container1');
ReactDOM.render(<LikeButton1 />, domContainer1);
