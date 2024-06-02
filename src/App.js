import { BrowserRouter } from "react-router-dom";
import AppRoot from "./AppRoot";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProvideAuth } from "./hooks/useAuth";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ProvideAuth>
            <AppRoot />
          </ProvideAuth>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
