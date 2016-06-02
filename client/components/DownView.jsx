class DownView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // do I want to declare the state in here, and set the change
      count: 0,
    };
  }

  handleDownClick(e) {
    e.preventDefault();
    this.setState({
      count: count + 1,
    });
  }

  render() {
    return (
      <div onClick={this.handleDownClick.bind(this)}>
        {this.state.count}
      </div>
    );
  }
}

window.DownView = DownView;
