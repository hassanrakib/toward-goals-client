import { SuggestionProps } from "@tiptap/suggestion";
import { endOfToday, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DeadlineMention = ({
  query,
  editor,
  command,
}: {
  query: string;
  editor: SuggestionProps["editor"];
  command: SuggestionProps["command"];
}) => {
  // get the deadline from deadlineMention extension storage
  const deadlineInExtensionStorage = editor.storage.deadlineMention.deadline;

  // if the query doesn't start with the "deadline" keyword
  // or if the deadline is already mentioned
  // we are not going to render this component
  if (!query.startsWith("deadline") || deadlineInExtensionStorage) {
    return null;
  }

  return (
    <DatePicker
      // onChange event handler
      onChange={(date) => {
        // update the storage for the DeadlineMentionExtension
        editor.storage.deadlineMention.deadline = date?.toISOString();
        // add deadlineMention node to the doc
        command({
          id: date?.toISOString(),
          label: `deadline ${format(date!, "p")}`,
        });
      }}
      // shows the calendar instantly without showing input field
      inline
      // show only time selection
      showTimeSelect
      showTimeSelectOnly
      minTime={new Date()}
      maxTime={endOfToday()}
      timeIntervals={5}
    />
  );
};
