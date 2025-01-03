import { hc } from "hono/client";
import { queryOptions } from "@tanstack/react-query";
import type {
  NewEmploymentPayload,
  NewRecordPayload,
  GenerateCVPayload,
  ApiRoutes,
} from "@jm/server/shared";

const client = hc<ApiRoutes>("/");

export const api = client.api;

export const userEmploymentStoriesQueryOptions = queryOptions({
  queryKey: ["employment-stories"],
  queryFn: async () => {
    const res = await api.employments["with-stories"].$get();
    if (!res.ok) {
      throw new Error("server error");
    }
    return res.json();
  },
  staleTime: Number.POSITIVE_INFINITY,
});

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: async () => {
    const res = await api.me.$get();
    if (!res.ok) {
      throw new Error("server error");
    }
    return res.json();
  },
  staleTime: Number.POSITIVE_INFINITY,
});

export const userRecordsPreviewQueryOptions = queryOptions({
  queryKey: ["get-user-records-preview"],
  queryFn: async () => {
    const res = await api.records.$get();
    if (!res.ok) {
      throw new Error("server error");
    }
    return res.json();
  },
});

export async function saveRecord(payload: NewRecordPayload) {
  const res = await api.records.new.$post({
    json: payload,
  });
  if (!res.ok) {
    throw new Error("server error");
  }
  return res.json();
}

export const userEmploymentsQueryOptions = queryOptions({
  queryKey: ["get-user-employments"],
  queryFn: async () => {
    const res = await api.employments.$get();
    if (!res.ok) {
      throw new Error("server error");
    }
    return res.json();
  },
});

export async function saveEmployment(payload: NewEmploymentPayload) {
  const res = await api.employments.new.$post({
    json: payload,
  });
  if (!res.ok) {
    throw new Error("server error");
  }
  return res.json();
}

export async function generateCV(payload: GenerateCVPayload) {
  const res = await api.generate.cv.$post({ json: payload });
  if (!res.ok) {
    throw new Error("server error");
  }
  return res.json();
}
