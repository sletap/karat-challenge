import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CardStatistics } from "src/utils/Types";
import { snakeCaseToReadableString } from "src/utils/helpers";
import { Stack, Skeleton, Center } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({
  statistics,
}: {
  statistics: CardStatistics | undefined;
}) {
  if (statistics === undefined) {
    return (
      <Stack>
        <Skeleton height="640px" />
      </Stack>
    );
  }

  if (statistics.total_transactions === 0) {
    return <Center>No Categories of Transactions Available!</Center>;
  }

  const getCategories = () => {
    const categories = statistics.categories;
    const snake_cased_keys = Object.keys(categories);
    return snake_cased_keys.map((item) => snakeCaseToReadableString(item));
  };

  const getCategoryTotal = () => {
    const categories = statistics.categories;
    return Object.values(categories);
  };

  const colors = [
    "#D4B2D8",
    "#5D4E60",
    "#FAA916",
    "#419D78",
    "#DEB986",
    "#0E103D",
    "#69306D",
    "#D8CFAF",
    "#32533D",
    "#EE4266",
    "#AB4967",
    "#E4FDE1",
    "#8ACB88",
    "#8884FF",
    "#9EADC8",
    "#FF6542",
    "#B9E28C",
  ];

  const data = {
    labels: getCategories(),
    datasets: [
      {
        label: "# of Votes",
        data: getCategoryTotal(),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Doughnut
        data={data}
        options={{
          maintainAspectRatio: false,
          aspectRatio: 5,
          plugins: {
            legend: {
              position: "left",
              align: "center",
              labels: {
                boxHeight: 20,
                boxWidth: 100,
                color: "white",
              },
            },
          },
        }}
      />
    </>
  );
}
