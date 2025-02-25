import * as React from 'react';
import SvgProps from 'react-native-svg';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Path,
  G,
} from 'react-native-svg';
const VisaSVG = (props: SvgProps) => (
  <Svg
    height={100}
    width={150}
    viewBox="-74.7 -40.204 647.4 241.224"
    {...props}>
    <Defs>
      <LinearGradient
        x1={0}
        y1={0}
        x2={1}
        y2={0}
        gradientUnits="userSpaceOnUse"
        gradientTransform="scale(89.72793 -89.72793) rotate(-20.218 .966 -.457)"
        spreadMethod="pad"
        id="b">
        <Stop offset={0} stopColor="#222357" />
        <Stop offset={1} stopColor="#254aa5" />
      </LinearGradient>
      <ClipPath clipPathUnits="userSpaceOnUse" id="a">
        <Path d="M413.742 90.435c-.057-4.494 4.005-7.002 7.065-8.493 3.144-1.53 4.2-2.511 4.188-3.879-.024-2.094-2.508-3.018-4.833-3.054-4.056-.063-6.414 1.095-8.289 1.971l-1.461-6.837c1.881-.867 5.364-1.623 8.976-1.656 8.478 0 14.025 4.185 14.055 10.674.033 8.235-11.391 8.691-11.313 12.372.027 1.116 1.092 2.307 3.426 2.61 1.155.153 4.344.27 7.959-1.395l1.419 6.615c-1.944.708-4.443 1.386-7.554 1.386-7.98 0-13.593-4.242-13.638-10.314m34.827 9.744c-1.548 0-2.853-.903-3.435-2.289l-12.111-28.917h8.472l1.686 4.659h10.353l.978-4.659h7.467l-6.516 31.206h-6.894m1.185-8.43l2.445-11.718h-6.696l4.251 11.718m-46.284 8.43l-6.678-31.206h8.073l6.675 31.206h-8.07m-11.943 0l-8.403-21.24-3.399 18.06c-.399 2.016-1.974 3.18-3.723 3.18h-13.737l-.192-.906c2.82-.612 6.024-1.599 7.965-2.655 1.188-.645 1.527-1.209 1.917-2.742l6.438-24.903h8.532l13.08 31.206h-8.478" />
      </ClipPath>
    </Defs>
    <G
      clipPath="url(#a)"
      transform="matrix(4.98469 0 0 -4.98469 -1804.82 502.202)">
      <Path
        d="M0 0l98.437 36.252 22.394-60.809-98.436-36.252"
        fill="url(#b)"
        transform="translate(351.611 96.896)"
      />
    </G>
  </Svg>
);
export default VisaSVG;
