

class Calculator extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
