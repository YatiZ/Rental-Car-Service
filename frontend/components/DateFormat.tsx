import React from 'react'

interface DateProps{
    date: string
}

export function formateDate(isoDate:any){
    const date = new Date(isoDate)

    const day = date.getDate();
    const month = date.toLocaleString('default',{month:'short'});
    const year = date.getFullYear();

    const ordinalSuffix = (n:number)=>{
        const s = ["th","st","nd","rd"];
        const v = n % 100;
        return n + (s[(v-20)%10] || s[v] || s[0]);

    };
    return `${ordinalSuffix(day)} ${month}, ${year}`;
}

const DateFormat = ({date}:DateProps) => {
    const isoDate = date;
    const formattedDate = formateDate(isoDate)
  return (
    <div className='text-sm'>{formattedDate}</div>
  )
}

export default DateFormat