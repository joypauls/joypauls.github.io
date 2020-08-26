/** @jsx jsx */
import { jsx } from "theme-ui";
import { useColorMode } from "theme-ui";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link } from "gatsby";
import { rhythm, scale } from "../utils/typography";
import { Button, Flex, Text, Box } from "rebass";
import { IoMdStats } from "react-icons/io";

// import { select, selectAll } from 'd3-selection';

// import { scaleLinear } from 'd3-scale';
// import { randomNormal } from "d3-random";

// import { select, selectAll } from 'd3-selection';

import * as d3 from "d3";

// import { select, selectAll } from 'd3-selection';
// import transition from 'd3-transition';
// import { scaleLinear, range } from 'd3-scale';
// import { randomNormal } from "d3-random";
// import { histogram } from "d3-array";




// import React, { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}





function generateNormalSamples(n=10) {

  var gen = d3.randomNormal(0, 1);
  // var sample = gen(n);
  // return sample.map((d) => ({ x: d }));

  let data = [];
  for (let i = 0; i < n; i++) {
    data.push({x: gen()});
  }
  return data;
};

function makeBins(n) {

  // var data = generateUniformSamples(n);
  var data = generateNormalSamples(n);
  
  var ticks = d3.range(-2.7, 2.7, 0.6);
  
  var histogram = d3.histogram()
    .value(function(d) { return d.x; })
    .domain([-2.7, 2.69])
    .thresholds(ticks);
  var bins = histogram(data);
  // console.log(bins);
  var binCounts = bins.map((arr) => arr.length);
  
  return binCounts;
};

const WIDTH = 300;
const WIDTH_PAD = 4;
const HEIGHT = 250;
const HEIGHT_PAD = 10;
const INNER_HEIGHT = HEIGHT - (2 * HEIGHT_PAD);
var BAR_WIDTH = 24;
var BAR_GAP = 8;

function preprocess(data) {
  // data = d3.shuffle([...data]);s
  return data.map((d, i) => ({ id: i, value: d }));
}

function y(d, scale) {
  return HEIGHT - scale(d.value);
}

function height(d, scale) {
  return scale(d.value);
}

const sampleSize = 200;
var binCounts = makeBins(sampleSize);
var histData = preprocess(binCounts);

BAR_WIDTH = Math.floor((WIDTH - (2 * WIDTH_PAD)) / binCounts.length) - BAR_GAP



// class Placeholder extends React.Component {

//   constructor(props) {
//     super(props);
    
//     // initialize array of hexData in state
//     this.state = {  };
//   }

//   componentDidMount() {
//       // D3 Code to create the chart
//       // using this._rootNode as container

//       // this.hist = d3.select(this._rootNode).append("svg")
//       //   .attr("width", WIDTH)
//       //   .attr("height", HEIGHT)
//       //   .append("g");

//       var hist = d3.select("#d3-svg")
//         .attr("width", WIDTH)
//         .attr("height", HEIGHT)
//         .append("g");

//       const t = d3.transition()
//         .duration(1000)
//         .transition()
//         .ease(d3.easeBackInOut);

//       const bar = hist.selectAll("g").data(histData, d => d.id);
//       // EXIT section
//       bar.exit().remove();

//       console.log(bar)
    
//       var scale = d3.scaleLinear().domain([0, d3.max(binCounts)]).range([0, INNER_HEIGHT]);

//       // UPDATE section
//       bar.transition(t).attr(
//         "transform", 
//         (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${y(d, scale)})`
//       );

//       bar.select("rect").transition(t).attr("height", (d) => (height(d, scale)));
      
//       // ENTER section
//       const barEnter = bar.enter()
//         .append("g")
//         .attr(
//           "transform", 
//           (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${INNER_HEIGHT})`
//         );
    
//       barEnter
//         // .transition(t)
//         .attr(
//           "transform", 
//           (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${y(d, scale)})`
//         );
      
//       const rect = barEnter.append("rect")
//           .attr("x", 0)
//           .attr("y", 0)
//           .attr("width", BAR_WIDTH)
//           .attr("height", 0);
      
//       rect.attr("height", (d) => (height(d, scale)));
//   }

//   shouldComponentUpdate() {
//       // Prevents component re-rendering
//       return false;
//   }

//   // _setRef(componentNode) {
//   //     this._rootNode = componentNode;
//   // }

//   render() {
//     // return <svg ref={(elem) => { this.svg = elem; }} />;
//     return <svg id="d3-svg"></svg>;
//   }
// }


// const generateDataset = () => (
//   Array(10).fill(0).map(() => ([
//     Math.random() * 80 + 10,
//     Math.random() * 35 + 10,
//   ]))
// );

// const Placeholder = () => {

//   const [dataset, setDataset] = useState(
//     generateDataset()
//   );

//   useInterval(() => {
//     const newDataset = generateDataset();
//     setDataset(newDataset);
//   }, 2000);

//   return (
//     <svg viewBox="0 0 100 50">
//       {dataset.map(([x, y], i) => (
//         <circle
//           cx={x}
//           cy={y}
//           r="3"
//         />
//       ))}
//     </svg>
//   );
// }


const generateDataset = () => (
  Array(10).fill(0).map(() => ([
    Math.random() * 80 + 10,
    Math.random() * 35 + 10,
  ]))
);



var rangeScale = d3.scaleLinear().domain([0, d3.max(binCounts)]).range([0, INNER_HEIGHT]);
console.log(rangeScale(binCounts[4]));


const barStyle = {
  fill: "#8b32eb", 
  fillOpacity: 0.6,
  stroke: "#8b32eb",
  strokeWidth: "2px",
  rx: 2,
}

const Viz = () => {

  const [dataset, setDataset] = useState(
    generateDataset()
  );

  // useInterval(() => {
  //   const newDataset = generateDataset();
  //   setDataset(newDataset);
  // }, 2000);

  return (
    <svg width={ WIDTH.toString() } height={ HEIGHT.toString() }>
      { binCounts.map((d, i) => (
        <rect
          style={ barStyle }
          width={ BAR_WIDTH }
          height={ rangeScale(d) }
          y={ (HEIGHT - rangeScale(d)) - HEIGHT_PAD }
          x={ (i * (BAR_WIDTH + BAR_GAP)) + WIDTH_PAD }
        />
      )) }
    </svg>
  );
}

const Placeholder = () => {

  return (
    <Fragment>
    <Flex style={{ justifyContent: "center" }}>
      <Box
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Flex style={{ justifyContent: "center" }}>
        <header>
          <h3>joypauls.github.io is napping</h3>
        </header>
        </Flex>
        <main style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
          <h5>I'm working on it! Migrating over to React (Gatsby specifically), check back later!</h5>
          <h5>Link</h5>
        </main>
      </Box>
    </Flex>
    <Flex style={{ justifyContent: "center" }}>
      <Viz />
    </Flex>
    </Fragment>
  );
}

export default Placeholder;
