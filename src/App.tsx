import { useRef, useState } from 'react'
import './App.css'
import Button from './design/interface/Button/Button'
import "./styles/Calculator.css";
import "./styles/ButtonArea.css";
import "./styles/TextArea.css";
import { Calculator, MathOperators } from './utils/Calculator';

function App() {
  const calc = useRef(new Calculator()).current;
  const [mathStr, setMathStr] = useState("");
  const [result, setResult] = useState("0");


  const click = (value: string) => {
    calc.append(value);

    setMathStr(calc.buildCalculationString());
  }

  const operator = (value: MathOperators) => {
    calc.operate(value);

    setMathStr(calc.buildCalculationString());
  }

  const calculate = () => {
    calc.build();

    setResult(calc.numbers[0].value);
  }

  const clear = () => {
    calc.clear();
    setMathStr("");
    setResult("0");
  }

  const getError = () => {
    try {
      return "";
    } catch (e: any) {
      return e.message;
    }
  }

  const del = () => {
    calc.del();
    setMathStr(calc.buildCalculationString());
  }

  return (
    <div className="calculator">
      <div className="text-area">
        <span id="error" className={``}>{getError()}</span>
        <span id='calc'>{mathStr}</span>
        <span id='result'>{result}</span>
      </div>

      <div className="button-area">
        <Button onClick={clear}>C</Button>
        <Button
          onClick={() => operator("^")}>x<sup>y</sup></Button>
        <Button
          onClick={() => operator("√")}>√x</Button>
        <Button onClick={() => operator("+")}>+</Button>

        <Button onClick={() => click("7")}>7</Button>
        <Button onClick={() => click("8")}>8</Button>
        <Button onClick={() => click("9")}>9</Button>
        <Button onClick={() => operator("-")}>-</Button>

        <Button onClick={() => click("4")}>4</Button>
        <Button onClick={() => click("5")}>5</Button>
        <Button onClick={() => click("6")}>6</Button>
        <Button onClick={() => operator("*")}>*</Button>

        <Button onClick={() => click("1")}>1</Button>
        <Button onClick={() => click("2")}>2</Button>
        <Button onClick={() => click("3")}>3</Button>
        <Button onClick={() => operator("/")}>/</Button>

        <Button
          onClick={del}>DEL</Button>
        <Button onClick={() => click("0")}>0</Button>
        <Button onClick={() => click(".")}>.</Button>
        <Button
          onClick={calculate}>=</Button>
      </div>
    </div>
  )
}

export default App
