import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CardStatistics } from "src/utils/Types";
import { snakeCaseToReadableString } from "src/utils/helpers";
import { Stack, Skeleton } from "@chakra-ui/react";

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

  const getCategories = () => {
    const categories = statistics.categories;
    const snake_cased_keys = Object.keys(categories);
    return snake_cased_keys.map((item) => snakeCaseToReadableString(item));
  };

  const getCategoryTotal = () => {
    const categories = statistics.categories;
    return Object.values(categories);
  };

  const data = {
    labels: getCategories(),
    datasets: [
      {
        label: "# of Votes",
        data: getCategoryTotal(),
        backgroundColor: [
          "#e6194b",
          "#3cb44b",
          "#ffe119",
          "#4363d8",
          "#f58231",
          "#911eb4",
          "#46f0f0",
          "#f032e6",
          "#bcf60c",
          "#fabebe",
          "#008080",
          "#e6beff",
          "#9a6324",
          "#fffac8",
          "#800000",
          "#aaffc3",
          "#808000",
          "#ffd8b1",
          "#000075",
          "#808080",
          "#ffffff",
          "#000000",
        ],
        borderColor: [
          "#e6194b",
          "#3cb44b",
          "#ffe119",
          "#4363d8",
          "#f58231",
          "#911eb4",
          "#46f0f0",
          "#f032e6",
          "#bcf60c",
          "#fabebe",
          "#008080",
          "#e6beff",
          "#9a6324",
          "#fffac8",
          "#800000",
          "#aaffc3",
          "#808000",
          "#ffd8b1",
          "#000075",
          "#808080",
          "#ffffff",
          "#000000",
        ],
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
              },
            },
          },
        }}
      />
    </>
  );
}
