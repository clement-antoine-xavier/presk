import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextInput, TextInputProps } from 'react-native-paper';

type Props<Type extends FieldValues> = {
  control: Control<Type>;
  name: Path<Type>;
} & Omit<TextInputProps, 'value' | 'onChangeText'>;

export function ControlledTextInput<Type extends FieldValues>({
  control,
  name,
  ...props
}: Props<Type>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          {...props}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value ?? ''}
        />
      )}
    />
  );
}
