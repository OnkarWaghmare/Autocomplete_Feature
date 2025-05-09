import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [inpt, setInpt] = useState("");
  const [dt, setDt] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let rowData = await fetch("https://dummyjson.com/products");
    let data = await rowData.json();
    setDt(data.products.map((ele) => ele.title));
    console.log(data.products);
  };

  const filterData = () => {
    //console.log("query", inputRef.current);
    const result = dt.filter((ele) =>
      ele.toLowerCase().includes(inputRef.current.toLowerCase())
    );
    setFilteredData(result);
  };

  const timeout = useRef(null);
  const inputRef = useRef(inpt);
  inputRef.current = inpt;
  const updateInput = (e) => {
    setInpt(e.target.value);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      console.log("calledwwyty");

      filterData();
    }, 500);
  };

  return (
    <div className="App">
      <input
        style={{ width: "300px", padding: "0px" }}
        onChange={updateInput}
        value={inpt}
      />
      {filteredData.length && (
        <div className="container">
          {filteredData.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </div>
      )}
    </div>
  );
}
