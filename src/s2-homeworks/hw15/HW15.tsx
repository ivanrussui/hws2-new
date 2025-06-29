import React, {useEffect, useState} from 'react';
import s2 from '../../s1-main/App.module.css';
import s from './HW15.module.css';
import sLoader from '../hw10/Loader.module.css';
import axios, {AxiosError, AxiosResponse} from 'axios';
import SuperPagination from './common/c9-SuperPagination/SuperPagination';
import {useSearchParams} from 'react-router-dom';
import SuperSort from './common/c10-SuperSort/SuperSort';
import {Loader} from '../hw10/Loader';
import {Line} from '../hw01/common/Line';

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort?: string
    page: string
    count: string
}

type ServerResponseType = {
    techs: TechType[]
    totalCount: number
}

type ServerErrorType = {
    errorText?: string
};

const getTechs = (params: ParamsType) => {
    return axios
        .get<ServerResponseType>(
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            {params}
        );
    // .catch((e) => { // вместо тут ошибку
    //     alert(e.response?.data?.errorText || e.message);
    // });
};

const HW15 = () => {
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(4);
    const [idLoading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(100);
    const [searchParams, setSearchParams] = useSearchParams();
    const [techs, setTechs] = useState<TechType[]>([]);

    const sendQuery = (params: ParamsType) => {
        setLoading(true);
        getTechs(params)
            .then((res: AxiosResponse<ServerResponseType>) => {
                // делает студент
                // сохранить пришедшие данные
                setTechs(res.data.techs);
                setTotalCount(res.data.totalCount);
            })
            .catch((e: unknown) => { // лучше тут ошибку обрабатывать
                let errorMessage: string;
                if (axios.isAxiosError(e)) {
                    errorMessage = (e as AxiosError<ServerErrorType>).response?.data?.errorText || e.message;
                } else {
                    errorMessage = (e as Error).message;
                }
                alert(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onChangePagination = (newPage: number, newCount: number) => {
        // делает студент
        setPage(newPage);
        setCount(newCount);
        sendQuery({
            sort,
            page: String(newPage),
            count: String(newCount)
        });
        setSearchParams({
            sort,
            page: String(newPage),
            count: String(newCount)
        });
    };

    const onChangeSort = (newSort: string) => {
        // делает студент
        setSort(newSort);
        setPage(1); // при сортировке сбрасывать на 1 страницу
        sendQuery({
            sort: newSort,
            page: String(page),
            count: String(count)
        });
        setSearchParams({
            sort: newSort,
            page: String(page),
            count: String(count)
        });
    };

    useEffect(() => {
        const params = Object.fromEntries(searchParams);
        sendQuery({page: params.page, count: params.count});
        setPage(+params.page || 1);
        setCount(+params.count || 4);
    }, []);

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ));

    return (
        <div id={'hw15'}>
            <div className={s2.hwTitle}>Homework #15</div>
            <Line/>
            <div className={s2.hw}>
                {idLoading && <div id={'hw15-loading'} className={s.loading}>
                    {/*Loading...*/}
                    <Loader className={sLoader.loaderBlue}/>
                </div>}

                <div className={idLoading ? s.opacity : ''}>
                    <SuperPagination
                        page={page}
                        itemsCountForPage={count}
                        totalCount={totalCount}
                        onChange={onChangePagination}
                    />

                    <div className={s.container}>
                        <div className={s.rowHeader}>
                            <div className={s.techHeader}>
                                Tech
                                <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>
                            </div>

                            <div className={s.developerHeader}>
                                Developer
                                <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                            </div>
                        </div>

                        {mappedTechs}
                    </div>
                </div>

            </div>
            <Line/>
        </div>
    );
};

export default HW15;
