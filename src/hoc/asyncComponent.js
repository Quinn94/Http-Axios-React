import React, { Component, useState, useEffect } from "react";

// const asyncComponent = ({ importComponent }) => {
//   const [component, setComponent] = useState(null);

//   useEffect(() => {
//     importComponent().then((cmp) => {
//       setComponent(cmp.default);
//       console.log(cmp);
//     });
//   });

//   const C = component;

//   return C ? <C /> : null;
// };

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
