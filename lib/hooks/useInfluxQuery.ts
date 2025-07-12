import { useEffect, useState } from "react";
import { InfluxDB } from "@influxdata/influxdb-client";

export interface UseInfluxQueryOptions {
  url: string;
  token: string;
  org: string;
  query: string;
}

export interface InfluxRow {
  [key: string]: unknown;
}

export function useInfluxQuery({
  url,
  token,
  org,
  query,
}: UseInfluxQueryOptions) {
  const [rows, setRows] = useState<InfluxRow[]>([]);

  useEffect(() => {
    const influxDB = new InfluxDB({ url, token });
    const queryApi = influxDB.getQueryApi(org);
    const data: InfluxRow[] = [];

    queryApi.queryRows(query, {
      next: (row, tableMeta) => {
        data.push(tableMeta.toObject(row));
      },
      error: () => {
        setRows([]);
      },
      complete: () => {
        setRows(data);
      },
    });
  }, [url, token, org, query]);

  return rows;
}
