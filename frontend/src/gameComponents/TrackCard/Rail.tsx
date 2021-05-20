import { FC } from "react";

type RailProps = {
  color: string;
};
const Rail: FC<RailProps> = ({ color }) => {
  if (color === "bridge") {
    return (
      <path
        fill="#3e4341"
        d="M91.72,148.48l-12.62,0a41.89,41.89,0,0,1-4.87,8.18l17.51,0,0-8.17m16.35,8.12,0,8.17-8.16,0,0,8.17-8.17,0,0-8.17-28.57.08,0-8.17H69a44.16,44.16,0,0,0-.15-57.16l-5.84,0,0-8.16,28.57-.08,0-8.16,8.17,0,0,8.17,8.16,0,0,8.17-8.17,0,.16,57.15,8.16,0M79,107.69l12.61,0,0-8.17-17.52.05A42.4,42.4,0,0,1,79,107.69m12.62,4-10.94,0a49.64,49.64,0,0,1,2.15,8.16l8.81,0,0-8.17m0,12.25-8.33,0,.18,4.08-.15,4.09,8.33,0,0-8.16m0,12.25-8.82,0a49.92,49.92,0,0,1-2.1,8.17l10.94,0Z"
      />
    );
  }
  return (
    <g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="81.6"
          width="7.1"
          height="9.12"
          transform="translate(-20.16 152.16) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="85.01"
          width="14.06"
          height="1.74"
          transform="translate(-16.2 155.57) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="85.29"
          width="14.06"
          height="1.74"
          transform="translate(-12.32 160) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="74.08"
          width="7.1"
          height="24.17"
          transform="translate(-1.11 171.21) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="80.98"
          width="7.1"
          height="10.37"
          transform="translate(190.77 -18.45) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="85.01"
          width="14.06"
          height="1.74"
          transform="translate(186.18 -14.41) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="85.01"
          width="14.06"
          height="1.74"
          transform="translate(182.15 -10.38) rotate(90)"
        />
      </g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="109.72"
          width="7.1"
          height="9.12"
          transform="translate(-48.28 180.28) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="113.13"
          width="14.06"
          height="1.74"
          transform="translate(-44.31 183.69) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="113.41"
          width="14.06"
          height="1.74"
          transform="translate(-40.44 188.12) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="102.19"
          width="7.1"
          height="24.17"
          transform="translate(-29.22 199.33) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="109.09"
          width="7.1"
          height="10.37"
          transform="translate(218.89 9.67) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="113.13"
          width="14.06"
          height="1.74"
          transform="translate(214.3 13.7) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="113.13"
          width="14.06"
          height="1.74"
          transform="translate(210.27 17.74) rotate(90)"
        />
      </g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="95.66"
          width="7.1"
          height="9.12"
          transform="translate(-34.22 166.22) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="99.07"
          width="14.06"
          height="1.74"
          transform="translate(-30.26 169.63) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="99.35"
          width="14.06"
          height="1.74"
          transform="translate(-26.38 174.06) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="88.14"
          width="7.1"
          height="24.17"
          transform="translate(-15.17 185.27) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="95.03"
          width="7.1"
          height="10.37"
          transform="translate(204.83 -4.39) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="99.07"
          width="14.06"
          height="1.74"
          transform="translate(200.24 -0.35) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="99.07"
          width="14.06"
          height="1.74"
          transform="translate(196.21 3.68) rotate(90)"
        />
      </g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="137.84"
          width="7.1"
          height="9.12"
          transform="translate(-76.39 208.39) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="141.25"
          width="14.06"
          height="1.74"
          transform="translate(-72.43 211.8) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="141.52"
          width="14.06"
          height="1.74"
          transform="translate(-68.55 216.24) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="130.31"
          width="7.1"
          height="24.17"
          transform="translate(-57.34 227.45) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="137.21"
          width="7.1"
          height="10.37"
          transform="translate(247.01 37.78) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="141.25"
          width="14.06"
          height="1.74"
          transform="translate(242.41 41.82) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="141.25"
          width="14.06"
          height="1.74"
          transform="translate(238.38 45.85) rotate(90)"
        />
      </g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="123.78"
          width="7.1"
          height="9.12"
          transform="translate(-62.34 194.34) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="127.19"
          width="14.06"
          height="1.74"
          transform="translate(-58.37 197.75) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="127.46"
          width="14.06"
          height="1.74"
          transform="translate(-54.49 202.18) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="116.25"
          width="7.1"
          height="24.17"
          transform="translate(-43.28 213.39) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="123.15"
          width="7.1"
          height="10.37"
          transform="translate(232.95 23.72) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="127.19"
          width="14.06"
          height="1.74"
          transform="translate(228.36 27.76) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="127.19"
          width="14.06"
          height="1.74"
          transform="translate(224.32 31.79) rotate(90)"
        />
      </g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="165.95"
          width="7.1"
          height="9.12"
          transform="translate(-104.51 236.51) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="169.36"
          width="14.06"
          height="1.74"
          transform="translate(-100.55 239.92) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="169.64"
          width="14.06"
          height="1.74"
          transform="translate(-96.67 244.35) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="158.43"
          width="7.1"
          height="24.17"
          transform="translate(-85.46 255.56) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="165.32"
          width="7.1"
          height="10.37"
          transform="translate(275.12 65.9) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="169.36"
          width="14.06"
          height="1.74"
          transform="translate(270.53 69.94) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="169.36"
          width="14.06"
          height="1.74"
          transform="translate(266.5 73.97) rotate(90)"
        />
      </g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="151.89"
          width="7.1"
          height="9.12"
          transform="translate(-90.45 222.45) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="155.3"
          width="14.06"
          height="1.74"
          transform="translate(-86.49 225.86) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="155.58"
          width="14.06"
          height="1.74"
          transform="translate(-82.61 230.29) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="144.37"
          width="7.1"
          height="24.17"
          transform="translate(-71.4 241.51) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="151.27"
          width="7.1"
          height="10.37"
          transform="translate(261.06 51.84) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="155.3"
          width="14.06"
          height="1.74"
          transform="translate(256.47 55.88) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="155.3"
          width="14.06"
          height="1.74"
          transform="translate(252.44 59.91) rotate(90)"
        />
      </g>
    </g>
  );
};

export default Rail;
