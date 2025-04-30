import React, {useState} from 'react';
import s2 from '../../s1-main/App.module.css';
import s from './HW13.module.css';
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton';
import axios, {AxiosError} from 'axios';
import success200 from './images/200.svg';
import error400 from './images/400.svg';
import error500 from './images/500.svg';
import errorUnknown from './images/error.svg';

/*
* 1 - дописать функцию send
* 2 - дизэйблить кнопки пока идёт запрос
* 3 - сделать стили в соответствии с дизайном
* */

type ResponseType = {
    errorText: string;
    info: string;
    yourBody: { success: boolean };
    yourQuery: {};
}

type IsSendingType = string | boolean | undefined | null;

const HW13 = () => {
    const [code, setCode] = useState('');
    const [text, setText] = useState('');
    const [info, setInfo] = useState('');
    const [image, setImage] = useState('');
    const [isSending, setIsSending] = useState<IsSendingType>('');


    const send = (x?: boolean | null) => () => {
        setIsSending(x)

        const url =
            x === null
                ? 'https://xxxxxx.ccc' // имитация запроса на не корректный адрес
                : 'https://samurai.it-incubator.io/api/3.0/homework/test';

        setCode('');
        setImage('');
        setText('');
        setInfo('...loading');

        axios
            .post<ResponseType>(url, {success: x})

            .then((res) => {
                setCode('Код 200!');
                setImage(success200);
                // дописать
                setText(res.data.errorText);
                setInfo(res.data.info);
            })
            .catch((e: AxiosError<ResponseType>) => {
                // дописать
                const code = e.response?.status === 500 ? 'Ошибка 500!' : e.response?.status === 400 ? 'Ошибка 400!' : 'Error!';
                const image = e.response?.status === 500 ? error500 : e.response?.status === 400 ? error400 : errorUnknown;
                const errorText = e.response?.data ? e.response.data.errorText : e.message;
                const info = e.response?.data ? e.response.data.info : e.name;

                setCode(code);
                setImage(image);
                setText(errorText);
                setInfo(info);
            })
            .finally(() => {
                setIsSending('');
            });
    };

    const isButtonDisabled = (value: IsSendingType) => isSending === value;

    return (
        <div id={'hw13'}>
            <div className={s2.hwTitle}>Homework #13</div>

            <div className={s2.hw}>
                <div className={s.buttonsContainer}>
                    <SuperButton
                        id={'hw13-send-true'}
                        onClick={send(true)}
                        xType={'secondary'}
                        // дописать
                        // disabled={isSending === true}
                        disabled={isButtonDisabled(true)}
                    >
                        Send true
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-false'}
                        onClick={send(false)}
                        xType={'secondary'}
                        // дописать
                        // disabled={isSending === false}
                        disabled={isButtonDisabled(false)}
                    >
                        Send false
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-undefined'}
                        onClick={send(undefined)}
                        xType={'secondary'}
                        // дописать
                        // disabled={isSending === undefined}
                        disabled={isButtonDisabled(undefined)}
                    >
                        Send undefined
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-null'}
                        onClick={send(null)} // имитация запроса на не корректный адрес
                        xType={'secondary'}
                        // дописать
                        // disabled={isSending === null}
                        disabled={isButtonDisabled(null)}
                    >
                        Send null
                    </SuperButton>
                </div>

                <div className={s.responseContainer}>
                    <div className={s.imageContainer}>
                        {image && <img src={image} className={s.image} alt="status"/>}
                    </div>

                    <div className={s.textContainer}>
                        <div id={'hw13-code'} className={s.code}>
                            {code}
                        </div>
                        <div id={'hw13-text'} className={s.text}>
                            {text}
                        </div>
                        <div id={'hw13-info'} className={s.info}>
                            {info}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HW13;
