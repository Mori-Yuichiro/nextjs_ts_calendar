import { format } from "date-fns";
import style from "./styles/TaskModal.module.css";
import { useTaskModal } from "./hooks/useTaskModal";

type TaskModalProps = {
    selectedDate: Date,
}

export const TaskModal: React.FC<TaskModalProps> = ({
    selectedDate
}) => {
    const {
        inputTask,
        tasks,
        toggleModal,
        onChangeTask,
        onClickAddTasks,
        onClickEditTasks,
        onClickDeleteTask
    } = useTaskModal(selectedDate);


    return (
        <>
            <div className={style.modal}>
                <form action="">
                    <div className="selectedDate">
                        <p>{format(selectedDate, 'yyyy-MM-dd')}</p>
                    </div>
                    <div className="task-contents">
                        <input
                            type="text"
                            className={style.inputTask}
                            name={format(selectedDate, 'yyyy-MM-dd')}
                            value={inputTask.task}
                            onChange={onChangeTask}
                        />
                        <p>
                            予定 : {tasks.find(task => task.date === format(selectedDate, 'yyyy-MM-dd'))?.task}
                        </p>
                    </div>
                    {tasks.find(task => task.date === format(selectedDate, 'yyyy-MM-dd')) ? <button
                        className={style.add_task}
                        onClick={onClickEditTasks}
                    >編集</button> : <button
                        className={style.add_task}
                        onClick={onClickAddTasks}
                    >登録</button>}
                </form>
                <button onClick={toggleModal}>閉じる</button>
                {tasks.find(task => task.date === format(selectedDate, 'yyyy-MM-dd')) && <button onClick={onClickDeleteTask}>削除</button>}
            </div>
        </>
    );
}