import dayjs from "dayjs";
import { CurrentRun, STATUS_MAP } from "./types";

type Props = {
  data: CurrentRun[];
};

export default function OnNow({ data }: Props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td width="225">
              <strong>On Now:</strong>
            </td>
            <td width="80">
              <strong>Day</strong>
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
                <td>{show.days ? show.days.join(", ") : "Unknown"}</td>
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
