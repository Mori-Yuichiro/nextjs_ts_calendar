import { IsOpenContext, ShowDateContext, TasksContext } from "@/providers/CalendarProvider";
import { addWeeks, eachDayOfInterval, endOfWeek, format, startOfWeek, subWeeks } from "date-fns";
import { useCallback, useContext, useEffect, useState } from "react";

export const useShowWeek = () => {
    const TODAY: Date = new Date();
    const { showDate, setShowDate } = useContext(ShowDateContext);
    const { tasks } = useContext(TasksContext);

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

    // モーダル
    const { isOpen, setIsOpen } = useContext(IsOpenContext);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const toggleModalAndSelectDate = useCallback((e: React.MouseEvent<HTMLElement>, date: Date) => {
        const selectYear: number = Number(format(date, 'yyyy'));
        const selectMonth: number = Number(format(date, 'MM'));
        const selectDay: number = Number(e.currentTarget.textContent as string);
        setSelectedDate(
            new Date(selectYear, selectMonth - 1, selectDay)
        )
        setIsOpen(!isOpen);
    }, [isOpen])


    useEffect(() => {
        setDaysOfWeek(getCalendarWeekArray(showDate));
    }, [showDate])

    return {
        TODAY,
        daysOfWeek,
        showDate,
        tasks,
        nextWeek,
        lastWeek,
        isOpen,
        selectedDate,
        toggleModalAndSelectDate
    };
}