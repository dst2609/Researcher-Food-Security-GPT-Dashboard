import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Papa from "papaparse";

const ImportSA = () => {
  const [selectedYear, setSelectedYear] = useState("2020");
  const [selectedImport, setSelectedImport] = useState("Wheat");
  const [sankeyChartData, setSankeyChartData] = useState([
    ["From", "To", "Weight"],
  ]);
  const [pieChartData, setPieChartData] = useState([
    ["Partner Countries", "Value"],
  ]);

  useEffect(() => {
    const csvFileUrl = "./FAOSTAT_data_en_3-30-2024-sa.csv";
    Papa.parse(csvFileUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const filteredData = result.data
          .filter(
            (row) => row.Year === selectedYear && row.Item === selectedImport
          )
          .map((row) => ({
            country: row["Partner Countries"],
            value: parseFloat(row.Value),
          }))
          .filter((row) => !isNaN(row.value));

        // Sort by value in descending order to get the top 6 for Pie chart
        const top6Data = [...filteredData]
          .sort((a, b) => b.value - a.value)
          .slice(0, 6);

        // Transform data for Sankey chart
        const sankeyData = filteredData.map((row) => [
          "Egypt",
          row.country,
          row.value,
        ]);
        // Transform data for Pie chart
        const pieData = top6Data.map((row) => [row.country, row.value]);

        // Update state for both charts
        setSankeyChartData([["From", "To", "Weight"], ...sankeyData]);
        setPieChartData([["Partner Countries", "Value"], ...pieData]);
      },
    });
  }, [selectedYear, selectedImport]);

  return (
    <div>
      <div>
        <label>Year: </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
        </select>
      </div>
      <div>
        <label>Import: </label>
        <select
          value={selectedImport}
          onChange={(e) => setSelectedImport(e.target.value)}
        >
          <option value="Wheat">Wheat</option>
          <option value="Rice">Rice</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2px",
        }}
      >
        <Chart
          chartType="Sankey"
          width="100%"
          height="400px"
          data={sankeyChartData}
          options={{
            title: `Sankey Diagram for ${selectedImport} in ${selectedYear}`,
          }}
        />
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={pieChartData}
          options={{
            title: `Top 6 Import Partners for ${selectedImport} in ${selectedYear}`,
            is3D: true,
          }}
        />
      </div>
    </div>
  );
};

export default ImportSA;
