import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from './bll/store';
import {loadingAC} from './bll/loadingReducer';
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton';
import s2 from '../../s1-main/App.module.css';
import {Loader} from './Loader';
import {Line} from '../hw01/common/Line';

/*
* 1 - в файле loadingReducer.ts дописать типы и логику
* 2 - получить isLoading из редакса
* 3 - дописать функцию setLoading
* 4 - сделать стили в соответствии с дизайном
* */

const HW10 = () => {
    // useSelector, useDispatch // пишет студент
    const isLoading = useSelector<AppStoreType, boolean>(state => state.loading.isLoading);
    const dispatch = useDispatch();

    const setLoading = () => { // пишет студент // показать крутилку на 1,5 секунд
        // dispatch
        dispatch(loadingAC(true));
        setTimeout(() => {
            dispatch(loadingAC(false));
        }, 1500);
        // setTimeout
    };

    return (
        <div id={'hw10'}>
            <div className={s2.hwTitle}>Homework #10</div>
            <Line/>
            <div className={s2.hw} style={{minHeight: '336px'}}>
                {isLoading ? (
                    <div style={{marginTop: '42px'}} id={'hw10-loading'}>
                        <Loader/>
                    </div>
                ) : (
                    <SuperButton style={{marginTop: '42px'}}
                                 id={'hw10-button-start-loading'}
                                 onClick={setLoading}
                    >
                        Set loading...
                    </SuperButton>
                )}
            </div>
            <Line/>
        </div>
    );
};

export default HW10;
