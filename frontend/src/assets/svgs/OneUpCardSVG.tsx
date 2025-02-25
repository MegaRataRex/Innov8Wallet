import * as React from "react";
import Svg, {
  G,
  Rect,
  Mask,
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={167}
    height={285}
    viewBox="0 0 167 285"
    fill="none"
    {...props}
  >
    <G filter="url(#filter0_d_387_1576)">
      <Rect
        x={157}
        y={8}
        width={265}
        height={147}
        rx={17}
        transform="rotate(90 157 8)"
        fill="#E40F2C"
      />
    </G>
    <Mask
      id="mask0_387_1576"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={10}
      y={8}
      width={147}
      height={265}
    >
      <Rect
        x={157}
        y={8}
        width={265}
        height={147}
        rx={17}
        transform="rotate(90 157 8)"
        fill="#E40F2C"
      />
    </Mask>
    <G mask="url(#mask0_387_1576)">
      <Path
        d="M34.352 150.024C24.8336 130.305 30.386 45.5084 34.352 5.57481L46.25 -10.4751L27.8622 -18.5H-6.75002L8.93366 170.086C21.3724 171.615 43.8704 169.742 34.352 150.024Z"
        fill="#BCCF13"
        stroke="#BCCF13"
      />
      <Path
        d="M78.9794 47.5455C78.9794 17.7636 83.1598 2.43939 85.25 -1.5H55.0372C50.0207 33.4818 51.0468 117.076 52.1869 154.5H83.5398C74.989 147.409 78.9794 84.7727 78.9794 47.5455Z"
        fill="#21B2AE"
      />
      <Path
        d="M140.75 69.2947C140.75 37.9856 176.322 12.6149 178.25 8.47351L117.743 2.5C113.116 39.2758 114.063 127.157 115.114 166.5H144.029C136.143 159.045 140.75 107.308 140.75 69.2947Z"
        fill="#A68FC4"
      />
      <Path
        d="M115.087 53.8088C115.087 22.4296 136.302 4.65069 138.25 0.5L92.7787 2.13279C88.1047 38.9909 89.0607 127.068 90.123 166.5H119.336C111.369 159.029 115.087 93.0328 115.087 53.8088Z"
        fill="#4A57A2"
      />
      <Path
        d="M96.9848 48.375C96.9848 16.875 107.937 0.666667 109.5 -3.5H79.0819C75.3308 33.5 76.0981 121.917 76.9506 161.5H100.395C94.001 154 96.9848 87.75 96.9848 48.375Z"
        fill="#E7322B"
      />
      <Path
        d="M51.7171 45.3447C51.7171 16.8992 55.4057 2.26263 57.25 -1.5H30.5917C26.1654 31.9121 27.0707 111.755 28.0767 147.5H55.741C48.1962 140.727 51.7171 80.9015 51.7171 45.3447Z"
        fill="#614495"
      />
      <Path
        d="M21.3881 188.823C12.4702 203.185 -7.09199 245.561 -11.1924 263.236L-19.6336 254.418C-8.99538 200.967 3.98326 174.535 7.83939 167.611C30.8444 126.307 63.9785 141.693 70.9439 145.118L74.5346 150.13C47.2878 143.587 32.5356 170.87 21.3881 188.823Z"
        fill="#02A25C"
      />
      <Path
        d="M32.4286 199.518C26.4857 215.345 15.5714 260.723 15 278.859L4.99998 271.859C4.99998 217.359 12.5695 188.902 15 181.359C29.5 136.359 65 144.98 72.5 146.98L77 151.195C49 150.096 39.8571 179.734 32.4286 199.518Z"
        fill="#D2B598"
      />
      <Path
        d="M43.4286 200.518C37.4857 216.345 26.5714 261.723 26 279.859L16 272.859C16 218.359 23.5695 189.902 26 182.359C40.5 137.359 76 145.98 83.5 147.98L88 152.195C60 151.096 50.8571 180.734 43.4286 200.518Z"
        fill="#20B2AD"
      />
      <Path
        d="M50.4286 202.159C44.4857 217.986 33.5714 263.365 33 281.5L23 274.5C23 220 30.5695 191.543 33 184C47.5 139 83 147.622 90.5 149.622L95 153.836C67 152.737 57.8572 182.375 50.4286 202.159Z"
        fill="#EBE33A"
      />
      <Path
        d="M61.4286 206.569C55.4857 223.088 52.8571 265.072 52.2857 284H29C29.5714 272.146 41.9718 189.29 45.0072 181.65C62.0073 138.859 94 149.649 101.5 151.736L106 156.135C78 154.988 68.8571 185.921 61.4286 206.569Z"
        fill="#194C41"
      />
      <Path
        d="M73.4286 207.159C67.4857 222.986 64.8571 263.213 64.2857 281.348H41C41.5714 269.991 53.9718 190.604 57.0072 183.283C74.0073 142.284 106 152.622 113.5 154.622L118 158.836C90 157.737 80.8571 187.375 73.4286 207.159Z"
        fill="#95D1CD"
      />
      <Path
        d="M84.4285 207.81C78.4857 223.637 75.8571 263.864 75.2857 282H53C53.5714 270.642 61.9646 200.82 65 193.5C82 152.5 101.5 155.838 123.493 155.838L129 159.487C101 158.388 91.8571 188.026 84.4285 207.81Z"
        fill="#614495"
      />
      <Path
        d="M95.7744 210.59C90.1443 225.799 87.6541 264.455 87.1128 281.882H66C66.5413 270.968 70.6957 247.315 79.0435 196.718C86.2115 153.271 123.913 157.643 132.783 160.649L138 164.155C111.474 163.099 102.812 191.579 95.7744 210.59Z"
        fill="#BCCF13"
      />
      <Path
        d="M107.534 210.846C102.138 226.025 99.7518 264.607 99.233 282H79C79.5188 271.108 83.5 247.5 91.5 197C98.3693 153.637 134.5 158 143 161L148 164.5C122.579 163.446 114.278 191.871 107.534 210.846Z"
        fill="#E7322B"
      />
      <Path
        d="M124.496 211.993C118.162 226.928 115.361 264.887 114.752 282H91C91.609 271.283 95.5068 239.892 106.226 200.066C116.944 160.24 151 154.5 172 165.092V173.619C142.158 172.582 132.414 193.325 124.496 211.993Z"
        fill="#4957A2"
      />
      <Path
        d="M132.5 214.131C127.3 228.531 125 265.131 124.5 281.631H105C105.5 271.298 108.7 241.031 117.5 202.631C126.3 164.231 157.167 161.631 171.5 165.131V177.131C147 176.131 139 196.131 132.5 214.131Z"
        fill="#A68FC4"
      />
    </G>
    <Path
      d="M69.928 113.36C68.344 113.36 66.944 113.064 65.728 112.472C64.512 111.88 63.56 110.968 62.872 109.736C62.184 108.504 61.84 106.928 61.84 105.008C61.84 102.256 62.56 100.176 64 98.768C65.44 97.344 67.416 96.632 69.928 96.632C71.512 96.632 72.912 96.928 74.128 97.52C75.344 98.112 76.296 99.024 76.984 100.256C77.672 101.472 78.016 103.048 78.016 104.984C78.016 107.736 77.296 109.824 75.856 111.248C74.432 112.656 72.456 113.36 69.928 113.36ZM69.928 109.52C70.552 109.52 71.096 109.384 71.56 109.112C72.024 108.824 72.384 108.352 72.64 107.696C72.912 107.024 73.048 106.112 73.048 104.96C73.048 103.808 72.912 102.904 72.64 102.248C72.384 101.592 72.024 101.136 71.56 100.88C71.096 100.608 70.552 100.472 69.928 100.472C69.304 100.472 68.76 100.616 68.296 100.904C67.832 101.176 67.464 101.64 67.192 102.296C66.936 102.952 66.808 103.864 66.808 105.032C66.808 106.184 66.936 107.088 67.192 107.744C67.464 108.384 67.832 108.84 68.296 109.112C68.76 109.384 69.304 109.52 69.928 109.52Z"
      fill="white"
    />
    <Path
      d="M79.44 102.84C79.712 102.696 80.112 102.544 80.64 102.384C81.168 102.208 81.76 102.048 82.416 101.904C83.088 101.76 83.76 101.64 84.432 101.544C85.104 101.448 85.712 101.4 86.256 101.4C87.312 101.4 88.24 101.528 89.04 101.784C89.84 102.024 90.464 102.456 90.912 103.08C91.36 103.688 91.584 104.552 91.584 105.672V114H87.216V106.728C87.216 106.408 87.168 106.136 87.072 105.912C86.992 105.672 86.864 105.488 86.688 105.36C86.528 105.216 86.32 105.112 86.064 105.048C85.824 104.984 85.544 104.952 85.224 104.952C84.92 104.952 84.616 105 84.312 105.096C84.024 105.176 83.856 105.256 83.808 105.336V114H79.44V102.84Z"
      fill="white"
    />
    <Path d="M81.5 122.5V110" stroke="white" strokeWidth={4} />
    <Path d="M81.5 99V109" stroke="white" strokeWidth={4} />
    <Path
      d="M77.82 129.5C75.6067 129.5 73.9667 129.087 72.9 128.26C71.8333 127.433 71.3 126.087 71.3 124.22V115.66H75.5V123.98C75.5 124.833 75.66 125.467 75.98 125.88C76.3 126.293 76.84 126.5 77.6 126.5C78.2533 126.5 78.7667 126.293 79.14 125.88C79.5133 125.467 79.7 124.833 79.7 123.98V115.66H83.5V124.22C83.5 125.46 83.2533 126.473 82.76 127.26C82.2667 128.033 81.5933 128.6 80.74 128.96C79.8867 129.32 78.9133 129.5 77.82 129.5Z"
      fill="white"
    />
    <Path
      d="M99.176 114.36C97.912 114.36 96.792 114.104 95.816 113.592C94.84 113.08 94.08 112.36 93.536 111.432C92.992 110.488 92.72 109.392 92.72 108.144C92.72 106 93.264 104.328 94.352 103.128C95.456 101.912 97.048 101.304 99.128 101.304C100.488 101.304 101.592 101.592 102.44 102.168C103.288 102.744 103.912 103.616 104.312 104.784C104.728 105.936 104.928 107.376 104.912 109.104H95.816L95.24 106.536H101.168L100.712 108.024C100.696 106.696 100.552 105.784 100.28 105.288C100.024 104.776 99.568 104.52 98.912 104.52C98.608 104.52 98.312 104.624 98.024 104.832C97.736 105.024 97.504 105.344 97.328 105.792C97.152 106.224 97.064 106.808 97.064 107.544C97.064 108.584 97.312 109.384 97.808 109.944C98.304 110.504 99.152 110.784 100.352 110.784C100.752 110.784 101.16 110.728 101.576 110.616C101.992 110.504 102.384 110.384 102.752 110.256C103.12 110.112 103.424 110.008 103.664 109.944V113.568C103.104 113.776 102.464 113.96 101.744 114.12C101.024 114.28 100.168 114.36 99.176 114.36Z"
      fill="white"
    />
    <Path
      d="M91.3 124.94V129H87.3V115.66H93.84C95.4267 115.66 96.6867 116.013 97.62 116.72C98.5533 117.427 99.02 118.553 99.02 120.1C99.02 121.647 98.5533 122.84 97.62 123.68C96.6867 124.52 95.4267 124.94 93.84 124.94H91.3ZM91.3 121.94H93.34C93.5133 121.94 93.68 121.913 93.84 121.86C94 121.793 94.14 121.693 94.26 121.56C94.38 121.427 94.4733 121.267 94.54 121.08C94.62 120.88 94.66 120.653 94.66 120.4C94.66 120.093 94.62 119.833 94.54 119.62C94.4733 119.407 94.38 119.227 94.26 119.08C94.14 118.933 94 118.827 93.84 118.76C93.68 118.693 93.5133 118.66 93.34 118.66H91.3V121.94Z"
      fill="white"
    />
    <Path d="M89.5 118.5V109.5" stroke="white" strokeWidth={4.3} />
    <Path
      d="M64.6229 33.9248H64.7556C65.4948 33.9248 66.0824 33.3342 66.0824 32.5911V31.4289C66.0824 30.743 66.0066 30.4191 65.7412 30.0571C65.3622 29.5808 64.6987 29.3712 64.0543 29.3712H58.33H56.0176V31.086V33.0675V33.9248V34.7822V36.878V38.7642H58.33H63.353C64.187 38.7642 65.1726 38.6499 65.6844 38.0974C66.1582 37.5829 66.1772 37.1828 66.1772 35.9254V35.5062C66.1961 34.6488 65.4948 33.9248 64.6229 33.9248ZM58.349 31.086H63.2013C63.4477 31.086 63.9595 31.1813 63.9595 31.5814V32.6102C63.9595 32.9341 63.4857 33.0675 63.2961 33.0675H58.349V31.086ZM63.9974 36.3826C63.9974 36.6684 63.77 36.8971 63.4857 36.8971H58.349V34.8013H63.4477C63.751 34.8013 63.9974 35.0489 63.9974 35.3538V36.3826Z"
      fill="white"
    />
    <Path
      d="M77.531 38.7831H80.1846L74.8205 29.3902H72.6407L67.3713 38.7831H69.7407L70.84 36.7445H76.4506L77.531 38.7831ZM71.8257 34.9154L73.6642 31.5241L75.4649 34.9154H71.8257Z"
      fill="white"
    />
    <Path
      d="M83.1794 29.3902H82.8382H82.3075H81.5872V38.7831H83.7101V34.0581L83.6532 32.6101L90.9128 38.7831H91.2919H92.2207H92.5429V29.3902H90.42V34.1152L90.4769 35.5632L83.1794 29.3902Z"
      fill="white"
    />
    <Path
      d="M104.503 38.7831H97.2815C96.6371 38.7831 95.9358 38.6307 95.5567 38.1734C95.2345 37.8114 95.1776 37.1827 95.1776 36.6683V31.505C95.1776 30.9144 95.2534 30.2856 95.6325 29.9046C96.0116 29.5235 96.694 29.3902 97.2815 29.3902H104.503C105.148 29.3902 105.849 29.5235 106.228 29.9808C106.531 30.3428 106.607 30.9906 106.607 31.505V36.6683C106.607 37.2018 106.55 37.8114 106.228 38.1734C105.849 38.6307 105.148 38.7831 104.503 38.7831ZM97.49 31.2764V36.8969H104.295V31.2764H97.49Z"
      fill="white"
    />
    <Path
      d="M117.26 38.7833H120.539L116.35 35.3157H117.639C118.624 35.3157 119.439 34.5155 119.439 33.5057V31.1813C119.439 30.1905 118.643 29.3712 117.639 29.3712H111.63H109.318V31.1622V33.4866V35.2776V38.7833H111.63V35.3157H113.469L117.26 38.7833ZM111.63 31.1813H116.71C116.956 31.1813 117.146 31.3718 117.146 31.6195V33.0865C117.146 33.3342 116.956 33.5247 116.71 33.5247H111.63V31.1813Z"
      fill="white"
    />
    <Path
      d="M121.145 29.3902V31.2573H125.334V38.7831H127.647V31.2573H131.817V29.3902H127.647H125.334H121.145Z"
      fill="white"
    />
    <Path
      d="M140.384 32.9721H136.006V31.2002H143.057V29.3902H136.006H133.693V31.2002V32.9721V34.7821V36.8779V38.7831H136.006H143.152V36.8779H136.006V34.7821H140.384V32.9721Z"
      fill="white"
    />
    <Path
      d="M41.1309 27C35.7289 27 31.3504 28.4289 31.3504 30.2008C31.3504 31.687 34.402 32.9254 38.5531 33.2874L40.259 28.0098L40.5623 33.3826C40.7518 33.3826 40.9413 33.3826 41.1498 33.3826C46.5519 33.3826 50.9304 31.9537 50.9304 30.1818C50.9114 28.448 46.5329 27 41.1309 27Z"
      fill="white"
    />
    <Path
      d="M38.4962 33.4778C33.2269 33.535 29 35.2116 29 37.2884C29 39.0412 31.9948 40.5083 36.089 40.9655L38.4962 33.4778Z"
      fill="white"
    />
    <Path
      d="M40.5433 33.535L40.9603 41.0037C45.3009 40.6226 48.5231 39.0984 48.5231 37.2884C48.5421 35.4213 45.0924 33.8589 40.5433 33.535Z"
      fill="white"
    />
    <Path
      d="M28 219.05C29.9047 221.25 31.0475 225.98 28 229.5M32.5093 213C38.952 217.4 40.3805 228.95 33.2379 235M30.857 216.3C35.1426 220.7 34.6664 227.85 30.857 231.7M25.5 222C26 223.5 26.5 225 25 227"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M112.654 257.891H108.966L106.2 247.03C106.069 246.531 105.79 246.089 105.38 245.881C104.357 245.358 103.23 244.941 102 244.731V244.313H107.941C108.761 244.313 109.376 244.941 109.478 245.671L110.913 253.505L114.599 244.313H118.185L112.654 257.891ZM120.235 257.891H116.752L119.62 244.313H123.103L120.235 257.891ZM127.609 248.075C127.711 247.343 128.326 246.925 129.044 246.925C130.171 246.82 131.399 247.03 132.424 247.551L133.039 244.628C132.014 244.21 130.887 244 129.863 244C126.483 244 124.023 245.881 124.023 248.491C124.023 250.477 125.766 251.519 126.995 252.147C128.326 252.774 128.839 253.192 128.736 253.818C128.736 254.758 127.711 255.176 126.688 255.176C125.458 255.176 124.228 254.863 123.103 254.339L122.488 257.265C123.718 257.786 125.048 257.996 126.278 257.996C130.068 258.099 132.424 256.22 132.424 253.4C132.424 249.849 127.609 249.64 127.609 248.075ZM144.613 257.891L141.848 244.313H138.877C138.262 244.313 137.647 244.731 137.442 245.358L132.321 257.891H135.907L136.623 255.907H141.028L141.438 257.891H144.613ZM139.39 247.97L140.413 253.087H137.545L139.39 247.97Z"
      fill="url(#paint0_linear_387_1576)"
    />
    <Rect
      x={53}
      y={239}
      width={32}
      height={22.1538}
      rx={2}
      transform="rotate(-90 53 239)"
      fill="url(#paint1_linear_387_1576)"
    />
    <Path
      d="M61 214.528C60.5897 215.349 59.1538 216.497 56.6923 214.528"
      stroke="black"
      strokeWidth={0.3}
    />
    <Path
      d="M66.5385 237.769L66.5385 227.308L61 227.308L61 237.769"
      stroke="black"
      strokeWidth={0.37}
    />
    <Path
      d="M66.5385 237.769L66.5385 227.308L61 227.308L61 237.769"
      stroke="black"
      strokeWidth={0.37}
    />
    <Path
      d="M66.2308 208.231L66.2308 214.385L61.3077 214.385L61.3077 208.231"
      stroke="black"
      strokeWidth={0.37}
    />
    <Path
      d="M54.2308 229.769C55.2564 229.769 57.2609 229.769 57.2609 227.308C57.8763 226.692 59.4763 225.831 60.9532 227.308"
      stroke="black"
      strokeWidth={0.37}
    />
    <Path
      d="M73.9231 230.385C72.7964 230.385 70.5945 230.385 70.5945 227.611C69.9185 226.918 68.1609 225.947 66.5385 227.611"
      stroke="black"
      strokeWidth={0.37}
    />
    <Path
      d="M73.9231 211.923C72.8831 211.923 70.8505 211.923 70.8505 214.844C70.2265 215.574 67.4207 216.137 65.9231 214.385"
      stroke="black"
      strokeWidth={0.37}
    />
    <Rect
      x={54.3808}
      y={237.619}
      width={29.2385}
      height={19.3923}
      rx={1.85}
      transform="rotate(-90 54.3808 237.619)"
      stroke="black"
      strokeWidth={0.3}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_387_1576"
        x1={123}
        y1={239.5}
        x2={123}
        y2={261}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#848484" />
        <Stop offset={0.5} stopColor="white" />
        <Stop offset={1} stopColor="#A5A5A5" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_387_1576"
        x1={85.6154}
        y1={248.846}
        x2={53}
        y2={248.846}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#D9D9D9" />
        <Stop offset={0.395} stopColor="#737373" />
        <Stop offset={0.785} stopColor="#B6B6B6" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
