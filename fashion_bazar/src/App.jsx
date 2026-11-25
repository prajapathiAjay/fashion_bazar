import AppRoutes from "./AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import SessionWatcher from "./components/SessionWatcher";
import "./App.css";

function App() {
  return (
    <>
      <ScrollToTop />
      <SessionWatcher />
      <AppRoutes />
    </>
  );
}

export default App;
