import "./styles.css";
import InputLinkBox from "./InputLinkBox";
import OutputLinkBox from "./OutputLinkBox";
import Header from "./Header";
import DimLayer from "./DimLayer";
import TestFetchButton from "./TestFetchButton";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import AlertBoxContainer from "./AlertBox";
import { AlertType } from "./AlertBox";


// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

export default function App() {
  return (
    <div className="App">
      <div className="AppContent">
        <DimLayer canDim = {false}/>
        <Header />
        <InputLinkBox />
        <OutputLinkBox />
        <TestFetchButton />
        <AlertBoxContainer
          alertTitle = "Alert me"
          alertMessage = "Alert message just for you"
          alertType = {AlertType.Success}
        />
        
      </div>
    </div>
  );
}
