import "./TimerButton.css";
interface TimerButtonProps {
  time: number;
  onClick: (time: number) => void;
  active: boolean;
};
function TimerButton({ time, onClick, active }: TimerButtonProps) {
  return (
    <button
      className={`timerbutton ${active ? "active": ""}`}
      onClick={() => {
        onClick(time);
      }}
    >
      <h1>{time}</h1>
    </button>
  );
}
export default TimerButton;
