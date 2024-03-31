import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";


export const data = [
  ['Year', 'China', 'India', 'United States'],
  // Data from 1960 to 1974 has no values for China and India, thus using null for each
  [1960, null, null, null],
  [1961, null, null, null],
  [1962, null, null, null],
  // ... Repeat for other years where data is not available
  [1975, null, 13.8880238001686, null],
  [1976, null, 16.8863022716248, null],
  [1977, null, 14.5944441988572, null],
  [1978, null, 14.2162364258735, null],
  [1979, null, 10.695918182962, null],
  [1980, null, 9.27104075857953, null],
  [1981, null, 10.100158204858, null],
  [1982, 7.58958385984067, 10.9856459244786, null],
  [1983, 9.76105095896503, 13.505419317598, null],
  [1984, 6.61442691129369, 14.6672021030753, null],
  [1985, 6.36970960224014, 19.1470509981572, null],
  [1986, 8.34258792034677, 28.4831084438931, null],
  [1987, 7.99967191272075, 27.8445018083083, null],
  [1988, 8.5067382015998, 26.6977098412376, null],
  [1989, 10.1016352161233, 26.5236308066954, null],
  [1990, 10.61087782865, 27.1649347717067, null],
  [1991, 10.8471167581194, 26.7618728355772, null],
  [1992, 9.38499580272947, 25.4384275810079, null],
  [1993, 10.2438423904561, 25.1974013511108, null],
  [1994, 8.13551420499848, 29.7222092147053, null],
  [1995, 8.98416222815204, 30.5446476375183, null],
  [1996, 8.32007878237502, 25.4117956076489, null],
  [1997, 11.5007594228784, 24.5403661403625, null],
  [1998, 8.70614978223589, 22.4906010281906, null],
  [1999, 9.17518947476203, 15.5898678884257, null],
  [2000, 7.10365634221398, 15.3785252750562, null],
  [2001, 6.09499146981097, 12.7873723803292, null],
  [2002, 5.08765834133732, 16.0936630679547, null],
  [2003, 3.02695463642206, 20.4370578603135, null],
  [2004, 1.27949109885197, 7.72064797144166, null],
  [2005, 1.09628764086999, 9.68673187832864, null],
  [2006, 0.850106942984024, 3.04097340030301, null],
  [2007, 0.645147457761912, 4.08674197262603, null],
  [2008, 0.585786185578993, 4.67088966817266, null],
  [2009, 0.63504326598963, 2.42993180000253, null],
  [2010, 0.768929630666259, 1.74480879947485, null],
  [2011, 0.657141959874656, 1.7610880638326, null],
  [2012, 0.446124159147646, 1.68235421098899, null],
  [2013, 0.480039992306932, 2.26107481576509, null],
  [2014, 0.544490697183815, 2.70826109311248, null],
  [2015, 1.34005981208142, 3.08583603985883, null],
  [2016, 0.763737304766045, 5.06408163934111, null],
  [2017, 0.691453049447116, 2.78304119910956, null],
  [2018, 0.734223632345877, 4.23273227574918, null],
  [2019, 1.01216063370734, 2.90807415383996, null],
  [2020, 1.13417715479413, 5.12885262296047, null],
  [2021, 1.29780022208048, 2.43281784750629, null],
  [2022, 1.87991569124785, 2.24606582150958, null],
  [2023, null, null, null],
  
];


export function DebtServicePPGIMF(props) {
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

export default DebtServicePPGIMF;
