import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

interface FormattedDateProps {
  date: number;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  dayjs.extend(customParseFormat);
  const postDate = dayjs.unix(date).format("DD MMM, YYYY");

  return <time dateTime={`${date}`}>{postDate}</time>;
};

export default FormattedDate;
