import React, { FC, useState } from 'react';
import { Box, IconButton, TextField } from '@material-ui/core';
import { AddBox, IndeterminateCheckBox } from '@material-ui/icons';

interface CounterProps {
  onDecrease: () => void,
  onIncrease: () => void,
  max: number,
  min?: number,
  startCount?: number
}

const Counter: FC<CounterProps> = ({
  startCount = 1,
  min = 1,
  max,
  onDecrease,
  onIncrease,
}: CounterProps) => {
  const [count, setCount] = useState(startCount);

  const handleDecreaseCount = () => {
    setCount(count - 1);
    onDecrease();
  };

  const handleIncreaseCount = () => {
    setCount(count + 1);
    onIncrease();
  };

  const isDecreaseDisabled = count <= min;
  const isIncreaseDisabled = count >= max;

  return (
    <Box width={150} display="flex">
      <IconButton
        color="primary"
        aria-label="Decrease count"
        component="span"
        size="small"
        onClick={handleDecreaseCount}
        disabled={isDecreaseDisabled}
      >
        <IndeterminateCheckBox fontSize="large" />
      </IconButton>
      <TextField
        variant="outlined"
        value={count}
        size="small"
        InputProps={{
          readOnly: true,
        }}
      />
      <IconButton
        color="primary"
        aria-label="Increase count"
        component="span"
        size="small"
        onClick={handleIncreaseCount}
        disabled={isIncreaseDisabled}
      >
        <AddBox fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default Counter;
