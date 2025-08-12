import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DisciplineDonutChartProps {
  studyData: {
    labels: string[];
    data: number[];
  };
}

// Paleta de cores "fofas" em tons pastéis
const cuteColors = [
  '#FFC0CB', // Rosa Bebê
  '#B0E0E6', // Azul Pálido
  '#D8BFD8', // Lilás
  '#98FB98', // Verde Menta
  '#FFE4B5', // Amarelo Pêssego
  '#F08080', // Coral Claro
];

export function DisciplineDonutChart({ studyData }: DisciplineDonutChartProps) {
  const data = {
    labels: studyData.labels,
    datasets: [
      {
        label: 'Minutos Estudados',
        data: studyData.data,
        backgroundColor: cuteColors,
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%', // Cria o efeito de "donut"
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += `${context.parsed} min`;
            }
            return label;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return <Doughnut data={data} options={options} />;
}
