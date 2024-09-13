import PropTypes from "prop-types";

// Function to randomly pick a background color
function getRandomBackgroundColor() {
  const colors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-orange-100",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function Stat({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 p-4 rounded-lg flex-1">
      <div
        className={`${getRandomBackgroundColor()} p-3 rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <h5 className="text-sm font-medium text-gray-500">{title}</h5>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

Stat.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Stat;
