import AccessProvider from "component/common/accessProvider";
import App from "./app";

const IndexApp = ({children}) => {
  console.log('Rendering IndexApp...');
  return (
    <AccessProvider>
          <App>
              {children}
          </App>
    </AccessProvider>
  );
};

export default IndexApp;
