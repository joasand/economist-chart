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

  const width = 650;
  const height = 360;

  const xScale = scaleLinear()
    .domain([0, 57])
    .range([0, width]);

  const yScale = scaleBand()
    .domain(data.map(d => d.name))    
    .range([0, height])
    .padding(0.3);

  const gridLines = Array.from({ length: 15 }, (_, i) => i * 5).map((tick) => (
    <>
    <line 
      x1={0}
      x2={0}
      y1={0+10}
      y2={height-10}
      stroke="black"
    />
    <line
      key={`grid-${tick}`}
      x1={xScale(tick)}
      x2={xScale(tick)}
      y1={0+10}
      y2={height-10}
      stroke="#d3d3d3"
      strokeWidth="1"
      opacity={0.7}
    />
     <text
      key={`grid-${tick}`}
      x={xScale(tick)}
      y={-3}
      textAnchor={tick === 0 ? "start" : "middle"}
      fill="rgb(128, 128, 128)"
      fontSize="12"
      >
      {tick}
    </text>
    </>
  ));

  const allBars = data.sort((a, b) => b.count - a.count).map((d, i) => (
    <>
    <g key={i}>
      <rect
        key={i}
        x={0}
        y={yScale(d.name)}
        width={xScale(d.count)}
        height={yScale.bandwidth()}
        fill="#076fa2"
        />
    <text
      x={5}
      y={yScale(d.name) + yScale.bandwidth() / 2}
      textAnchor={d.count < 10 ? "middle" : "start"}
      dy="0.3em"
      dx={d.count < 8 ? xScale(9.5) : d.count < 10 ? xScale(11) : 0}
      fontSize="14"
      fill={d.count > 10 ? "white" : "#076fa2"}
      >
      {d.name}
    </text>
    </g>
    </>
  ));

  const decorativeLines = () => (
     <>
     <svg width={800} height={60}>
      <line
        x1={0}
        x2={xScale(53)}
        y1={50}
        y2={50}
        stroke="rgb(229, 1, 28)"
        strokeWidth="2"
      />  
      <rect 
      x={0} 
      y={50} 
      width={30} 
      height={10} 
      fill="rgb(229, 1, 28)" />
    </svg>
    </>
  )

  const descriptiveText = () => (
      <>
    <h1>Escape artists</h1>
    <div style={{ textAlign: 'left',
      fontSize: '15px',
      color: 'black',
      marginTop: '0px',
      marginBottom: '14px',
      fontFamily: 'var(--sans)',
    }}>Number of laboratory-acquired infections, 1970-2021</div>

      </>
  )

  const footerText = () => (
      <>
    <footer style={{ marginTop: '20px', fontSize: '12px', color: 'rgb(128, 128, 128)', textAlign: 'left' }}>
      Sources: Laboratory-Acquired Infection Database; American Biological Safety Association
    </footer>
      </>
  )

  return (
    <>
    {decorativeLines()}
    {descriptiveText()}
    <svg width={width} height={height + 20} viewBox={`0 -20 ${width} ${height + 20}`}>
      {gridLines}
      {allBars}
    </svg>
    {footerText()}
    </>
  );
}
