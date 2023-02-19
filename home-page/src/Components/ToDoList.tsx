import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import classNames from "classnames";
import {Sliders} from "react-feather";
import {compareAsc, format} from "date-fns";

interface TaskProp {
    value: string;
    deadline: Date;
    isFinished: boolean;
}

function Task({value, deadline, isFinished}: TaskProp) {


}


export function ToDoList() {

    const [inputToggle, setInputToggle] = useState(false);

    const [addTaskInput, setAddTaskInput] = useState('');

    const [tasksArray, setTasksArray] = useState<TaskProp[]>([]);

    const localStorageKey = 'toDoList-tasksArray';


    useEffect(()=>{
        updateTasksArray();
    }, [])

    function updateTasksArray(): void {
        if (localStorage.getItem(localStorageKey) !== null)
            setTasksArray(JSON.parse(localStorage.getItem(localStorageKey) || '[]'));
    }

    function addTaskToLocalStorage(task: TaskProp): void {
        let tempTasksArray = [];
        if (localStorage.getItem(localStorageKey) !== null) {
            tempTasksArray = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
            localStorage.removeItem(localStorageKey);
        }
        tempTasksArray.push(task);
        localStorage.setItem(localStorageKey, JSON.stringify(tempTasksArray));

        updateTasksArray();
    }

    function editTaskInLocalStorage(index: number, mode: 'finish' | 'delete'): void {
        let tempTasksArray = [];
        if (localStorage.getItem(localStorageKey) !== null) {
            tempTasksArray = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
            localStorage.removeItem(localStorageKey);
        }
        if (index >= tempTasksArray.length) {
            console.error('index out of range');
            localStorage.setItem(localStorageKey, JSON.stringify(tempTasksArray));
            return;
        }

        if (mode === 'finish') {
            tempTasksArray[index].isFinished = true;
        } else if (mode === 'delete') {
            tempTasksArray.splice(index, 1);
        }

        localStorage.setItem(localStorageKey, JSON.stringify(tempTasksArray));

        updateTasksArray();
    }

    const tasksElements = tasksArray.sort((a, b)=> {
        if(a.isFinished && !b.isFinished) return -1;
        if(!a.isFinished && b.isFinished) return 1;
        return compareAsc(a.deadline, b.deadline);
    }).map((task, index) =>{
        return(
            <div key={index}>
                <span>{task.value}</span>
                {/*<span>{format(task.deadline, 'dd.MM.yyyy')}</span>*/}
            </div>
        );
    })

    return (
        <div className={'flex relative flex-col justify-between py-3 w-full h-full  '}>
            <div className={'overflow-y-scroll scrollbar-hide'}>
                {tasksElements}
            </div>
            {
                <div className={'flex flex-row justify-center'}>
                    <AnimatePresence>
                        {
                            inputToggle &&
                            <motion.input
                                className={classNames(
                                    'rounded text-default-900 p-2 w-1/2 align-middle',
                                    'placeholder:text-default-700 focus:outline-0 bg-default-50',
                                )}
                                placeholder={'dd.mm.yyyy'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setAddTaskInput(e.target.value);
                                }}
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        duration: 0.5
                                    }
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        duration: 0.5
                                    }
                                }}
                            />
                        }
                    </AnimatePresence>


                    <AnimatePresence>
                        {
                            inputToggle &&
                            <motion.div
                                onClick={() => {
                                    addTaskToLocalStorage({
                                        value: addTaskInput,
                                        deadline: new Date(),
                                        isFinished: false
                                    })
                                }}
                                className={classNames(
                                    'rounded align-middle p-1.5 mx-2 text-default-700',
                                    'bg-default-50 border-none font-bold text-xl',
                                    'hover:border-none hover:bg-default-50 hover:text-default-900',
                                )}
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        duration: 0.5
                                    }
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        duration: 0.5
                                    }
                                }}
                            >
                                +
                            </motion.div>
                        }
                    </AnimatePresence>


                </div>
            }

            <div
                className={'absolute bottom-3 right-3'}
                onClick={() => {
                    setInputToggle(!inputToggle);
                }}
            >
                <Sliders/>
            </div>

        </div>
    )
}
