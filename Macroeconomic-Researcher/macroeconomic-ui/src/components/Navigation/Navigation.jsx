import { Link } from "react-router-dom";
import "./Navigation.css";
import { MenuCard } from "../Dashboard/Dashboard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DataChart } from "../Graphs/Macro/MacroGDPGrowth";
import { MacroCurrentGDP } from "../Graphs/Macro/MacroCurrentGDP";
import { MacrofdiNet } from "../Graphs/Macro/MacrofdiNet";
import { CurrentAccBalance } from "../Graphs/Macro/CurrentAccBalance";
import { MacroFdiOut } from "../Graphs/Macro/MacroFdiOut";
import MacrofdiIn from "../Graphs/Macro/MacroFdiIn";
import GDPOutFlow from "../Graphs/Macro/GDPOutFlow";
import ImportEgypt from "../Graphs/ImportExport/ImportEgypt";

const NavBar = (props) => {
  const macroeconomic = [
    {
      id: 1,
      name: "GDP Growth Rate",
      chart: <DataChart country={props.country} range={props.range} />,
    },
    {
      id: 2,
      name: "GDP Current USD",
      chart: <MacroCurrentGDP country={props.country} range={props.range} />,
    },
    {
      id: 3,
      name: "Filtered Account Balance",
      chart: <CurrentAccBalance country={props.country} range={props.range} />,
    },
    {
      id: 4,
      name: "Macro Foreign direct investment, net ",
      chart: <MacrofdiNet country={props.country} range={props.range} />,
    },
    {
      id: 5,
      name: "Macro Foreign direct investment, out ",
      chart: <MacroFdiOut country={props.country} range={props.range} />,
    },
    {
      id: 6,
      name: "Macro Foreign direct investment, In ",
      chart: <MacrofdiIn country={props.country} range={props.range} />,
    },
    {
      id: 7,
      name: "FDI-NetOutflows(%ofGDP)",
      chart: <GDPOutFlow country={props.country} range={props.range} />,
    },
  ];

  const agricultural = [];

  const debt = [];
  const impexp = [{ id: 1, name: "Egypt Imports", chart: <ImportEgypt /> }];

  return (
    <div>
      <div className="nav-main-elements-macro">
        <Link
          className="link"
          to="/home"
          onClick={() => toggleContent("macro")}
          style={{ marginBottom: "10px" }}
        >
          Macroeconomic (USD)
        </Link>
        <div id="macro" style={{ display: "none" }}>
          <DndProvider backend={HTML5Backend}>
            <div className="pets">
              {macroeconomic.map((mc) => (
                <MenuCard
                  key={mc.id}
                  draggable
                  id={mc.id}
                  name={mc.name}
                  chart={mc.chart}
                />
              ))}
            </div>
          </DndProvider>
        </div>
      </div>

      <div className="nav-main-elements">
        <Link className="link" to="/home" onClick={() => toggleContent("agri")}>
          Agricultural
        </Link>
        <div id="agri" style={{ display: "none" }}>
          <DndProvider backend={HTML5Backend}>
            <div className="pets">
              {agricultural.map((ag) => (
                <MenuCard
                  key={ag.id}
                  draggable
                  id={ag.id}
                  name={ag.name}
                  chart={ag.chart}
                />
              ))}
            </div>
          </DndProvider>
        </div>
      </div>
      <div className="nav-main-elements">
        <Link className="link" to="/home" onClick={() => toggleContent("debt")}>
          Debt
        </Link>
        <div id="debt" style={{ display: "none" }}>
          <DndProvider backend={HTML5Backend}>
            <div className="pets">
              {debt.map((db) => (
                <MenuCard
                  key={db.id}
                  draggable
                  id={db.id}
                  name={db.name}
                  chart={db.chart}
                />
              ))}
            </div>
          </DndProvider>
        </div>
      </div>
      {/* <div className="nav-main-elements">
        <Link className="link" to="/home">
          Imports
        </Link>
      </div> */}

      <div className="nav-main-elements">
        <Link
          className="impexp"
          to="/home"
          onClick={() => toggleContent("impexp")}
        >
          Import-Export
        </Link>
        <div id="impexp" style={{ display: "none" }}>
          <DndProvider backend={HTML5Backend}>
            <div className="pets">
              {impexp.map((ie) => (
                <MenuCard
                  key={ie.id}
                  draggable
                  id={ie.id}
                  name={ie.name}
                  chart={ie.chart}
                />
              ))}
            </div>
          </DndProvider>
        </div>
      </div>

      <div className="nav-main-elements">
        <Link className="link" to="/chat">
          Chat Bot
        </Link>
      </div>
    </div>
  );
};

const toggleContent = (id) => {
  const content = document.getElementById(id);
  if (content.style.display === "none") {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
};

export default NavBar;
