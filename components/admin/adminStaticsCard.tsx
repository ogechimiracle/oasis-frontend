'use client'

import { IconType } from "react-icons"
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi"

interface AdminStaticsCardProps {
  title: string
  value: number | string
  percentage: number
  icon: IconType
  color?: "green" | "red"
}

function AdminStaticsCard({
  title,
  value,
  percentage,
  icon: Icon,
  color = "green",
}: AdminStaticsCardProps) {

  const isPositive = percentage >= 0

  return (
    <div className="px-4 py-4 rounded-2xl border border-myheroColor bg-white shadow-sm">
      <div className="flex flex-col">

        {/* Top Section */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-normal text-sm">{title}</p>
            <p className="font-bold text-2xl">{value}</p>
          </div>

          <div>
            <Icon size={26} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-4">

          <div className="flex items-center gap-x-2">
            <div
              className={`size-5 rounded-full grid place-content-center ${
                isPositive ? "bg-mygreenColor" : "bg-red-500"
              }`}
            >
              {isPositive ? (
                <FiArrowUpRight className="text-white text-xs" />
              ) : (
                <FiArrowDownLeft className="text-white text-xs" />
              )}
            </div>

            <p className="text-xs font-poppins">
              {percentage > 0 ? "+" : ""}
              {percentage}%
            </p>
          </div>

          <button className="text-myheroColor text-sm cursor-pointer underline">
            View More
          </button>

        </div>
      </div>
    </div>
  )
}

export default AdminStaticsCard