import React, { useState } from "react";
import "./Navigation.css";

const Navigation = ({ setActiveTab }) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [section]: !prevOpenSections[section],
    }));
  };

  return (
    <div className="navigation-pane">
      <div className="nav-section">
        <div
          className="nav-section-header"
          onClick={() => toggleSection("macro")}
        >
          Macroeconomic (USD)
        </div>
        {openSections["macro"] && (
          <div className="nav-section-items">
            <div onClick={() => setActiveTab("macro-gdp")}>GDP (USD)</div>
            <div onClick={() => setActiveTab("macro-fdiIn")}>
              FDI Inflows (USD)
            </div>
            <div onClick={() => setActiveTab("macro-fdiOut")}>
              FDI Outflows (USD)
            </div>
          </div>
        )}
      </div>
      <div className="nav-section">
        <div
          className="nav-section-header"
          onClick={() => toggleSection("agri")}
        >
          Agricultural
        </div>
        {openSections["agri"] && (
          <div className="nav-section-items">
            <div onClick={() => setActiveTab("ag-gdp")}>
              Contribution of Agri (% GDP)
            </div>
            <div onClick={() => setActiveTab("ag-credit")}>Credit</div>
            <div onClick={() => setActiveTab("ag-fertilizers")}>
              Fertilizers
            </div>
            <div onClick={() => setActiveTab("ag-fertilizers-prod")}>
              Fertilizers PROD
            </div>
          </div>
        )}
      </div>
      <div className="nav-section">
        <div
          className="nav-section-header"
          onClick={() => toggleSection("debt")}
        >
          Debt Services
        </div>
        {openSections["debt"] && (
          <div className="nav-section-items">
            <div onClick={() => setActiveTab("debt-reserves")}>Reserves</div>
            <div onClick={() => setActiveTab("debt-gni-credit")}>GNI</div>
            <div onClick={() => setActiveTab("debt-total")}>Tota Debt (%)</div>
          </div>
        )}
      </div>
      <div className="nav-section">
        <div
          className="nav-section-header"
          onClick={() => toggleSection("imports")}
        >
          Food Security (Imports)
        </div>
        {openSections["imports"] && (
          <div className="nav-section-items">
            <div onClick={() => setActiveTab("imports-sa-wheat")}>
              Saudi Arabia Wheat Imports{" "}
            </div>
            <div onClick={() => setActiveTab("imports-sa-rice")}>
              Saudi Arabia Rice Imports
            </div>
            <div onClick={() => setActiveTab("imports-egy-wheat")}>
              Egypt Wheat Imports{" "}
            </div>
            <div onClick={() => setActiveTab("imports-egy-rice")}>
              Egypt Rice Imports{" "}
            </div>
          </div>
        )}
      </div>
      <div className="nav-section">
        <div
          className="nav-section-header"
          onClick={() => toggleSection("chat")}
        >
          Chat UI
        </div>
        {openSections["chat"] && (
          <div className="nav-section-items">
            <div onClick={() => setActiveTab("chat")}>Open Chat</div>
          </div>
        )}
      </div>

      <button
        className="nav-button"
        onClick={() => setActiveTab("importExport")}
      >
        Import-Export
      </button>
    </div>
  );
};

export default Navigation;
