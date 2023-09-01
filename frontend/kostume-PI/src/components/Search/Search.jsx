import { useState } from "react";
import {DatePicker} from "antd";
import moment from 'moment';
const { RangePicker } = DatePicker;


const SearchForm = () => {

  const [dates, setDates] = useState([]);
  console.log(dates);
  return (
    <form
      className="flex flex-col xl:flex-row gap-3 lg:p-0 xl:pl-20"
    >
      <RangePicker
      onChange={(values) => {

        setDates(values.map(item=>{
          return moment(item).format('YYYY-MM-DD')
        }))
        
      }}
      />
      
      
      <button
        className="rounded-full bg-btn-primary text-primary text-lg font-extrabold h-9 w-32"
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
};


export default SearchForm;
