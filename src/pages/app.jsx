import React from 'react';
import AccessProvider, { useAccessibility } from 'component/common/accessProvider';
import LineaGuia from 'component/common/accessComponents/lineaGuia';
import ToolBar from 'component/common/toolBar';

const App = () => {
  // const { toggleLineaGuia, lineaGuiaVisible } = useAccessibility();

  return (
    <>
      <div>
        <ToolBar/>
      </div>
      {/* <LineaGuia isVisible={lineaGuiaVisible} /> */}
    </>
  );
};



export default App;