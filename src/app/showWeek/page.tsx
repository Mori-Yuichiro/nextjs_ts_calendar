"use client"

import { ShowDateContext } from "@/providers/CalendarProvider";
import { addWeeks, eachDayOfInterval, endOfWeek, format, startOfWeek, subWeeks } from "date-fns";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";

const showWeek = () => {
    const { showDate, setShowDate } = useContext(ShowDateContext);

    const nextWeek = useCallback(() => {
        setShowDate(addWeeks(showDate, 1));
    }, [showDate])

    const lastWeek = useCallback(() => {
        setShowDate(subWeeks(showDate, 1));
    }, [showDate])

    const getCalendarWeekArray = useCallback((date: Date): Date[] => {
        const firstDay: Date = startOfWeek(date);
        const lastDay: Date = endOfWeek(date);
        return eachDayOfInterval({ start: firstDay, end: lastDay });
    }, [])

    const [daysOfWeek, setDaysOfWeek] = useState<Date[]>(getCalendarWeekArray(showDate));



    useEffect(() => {
        setDaysOfWeek(getCalendarWeekArray(showDate));
    }, [showDate])

    return (
        <div>
            <Link href="/">月表示</Link>
            <div>
                <button onClick={lastWeek}>先週</button>
                <p>{format(showDate, 'yyyy-MM')}</p>
                <button onClick={nextWeek}>来週</button>
            </div>
            <table>
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
                    <tr>
                        {daysOfWeek.map(day => (
                            <td key={`day-${day}`}>{format(day, "d")}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default showWeek;