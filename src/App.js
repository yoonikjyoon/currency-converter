import { getCurrency } from "./api/currency";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <div className="converter-container" onClick={() => getCurrency()}>
          Currency Converter
        </div>
      </div>
    </>
  );
}

export default App;
