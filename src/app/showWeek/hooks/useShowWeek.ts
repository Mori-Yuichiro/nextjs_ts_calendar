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

    const getCalendarWeekArray = useCallback((): Date[] => {
        const firstDay: Date = startOfWeek(showDate);
        const lastDay: Date = endOfWeek(showDate);
        return eachDayOfInterval({ start: firstDay, end: lastDay });
    }, [showDate])

    const [daysOfWeek, setDaysOfWeek] = useState<Date[]>(getCalendarWeekArray());

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
        setDaysOfWeek(getCalendarWeekArray());
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