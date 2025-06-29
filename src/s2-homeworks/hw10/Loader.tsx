import s from './Loader.module.css';

type LoaderProps = {
    className?: string
}

export const Loader = ({className = ''}: LoaderProps) =>
    <div className={`${s.loader} ${className}`.trim()}/>;
