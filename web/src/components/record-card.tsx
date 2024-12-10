import type { RecordApiResponse } from "@server/src/shared/types";
import { topicsNameMapping } from "@src/utils";

export function RecordCard(props: {
  record: RecordApiResponse;
}) {
  return (
    <article className="p-4">
      <span className="block text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">
        {props.record.created_at}
      </span>
      <h4 className="text-xl font-bold">
        {topicsNameMapping[props.record.topic]}
      </h4>
      <p>{props.record.situation}</p>
    </article>
  );
}
