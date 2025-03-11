import React, { useEffect } from 'react';
import AccessProvider from 'component/common/accessProvider';
import LineaGuia from 'component/common/accessComponents/lineaGuia';
import ToolBar from 'component/common/toolBar';

const App = ({ children }) => {
  return (
    <AccessProvider>
      <ToolBar />
      {children}
    </AccessProvider>
  );
};

export default App;
