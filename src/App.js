import "./App.css";
import JoinRoom from "./JoinRoom";
import { useHMSStore, selectIsConnectedToRoom } from "@100mslive/react-sdk";
import "./styles.css";
import Room from "./Room";

function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  return (
    <div className="App wrapper">{isConnected ? <Room /> : <JoinRoom />}</div>
  );
}

export default App;
