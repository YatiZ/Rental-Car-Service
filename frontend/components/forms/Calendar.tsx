'use client'
import { DateRange, Range, RangeKeyDict } from "react-date-range"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps{
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    bookedDates?: Date[];
}

const Calendar = ({value, onChange, bookedDates}: CalendarProps) => {
  return (
    <DateRange
     rangeColors={['#262626']}
     ranges={[value]}
     onChange={onChange}
     date={new Date()}
     direction="vertical"
     showDateDisplay={false}
     minDate={new Date()}
     disabledDates={bookedDates}
    />
  )
}

export default Calendar