import { ChartDataSets } from 'chart.js';
import { Label } from "ng2-charts";

export interface InfoChartViewModel {
  loading: boolean;
  labels: Label[],
  datasets: ChartDataSets[],
}

export interface VendaMes {
  mes: string;
  quantidade: number;
  valor: number;
}

export interface Item {
  id: number;
  descricao: string;
  preco: number;
}
