import { PieChart } from '@mui/x-charts/PieChart';

export default function Repports() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Likes' },
            { id: 1, value: 15, label: 'Reports' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}
