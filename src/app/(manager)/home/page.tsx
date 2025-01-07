"use client";
import { ResponsiveContainer } from "recharts";
import CardRisks from "./components/CardRisks";
import BarChartDashboard from "./components/charts/BarChart";
import LineChartDashboard from "./components/charts/LineChart";
import { useEffect, useState } from "react";
import { ICount, ICriticity, IHeader } from "../../../../types/ICharts";
import ChartsService from "@/services/ChartsService";
import { toast } from "react-toastify";

export default function Home() {

  const [headers, setHeaders] = useState<IHeader>()
  const [criticity, setCriticity] = useState<ICriticity[]>()
  const [riskCount, setRiskCount] = useState<ICount[]>([])
  const [error, setError] = useState<string | null>(null);

  const fetchCharts = async () => {
    try {
      const [headerData, criticityData, riskCountData] = await Promise.all([
        ChartsService.GetHeader(),
        ChartsService.GetCriticity(),
        ChartsService.GetRiskCount(),
      ]);

      setHeaders(headerData);
      setCriticity(criticityData);
      setRiskCount(riskCountData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Erro ao carregar os dados.");
      toast.error(error)
    }
  };

  useEffect(() => {
    fetchCharts()
  },[])

  return (
    <main className="w-full h-full flex flex-col p-3 items-start">
      <CardRisks headers={headers} />
      
      <section className="hidden md:flex flex-col lg:flex-row gap-3 w-full mt-8">
        <div className="h-full w-full lg:w-1/2">
          <ResponsiveContainer>
            <BarChartDashboard criticity={criticity}/>
          </ResponsiveContainer>
        </div>
        <div className="h-full w-full lg:w-1/2">
          <ResponsiveContainer>
            <LineChartDashboard riskCount={riskCount || []}/>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}
