import { IsOpenContext, ShowDateContext } from "@/providers/CalendarProvider";
import { addMonths, eachDayOfInterval, eachWeekOfInterval, endOfMonth, endOfWeek, format, startOfMonth, subMonths } from "date-fns";
import { useCallback, useContext, useEffect, useState } from "react";


export const useToppage = () => {
    const TODAY: Date = new Date();

    const { showDate, setShowDate } = useContext(ShowDateContext);

    const nextMonth = useCallback(() => {
        setShowDate(addMonths(showDate, 1));
    }, [showDate])

    const lastMonth = useCallback(() => {
        setShowDate(subMonths(showDate, 1))
    }, [showDate])

    const getCalendarArray = useCallback((date: Date): Date[][] => {
        const firstDay: Date = startOfMonth(date);
        const lastDay: Date = endOfMonth(date);
        const sundays: Date[] = eachWeekOfInterval({ start: firstDay, end: lastDay });
        return sundays.map(sunday => eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) }))
    }, [showDate])

    const [daysOfMonth, setDaysOfMonth] = useState<Date[][]>(getCalendarArray(showDate));

    // モーダル
    // const [isOpen, setIsOpen] = useState<boolean>(false);
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
        setDaysOfMonth(getCalendarArray(showDate));
    }, [showDate])

    return {
        TODAY,
        showDate,
        nextMonth,
        lastMonth,
        daysOfMonth,
        isOpen,
        toggleModalAndSelectDate,
        selectedDate
    }
}