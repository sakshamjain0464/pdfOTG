import Avatar from 'react-avatar';

function Navbar() {
  return (
    <div className="navbar bg-base-300 px-6">
      <div className="flex-1">
        <a className="btn btn-ghost hover:bg-transparent text-2xl tracking-widest">pdfOTG</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Avatar className='tracking-widest font-normal text-3xl' name="Saksham Jain" size='40'/>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
