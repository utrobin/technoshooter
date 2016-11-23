import React from 'react';

const App = ({children}) => (
  <div className="Wrapper">
    {console.log(arguments)}
    {children}
  </div>
);

export default App;
