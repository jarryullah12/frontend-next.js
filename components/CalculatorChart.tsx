'use client';

import type { CalcChartData } from '@/lib/calculators';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export function CalculatorChart({ chart }: { chart: CalcChartData }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {chart.type === 'pie' ? (
          <PieChart>
            <Pie
              data={chart.data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
              label
              isAnimationActive={false}
            >
              {chart.data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => Number(value).toLocaleString()} />
            <Legend />
          </PieChart>
        ) : chart.type === 'bar' ? (
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chart.nameKey || 'name'} />
            <YAxis />
            <Tooltip formatter={(value) => Number(value).toLocaleString()} />
            <Legend />
            <Bar dataKey={chart.dataKey || 'value'} fill="#3b82f6" isAnimationActive={false}>
              {chart.data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        ) : chart.type === 'line' ? (
          <LineChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chart.xAxisKey || 'name'} />
            <YAxis />
            <Tooltip formatter={(value) => Number(value).toLocaleString()} />
            <Legend />
            {chart.lines?.map((line: any, index: number) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                name={line.name}
                stroke={line.color || COLORS[index % COLORS.length]}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        ) : (
          <div>Unsupported Chart Type</div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
