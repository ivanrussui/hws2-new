import React from 'react';
import Slider, {SliderProps} from '@mui/material/Slider';

const sliderStyle = {
    width: '147px',
    height: '4px',
    borderRadius: '10px',

    // Стили для активной части ( rail )
    '& .MuiSlider-rail': {
        color: '#8B8B8B', // Цвет активной части
        opacity: '1'
    },

    // Стили для неактивной части ( track )
    '& .MuiSlider-track': {
        color: '#00CC22', // Цвет неактивной части
    },

    // Стили для ползунка ( thumb )
    '& .MuiSlider-thumb': {
        backgroundColor: '#FFFFFF', // Цвет ползунка
        border: '1px solid #00CC22',
        width: 18, // судя по всему если число то делает px
        height: 18,

        // Добавляем внутренний кружок через ::before
        '&::before': {
            content: '""', // Обязательно для псевдоэлементов
            position: 'absolute',
            width: '6px', // Размер внутреннего кружка
            height: '6px',
            borderRadius: '50%', // Сделать круглым
            backgroundColor: '#00CC22', // Цвет внутреннего кружка
            top: '50%', // Центрируем по вертикали
            left: '50%', // Центрируем по горизонтали
            transform: 'translate(-50%, -50%)', // Точное центрирование
        },
    },
};

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
            <Slider
                sx={ // стили для слайдера // пишет студент
                    sliderStyle
                }
                {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
            />
    );
};

export default SuperRange;
