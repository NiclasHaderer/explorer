"use client"

import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"

import {
    ChartConfig as RechartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {RelationData} from "@/model/relation";
import {ChartConfig} from "@/components/relation/chart/rechart/config";
import {getReChartDataFromConfig} from "@/components/relation/chart/rechart/utils";
import {CardTitle} from "@/components/ui/card";

const chartConfig = {} satisfies RechartConfig

export interface MyChartProps {
    data: RelationData,
    config: ChartConfig
}

export function ChartContent({data, config}: MyChartProps) {

    const chartData = getReChartDataFromConfig(data, config);

    return (
        <div className="w-full h-full flex flex-col items-center">
            <CardTitle>{config.plot.title}</CardTitle>
            <div className="flex-grow  w-full">
                <ChartContainer config={chartConfig} className={"w-full h-full"}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey={config.plot.xAxis.columnName}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed"/>}
                        />
                        <Bar dataKey={config.plot.yAxis.columnName} radius={4} fill={config.plot.yAxis.color}/>
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    )
}