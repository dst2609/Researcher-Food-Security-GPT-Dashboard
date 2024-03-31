import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";



export const data = [
  ['Year', 'China', 'India', 'United States'],
  [1960, null, null, null],
  [1961, null, null, null],
  [1962, null, null, null],
  // Skipping years without provided data for brevity
  [1970, null, 2.19303005039381, null],
  [1971, null, 0.861678316943728, null],
  [1972, null, 0.901263607576365, null],
  [1973, null, 0.816506871013134, null],
  [1974, null, 0.822457211883897, null],
  [1975, null, 0.876838577749487, null],
  [1976, null, 1.17697893902793, null],
  [1977, null, 1.01006517684012, null],
  [1978, null, 0.952123541884062, null],
  [1979, null, 0.836547889910224, null],
  [1980, null, 0.74871712563341, null],
  [1981, 0.602389209123968, 0.801602920723251, null],
  [1982, 0.747377160694385, 0.986984706760433, null],
  [1983, 0.87980882992856, 1.14121178292621, null],
  [1984, 0.725171587439453, 1.36133389216818, null],
  [1985, 0.79881909403177, 1.47160342023724, null],
  [1986, 0.990630077291424, 2.01146607101978, null],
  [1987, 1.17832055545774, 1.89043205839311, null],
  [1988, 1.11966162954211, 1.9000061681608, null],
  [1989, 1.23767923053409, 2.23167322405491, null],
  [1990, 1.7837727866364, 2.42896753511004, null],
  [1991, 2.00501325651235, 2.79985168851234, null],
  [1992, 1.74686367093689, 2.56225888101984, null],
  [1993, 1.64566943455813, 2.87896747679776, null],
  [1994, 1.97713726397004, 3.23442716248033, null],
  [1995, 2.08484940433479, 3.68764120648438, null],
  [1996, 1.85094149785744, 3.00746387880029, null],
  [1997, 1.94048947403403, 2.95321030962633, null],
  [1998, 1.820877209919, 2.82088700527263, null],
  [1999, 2.46232604984238, 2.18097561513434, null],
  [2000, 2.22367176548088, 2.30193534412263, null],
  [2001, 1.8935666616569, 2.44583880286812, null],
  [2002, 2.13600300586647, 3.0194199680375, null],
  [2003, 2.2738256624626, 4.27098120431118, null],
  [2004, 1.19482701240096, 2.48637589412648, null],
  [2005, 1.21172086042359, 2.93712915146459, null],
  [2006, 1.00291081955815, 1.86526396401862, null],
  [2007, 0.896095119385478, 3.25206703587721, null],
  [2008, 0.721290268595919, 2.59909766161628, null],
  [2009, 0.783489954475419, 1.23889459625915, null],
  [2010, 0.859610918880835, 1.47271485113113, null],
  [2011, 0.839428131295027, 1.62038919563891, null],
  [2012, 0.848723027907926, 1.68674506538768, null],
  [2013, 0.813211773651031, 2.11299315601506, null],
  [2014, 0.777973466693653, 4.60624170266818, null],
  [2015, 1.15076657916033, 2.3885645853738, null],
  [2016, 1.50077197061373, 3.39347044179047, null],
  [2017, 1.67799262950131, 1.95306263787646, null],
  [2018, 1.7416563263337, 2.38022646268864, null],
  [2019, 1.93672227201723, 1.82517493462673, null],
  [2020, 1.88336622356336, 2.89742608489552, null],
  [2021, 1.90607221634974, 1.59672251961867, null],
  [2022, 2.40867023981984, 1.91286266274974, null],
  [2023, null, null, null],
];


export function DebtServiceTotal(props) {
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
    } else if (country == "CHINA") {
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
            format: "#",
          },
        }}
      />
    </div>
  );
}

export default DebtServiceTotal;