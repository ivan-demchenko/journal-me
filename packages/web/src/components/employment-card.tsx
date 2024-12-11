import type { EmploymentStoryResponse } from "@jm/server/shared";
import { RecordCard } from "./record-card";

export function EmploymentCard({
  employment,
}: {
  employment: EmploymentStoryResponse;
}) {
  return (
    <div className="border-l border-gray-500 p-4">
      <h3 className="text-xl">
        {employment.position} at{" "}
        <span className="font-bold">{employment.companyName}</span>
      </h3>
      {employment.records.length > 0 ? (
        <ul className="divide-y divide-gray-700">
          {employment.records.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </ul>
      ) : (
        <div className="text-gray-500">No stories yet</div>
      )}
    </div>
  );
}
