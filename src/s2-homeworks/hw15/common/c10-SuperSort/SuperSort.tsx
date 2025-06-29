import React from 'react';
import upIcon from './icons/upIcon.svg';
import downIcon from './icons/downIcon.svg';
import noneIcon from './icons/noneIcon.svg';

// добавить в проект иконки и импортировать
// const downIcon = '[\\/]';
// const upIcon = '[/\\]';
// const noneIcon = '[--]';

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
    return sort === '' ? down : sort === down ? up : sort === up ? '' : down; // исправить
    // const icon = sort === down
    //     ? downIcon
    //     : sort === up
    //         ? upIcon
    //         : noneIcon;
    // // if (sort === '') {
    // //     return down;
    // // } else if (sort === down) {
    // //     return up;
    // // } else if (sort === up) {
    // //     return '';
    // // } else {
    // //     return down;
    // }
};

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
    const up = '0' + value;
    const down = '1' + value;

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up));
    };

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon;

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            {/*сделать иконку*/}
            <img
                id={id + '-icon-' + sort}
                src={icon}
                alt={'icon'}
            />

            {/*{icon} /!*а это убрать*!/*/}
        </span>
    );
};

export default SuperSort;
