import React, { Children, Component } from 'react';

class FlexibleWrapper extends Component {
  static defaultProps = {
    onResize: () => null,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.props.onResize();
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default FlexibleWrapper;
