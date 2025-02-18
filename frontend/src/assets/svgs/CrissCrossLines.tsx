import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect, SvgProps} from 'react-native-svg';

const LinesSVG = (props: SvgProps) => (
  <Svg
    width={2793}
    height={2741}
    viewBox="0 0 2793 2741"
    fill="none"
    {...props}>
    <G clipPath="url(#clip0_101_43)">
      <G opacity={0.55}>
        <Path
          d="M2711.25 0L2710.36 83.83L2626.53 82.93L2625.63 166.76L2541.81 165.87L2541.42 202.04H2541.46L2540.95 249.71L2457.12 248.81L2456.22 332.64L2372.4 331.74V331.75H2372.39L2371.49 415.57L2287.67 414.68H2287.66L2286.77 498.5L2202.94 497.61L2202.56 533.78L2202.59 533.79L2202.08 581.45L2118.26 580.56H2118.25L2117.36 664.38L2033.53 663.49L2033.15 699.66H2033.16L2032.65 747.41L1948.83 746.51H1948.82L1947.93 830.34L1864.1 829.45L1863.72 865.62H1863.75L1863.24 913.29L1779.41 912.39L1778.52 996.22L1694.69 995.32V995.33H1694.68L1693.79 1079.15L1609.96 1078.26L1609.06 1162.09L1525.24 1161.19L1524.85 1197.37H1524.88L1524.38 1245.03L1440.55 1244.14H1440.54L1439.65 1327.96L1391.99 1327.46V1327.45L1355.82 1327.07L1354.92 1410.9L1271.09 1410L1270.2 1493.83L1186.37 1492.93L1185.98 1529.11H1186.02L1185.51 1576.77L1101.68 1575.88L1100.78 1659.71L1016.96 1658.81H1016.95L1016.06 1742.64L932.23 1741.75H932.22L931.33 1825.57L847.51 1824.68L847.12 1860.85H847.15L846.64 1908.52L762.82 1907.63H762.81L761.92 1991.45L678.09 1990.56L677.71 2026.73H677.72L677.21 2074.48L593.39 2073.58H593.38L592.49 2157.41L508.66 2156.51L508.28 2192.69H508.31L507.8 2240.35L423.98 2239.46H423.97L423.08 2323.29L339.25 2322.39H339.24L338.35 2406.22L254.52 2405.33L253.62 2489.15L169.8 2488.26L169.41 2524.43H169.45L168.94 2572.1L85.11 2571.21L84.21 2655.03L0.39 2654.14L0 2690.31L83.83 2691.21L120 2691.59L120.39 2655.42L120.89 2607.77L168.55 2608.27L204.73 2608.66L205.11 2572.49L205.62 2524.82L253.24 2525.33L289.41 2525.71L289.8 2489.54L290.31 2441.89L337.96 2442.39L374.14 2442.78L374.52 2406.61L375.03 2358.95L422.69 2359.46L458.87 2359.85L459.25 2323.67L459.76 2276.02L507.42 2276.53L543.59 2276.91L543.98 2240.74L544.48 2193.07L592.1 2193.58L628.28 2193.97L628.66 2157.79L629.17 2110.14L676.83 2110.65L713 2111.04L713.39 2074.86L713.9 2027.12L761.53 2027.63L797.71 2028.01L798.09 1991.84L798.6 1944.19L846.26 1944.69L882.43 1945.08L882.82 1908.91L883.33 1861.24L930.95 1861.75L967.12 1862.13L967.51 1825.96L968.01 1778.31L1015.67 1778.81L1051.84 1779.2L1052.23 1743.03L1052.74 1695.37L1100.4 1695.88L1136.57 1696.27L1136.96 1660.09L1137.47 1612.44L1185.12 1612.95L1221.3 1613.33L1221.68 1577.16L1222.19 1529.49L1269.81 1530L1305.99 1530.39L1306.37 1494.21L1306.88 1446.56L1354.54 1447.07L1390.71 1447.45L1391.1 1411.28L1391.6 1363.63L1439.26 1364.14L1475.44 1364.52L1475.82 1328.35L1476.33 1280.7L1523.99 1281.2L1560.16 1281.59L1560.55 1245.42L1561.06 1197.75L1608.68 1198.26L1644.85 1198.64L1645.24 1162.47L1645.74 1114.82L1693.4 1115.33L1729.58 1115.71L1729.96 1079.54L1730.47 1031.88L1778.13 1032.39L1814.3 1032.78L1814.69 996.6L1815.2 948.95L1862.85 949.46L1899.03 949.85L1899.41 913.67L1899.92 866.01L1947.54 866.51L1983.72 866.9L1984.1 830.73L1984.61 783.07L2032.27 783.58L2068.44 783.97L2068.83 747.79L2069.34 700.05L2116.97 700.56L2153.15 700.94L2153.53 664.77L2154.04 617.12L2201.7 617.62L2237.87 618.01L2238.26 581.84L2238.76 534.17L2286.38 534.68L2322.56 535.06L2322.94 498.89L2323.45 451.24L2371.11 451.75L2407.28 452.13L2407.67 415.96L2408.18 368.3L2455.84 368.81L2492.01 369.2L2492.4 333.02L2492.9 285.37L2540.56 285.88L2576.74 286.27L2577.12 250.09L2577.63 202.43L2625.25 202.93L2661.42 203.32L2661.81 167.15L2662.32 119.49L2709.97 120L2746.15 120.39L2746.53 84.21L2747.43 0.39L2711.25 0Z"
          fill="#8F0613"
        />
      </G>
      <G opacity={0.55}>
        <Path
          d="M2756.2 48.8199L2755.31 132.64L2671.48 131.75H2671.47L2670.58 215.58L2586.75 214.68L2586.37 250.86H2586.4L2585.89 298.52L2502.07 297.63H2502.06L2501.17 381.45L2417.34 380.56H2417.33L2416.44 464.39L2332.61 463.49L2331.71 547.32L2247.89 546.43L2247.5 582.6H2247.54L2247.03 630.27L2163.2 629.37L2162.3 713.2L2078.48 712.31L2078.09 748.48H2078.11L2077.6 796.22L1993.77 795.33L1992.87 879.16L1909.05 878.26L1908.66 914.44H1908.69L1908.19 962.1L1824.36 961.21H1824.35L1823.46 1045.03L1739.63 1044.14L1738.73 1127.97L1654.91 1127.07H1654.9L1654.01 1210.9L1570.18 1210.01L1569.8 1246.18H1569.83L1569.32 1293.85L1485.49 1292.95L1484.6 1376.78L1436.93 1376.27L1400.76 1375.88L1399.87 1459.71L1316.04 1458.82L1315.14 1542.64L1231.32 1541.75L1230.93 1577.92H1230.96L1230.45 1625.59L1146.63 1624.7H1146.62L1145.73 1708.52L1061.9 1707.63L1061 1791.46L977.18 1790.56H977.17L976.28 1874.39L892.45 1873.5L892.07 1909.67H892.1L891.59 1957.34L807.76 1956.44L806.86 2040.27L723.04 2039.37L722.65 2075.55H722.67L722.16 2123.29L638.33 2122.4L637.43 2206.22L553.61 2205.33L553.22 2241.5L553.26 2241.51L552.75 2289.17L468.92 2288.28L468.02 2372.1L384.2 2371.21H384.19L383.29 2455.04L299.47 2454.14H299.46L298.57 2537.97L214.74 2537.08L214.36 2573.25H214.39L213.88 2620.92L130.06 2620.02H130.05L129.16 2703.85L45.33 2702.95L44.95 2739.13L128.77 2740.02L164.95 2740.41L165.33 2704.23L165.84 2656.58L213.5 2657.09L249.67 2657.48L250.06 2621.3L250.56 2573.64L298.18 2574.14L334.36 2574.53L334.74 2538.36L335.25 2490.7L382.91 2491.21L419.08 2491.6L419.47 2455.42L419.98 2407.77L467.64 2408.28L503.81 2408.66L504.2 2372.49L504.7 2324.84L552.36 2325.34L588.54 2325.73L588.92 2289.56L589.43 2241.89L637.05 2242.4L673.22 2242.78L673.61 2206.61L674.12 2158.96L721.77 2159.47L757.95 2159.85L758.33 2123.68L758.84 2075.93L806.48 2076.44L842.65 2076.83L843.04 2040.65L843.55 1993L891.2 1993.51L927.38 1993.9L927.76 1957.72L928.27 1910.06L975.89 1910.56L1012.07 1910.95L1012.45 1874.78L1012.96 1827.12L1060.62 1827.63L1096.79 1828.02L1097.18 1791.84L1097.68 1744.19L1145.34 1744.7L1181.52 1745.08L1181.9 1708.91L1182.41 1661.26L1230.07 1661.76L1266.24 1662.15L1266.63 1625.98L1267.14 1578.31L1314.76 1578.82L1350.93 1579.2L1351.32 1543.03L1351.82 1495.38L1399.48 1495.89L1435.65 1496.27L1436.04 1460.1L1436.55 1412.45L1484.21 1412.95L1520.38 1413.34L1520.77 1377.17L1521.28 1329.51L1568.93 1330.02L1605.11 1330.41L1605.49 1294.23L1606 1246.57L1653.62 1247.08L1689.8 1247.46L1690.18 1211.29L1690.69 1163.63L1738.35 1164.14L1774.52 1164.53L1774.91 1128.35L1775.42 1080.7L1823.07 1081.21L1859.25 1081.59L1859.63 1045.42L1860.14 997.77L1907.8 998.28L1943.97 998.66L1944.36 962.49L1944.87 914.82L1992.49 915.33L2028.66 915.72L2029.05 879.54L2029.55 831.89L2077.21 832.4L2113.39 832.78L2113.77 796.61L2114.28 748.87L2161.92 749.37L2198.09 749.76L2198.48 713.59L2198.98 665.93L2246.64 666.44L2282.82 666.83L2283.2 630.65L2283.71 582.99L2331.33 583.49L2367.5 583.88L2367.89 547.71L2368.4 500.05L2416.05 500.56L2452.23 500.95L2452.61 464.77L2453.12 417.12L2500.78 417.63L2536.96 418.01L2537.34 381.84L2537.85 334.19L2585.51 334.7L2621.68 335.08L2622.07 298.91L2622.58 251.24L2670.19 251.75L2706.37 252.14L2706.75 215.96L2707.26 168.31L2754.92 168.82L2791.09 169.2L2791.48 133.03L2792.37 49.1999L2756.2 48.8199Z"
          fill="#8F0613"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="clip0_101_43">
        <Rect width={2792.37} height={2740.41} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default LinesSVG;
