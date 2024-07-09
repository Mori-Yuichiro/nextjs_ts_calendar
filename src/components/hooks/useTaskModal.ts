import { useCallback, useContext, useState } from "react";
import { IsOpenContext, TasksContext } from "@/providers/CalendarProvider";
import { format } from "date-fns";

export type InputTaskProps = {
    date: string,
    task: string
}

export const useTaskModal = (selectedDate: Date) => {
    const [inputTask, setInputTask] = useState<InputTaskProps>({
        date: "",
        task: ""
    });

    const { tasks, setTasks } = useContext(TasksContext);
    const { isOpen, setIsOpen } = useContext(IsOpenContext);

    const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputTask({
            date: name,
            task: value
        });
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const onClickAddTasks = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setTasks(
            [...tasks, inputTask]
        )
        setInputTask({
            date: "",
            task: ""
        });
        setIsOpen(!isOpen);
    }, [inputTask])

    const onClickEditTasks = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setTasks(tasks.map(task =>
            task.date === format(selectedDate, 'yyyy-MM-dd') ? { ...task, task: inputTask.task } : task
        ));
        setInputTask(
            {
                date: "",
                task: ""
            }
        );
        setIsOpen(!isOpen);
    }, [inputTask])

    const onClickDeleteTask = useCallback(() => {
        setTasks(tasks.filter(task =>
            task.date !== format(selectedDate, 'yyyy-MM-dd')
        ))
        setIsOpen(!isOpen);
    }, [])

    return {
        inputTask,
        tasks,
        onChangeTask,
        toggleModal,
        onClickAddTasks,
        onClickEditTasks,
        onClickDeleteTask
    };
}