"use client"

import { format, isSameDay, isSameMonth } from "date-fns";
import { ja } from "date-fns/locale";
import style from "./styles/Toppage.module.css"
import { useToppage } from "./hooks/useToppage";
import { TaskModal } from "@/components/TaskModal";
import Link from "next/link";


export default function Home() {
  const {
    TODAY,
    tasks,
    showDate,
    nextMonth,
    prevMonth,
    daysOfMonth,
    isOpen,
    toggleModalAndSelectDate,
    selectedDate
  } = useToppage();

  return (
    <div className={style.contents}>
      <Link href="/showWeek">週表示</Link>
      <div className={style.calendar_header}>
        <button onClick={prevMonth}>先月</button>
        <p>{format(showDate, 'yyyy年M月', { locale: ja })}</p>
        <button onClick={nextMonth}>来月</button>
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
        </thead>
        <tbody>
          {daysOfMonth.map(dates => (
            <tr key={`${dates}`}>
              {dates.map(date => (
                <td
                  key={`${date}`}
                  className={`
                      ${isSameMonth(showDate, date) ? style.td_default : style.td_gray} 
                      ${isSameDay(TODAY, date) && style.td_today} 
                      ${tasks.find(task => task.date === format(date, 'yyyy-MM-dd')) && style.td_task}
                    `}
                >
                  <p onClick={() => toggleModalAndSelectDate(date)}>{format(date, 'd', { locale: ja })}</p>
                  <p>{tasks.find(task => task.date === format(date, 'yyyy-MM-dd'))?.task}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen &&
        <TaskModal
          selectedDate={selectedDate}
        />}
    </div >
  );
}
