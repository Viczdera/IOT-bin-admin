import { Box, Text } from '@chakra-ui/react';
import React from 'react';

type toastProps=({
    message:string
})
function Toast(props:toastProps) {
    return (
        <Box>
            <Text>{props.message}</Text>
        </Box>
    );
}

export default Toast;