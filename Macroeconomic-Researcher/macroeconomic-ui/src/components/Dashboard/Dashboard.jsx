import React, { useState } from "react";
import Footer from "../Footer/Footer";
import ChatUI from "../ChatUI/ChatUI";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import ReportUI from "../ReportUI/ReportUI";

import "./Dashboard.css";
import MacroGDP from "../Graphs/Macro/MacroGDP";
import MacroFdiIn from "../Graphs/Macro/MacroFdiIn";
import MacroFdiOut from "../Graphs/Macro/MacroFdiOut";
import AgriGdp from "../Graphs/Agriculture/AgriGdp";
import AgriCredit from "../Graphs/Agriculture/AgriCredit";
import AgriFertilizers from "../Graphs/Agriculture/AgriFertilizers";
import AgriFertilizersProd from "../Graphs/Agriculture/AgriFertilizersProd";
import DebtTotal from "../Graphs/Debt/DebtTotal";
import DebtGniCredit from "../Graphs/Debt/DebtGniCredit";
import DebtReserves from "../Graphs/Debt/DebtReserves";
import ImportsEgyRice from "../Graphs/Imports/ImportsEgyRice";
import ImportsEgyWheat from "../Graphs/Imports/ImportsEgyWheat";
import ImportsSARice from "../Graphs/Imports/ImportsSARice";
import ImportsSAWheat from "../Graphs/Imports/ImportsSAWheat";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("chat"); // Default to chat

  // Function to render the active component based on the active tab
  const renderActiveTab = (tab) => {
    switch (tab) {
      case "chat":
        return <ChatUI />;
      case "macro-gdp":
        return <MacroGDP />;
      case "macro-fdiIn":
        return <MacroFdiIn />;
      case "macro-fdiOut":
        return <MacroFdiOut />;
      case "ag-gdp":
        return <AgriGdp />;
      case "ag-credit":
        return <AgriCredit />;
      case "ag-fertilizers":
        return <AgriFertilizers />;
      case "ag-fertilizers-prod":
        return <AgriFertilizersProd />;
      case "debt-reserves":
        return <DebtReserves />;
      case "debt-gni-credit":
        return <DebtGniCredit />;
      case "debt-total":
        return <DebtTotal />;
      case "imports-sa-wheat":
        return <ImportsSAWheat />;
      case "imports-sa-rice":
        return <ImportsSARice />;
      case "imports-egy-wheat":
        return <ImportsEgyWheat />;
      case "imports-egy-rice":
        return <ImportsEgyRice />;

      // Add cases for other tabs............. <<>>
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-main">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="dashboard-content">
          {renderActiveTab(activeTab)}

          {/* {activeTab === "reports" && <ReportUI />} */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
