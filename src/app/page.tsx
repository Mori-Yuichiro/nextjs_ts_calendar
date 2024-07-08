"use client"

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import style from "./styles/Toppage.module.css"
import { useToppage } from "./hooks/useToppage";
import { TaskModal } from "@/components/TaskModal";
import { useContext } from "react";
import { TasksContext } from "@/providers/CalendarProvider";
import Link from "next/link";


export default function Home() {
  const {
    TODAY,
    showDate,
    nextMonth,
    lastMonth,
    daysOfMonth,
    isOpen,
    toggleModalAndSelectDate,
    selectedDate
  } = useToppage();

  const { tasks } = useContext(TasksContext);

  return (
    <div className={style.contents}>
      <Link href="/showWeek">週表示</Link>
      <div className={style.calendar_header}>
        <button onClick={lastMonth}>先月</button>
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
                      ${format(showDate, 'M', { locale: ja }) === format(date, 'M') ? style.td_default : style.td_gray} 
                      ${format(TODAY, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && style.td_today} 
                      ${tasks.find(task => task.date === format(date, 'yyyy-MM-dd')) && style.td_task}
                    `}
                >
                  <p onClick={(e) => toggleModalAndSelectDate(e, date)}>{format(date, 'd', { locale: ja })}</p>
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
