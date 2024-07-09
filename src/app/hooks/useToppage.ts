import { IsOpenContext, ShowDateContext, TasksContext } from "@/providers/CalendarProvider";
import { addMonths, eachDayOfInterval, eachWeekOfInterval, endOfMonth, endOfWeek, format, startOfMonth, subMonths } from "date-fns";
import { useCallback, useContext, useEffect, useState } from "react";


export const useToppage = () => {
    const TODAY: Date = new Date();
    const { tasks } = useContext(TasksContext);

    const { showDate, setShowDate } = useContext(ShowDateContext);

    const nextMonth = useCallback(() => {
        setShowDate(addMonths(showDate, 1));
    }, [showDate])

    const prevMonth = useCallback(() => {
        setShowDate(subMonths(showDate, 1))
    }, [showDate])

    const getCalendarArray = useCallback((): Date[][] => {
        const firstDay: Date = startOfMonth(showDate);
        const lastDay: Date = endOfMonth(showDate);
        const sundays: Date[] = eachWeekOfInterval({ start: firstDay, end: lastDay });
        return sundays.map(sunday => eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) }))
    }, [showDate])

    const [daysOfMonth, setDaysOfMonth] = useState<Date[][]>(getCalendarArray());

    // モーダル
    const { isOpen, setIsOpen } = useContext(IsOpenContext);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const toggleModalAndSelectDate = useCallback((date: Date) => {
        setSelectedDate(
            new Date(date)
        )
        setIsOpen(!isOpen);
    }, [isOpen])

    useEffect(() => {
        setDaysOfMonth(getCalendarArray());
    }, [showDate])

    return {
        TODAY,
        tasks,
        showDate,
        nextMonth,
        prevMonth,
        daysOfMonth,
        isOpen,
        toggleModalAndSelectDate,
        selectedDate
    }
}