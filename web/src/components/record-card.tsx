import type { SelectRecordType } from "@server/shared/types";
import { topicsNameMapping } from "@src/utils";

export function RecordCard(props: {
  record: SelectRecordType;
}) {
  return (
    <article className="border-b-2 border-gray-200 dark:border-gray-500 border-dashed p-4 last-of-type:border-none">
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
