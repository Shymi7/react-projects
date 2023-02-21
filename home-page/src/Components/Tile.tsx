import {PropsWithChildren, useState} from "react";
import classNames from "classnames";

interface SizeProps {
    width: 1 | 2 | 3 | 4;
    height: 1 | 2 | 3;
}


export function Tile(props: PropsWithChildren<SizeProps>) {
    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);

    const [toggleSizeControl, setToggleSizeControl] = useState(false);

    const widthMultiplier = 25;
    const heightMultiplier = 25;

    return (
        <div
            className={'bg-default-900 m-2 rounded-lg flex flex-row justify-center items-center flex-wrap'}
            style={{
                width: width * widthMultiplier + '%',
                height: height * heightMultiplier + 'vh'
            }}>
            <div className={classNames(
                'flex flex-col justify-center items-center w-full h-full',
                // toggleSizeControl ? 'w-11/12' : 'w-full',
                // toggleSizeControl ? 'h-11/12' : 'h-full',
            )}>
                {props.children}
            </div>
            {
                toggleSizeControl &&
                <div className={'h-full w-4'}>
                    d
                </div>
            }
            {
                toggleSizeControl &&
                <div className={'w-full h-20'}>
                    d
                </div>
            }

        </div>
    )
}
