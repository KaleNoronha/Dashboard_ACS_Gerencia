import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Styles/Global/App.css'
import Echarts3 from './components/ModelEcharts/Echarts3';
import UI from './view/UI';
import Test from './view/test';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className="fixed left-0 top-0 h-screen bg-black text-white flex flex-col"
        style={{ width: '10vw', minWidth: '80px', maxWidth: '200px' }}
      >
        <div className="w-full h-16 flex items-center justify-center bg-black">
          <img
            src="https://dashboard.alignet.io/tenant/alignet_secondary.png"
            alt=""
            className="h-10 ml-0"
          />
        </div>
        <div className="overflow-x-hidden mt-0 flex-1 pt-0">
          <ul
            className="flex flex-col py-2"
            role="menu"
            tabIndex={0}
            data-menu-list="true"
          >
            <li className="px-4 py-2 hover:bg-gray-800 rounded transition" role="none">
              <div
                role="menuitem"
                className="flex items-center gap-2 cursor-pointer"
                tabIndex={-1}
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="text-xl">
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="shopping"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-208 0H400v-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16z"></path>
                  </svg>
                </span>
                <span>Monitoreo Pasarela</span>
              </div>
            </li>
            <li className="px-4 py-2 hover:bg-gray-800 rounded transition" role="none">
              <div
                role="menuitem"
                className="flex items-center gap-2 cursor-pointer"
                tabIndex={-1}
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="text-xl">
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="shopping"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-208 0H400v-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16z"></path>
                  </svg>
                </span>
                <span>Monitoreo Pasarela 3.5 v2</span>
              </div>
            </li>
            <li className="px-4 py-2 bg-gray-800 rounded transition" role="none">
              <div
                role="menuitem"
                className="flex items-center gap-2 cursor-pointer"
                tabIndex={-1}
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="text-xl">
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="fund"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M926 164H94c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V196c0-17.7-14.3-32-32-32zm-92.3 194.4l-297 297.2a8.03 8.03 0 01-11.3 0L410.9 541.1 238.4 713.7a8.03 8.03 0 01-11.3 0l-36.8-36.8a8.03 8.03 0 010-11.3l214.9-215c3.1-3.1 8.2-3.1 11.3 0L531 565l254.5-254.6c3.1-3.1 8.2-3.1 11.3 0l36.8 36.8c3.2 3 3.2 8.1.1 11.2z"></path>
                  </svg>
                </span>
                <span>Monitoreo ACS V2</span>
              </div>
            </li>
            <li className="px-4 py-2 hover:bg-gray-800 rounded transition" role="none">
              <div
                role="menuitem"
                className="flex items-center gap-2 cursor-pointer"
                tabIndex={-1}
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="text-xl">
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="safety-certificate"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M866.9 169.9L527.1 54.1C523 52.7 517.5 52 512 52s-11 .7-15.1 2.1L157.1 169.9c-8.3 2.8-15.1 12.4-15.1 21.2v482.4c0 8.8 5.7 20.4 12.6 25.9L499.3 968c3.5 2.7 8 4.1 12.6 4.1s9.2-1.4 12.6-4.1l344.7-268.6c6.9-5.4 12.6-17 12.6-25.9V191.1c.2-8.8-6.6-18.3-14.9-21.2zM694.5 340.7L481.9 633.4a16.1 16.1 0 01-26 0l-126.4-174c-3.8-5.3 0-12.7 6.5-12.7h55.2c5.1 0 10 2.5 13 6.6l64.7 89 150.9-207.8c3-4.1 7.8-6.6 13-6.6H688c6.5.1 10.3 7.5 6.5 12.8z"></path>
                  </svg>
                </span>
                <span>Monitoreo 3DS V2</span>
              </div>
            </li>
          </ul>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked="true"
          className="mt-4 mx-4 py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition flex items-center gap-2"
        >
          <div className="w-4 h-4 bg-white rounded-full"></div>
          <span>Dark</span>
        </button>
      </div>
      <div style={{ width: '10vw', minWidth: '80px', maxWidth: '200px' }} className="flex-shrink-0" />
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex gap-4 mb-4">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="h-16" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="h-16" alt="React logo" />
          </a>
        </div>
        <h1 className="text-4xl font-bold mb-4">Vite + React</h1>
        <div className="card bg-white text-gray-900 rounded shadow p-6 mb-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
          <p className="mt-2">
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <div className="my-8" />
        <UI />
        <div className="my-8" />
        <Test />
        <div className="my-8" />
      </div>
    </div>
  );
}

export default App
