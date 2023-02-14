import {PropsWithChildren} from "react";

interface SizeProps {
    width: 1 | 2 | 3 | 4;
    height: 1 | 2 | 3;
}


export function Tile(props: PropsWithChildren<SizeProps>) {
    const widthMultiplier = 25;
    const heightMultiplier = 25;

    return (
        <div
            className={'bg-default-900 m-2 rounded-lg flex flex-col justify-center items-center'}
            style={{
                width: props.width * widthMultiplier + '%',
                height: props.height * heightMultiplier + 'vh'
            }}>
            {props.children}
        </div>
    )
}
