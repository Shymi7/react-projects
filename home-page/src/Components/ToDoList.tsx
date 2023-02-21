import {ChangeEvent, useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import classNames from "classnames";
import {CheckSquare, Sliders, Trash, XSquare} from "react-feather";
import {compareAsc, format, isBefore, parse, parseISO} from "date-fns";

interface TaskProp {
    value: string;
    deadline: Date;
    isFinished: boolean;
}


export function ToDoList() {

    const [inputToggle, setInputToggle] = useState(false);

    const [taskValueInput, setTaskValueInput] = useState('');
    const [taskDeadlineInput, setTaskDeadlineInput] = useState('');

    const [isDeadlineInputValid, setIsDeadlineInputValid] = useState(true);

    const [tasksArray, setTasksArray] = useState<TaskProp[]>([]);

    const localStorageKey = 'toDoList-tasksArray';

    useEffect(() => {
        updateTasksArray();
    }, [])

    useEffect(() => { //called multiple times, on component refresh
        const curDate = parse(taskDeadlineInput, 'dd.MM.yyyy', new Date());
        if (taskDeadlineInput === '' || (!isNaN(curDate.getDate())) && isBefore(new Date(), curDate)) {
            setIsDeadlineInputValid(true);
        } else {
            setIsDeadlineInputValid(false);
        }
    })

    function updateTasksArray(): void {
        if (localStorage.getItem(localStorageKey) !== null) {
            setTasksArray(JSON.parse(localStorage.getItem(localStorageKey) || '[]'));
            const storedTasks = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
            const tasks = storedTasks.map((task: TaskProp) => {
                const tempDeadline: any = task.deadline;

                return({
                    value: task.value,
                    deadline: parseISO(tempDeadline), //prevents setting deadline to string
                    isFinished: task.isFinished
                })
            });

            setTasksArray(tasks);

        }


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

    const tasksElements = tasksArray.sort((a, b) => {
        if (a.isFinished && !b.isFinished) return 1;
        if (!a.isFinished && b.isFinished) return -1;
        return compareAsc(a.deadline, b.deadline);
    }).map((task, index) => {
        return (
            <div key={index}>
                <span className={classNames(
                    'align-middle',
                    task.isFinished ? 'line-through' : 'font-bold',
                )}>
                    {task.value}
                </span>
                <span className={'align-middle'}>
                    {' ('+format(task.deadline, 'dd.MM')+')'}
                </span>
                {
                    !task.isFinished &&
                    <button
                        onClick={() => {
                            editTaskInLocalStorage(index, 'finish')
                        }}
                        className={'align-middle py-0 px-0 mx-2 bg-transparent text-default-900 '}
                    >
                        <CheckSquare color={'white'}/>
                    </button>
                }

                <button
                    onClick={() => {
                        editTaskInLocalStorage(index, 'delete')
                    }}
                    className={'align-middle py-0 px-0 mx-1 bg-transparent text-default-900 '}
                >
                    <XSquare color={'white'}/>
                </button>

            </div>
        );
    })

    return (
        <div className={'flex relative flex-col justify-between py-3 w-full h-full  '}>
            <div className={'overflow-y-scroll scrollbar-hide'}>
                {tasksElements}
            </div>
            {
                <div className={'flex flex-row justify-center w-full'}>
                    <AnimatePresence>
                        {
                            inputToggle &&
                            <motion.div
                                className={'w-3/4 flex justify-center'}
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
                                <input
                                    className={classNames(
                                        'rounded text-default-900 p-2 w-2/3 align-middle  mx-1',
                                        'placeholder:text-default-700 focus:outline-0 bg-default-50',
                                    )}
                                    placeholder={'Co masz do zrobienia?'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setTaskValueInput(e.target.value);
                                    }}

                                />
                                <input
                                    className={classNames(
                                        'rounded text-default-900 p-2 w-1/3 align-middle mx-1',
                                        'placeholder:text-default-700 focus:outline-0 bg-default-50',
                                        isDeadlineInputValid ? 'bg-default-50' : 'bg-yellow-200',
                                    )}
                                    placeholder={'Termin'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setTaskDeadlineInput(e.target.value);
                                    }}

                                />
                            </motion.div>

                        }
                    </AnimatePresence>


                    <AnimatePresence>
                        {
                            (isDeadlineInputValid && inputToggle && taskDeadlineInput !== '') &&
                            <motion.div
                                onClick={() => {
                                    const date = new Date();
                                    //console.log(typeof date, date)
                                    addTaskToLocalStorage({
                                        value: taskValueInput,
                                        deadline: parse(taskDeadlineInput, 'dd.MM.yyyy', new Date()),
                                        isFinished: false
                                    })
                                }}
                                className={classNames(
                                    'rounded align-middle p-1.5 mx-1 text-default-700',
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
