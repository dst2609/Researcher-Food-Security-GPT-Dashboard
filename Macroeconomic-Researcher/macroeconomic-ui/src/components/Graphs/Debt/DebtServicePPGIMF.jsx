import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Chart } from 'react-google-charts';

const DebtServicePPGIMF = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('World');
  const [chartData, setChartData] = useState([["Year", "Debt Services"]]);

  useEffect(() => {
    const csvFileUrl = "./API_DT.TDS.DPPF.XP.ZS_DS2_en_csv_v2_44491/API_DT.TDS.DPPF.XP.ZS_DS2_en_csv_v2_44491.csv";

    Papa.parse(csvFileUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        const countriesFromCSV = results.data.map(row => row['Country Name']).filter((value, index, self) => self.indexOf(value) === index);
        setCountries(countriesFromCSV);
      },
    });
  }, []);

  useEffect(() => {
    if (selectedCountry !== 'World') {
      const csvFileUrl = "./API_DT.TDS.DPPF.XP.ZS_DS2_en_csv_v2_44491/API_DT.TDS.DPPF.XP.ZS_DS2_en_csv_v2_44491.csv";
      
      Papa.parse(csvFileUrl, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          const rows = results.data.filter(row => row['Country Name'] === selectedCountry);
          const servicesData = rows.map(row => {
            const filteredRow = Object.entries(row).filter(([key, value]) => !isNaN(Date.parse(key)) && value);
            return filteredRow.map(([key, value]) => [new Date(key), parseFloat(value)]);
          }).flat();
          setChartData([
            ["Year", "Debt Services"],
            ...servicesData
          ]);
        },
      });
    }
  }, [selectedCountry]);

  // Handle country selection change
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div>
      <label htmlFor="country-select">Country:</label>
      <select id="country-select" value={selectedCountry} onChange={handleCountryChange}>
        <option value="World">World</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>{country}</option>
        ))}
      </select>
      {selectedCountry !== 'World' && (
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={chartData}
          options={{
            title: `Debt service (PPG and IMF only, % of exports of goods, services and primary income) for ${selectedCountry}`,
            hAxis: { title: 'Year' },
            vAxis: { title: 'Debt service (PPG and IMF only, % of exports of goods, services and primary income)' },
          }}
        />
      )}
    </div>
  );
};

export default DebtServicePPGIMF;
