import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent, useState, useEffect,
} from 'react';
import s from './SuperSelect.module.css';
import {ArrType} from '../../HW7';

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: ArrType[]
    onChangeOption?: (option: number) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
                                                         options,
                                                         className,
                                                         onChange,
                                                         onChangeOption,
                                                         ...restProps
                                                     }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest(`.${s.customSelectWrapper}`)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleOpen = () => setIsOpen(!isOpen);

    const mappedOptions: JSX.Element[] = options
        ? options.map((o) => (
            <option
                id={'hw7-option-' + o.id}
                className={s.option}
                key={o.id}
                value={o.id}
            >
                {o.value}
            </option>
        ))
        : []; // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        // делают студенты
        onChangeOption?.(+e.currentTarget.value);
    };

    const finalSelectClassName = s.select + (className ? ' ' + className : '');

    return (
        <div className={`${s.customSelectWrapper} ${isOpen ? s.open : ''}`}>
            <select
                className={finalSelectClassName}
                onChange={onChangeCallback}
                onClick={toggleOpen}
                {...restProps}
            >
                {mappedOptions}
            </select>
        </div>
    );
};

export default SuperSelect;
