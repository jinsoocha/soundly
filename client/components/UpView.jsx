class DownView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // do I want to declare the state in here, and set the change
      count: 0,
    };
  }

  handleUpClick(e) {
    e.preventDefault();
    this.setState({
      count: count + 1,
    });
  }

  render() {

    return (
      <div onUpClick={this.handleUpClick.bind(this)}>
        {this.state.count}
      </div>

    );
  }
}

window.UpView = UpView;
