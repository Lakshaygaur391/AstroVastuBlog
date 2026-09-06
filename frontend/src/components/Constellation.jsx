import React from 'react';

// A quiet, hand-placed constellation line-art for the hero — not a stock zodiac wheel.
const points = [
  [40, 60], [120, 30], [210, 70], [260, 20], [330, 90],
  [300, 160], [220, 150], [150, 190], [70, 150], [40, 60],
];
const extra = [[210, 70], [220, 150]];

const Constellation = ({ className = '' }) => (
  <svg
    viewBox="0 0 380 220"
    className={className}
    fill="none"
    aria-hidden="true"
  >
    <polyline
      points={points.map((p) => p.join(',')).join(' ')}
      stroke="#C9A44C"
      strokeWidth="0.75"
      strokeOpacity="0.5"
    />
    <line
      x1={extra[0][0]} y1={extra[0][1]} x2={extra[1][0]} y2={extra[1][1]}
      stroke="#C9A44C" strokeWidth="0.75" strokeOpacity="0.5"
    />
    {points.map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.5 : 1.5} fill="#E4C878" />
    ))}
  </svg>
);

export default Constellation;
