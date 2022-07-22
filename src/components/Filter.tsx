import React from 'react';
import { Text, Button, IButtonProps, useTheme } from 'native-base';

type props = IButtonProps & {
  title: string;
  isActive?: boolean;
  type: "open" | "closed";
}

export function Filter({ title, isActive = false, type, ...rest}: props) {
  const { colors } = useTheme();

  const colorType = type === 'open' ? colors.secondary[700] : colors.green[300]

  return (
    <Button
      variant="outline"
      borderWidth={isActive ? 1 : 0}
      borderColor={colorType}
      bgColor="gray.600"
      flex={1}
      size="sm"
    >
      <Text color={isActive ? colorType : "gray.300"} fontSize="xs" textTransform="uppercase">
        { title }
      </Text>
    </Button>
  );
}