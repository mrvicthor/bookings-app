type ButtonProps = { value: string; styles: string; handleClick: () => void };

const Button = ({ value, styles, handleClick }: ButtonProps) => {
  return (
    <button onClick={handleClick} className={`${styles} px-3 py-1`}>
      {value}
    </button>
  );
};

export default Button;
