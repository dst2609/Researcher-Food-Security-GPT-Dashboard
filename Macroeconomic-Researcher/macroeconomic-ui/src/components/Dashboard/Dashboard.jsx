import React, { useState } from "react";
import Footer from "../Footer/Footer";
import ChatUI from "../ChatUI/ChatUI";
import Header from "../Header/Header";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { Slider } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCountry, setRRange } from "../../country";
import "./Dashboard.css";
import NavBar from "../Navigation/Navigation";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [persona, setSelectedPersona] = useState("Economic Researcher");
  const [basket, setBasket] = useState([]);
  const [range, setRange] = useState([1960, 2023]);
  const [activeCategory, setActiveCategory] = useState("");

  const dispatch = useDispatch();
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    dispatch(setCountry(country));
    setBasket([]);
  };

  const handlePersonaChange = (country) => {
    setSelectedPersona(country);
  };

  const years = [];
  for (let i = 1990; i < 2021; i++) {
    years.push(i);
  }

  const [annotations, setAnnotations] = useState([]);

  const rangeChange = (event, newValue) => {
    setRange(newValue);
    console.log(newValue);
    dispatch(setRRange(newValue));
  };

  return (
    <div>
      <div className="row">
        <Header />
      </div>
      <div className="main-content">
        <div className="side-nav-bar">
          <NavBar country={selectedCountry} range={range} />
        </div>
        <div className="right-area">
          <div className="top-right-area">
            <div className="slider-area">
              <Slider
                size="small"
                getAriaLabel={() => "Temperature range"}
                value={range}
                onChange={rangeChange}
                min={1960}
                max={2020}
                marks
                valueLabelDisplay="auto"
                color="success"
              />
              <p
                style={{
                  fontFamily: "Noto Serif",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Year: <span id="demo">{`${range[0]}-${range[1]}`}</span>
              </p>
            </div>
            <div className="dropdowns">
              <select
                onChange={(e) => {
                  handleCountryChange(e.target.value);
                }}
                style={{ marginBottom: "10px" }}
              >
                <option>CHINA</option>
                <option>INDIA</option>
                <option>USA</option>
              </select>
              <select
                onChange={(e) => {
                  handlePersonaChange(e.target.value);
                }}
              >
                <option>Economic Researcher</option>
                <option>Government Official</option>
              </select>
            </div>
          </div>
          <div className=" row drag-drop-area">
            <DragDropArea
              basket={basket}
              setBasket={setBasket}
              notes={setAnnotations}
            />
          </div>
          {persona === "Economic Researcher" && (
            <div className="annotation">
              {/* <h4>Click on the chart to write an annotation. The annotations are displayed below:</h4> */}
              <div>{annotations}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DragDropArea({ isDragging, text, basket, setBasket, notes }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Basket basket={basket} setBasket={setBasket} notes={notes} />
    </DndProvider>
  );
}

export const MenuCard = ({ id, name, chart }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "menuItem",
    item: { id, name, chart },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div className="pet-card" ref={dragRef}>
      {name}
      {isDragging}
    </div>
  );
};

export const Notes = (props) => {
  const [notes, setNotes] = useState("");

  const closeNote = () => {
    props.closeNote(notes);
  };
  return (
    <div>
      <div
        style={{
          width: "600px",
          fontFamily: "Noto Serif",
          paddingBottom: "10px",
        }}
      >
        <textarea
          onChange={(e) => setNotes(e.target.value)}
          type="text"
          placeholder="Add Notes here.."
        ></textarea>{" "}
        <br />
        <button onClick={closeNote} style={{ height: "30px" }}>
          Add a note
        </button>
      </div>
    </div>
  );
};

export const BasketChart = ({ id, name, chart, anNotes }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "menuItem",
    item: { id, name, chart },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [showNotes, setShowNotes] = useState(false);

  const addNotes = () => {
    setShowNotes(true);
  };

  const submitNotes = (notes) => {
    anNotes(notes);
    setShowNotes(false);
  };

  return (
    <div>
      <div onClick={addNotes} className="pet-card" ref={dragRef}>
        {name}
        {isDragging}
        {chart}
      </div>
      {showNotes ? <Notes closeNote={submitNotes} /> : null}
    </div>
  );
};

export const Basket = ({ basket, setBasket, notes }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "menuItem",
    drop: (item) =>
      setBasket((basket) =>
        !basket.includes(item) ? [...basket, item] : basket
      ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div>
      <div
        style={{ width: "800px", height: "600px", marginTop: "20px" }}
        className="basket"
        ref={dropRef}
      >
        {basket.map((menuItem) => (
          <BasketChart
            key={menuItem.id}
            id={menuItem.id}
            name={menuItem.name}
            chart={menuItem.chart}
            anNotes={notes}
          />
        ))}
        {isOver && (
          <div style={{ color: "white", fontFamily: "Noto Serif" }}>
            Drop Here!
          </div>
        )}
      </div>
    </div>
  );
};
