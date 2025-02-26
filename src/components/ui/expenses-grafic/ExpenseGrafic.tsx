"use client";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ExpenseGrafic = ({ percentage }: { percentage: number }) => {
  return (
    <>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor:
            percentage >= 90
              ? "#E52020"
              : percentage >= 60
              ? "#E9762B"
              : "#FFB200",
          pathColor:
            percentage >= 90
              ? "#E52020"
              : percentage >= 60
              ? "#E9762B"
              : "#FFB200",
          trailColor: "#fceec7",
          textSize: "16px",
        })}
        strokeWidth={8}
      />
      ;
    </>
  );
};
