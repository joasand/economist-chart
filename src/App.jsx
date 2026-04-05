import { useState } from 'react'
import { scaleBand, scaleLinear } from 'd3'
import './App.css'

export const data = [
  { count: 6, name: "Hantavirus" },
  { count: 7, name: "Tularemia" },
  { count: 7, name: "Dengue" },
  { count: 9, name: "Ebola" },
  { count: 11, name: "E. coli" },
  { count: 15, name: "Tuberculosis" },
  { count: 17, name: "Salmonella" },
  { count: 18, name: "Vaccinia" },
  { count: 54, name: "Brucella" },
];

export default function App() {

  const width = 800;
  const height = 500;

  const xScale = scaleLinear()
    .domain([0, 70])
    .range([0, width]);

  const yScale = scaleBand()
    .domain(data.map(d => d.name))    
    .range([0, height])
    .padding(0.3);

  const allBars = data.sort((a, b) => b.count - a.count).map((d, i) => (
    <g key={i}>
      <rect
        key={i}
        x={0}
        y={yScale(d.name)}
        width={xScale(d.count)}
        height={yScale.bandwidth()}
        fill="#69b3a2"
        />
    <text
      x={5}
      y={yScale(d.name) + yScale.bandwidth() / 2}
      textAnchor="start"
      dy="0.3em"
      fontSize="14"
      >
      {d.name}
    </text>
    </g>
  ));

  return (
    <>
    <h1>Economist Chart</h1>
    <svg width={width} height={height}>
      {allBars}
    </svg>
    </>
  );
}
