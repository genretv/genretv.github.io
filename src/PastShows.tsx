import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { PastShow } from "./types";

type Props = {
  data: PastShow[];
};

export default function PastShows({ data }: Props) {
  const [sortedData, setSortedData] = useState<PastShow[]>();
  useEffect(() => {
    data.sort((a, b) => Date.parse(b.finale) - Date.parse(a.finale));
    setSortedData(data);
  }, data);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td width="225">
              <strong>Past shows:</strong>
            </td>
            <td width="80">
              <strong>Status</strong>
            </td>
            <td width="115">
              <strong>Station</strong>
            </td>
            <td width="190">
              <strong>Genre</strong>
            </td>
            <td width="23">
              <strong>S</strong>
            </td>
            <td width="110">
              <strong>Finale</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {sortedData &&
            sortedData.map((show) => {
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
                  <td>{show.status}</td>
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
                  <td>{show.nbSeasons}</td>
                  <td>
                    {show.finale &&
                      dayjs(Date.parse(show.finale)).format("MMM.D YYYY")}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
