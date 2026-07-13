import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Searchbar, SearchbarProps } from 'react-native-paper';

type Props<Type extends FieldValues> = {
  control: Control<Type>;
  name: Path<Type>;
} & Omit<SearchbarProps, 'value' | 'onChangeText'>;

export function ControlledSearchbar<Type extends FieldValues>({
  control,
  name,
  ...props
}: Props<Type>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <Searchbar
          {...props}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value ?? ''}
        />
      )}
    />
  );
}