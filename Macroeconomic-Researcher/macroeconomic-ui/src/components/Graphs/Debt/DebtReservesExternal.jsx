import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";


export const data = [
  ['Year', 'China', 'India', 'United States'],
  [1960, null, null, null],
  [1961, null, null, null],
  [1962, null, null, null],
  [1963, null, null, null],
  [1964, null, null, null],
  [1965, null, null, null],
  [1966, null, null, null],
  [1967, null, null, null],
  [1968, null, null, null],
  [1969, null, null, null],
  [1970, null, null, null],
  [1971, null, 13.3546609007128, null],
  [1972, null, 13.6361027084753, null],
  [1973, null, 14.8580826947513, null],
  [1974, null, 18.3087258224956, null],
  [1975, null, 14.888831931646, null],
  [1976, null, 25.5632172484829, null],
  [1977, null, 39.4782682776715, null],
  [1978, null, 50.3389249125613, null],
  [1979, null, 64.9541726945825, null],
  [1980, null, 57.9529008030199, null],
  [1981, 174.30692170964, 36.0712230552189, null],
  [1982, 205.162267972859, 30.5890373518057, null],
  [1983, 206.328840704897, 26.8054435519184, null],
  [1984, 176.040677769512, 26.0528462937761, null],
  [1985, 101.08886065368, 24.3820432247951, null],
  [1986, 69.2154412790343, 23.3360780230479, null],
  [1987, 63.5351375936359, 21.5475206419755, null],
  [1988, 55.9662988208573, 15.4934589336195, null],
  [1989, 51.3049176967183, 10.9174439093907, null],
  [1990, 62.3413783151308, 6.75373608549618, null],
  [1991, 79.9297533528531, 8.97557783016512, null],
  [1992, 34.2611184412349, 10.867260825399, null],
  [1993, 31.7658609678923, 16.0676385248745, null],
  [1994, 57.3982850273413, 24.7408254960678, null],
  [1995, 67.8599791892689, 24.3736131718362, null],
  [1996, 86.5866890253679, 26.4876066129941, null],
  [1997, 99.6891756523615, 30.1781699926886, null],
  [1998, 105.983119794166, 31.1658971217028, null],
  [1999, 108.458543224852, 36.0848593077683, null],
  [2000, 117.721046974955, 40.5996797790178, null],
  [2001, 119.391393823767, 49.2972814106673, null],
  [2002, 160.536099662391, 67.7196714862146, null],
  [2003, 200.887343913492, 87.2587269811448, null],
  [2004, 251.839641153722, 106.459372005668, null],
  [2005, 290.848050701713, 113.721097540285, null],
  [2006, 331.094072844704, 111.612105248727, null],
  [2007, 409.362840457539, 135.539270475798, null],
  [2008, 508.778446517509, 113.346273242114, null],
  [2009, 539.696971805164, 111.068783299851, null],
  [2010, 392.293617225978, 103.461319152171, null],
  [2011, 308.731219860373, 89.3361512583746, null],
  [2012, 295.03728433131, 76.5267053788125, null],
  [2013, 262.102630204063, 69.7708394619796, null],
  [2014, 219.302852538992, 71.0548132506625, null],
  [2015, 255.31058222747, 73.7878403060619, null],
  [2016, 219.085442069193, 79.3986952137364, null],
  [2017, 189.13045865071, 80.6554701626196, null],
  [2018, 161.514934701142, 76.5897509037982, null],
  [2019, 152.443123731408, 82.6123941762793, null],
  [2020, 144.320949030118, 104.468842983349, null],
  [2021, 126.854795528111, 104.329764836502, null],
  [2022, 138.434322085297, 91.9650191839871, null],
 
];

export function DebtReservesExternal(props) {
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

export default DebtReservesExternal;
