'use client'

import { useEffect, useRef } from "react"
import * as echarts from "echarts"
import { revenueDistribution } from "@/utils/analytics"

export default function RevenueChart() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const option = {
      title: {
        text: "Revenue Distribution",
        left: "center",
      },

      tooltip: {
        trigger: "item",
      },

      legend: {
        bottom: 0,
      },

      series: [
        {
          name: "Revenue",
          type: "pie",

          // ⭐ Doughnut magic happens here
          radius: ["45%", "70%"],

          avoidLabelOverlap: false,

          itemStyle: {
            borderRadius: 8,
            borderColor: "#fff",
            borderWidth: 2,
          },

          label: {
            show: true,
            formatter: "{b}\n₦{c}",
          },

          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold",
            },
          },

          data: revenueDistribution,
        },
      ],
    }

    chart.setOption(option)

    const resize = () => chart.resize()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      chart.dispose()
    }
  }, [])

  return <div ref={chartRef} className="w-full h-[350px]" />
}