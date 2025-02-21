import React, { useEffect } from 'react';
import AccessBtn from 'component/common/accessBtn';
import AccessProvider from 'component/common/accessProvider';
import LineaGuia from 'component/common/accessComponents/lineaGuia';

const App = ({ children }) => {
  return (
    <AccessProvider>
      <div>
        <AccessBtn />
      </div>
      {children}
      <LineaGuia/>
    </AccessProvider>
  );
};

export default App;
