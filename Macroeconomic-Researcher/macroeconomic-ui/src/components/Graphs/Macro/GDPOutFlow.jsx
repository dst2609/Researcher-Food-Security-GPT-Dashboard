import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export const data = [
    ['Year', 'China', 'India', 'United States'],
        [1960, 0, 0, 0],
        [1961, 0, 0, 0],
        [1962, 0, 0, 0],
        [1963, 0, 0, 0],
        [1964, 0, 0, 0],
        [1965, 0, 0, 0],
        [1966, 0, 0, 0],
        [1967, 0, 0, 0],
        [1968, 0, 0, 0],
        [1969, 0, 0, 0],
        [1970, 0, 0, 0.604675474],
        [1971, 0, 0, 0.482465554],
        [1972, 0, 0, 0.573054702],
        [1973, 0, 0, 0.655265698],
        [1974, 0, 0, 0.333928062],
        [1975, 0, 0, 0.814883222],
        [1976, 0, 0, 0.604245089],
        [1977, 0, 0, 0.541832026],
        [1978, 0, 0, 0.611073572],
        [1979, 0, 0, 0.940878069],
        [1980, 0.002146783, 0.666361718, 0],
        [1981, 0.001033638, 0.315243865, 0],
        [1982, 0.01549685, 0.000498217, 0.232490746],
        [1983, 0.030516927, 0.002290823, 0.241329342],
        [1984, 0.042712084, 0.00188539, 0.317514333],
        [1985, 0.203010754, 0.001290258, 0.084812579],
        [1986, 0.149743338, -0.000401629, 0.426322557],
        [1987, 0.197193793, 0.001791899, 0.819675339],
        [1988, 0.208412678, 0.003708828, 0.414422934],
        [1989, 0.170944246, 0.003377898, 0.90364756],
        [1990, 0.210357844, 0.001869281, 1.005174452],
        [1991, 0.220864594, -0.004072485, 0.800080674],
        [1992, 0.811133683, 0.008327317, 0.901335163],
        [1993, 0.71069538, 0.000125545, 1.207250678],
        [1994, 0.354407681, 0.025233567, 1.234898938],
        [1995, 0.2722997, 0.032527051, 1.440623246],
        [1996, 0.244746938, 0.060912857, 1.276086253],
        [1997, 0.391534135, 0.027152632, 1.415088655],
        [1998, 0.43991572, 0.011295331, 1.9283185],
        [1999, 0.368917854, 0.017295973, 2.5696243],
        [2000, 0.380738008, 0.108782767, 1.818075753],
        [2001, 0.723905742, 0.217149393, 1.380097989],
        [2002, 0.427324267, 0.244897685, 1.637690092],
        [2003, 0.509316558, 0.203693879, 1.704001987],
        [2004, 0.407733392, 0.259051931, 3.061292344],
        [2005, 0.600603659, 0.321893491, 0.403329984],
        [2006, 0.869591811, 1.492867398, 2.054208779],
        [2007, 0.483189177, 1.399326213, 3.619467923],
        [2008, 1.235048262, 1.606189451, 2.32624445],
        [2009, 0.860302681, 1.199472947, 2.159107598],
        [2010, 0.952058055, 0.952969169, 2.324598488],
        [2011, 0.641201722, 0.691587283, 2.798869292],
        [2012, 0.761392113, 0.467994186, 2.320909589],
        [2013, 0.762458596, 0.095057271, 2.332075912],
        [2014, 1.175391014, 0.573112117, 2.208056874],
        [2015, 1.576545107, 0.357212266, 1.659181895],
        [2016, 1.926630609, 0.21994507, 1.603708063],
        [2017, 1.12337326, 0.418263547, 2.101996846],
        [2018, 1.029345269, 0.422422743, -0.636631935],
        [2019, 0.958755616, 0.463417726, 0.537519893],
        [2020, 1.046592361, 0.416330541, 1.361137481],
        [2021, 1.003328449, 0.547208108, 1.690193602],
        [2022, 0.833329047, 0.425336733, 1.675534696],
        [2023, 0, 0, 0]
]

export function GDPOutFlow(props) {

    const [chartData, setchartData] = useState([]);
    const range = useSelector((state) => state.countryRange.range);
    const country = useSelector((state) => state.countryRange.country);
    const filterData = () => {
      let filteredData = [["year", country]];
      let col = 0;
      if (country == "USA") {
        col = 3;
      } else if (country == "INDIA") {
        col = 1;
      } else if (country == "China") {
        col = 2;
      } else {
        setchartData(data);
        return;
      }
      let startYear = range[0];
      let endYear = range[1];
      for (let i = 1; i < data.length; i++) {
        let currYear = data[i][0];
        if (currYear <= endYear && currYear >= startYear) {
          filteredData.push([currYear, data[i][col]]);
        }
      }
      setchartData(filteredData);
    };
  
    useEffect(() => {
      console.log(range, country);
      filterData();
    }, [range, country]);
  
    return (
      <div style={{ marginBottom: "20px" }}>
        <Chart
          chartType="LineChart"
          width="100%"
          height="250px"
          data={chartData}
          options={{
            hAxis: {
              format: "#", // Use 'decimal' format to display integers without commas
            },
          }}
        />
      </div>
    );
  }
  
  export default GDPOutFlow;
  