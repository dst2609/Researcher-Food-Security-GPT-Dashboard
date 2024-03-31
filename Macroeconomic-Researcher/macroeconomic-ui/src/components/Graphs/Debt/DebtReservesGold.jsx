import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";


export const data = [
  ['Year', 'China', 'India', 'United States'],
  [1960, null, null, 19664164000.0],
  [1961, null, null, 18825530000.0],
  [1962, null, null, 17252463900.0],
  [1963, null, null, 16878648000.0],
  [1964, null, null, 16725493600.0],
  [1965, null, null, 15498323200.0],
  [1966, null, null, 14953446600.0],
  [1967, null, null, 14898992000.0],
  [1968, null, null, 17857180000.0],
  [1969, null, null, 17031416000.0],
  [1970, null, null, 15236515800.0],
  [1971, null, 1245821898.02245, 14831073226.4574],
  [1972, null, 1367601418.5857, 20573775352.1224],
  [1973, null, 1629325093.4044, 33703588954.2107],
  [1974, null, 2324650346.59874, 55700252549.1293],
  [1975, null, 2064427967.54988, 43154974089.341],
  [1976, null, 3728750637.4451, 44162131646.1166],
  [1977, 4456360000.0, 6085439869.41109, 53374370832.8974],
  [1978, 4449800000.0, 8316115827.7223, 69447964987.8909],
  [1979, 8707600000.0, 11815414018.5725, 143259225732.736],
  [1980, 10090779859.0455, 12009788667.4367, 171412607203.354],
  [1981, 10106339042.8511, 8108837891.29932, 123907234985.741],
  [1982, 17151500473.3587, 8241561692.94602, 143444661762.222],
  [1983, 19831702777.5854, 8215732398.97451, 123110064423.481],
  [1984, 21281443729.6592, 8535944481.20133, 104855936881.377],
  [1985, 16881047188.0492, 9493102974.01812, 117981972231.986],
  [1986, 16417429180.4582, 10480102587.5579, 139883920728.389],
  [1987, 22453016927.8895, 11511740598.8136, 161738455237.867],
  [1988, 23751513805.8296, 9185839446.54077, 144176820283.572],
  [1989, 23052566323.2318, 8048455918.16026, 168583563269.377],
  [1990, 34475661158.6121, 5637446363.83185, 173093564607.844],
  [1991, 48165019103.1198, 7615987475.11472, 159272850288.003],
  [1992, 24852636915.1072, 9538786025.16566, 147525874735.105],
  [1993, 27348104116.5518, 14674627089.9414, 164620171357.293],
  [1994, 57781337884.3961, 24220928468.8194, 163590579764.938],
  [1995, 80288427869.5104, 22864636916.1009, 175995426883.436],
  [1996, 111728900039.4, 24889364657.4122, 160660160546.204],
  [1997, 146448007873.157, 28385372945.8609, 134836033327.141],
  [1998, 152842955596.126, 30646563663.4809, 146006089507.341],
  [1999, 161414049491.999, 36005295926.4425, 136450101867.481],
  [2000, 171763098225.843, 41059061574.6632, 128399516602.723],
  [2001, 220056777617.14, 49050841138.7213, 130076677027.985],
  [2002, 297739475705.212, 71607865093.6969, 157762914914.241],
  [2003, 416199411548.593, 103737208055.967, 184024332193.35],
  [2004, 622948544349.601, 131631143125.845, 190464790633.305],
  [2005, 831409619695.566, 137824828256.285, 188259141662.468],
  [2006, 1080755682869.9, 178049790065.97, 221088725058.691],
  [2007, 1546364660543.37, 276578100117.408, 277548941768.855],
  [2008, 1966037431070.11, 257422725614.879, 294045673779.627],
  [2009, 2452899062067.79, 284682887897.586, 404098925258.353],
  [2010, 2913711711315.37, 300480168786.346, 488928508742.44],
  [2011, 3254674063563.49, 298739463090.872, 537267041107.474],
  [2012, 3387512973773.81, 300425517446.546, 574268084132.447],
  [2013, 3880368265252.93, 298092478740.581, 448508920737.711],
  [2014, 3900039302991.09, 325081035127.891, 434416188744.625],
  [2015, 3405253363888.14, 353319061013.224, 383728497570.133],
  [2016, 3097658421378.4, 361694321972.036, 405942428719.749],
  [2017, 3235681607213.04, 412613792019.924, 451285263406.24],
  [2018, 3168216331199.09, 399167159226.682, 449907088828.546],
  [2019, 3222894578036.36, 463469902152.507, 516700583371.247],
  [2020, 3357240875433.72, 590227359928.896, 628369715338.322],
  [2021, 3427931394628.85, 638484779930.836, 716152260973.711],
  [2022, 3306839412813.78, 567298153917.14, 706644215998.894],
  // Assuming no data for 2023
  [2023, null, null, null],
];


export function DebtReservesGold(props) {
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
            format: "#", // Use 'decimal' format to display integers without commas
          },
        }}
      />
    </div>
  );
}

export default DebtReservesGold;