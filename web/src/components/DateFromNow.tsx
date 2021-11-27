import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface DateFromNowProps {
  date: string;
}

const DateFromNow: React.FC<DateFromNowProps> = ({ date }) => {
  dayjs.extend(relativeTime);

  const dateFromNow = dayjs(date).fromNow();

  return <time dateTime={date}>{dateFromNow}</time>;
};

export default DateFromNow;
