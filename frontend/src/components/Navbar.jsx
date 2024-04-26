import Avatar from 'react-avatar';
import { FaUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import logoutUser from '../utils/user/logout';
import toast from 'react-hot-toast';
import { logout } from '../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const loggedOut = await logoutUser();
    if(loggedOut === null){
      toast.error('An error occured');
      return;
    }
    dispatch(logout());
    toast.success('Logged Out');
    navigate('/')
  }

  return (
    <header className="navbar bg-base-300 px-6 z-10">
      <div className="flex-1">
        <a className="btn btn-ghost hover:bg-transparent text-2xl tracking-widest">pdfOTG</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            {user ? (<div className="w-10 flex items-center justify-center rounded-full">
              {user ? (<Avatar className='tracking-widest font-normal text-3xl' name={user.firstname + ' ' + user.lastname} size='40'/>):(<FaUser className='w-full h-full flex items-center justify-center'/>)}
            </div>): <FaUser className='text-3xl flex items-center justify-center'/>}
          </div>
          {
            user ? (
              <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <button>
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
            ): (
              <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Login
              </a>
            </li>
            <li>
              <a>Sign up</a>
            </li>
          </ul>
            )
          }
        </div>
      </div>
    </header>
  );
}

export default Navbar;
