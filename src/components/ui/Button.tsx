export interface ButtonProps {
  onClick?: () => void;
  label: string;
  variant: "primary" | "secondary" | "outlined";
}

const Button = ({ label, onClick, variant = "primary" }: ButtonProps) => {
  const variantMap: Record<ButtonProps["variant"], string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outlined: "btn-outline",
  };

  return (
    <button className={`btn ${variantMap[variant]}`} onClick={onClick ?? (() => {})}>
      {label}
    </button>
  );
};

export default Button;
