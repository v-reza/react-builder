export type PublicInputProps = {
  label?: string | boolean;
  value?: string;
  readOnly?: boolean;
  placeholder?: string | null;
  error?: string | boolean;
  onChange?: (val: string) => void;
  id?: string;
  name?: string;
  className?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string
}