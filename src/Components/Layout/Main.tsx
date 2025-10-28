import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { persistor, store } from "../../redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import router from "../../Routes/Routes";
import { RouterProvider } from "react-router-dom";
import { mainTheme } from "../../theme";
import { Toaster } from "sonner";
import { AllImages } from "../../../public/images/AllImages";

const Main = () => {
  return (
    <div className="relative">
      <img
        src={AllImages?.background}
        alt="background"
        className="fixed h-screen w-full object-cover"
        draggable={false}
      />
      <div className="z-10 bg-transparent w-full">
        <ConfigProvider theme={mainTheme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Toaster richColors position="top-center" />
              <RouterProvider router={router} />
            </PersistGate>
          </Provider>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Main;
