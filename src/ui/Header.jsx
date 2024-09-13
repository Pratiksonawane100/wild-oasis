// import Logout from "../features/authentication/Logout";
import HeaderMenu from "../pages/HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

function Header() {
  return (
    <header className="bg-blue-500 text-white p-4 shadow-md flex flex-col md:flex-row items-center md:items-start justify-between">
      {/* Container for User Avatar and Header Menu on mobile screens */}
      <div className="flex  md:hidden items-center items-center space-x-4">
        <UserAvatar className="w-12 h-12" />
        <HeaderMenu />
      </div>

      {/* Container for User Avatar and Header Menu on larger screens */}
      <div className="hidden md:flex items-center space-x-4">
        <UserAvatar className="w-12 h-12" />
        <HeaderMenu />
      </div>
    </header>
  );
}

export default Header;
