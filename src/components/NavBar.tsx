import Image from 'next/image'

export default function NavBar() {
    return (
        <div className="navbar bg-base-100 border sticky top-0 z-10 border-gray-300 text-black">
            <div className="flex-1 gap-5">
                <a className="btn btn-ghost text-xl text-black">Training Mug</a>
                <div className="text-base breadcrumbs">
                    <ul>
                        <li>
                            <a className="inline-flex gap-2 items-center text-blue-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a className="inline-flex gap-2 items-center">
                                Posts
                            </a>
                        </li>
                        <li>
                            <a className="inline-flex gap-2 items-center">
                                Pictures
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}