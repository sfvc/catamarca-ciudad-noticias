import AccessProvider from "component/common/accessProvider";
import App from "./app";
import ToolBar from "component/common/toolBar";

const IndexApp = ({children}) => {
  console.log('Rendering IndexApp...');
  return (
    <AccessProvider>
      <ToolBar/>
      {children}
    </AccessProvider>
  );
};

export default IndexApp;
