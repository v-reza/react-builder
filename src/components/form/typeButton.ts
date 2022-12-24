export type PublicButtonProps = {
  label?: string | boolean | React.ReactElement;
  onClick?: () => void;
  id?: string;
  name?: string;
  className?: string;
  type: "button" | "submit" | "reset";
  required?: boolean;
  disabled?: boolean;

}