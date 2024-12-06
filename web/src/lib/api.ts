import { hc } from "hono/client";
import type { ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import type { NewRecordType } from "@server/shared/types";

const client = hc<ApiRoutes>("/");

export const api = client.api;

async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Number.POSITIVE_INFINITY,
});

async function getUserRecordsPreview() {
  const res = await api.records.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export const userRecordsPreviewQueryOptions = queryOptions({
  queryKey: ["get-user-records-preview"],
  queryFn: getUserRecordsPreview,
});

export async function saveRecord(payload: NewRecordType) {
  const res = await api.records.new.$post({
    json: payload,
  });
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}
