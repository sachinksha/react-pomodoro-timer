import "./TimerButton.css";
interface TimerButtonProps {
  time: number;
  onClick: (time: number) => void;
};
function TimerButton({ time, onClick }: TimerButtonProps) {
  return (
    <button
      className="timerbutton"
      onClick={() => {
        onClick(time);
      }}
    >
      <h1>{time}</h1>
    </button>
  );
}
export default TimerButton;
