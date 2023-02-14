import {format, formatDistanceStrict, parse} from 'date-fns'
import {ChangeEvent, useEffect, useState} from "react";
import classNames from "classnames";
import {pl} from 'date-fns/locale'
import {AnimatePresence, motion} from 'framer-motion';
import {Sliders} from "react-feather";

// import plLocale from ''


export function DayCounter() {
    const [inputToggle, setInputToggle] = useState(false);
    const [isInputValid, setIsInputValid] = useState(true);

    const [addDateInput, setAddDateInput] = useState('');

    const [datesArray, setDatesArray] = useState<string[]>([]);


    const localStorageKey = 'dayCounter-datesArray';

    useEffect(() => { //called only once
        updateDatesArray();
    }, [])

    useEffect(() => { //called multiple times, on component refresh
        if (addDateInput === '' || !isNaN(parse(addDateInput, 'dd.MM.yyyy', new Date()).getDate())) {
            setIsInputValid(true);
        } else {
            setIsInputValid(false);
        }
    })

    function updateDatesArray(): void {
        if (localStorage.getItem(localStorageKey) !== null)
            setDatesArray(JSON.parse(localStorage.getItem(localStorageKey) || '[]'));
    }

    function addDateToLocalStorage(date: string): void {
        let tempDatesArray = [];
        if (localStorage.getItem(localStorageKey) !== null) {
            tempDatesArray = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
            localStorage.removeItem(localStorageKey);
        }
        tempDatesArray.push(date);
        localStorage.setItem(localStorageKey, JSON.stringify(tempDatesArray));

        updateDatesArray();
    }

    function deleteDateFromLocalStorage(index: number): void {
        let tempDatesArray = [];
        if (localStorage.getItem(localStorageKey) !== null) {
            tempDatesArray = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
            localStorage.removeItem(localStorageKey);
        }
        tempDatesArray.splice(index, 1);
        localStorage.setItem(localStorageKey, JSON.stringify(tempDatesArray));

        updateDatesArray();
    }


    const resultsElements = datesArray.map((dateString, index) => {
        const date = parse(dateString, 'dd.MM.yyyy', new Date());

        return (
            <div key={index} className={'p-2 text-xl'}>
                <span>Jeszcze tylko </span>
                <span className={'font-bold'}>
                    {formatDistanceStrict(date, new Date(), {unit: 'day', locale: pl})}
                </span>
                <span> do </span>
                <span>{format(date, 'd MMMM yyyy', {locale: pl})}</span>
                <button
                    onClick={() => {
                        deleteDateFromLocalStorage(index)
                    }}
                    className={' py-0 px-2 mx-2 rounded bg-default-50 text-default-900 font-bold '}
                >
                    -
                </button>

            </div>
        )
    })

    return (
        <div className={'flex relative flex-col justify-between py-3 w-full h-full  '}>
            <div className={'overflow-y-scroll scrollbar-hide'}>
                {resultsElements}
            </div>
            {
                <div className={'flex flex-row justify-center'}>
                    <AnimatePresence>
                        {
                            inputToggle &&
                            <motion.input
                                className={classNames(
                                    'rounded text-default-900 w-1/2 p-2 align-middle',
                                    'placeholder:text-default-700 focus:outline-0',
                                    isInputValid ? 'bg-default-50' : 'bg-yellow-200',
                                )}
                                placeholder={'dd.mm.yyyy'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setAddDateInput(e.target.value);
                                }}
                                initial={{
                                    width: 0,
                                    opacity: 0,
                                }}
                                animate={{
                                    width: "auto",
                                    opacity: 1,
                                    transition: {
                                        duration: 1
                                    }
                                }}
                                exit={{
                                    width: 0,
                                    opacity: 0,
                                    transition: {
                                        duration: 1
                                    }
                                }}
                            />
                        }
                    </AnimatePresence>


                    <AnimatePresence>
                        {
                            isInputValid && addDateInput !== '' &&
                            <motion.div
                                onClick={() => {
                                    addDateToLocalStorage(addDateInput)
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
                                        duration: 1
                                    }
                                }}
                                exit={{
                                    opacity: 0,
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
