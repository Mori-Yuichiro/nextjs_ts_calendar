"use client"

import { format, isSameDay, isSameMonth } from "date-fns";
import Link from "next/link";
import { useShowWeek } from "./hooks/useShowWeek";
import style from "./styles/page.module.css"
import { TaskModal } from "@/components/TaskModal";

const ShowWeek = () => {
    const {
        TODAY,
        daysOfWeek,
        showDate,
        tasks,
        nextWeek,
        lastWeek,
        isOpen,
        selectedDate,
        toggleModalAndSelectDate
    } = useShowWeek();

    return (
        <div className={style.show_week}>
            <Link href="/">月表示</Link>
            <div className={style.btn_date}>
                <button onClick={lastWeek}>先週</button>
                <p>{format(showDate, 'yyyy-MM')}</p>
                <button onClick={nextWeek}>来週</button>
            </div>
            <table className={style.table_week}>
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
                    <tr className={style.tr_date}>
                        {daysOfWeek.map(day => (
                            <td
                                key={`${day}`}
                                className={`
                                    ${isSameMonth(showDate, day) ? style.td_default : style.td_gray}
                                    ${isSameDay(TODAY, day) && style.td_today}
                                    ${tasks.find(task => task.date === format(day, 'yyyy-MM-dd')) && style.td_task}
                                `}
                            >
                                <p onClick={() => toggleModalAndSelectDate(day)}>
                                    {format(day, "d")}
                                </p>
                                <p>{tasks.find(task => task.date === format(day, 'yyyy-MM-dd'))?.task}</p>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            {isOpen && <TaskModal selectedDate={selectedDate} />}
        </div>
    );
}

export default ShowWeek;