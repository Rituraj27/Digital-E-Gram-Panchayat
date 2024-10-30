import React, { useContext, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  LabelList,
  Label,
  PieChart,
  Pie
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "./ui/chart";

import { EmployeeContext } from "./context/EmployeeContexr";

const Dashboard = () => {
  const { employee, performance, grievancePerformance ,employeePerformance,employeeGreivancePerformance,id} =
    useContext(EmployeeContext);

    useEffect(()=>{
      employeePerformance(id);
      employeeGreivancePerformance(id);
    },[])

    console.log("performance" ,performance)
    console.log("grievance performance", grievancePerformance)
    

  const chartConfig = {
    total: {
      label: "Total Tickets",
      color: "#1C4532",
    },
    open: {
      label: "Open Tickets",
      color: "#48BB78",
    },
    close: {
      label: "Close Tickets",
      color: "#2F855A",
    },
  };

  const chartConfig1 = {
    total: {
      label: "Total Grievances",
      color: "#1C4532",
    },
    open: {
      label: "Open grievances",
      color: "#48BB78",
    },
    close: {
      label: "Close grievances",
      color: "#2F855A",
    },
  };

  const chartConfig3 = {
    total: {
      label: "Total Grievances",
      color: "#1C4532",
    },
    open: {
      label: "Open grievances",
      color: "#48BB78",
    },
    close: {
      label: "Close grievances",
      color: "#2F855A",
    },
  };
  
  const overallTotal = performance[0]?.total + grievancePerformance[0]?.total;
  const overallClose = performance[0]?.close + grievancePerformance[0]?.close;
  const overallOpen = performance[0]?.open + grievancePerformance[0]?.open

  const chartData = [
    { ticket: "close", total: overallClose, fill: "var(--color-close)" },
    { ticket: "open", total: overallOpen, fill: "var(--color-open)" }
  ];
  const chartConfig2 = {
    close: {
      label: "Close",
      color: "#1C4532",
    },
    open: {
      label: "Open",
      color: "#48BB78",
    }
  };

 

  const totalTickets = (Number(overallClose)/Number(overallTotal))*100;

  return (
    <div>
      <p className="font-semibold">
        Welcome, <span className="text-2xl">{employee?.name}</span>
      </p>
      <div className="flex gap-10 ">
        <ChartContainer config={chartConfig} className="w-[33%]">
          <h1 className="mt-8 text-2xl text-center">Ticket</h1>
          <BarChart accessibilityLayer data={performance}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="total" fill={chartConfig.total.color} radius={4}>
              <LabelList dataKey="total" position="top" />
            </Bar>
            <Bar dataKey="close" fill={chartConfig.close.color} radius={4}>
              <LabelList dataKey="close" position="top" />
            </Bar>
            <Bar dataKey="open" fill={chartConfig.open.color} radius={4}>
              <LabelList dataKey="open" position="top" />
            </Bar>
          </BarChart>
        </ChartContainer>

        <ChartContainer config={chartConfig1} className="w-[33%]">
          <h1 className="mt-8 text-2xl text-center">Grievances</h1>
          <BarChart accessibilityLayer data={grievancePerformance}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="total" fill={chartConfig1.total.color} radius={4}>
              <LabelList dataKey="total" position="top" />
            </Bar>
            <Bar dataKey="close" fill={chartConfig1.close.color} radius={4}>
              <LabelList dataKey="close" position="top" />
            </Bar>
            <Bar dataKey="open" fill={chartConfig1.open.color} radius={4}>
              <LabelList dataKey="open" position="top" />
            </Bar>
          </BarChart>
        </ChartContainer>

        <ChartContainer
          config={chartConfig2}
          className=" w-[25%]"
        >
          <h1 className="mt-8 text-2xl text-center ">Overall Performance</h1>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="ticket"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-bold fill-foreground"
                        >
                          {totalTickets.toFixed(2)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Progress
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Dashboard;
