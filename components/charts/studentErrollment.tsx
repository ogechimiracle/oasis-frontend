
'use client'

import { useEffect, useRef } from "react"
import * as echarts from "echarts"
import { enrollmentData } from "@/utils/analytics"


export default function StudentEnrollmentChart() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const option = {
      title: {
        text: "Student Enrollment Analytics",
      },

      tooltip: {
        trigger: "axis",
      },

      xAxis: {
        type: "category",
        data: enrollmentData.map(d => d.month),
      },

      yAxis: {
        type: "value",
      },

      series: [
        {
          data: enrollmentData.map(d => d.students),
          type: "line",
          smooth: true,
        },
      ],
    }

    chart.setOption(option)

    // Resize responsiveness
    const handleResize = () => chart.resize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.dispose()
    }
  }, [])

  return <div ref={chartRef} className="w-full h-[350px]" />
}