import React from 'react';
import { letterFrequency } from '@visx/mock-data';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { extent, max } from 'd3-array';

const width = 800;
const height = 500;
const margin = { top: 20, bottom: 20, left: 20, right: 20 };

const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

function Histogram(props) {
  const data = props.data;
  console.log(data);

  const x = (data) => Object.keys(data);
  const y = (data) => Object.values(data);

  // And then scale the graph by our data
  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: Object.keys(data),
    padding: 0.6,
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...Object.values(data).map(y))],
  });
  console.log(Object.values(data));

  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => (data) =>
    scale(accessor(Object.keys(data)));
  const xPoint = compose(xScale, x);
  const yPoint = compose(yScale, y);

  console.log(props);
  return (
    <svg width={width} height={height}>
      {Object.values(data).map((month, index) => {
        const barHeight = yMax - yPoint(month);
        return (
          <Group key={`bar-${index}`}>
            <AxisLeft
              scale={yScale}
              top={0}
              left={0}
              label={'Frequency'}
              stroke={'#1b1a1e'}
              tickTextFill={'#1b1a1e'}
            />
            <AxisBottom
              scale={xScale}
              top={yMax}
              label={'Months'}
              stroke={'#1b1a1e'}
              tickTextFill={'#1b1a1e'}
            />
            <Bar
              x={xPoint(Object.values(data))}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="#1B7247"
            />
          </Group>
        );
      })}
    </svg>
  );
}

export default Histogram;
