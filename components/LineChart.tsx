
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EquationParams } from '../types';

interface ChartProps {
  equation: EquationParams;
}

const CustomLineChart: React.FC<ChartProps> = ({ equation }) => {
  const { a, b } = equation;

  const calculatePoints = () => {
    // To make the graph look good, we calculate points over a range
    // and let recharts determine the domain.
    const points = [];
    const range = 10;
    for (let x = -range; x <= range; x++) {
      points.push({ x, y: a * x + b });
    }
    return points;
  };

  const data = calculatePoints();

  return (
    <div className="w-full h-64 md:h-80 my-4 bg-white rounded-lg shadow-inner p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number"
            dataKey="x" 
            domain={['dataMin - 1', 'dataMax + 1']}
            label={{ value: 'x', position: 'insideBottomRight', offset: -5 }} 
            height={40}
          />
          <YAxis 
            type="number"
            domain={['dataMin - 1', 'dataMax + 1']}
            label={{ value: 'y', position: 'insideTopLeft', offset: -5 }}
          />
          <Tooltip formatter={(value: number, name: string) => [value, name === 'y' ? `y = ${a}x + ${b}`: name ]} />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#38bdf8" strokeWidth={3} dot={false} name={`y = ${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
