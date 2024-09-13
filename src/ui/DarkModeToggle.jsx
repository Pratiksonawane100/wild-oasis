import { MdOutlineDarkMode } from "react-icons/md";
import { useDarkMode } from "../context/DarkModeContext";
import { MdOutlineLightMode } from "react-icons/md";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      </button>
    </div>
  );
}
export default DarkModeToggle;
