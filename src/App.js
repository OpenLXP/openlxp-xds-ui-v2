import './App.css';
import { Popover } from 'flowbite';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

  
        <button data-popover-target="popover-user-profile" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">User profile</button>
        <div data-popover id="popover-user-profile" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
            <div class="p-3">
                <div class="flex items-center justify-between mb-2">
                    <a href="#">
                        <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese Leos"/>
                    </a>
                    <div>
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Follow</button>
                    </div>
                </div>
                <p class="text-base font-semibold leading-none text-gray-900 dark:text-white">
                    <a href="#">Jese Leos</a>
                </p>
                <p class="mb-3 text-sm font-normal">
                    <a href="#" class="hover:underline">@jeseleos</a>
                </p>
                <p class="mb-4 text-sm">Open-source contributor. Building <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">flowbite.com</a>.</p>
                <ul class="flex text-sm">
                    <li class="me-2">
                        <a href="#" class="hover:underline">
                            <span class="font-semibold text-gray-900 dark:text-white">799</span>
                            <span>Following</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">
                            <span class="font-semibold text-gray-900 dark:text-white">3,758</span>
                            <span>Followers</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div data-popper-arrow></div>
        </div>

        {/* <button
            id="popoverButton"
            type="button"
            class="m-5 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Default popover test
        </button>
        <div
            data-popover
            id="popoverContent"
            role="tooltip"
            class="invisible absolute z-10 inline-block w-64 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
        >
            <div
                class="rounded-t-lg border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
            >
                <h3 class="font-semibold text-gray-900 dark:text-white">
                    Popover title
                </h3>
            </div>
            <div class="px-3 py-2">
                <p>And here's some amazing content. It's very engaging. Right?</p>
            </div>
            <div data-popper-arrow></div>
        </div> */}

      </header>
    </div>
  );
}

export default App;
