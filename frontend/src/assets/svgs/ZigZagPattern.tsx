import React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

interface LinesSVGProps extends SvgProps {
  id?: string;
}

const LinesSVG = ({ id, ...props }: LinesSVGProps) => {
  const scale = 1.5; // >1 bigger, <1 smaller
  const originalWidth = 2793;
  const originalHeight = 2741;

  // Calculate translation to center after scaling
  const translateX = (originalWidth * (1 - scale)) / 2;
  const translateY = (originalHeight * (1 - scale)) / 2;
  // Calculate offsets to center the scaled content
  return (
    <Svg
      id={id}
      width={props.width}
      height={props.height}
      viewBox={`0 0 ${originalWidth} ${originalHeight}`}
      preserveAspectRatio="xMidYMid slice"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
        <Path fill="#fff" d={`M0 0h${originalWidth}v${originalHeight}H0z`} />
        </ClipPath>
      </Defs>
      <G clipPath="url(#a)"
        transform={`translate(${translateX}, ${translateY}) scale(${scale})`}>
        <Path
          fill="#8F0613"
          d="m2711.2 0-.89 83.83-83.83-.9-.9 83.83-83.82-.89-.39 36.17h.04l-.51 47.67-83.83-.9-.9 83.83-83.82-.9v.01h-.01l-.9 83.82-83.82-.89h-.01l-.89 83.82-83.83-.89-.38 36.17.03.01-.51 47.66-83.82-.89h-.01l-.89 83.82-83.83-.89-.38 36.17h.01l-.51 47.75-83.82-.9h-.01l-.89 83.83-83.83-.89-.38 36.17h.03l-.51 47.67-83.83-.9-.89 83.83-83.83-.9v.01h-.01l-.89 83.82-83.83-.89-.9 83.83-83.82-.9-.39 36.18h.03l-.5 47.66-83.83-.89h-.01l-.89 83.82-47.66-.5v-.01l-36.17-.38-.9 83.83-83.83-.9-.89 83.83-83.83-.9-.39 36.18h.04l-.51 47.66-83.83-.89-.9 83.83-83.82-.9h-.01l-.89 83.83-83.83-.89h-.01l-.89 83.82-83.82-.89-.39 36.17h.03l-.51 47.67-83.82-.89h-.01l-.89 83.82-83.83-.89-.38 36.17h.01l-.51 47.75-83.82-.9h-.01l-.89 83.83-83.83-.9-.38 36.18h.03l-.51 47.66-83.82-.89h-.01l-.89 83.83-83.83-.9h-.01l-.89 83.83-83.83-.89-.9 83.82-83.82-.89-.39 36.17h.04l-.51 47.67-83.83-.89-.9 83.82-83.82-.89-.39 36.17 83.83.9 36.17.38.39-36.17.5-47.65 47.66.5 36.18.39.38-36.17.51-47.67 47.62.51 36.17.38.39-36.17.51-47.65 47.65.5 36.18.39.38-36.17.51-47.66 47.66.51 36.18.39.38-36.18.51-47.65 47.66.51 36.17.38.39-36.17.5-47.67 47.62.51 36.18.39.38-36.18.51-47.65 47.66.51 36.17.39.39-36.18.51-47.74 47.63.51 36.18.38.38-36.17.51-47.65 47.66.5 36.17.39.39-36.17.51-47.67 47.62.51 36.17.38.39-36.17.5-47.65 47.66.5 36.17.39.39-36.17.51-47.66 47.66.51 36.17.39.39-36.18.51-47.65 47.65.51 36.18.38.38-36.17.51-47.67 47.62.51 36.18.39.38-36.18.51-47.65 47.66.51 36.17.38.39-36.17.5-47.65 47.66.51 36.18.38.38-36.17.51-47.65 47.66.5 36.17.39.39-36.17.51-47.67 47.62.51 36.17.38.39-36.17.5-47.65 47.66.51 36.18.38.38-36.17.51-47.66 47.66.51 36.17.39.39-36.18.51-47.65 47.65.51 36.18.39.38-36.18.51-47.66 47.62.5 36.18.39.38-36.17.51-47.66 47.66.51 36.17.39.39-36.18.51-47.74 47.63.51 36.18.38.38-36.17.51-47.65 47.66.5 36.17.39.39-36.17.5-47.67 47.62.51 36.18.38.38-36.17.51-47.65 47.66.51 36.17.38.39-36.17.51-47.66 47.66.51 36.17.39.39-36.18.5-47.65 47.66.51 36.18.39.38-36.18.51-47.66 47.62.5 36.17.39.39-36.17.51-47.66 47.65.51 36.18.39.38-36.18.9-83.82L2711.2 0z"
          opacity={0.55}
        />
        <Path
          fill="#8F0613"
          d="m2756.2 48.82-.89 83.82-83.83-.89h-.01l-.89 83.83-83.83-.9-.38 36.18h.03l-.51 47.66-83.82-.89h-.01l-.89 83.82-83.83-.89h-.01l-.89 83.83-83.83-.9-.9 83.83-83.82-.89-.39 36.17h.04l-.51 47.67-83.83-.9-.9 83.83-83.82-.89-.39 36.17h.02l-.51 47.74-83.83-.89-.9 83.83-83.82-.9-.39 36.18h.03l-.5 47.66-83.83-.89h-.01l-.89 83.82-83.83-.89-.9 83.83-83.82-.9h-.01l-.89 83.83-83.83-.89-.38 36.17h.03l-.51 47.67-83.83-.9-.89 83.83-47.67-.51-36.17-.39-.89 83.83-83.83-.89-.9 83.82-83.82-.89-.39 36.17h.03l-.51 47.67-83.82-.89h-.01l-.89 83.82-83.83-.89-.9 83.83-83.82-.9h-.01l-.89 83.83-83.83-.89-.38 36.17h.03l-.51 47.67-83.83-.9-.9 83.83-83.82-.9-.39 36.18h.02l-.51 47.74-83.83-.89-.9 83.82-83.82-.89-.39 36.17.04.01-.51 47.66-83.83-.89-.9 83.82-83.82-.89h-.01l-.9 83.83-83.82-.9h-.01l-.89 83.83-83.83-.89-.38 36.17h.03l-.51 47.67-83.82-.9h-.01l-.89 83.83-83.83-.9-.38 36.18 83.82.89 36.18.39.38-36.18.51-47.65 47.66.51 36.17.39.39-36.18.5-47.66 47.62.5 36.18.39.38-36.17.51-47.66 47.66.51 36.17.39.39-36.18.51-47.65 47.66.51 36.17.38.39-36.17.5-47.65 47.66.5 36.18.39.38-36.17.51-47.67 47.62.51 36.17.38.39-36.17.51-47.65 47.65.51 36.18.38.38-36.17.51-47.75 47.64.51 36.17.39.39-36.18.51-47.65 47.65.51 36.18.39.38-36.18.51-47.66 47.62.5 36.18.39.38-36.17.51-47.66 47.66.51 36.17.39.39-36.18.5-47.65 47.66.51 36.18.38.38-36.17.51-47.65 47.66.5 36.17.39.39-36.17.51-47.67 47.62.51 36.17.38.39-36.17.5-47.65 47.66.51 36.17.38.39-36.17.51-47.65 47.66.5 36.17.39.39-36.17.51-47.66 47.65.51 36.18.39.38-36.18.51-47.66 47.62.51 36.18.38.38-36.17.51-47.66 47.66.51 36.17.39.39-36.18.51-47.65 47.65.51 36.18.38.38-36.17.51-47.65 47.66.51 36.17.38.39-36.17.51-47.67 47.62.51 36.17.39.39-36.18.5-47.65 47.66.51 36.18.38.38-36.17.51-47.74 47.64.5 36.17.39.39-36.17.5-47.66 47.66.51 36.18.39.38-36.18.51-47.66 47.62.5 36.17.39.39-36.17.51-47.66 47.65.51 36.18.39.38-36.18.51-47.65 47.66.51 36.18.38.38-36.17.51-47.65 47.66.51 36.17.38.39-36.17.51-47.67 47.61.51 36.18.39.38-36.18.51-47.65 47.66.51 36.17.38.39-36.17.89-83.83-36.17-.38z"
          opacity={0.55}
        />
      </G>
    </Svg>
  );
};

export default LinesSVG;
