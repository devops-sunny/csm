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
import { getHoursAndMinutesFromDecimal } from '@features/dashboard/utils/get-hours-and-minutes-from-decimal';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';

export type HourChartProps = PropsWithoutRef<Omit<AreaProps, 'dataKey'>>;

export const HourChart: FunctionComponent<HourChartProps> = ({
  ...areaProps
}) => {
  const theme = useTheme();

  const { data: totalData, isLoading } = useGetStatistics();

  const hourChartData =
    totalData?.data.map((item) => ({
      date: item.date as string,
      value: item.totalHoursWorked ?? 0,
    })) ?? [];

  if (!totalData && isLoading) {
    return <LoadingIndicator />;
  }

  if (!isLoading && totalData && hourChartData.length === 0) {
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
      <AreaChart data={hourChartData}>
        <defs>
          <linearGradient
            id="hour-chart-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#F1D7AE"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="#F1D7AE"
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
          formatter={(value: number) => getHoursAndMinutesFromDecimal(value)}
        />
        <Area
          {...areaProps}
          type="monotone"
          dataKey="value"
          stroke="#ECAE51"
          strokeWidth={2}
          fill="url(#hour-chart-gradient)"
          dot={{
            r: 5,
            fill: '#ECAE51',
            strokeWidth: 1,
            stroke: '#fff',
            fillOpacity: 1,
          }}
          activeDot={{
            r: 5,
            fill: '#ECAE51',
            strokeWidth: 1,
            stroke: '#fff',
            fillOpacity: 1,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
