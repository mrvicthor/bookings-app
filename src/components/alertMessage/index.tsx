interface Props {
  toggleMessage: () => void;
}

const AlertMessage = ({ toggleMessage }: Props) => {
  return (
    <div className="bg-green-500 px-4 py-3 " role="alert">
      <p className="text-white text-lg font-medium">New booking added...</p>
      <button
        className="text-slate-300 absolute right-3 top-0 font-bold"
        onClick={toggleMessage}
      >
        X
      </button>
    </div>
  );
};

export default AlertMessage;
