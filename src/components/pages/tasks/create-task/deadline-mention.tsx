import { SuggestionProps } from "@tiptap/suggestion";
import { endOfToday, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useWatch } from "react-hook-form";

export const DeadlineMention = ({
  query,
  command,
}: {
  query: string;
  command: SuggestionProps["command"];
}) => {
  // get the deadline from the hook form
  const mentionedDeadline = useWatch({ name: "extracted.deadline" });

  // if the query doesn't start with the "deadline" keyword
  // or if the deadline is already mentioned
  // we are not going to render this component
  if (!query.startsWith("deadline") || mentionedDeadline) {
    return null;
  }

  return (
    <DatePicker
      // onChange event handler
      onChange={(date) => {
        // send the command to insert deadlineMention node
        // command goes to the DeadlineMentionExtension which is rendering this component
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
