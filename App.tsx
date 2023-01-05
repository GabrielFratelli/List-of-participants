import { StatusBar } from "react-native";
import { Home } from "./src/screens/Home";

export default function App() {
  return (
    // StatusBar altera a cor dos conteúdos que fica na parte de cima, como bateria, sinal, wi-fi etc.. e a cor de fundo dele.
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Home />
    </>
  );
}
