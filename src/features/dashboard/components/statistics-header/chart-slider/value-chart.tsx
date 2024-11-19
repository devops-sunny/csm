'use client';

import type { PropsWithoutRef, FunctionComponent } from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import type { AreaProps } from 'recharts';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useGetStatistics } from '@features/dashboard/hooks/api/use-get-statistics';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';

export type ValueChartProps = PropsWithoutRef<Omit<AreaProps, 'dataKey'>>;

export const ValueChart: FunctionComponent<ValueChartProps> = ({
  ...areaProps
}) => {
  const theme = useTheme();

  const { data: totalData, isLoading } = useGetStatistics();

  const valueChartData =
    totalData?.data.map((item) => ({
      date: item.date as string,
      value: item.totalMoneyMade ?? 0,
    })) ?? [];

  if (!totalData && isLoading) {
    return <LoadingIndicator />;
  }

  if (!isLoading && totalData && valueChartData.length === 0) {
    return (
      <Typography
        sx={{
          color: theme.palette.cadetBlue,
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        No Data Available
      </Typography>
    );
  }

  return (
    <ResponsiveContainer
      width="100%"
      style={{ position: 'absolute', inset: 0 }}
    >
      <AreaChart data={valueChartData}>
        <defs>
          <linearGradient
            id="chart-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#308667"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="#B9C3D400"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <YAxis hide />
        <XAxis
          padding={{ left: 2, right: 2 }}
          dataKey="date"
          interval="preserveStartEnd"
          tickLine={false}
          tickFormatter={(value) => dayjs(value).format('MM/DD')}
          tick={{
            fontSize: 10,
            fontWeight: 600,
          }}
        />
        <Tooltip
          contentStyle={{
            fontSize: 12,
            borderRadius: 4,
            padding: 8,
            lineHeight: 1.25,
          }}
          formatter={(value: number) => `$${value.toFixed(2)}`}
        />
        <Area
          {...areaProps}
          type="monotone"
          dataKey="value"
          stroke="#308667"
          strokeWidth={2}
          fill="url(#chart-gradient)"
          dot={{
            r: 5,
            fill: '#308667',
            strokeWidth: 1,
            stroke: '#fff',
            fillOpacity: 1,
          }}
          activeDot={{
            r: 5,
            fill: '#308667',
            strokeWidth: 1,
            stroke: '#fff',
            fillOpacity: 1,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
