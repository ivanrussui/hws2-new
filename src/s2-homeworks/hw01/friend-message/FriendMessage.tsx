import React from 'react';
import s from './FriendMessage.module.css';
import {MessageType} from '../HW1';

type FriendMessagePropsType = {
    message: MessageType
}

// создать тип вместо any и отобразить приходящие данные
const FriendMessage = ({message}: FriendMessagePropsType) => {
    return (
        <div id={'hw1-friend-message-' + message.id}
             className={s.friendMessage}>
            <div className={s.friendImageAndText}>
                <img
                    id={'hw1-friend-avatar-' + message.id}
                    src={message.user.avatar}
                    alt={message.user.name}
                />
                <div className={s.friendText}>
                    <div
                        id={'hw1-friend-name-' + message.id}
                        className={s.friendName}>
                        {message.id}
                    </div>
                    <pre
                        id={'hw1-friend-text-' + message.id}
                        className={s.friendMessageText}>
                        {message.message.text}
                    </pre>
                </div>
            </div>
            <div
                id={'hw1-friend-time-' + message.id}
                className={s.friendTime}>
                {message.message.time}
            </div>
        </div>
    );
};

export default FriendMessage;
