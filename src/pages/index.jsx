import AccessProvider from 'component/common/accessProvider';
import ToolBar from 'component/common/toolBar';

const App = ({ children }) => {

  return (
    <AccessProvider>
      <div>
        <ToolBar />
      </div>
      {children}
    </AccessProvider>
  );
};

export default App;
