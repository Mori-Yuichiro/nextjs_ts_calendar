"use client"

import { InputTaskProps } from "@/components/hooks/useTaskModal"
import { Dispatch, SetStateAction, createContext, useState } from "react";

type TasksContextProps = {
    tasks: InputTaskProps[];
    setTasks: Dispatch<SetStateAction<InputTaskProps[]>>;
}

type ShowDateContextProps = {
    showDate: Date;
    setShowDate: Dispatch<SetStateAction<Date>>;
}

type IsOpenContextProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type CalendarProviderProps = {
    children: React.ReactNode;
}

export const TasksContext = createContext<TasksContextProps>({
    tasks: [],
    setTasks: () => { }
});

export const ShowDateContext = createContext<ShowDateContextProps>({
    showDate: new Date(),
    setShowDate: () => { }
});

export const IsOpenContext = createContext<IsOpenContextProps>({
    isOpen: false,
    setIsOpen: () => { }
});

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
    const [tasks, setTasks] = useState<InputTaskProps[]>([]);
    const [showDate, setShowDate] = useState<Date>(new Date());
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            <ShowDateContext.Provider value={{ showDate, setShowDate }}>
                <IsOpenContext.Provider value={{ isOpen, setIsOpen }}>
                    {children}
                </IsOpenContext.Provider>
            </ShowDateContext.Provider>
        </TasksContext.Provider>
    );
}