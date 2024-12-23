"use client";
import { ResponsiveContainer } from "recharts";
import CardRisks from "./components/CardRisks";
import BarChartDashboard from "./components/charts/BarChart";
import LineChartDashboard from "./components/charts/LineChart";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col p-3 items-start">
      <CardRisks />
      
      <section className="hidden md:flex flex-col lg:flex-row gap-3 w-full mt-8">
        <div className="h-full w-full lg:w-1/2">
          <ResponsiveContainer>
            <BarChartDashboard />
          </ResponsiveContainer>
        </div>
        <div className="h-full w-full lg:w-1/2">
          <ResponsiveContainer>
            <LineChartDashboard />
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}
