import React from 'react';
import { Pressable, Text } from 'react-native';
import classNames from 'classnames';

export interface ButtonProps {
    children: React.ReactNode
    onPress: () => void
    tw?: string
};

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <Pressable onPress={props.onPress} tw={classNames("bg-white rounded-full shadow-sm m-2 p-2 px-5 self-start", props.tw)}>
            {typeof props.children === 'string' ? <Text tw="text-base">{props.children}</Text> : props.children}
        </Pressable>
    );
};

export default Button;
