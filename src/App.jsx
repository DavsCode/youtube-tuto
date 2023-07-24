import { useState } from "react";
import "./app.css";

export default function App() {
  const [calc, setCalc] = useState({
    firstOperand: null,
    secondOperand: null,
    operator: "=",
  });

  const handleNumber = (number) => {
    if (calc.secondOperand !== null && calc.secondOperand.length === 15) return; // we limit at 15 digits
    if (calc.secondOperand === "0" && number === "0") return;
    if (calc.secondOperand?.includes(",") && number === ",") return;
    let l_calc = {};
    if (calc.secondOperand === null && number === ",") {
      l_calc = {
        ...calc,
        secondOperand: "0,",
      };
    } else {
      l_calc = {
        ...calc,
        secondOperand:
          calc.secondOperand !== null ? calc.secondOperand + number : number,
      };
    }
    setCalc(l_calc);
  };

  const handleOperator = (operator) => {
    if (calc.firstOperand === null && calc.secondOperand === null) return;

    if (calc.firstOperand === null) {
      setCalc({
        ...calc,
        operator: operator,
        firstOperand: calc.secondOperand,
        secondOperand: null,
      });
    } else {
      setCalc({
        ...calc,
        operator: operator,
      });
    }

    if (calc.secondOperand === null) {
      setCalc({
        ...calc,
        operator: operator,
      });
    }

    if (calc.firstOperand !== null && calc.secondOperand !== null) {
      setCalc({
        ...calc,
        firstOperand: compute(),
        operator: operator,
        secondOperand: null,
      });
    }
  };

  const handleClear = () => {
    setCalc({
      ...calc,
      firstOperand: null,
      secondOperand: null,
      operator: "=",
    });
  };

  const handlePlusMinus = () => {
    if (calc.secondOperand !== null) {
      const secondOperand = -1 * parseFloat(calc.secondOperand);
      setCalc({
        ...calc,
        secondOperand: secondOperand.toString(),
      });
    }
  };

  const handlePercent = () => {
    if (calc.secondOperand !== null) {
      let secondOperand = parseFloat(calc.secondOperand) * 0.01;
      if (secondOperand.toString().length > 7) {
        secondOperand = secondOperand.toFixed(7);
      }
      setCalc({
        ...calc,
        secondOperand: secondOperand.toString(),
      });
    }
  };

  const handleDelete = () => {
    if (calc.secondOperand === null) return;
    let secondOperand = calc.secondOperand;
    if (secondOperand?.length === 1) {
      secondOperand = null;
    } else {
      secondOperand = secondOperand.slice(0, secondOperand.length - 1);
    }
    setCalc({
      ...calc,
      secondOperand: secondOperand,
    });
  };

  const handleCompute = () => {
    setCalc({
      ...calc,
      secondOperand: compute(),
      firstOperand: null,
    });
  };

  const format = (value) => {
    if (value === null) return;
    const sub = value.split(",");
    let formated = "";
    if (sub.length > 1) {
      formated = sub[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + sub[1];
    } else {
      formated = sub[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return formated;
  };

  const compute = () => {
    if (
      calc.firstOperand !== null &&
      calc.secondOperand !== null &&
      calc.operator !== null
    ) {
      let result = "";

      const firstOperand = parseFloat(calc.firstOperand);
      const secondOperand = parseFloat(calc.secondOperand);

      if (isNaN(firstOperand) || isNaN(secondOperand)) {
        return result;
      }

      switch (calc.operator) {
        case "+":
          result = firstOperand + secondOperand;
          break;
        case "-":
          result = firstOperand - secondOperand;
          break;
        case "x":
          result = firstOperand * secondOperand;
          break;
        case "÷":
          result =
            secondOperand > 0 ? firstOperand / secondOperand : "NOT ALLOW";
          break;
      }

      if (result !== "NOT ALLOW" && result.toString().length > 7) {
        result = result.toFixed(7); // we limit decimal to 7
      }

      return result.toString().replace(".", ","); // This will help for the formatting.
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="screens">
          <span className="first-screen">
            {calc.firstOperand !== null &&
              `${format(calc.firstOperand)} ${calc.operator}`}
          </span>
          <span
            className={`second-screen ${
              calc.secondOperand !== null && calc.secondOperand.length > 9
                ? "small"
                : "normal"
            }`}
          >
            {format(calc.secondOperand)}
          </span>
        </div>

        <div className="inputsWrapper">
          <button className="featured" onClick={() => handleClear()}>
            C
          </button>
          <button className="featured" onClick={() => handlePlusMinus()}>
            +/-
          </button>
          <button className="featured" onClick={() => handlePercent()}>
            %
          </button>
          <button className="featured" onClick={() => handleOperator("÷")}>
            ÷
          </button>
          <button onClick={() => handleNumber("7")}>7</button>
          <button onClick={() => handleNumber("8")}>8</button>
          <button onClick={() => handleNumber("9")}>9</button>
          <button className="featured" onClick={() => handleOperator("x")}>
            x
          </button>
          <button onClick={() => handleNumber("4")}>4</button>
          <button onClick={() => handleNumber("5")}>5</button>
          <button onClick={() => handleNumber("6")}>6</button>
          <button className="featured" onClick={() => handleOperator("-")}>
            -
          </button>
          <button onClick={() => handleNumber("1")}>1</button>
          <button onClick={() => handleNumber("2")}>2</button>
          <button onClick={() => handleNumber("3")}>3</button>
          <button className="featured" onClick={() => handleOperator("+")}>
            +
          </button>
          <button onClick={() => handleNumber(",")}>,</button>
          <button onClick={() => handleNumber("0")}>0</button>
          <button onClick={() => handleDelete()}>⌫</button>
          <button className="featured" onClick={() => handleCompute()}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}
