import dayjs from "dayjs";
import { asProperDate } from "./common";
import { STATUS_MAP, UpcomingRun } from "./types";

type Props = {
  data: UpcomingRun[];
};

export default function Upcoming({ data }: Props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td width="225">
              <strong>Upcoming:</strong>
            </td>
            <td width="80">
              <strong>When</strong>
            </td>
            <td width="115">
              <strong>Official Page</strong>
            </td>
            <td width="190">
              <strong>Genre</strong>
            </td>
            <td width="23">
              <strong>S</strong>
            </td>
            <td width="110">
              <strong>Hiatus</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {data.map((show) => {
            return (
              <tr key={show.name}>
                <td>
                  {show.imdb ? (
                    <a href={show.imdb} target="_blank">
                      {show.name}
                    </a>
                  ) : (
                    show.name
                  )}
                </td>
                <td>
                  {show.startDate &&
                  asProperDate(show.startDate) === show.startDate
                    ? dayjs(Date.parse(asProperDate(show.startDate))).format(
                        "MMM.D"
                      )
                    : (show.startDate?.charAt(0).toUpperCase() || "") +
                      show.startDate?.slice(1)}
                  {show.startDateUncertain ? "?" : ""}
                </td>
                <td>
                  {show.page?.link ? (
                    <a href={show.page?.link} target="_blank">
                      {show.page?.title}
                    </a>
                  ) : (
                    show.page?.title
                  )}
                </td>
                <td>{show.genre}</td>
                <td>{show.season}</td>
                <td>
                  {show.endDate &&
                    dayjs(Date.parse(show.endDate)).format("MMM.D")}{" "}
                  {STATUS_MAP[show.status]
                    ? `(${STATUS_MAP[show.status]})`
                    : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
