import { useState } from "react";
import "./App.css";
import TanStackTable from "./TanStackTable";
import Avatar from 'react-avatar';

function App() {
  const [activeSection, setActiveSection] = useState("Overview");

  return (
    <div>
      <header className="w-full flex justify-between p-8">
        <h2 className="text-purple-700 text-3xl font-bold">EDUNOVA .CO</h2>
        <div className="flex">
          <div className="icon mx-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-6"
            >
              <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </div>
          <div className="pro">
            <Avatar githubHandle="sitebase" size={40} round="20px" />
          </div>
          <h4 className="mx-3 text-lg">John Dae</h4>
        </div>
      </header>

      <div className="sidebar">
        <ul>
          <li
            className={`mt-5 mx-4 flex text-lg font-semibold cursor-pointer ${
              activeSection === "Overview" ? "active" : ""
            }`}
            onClick={() => setActiveSection("Overview")}
          >
            <div className={`box ${activeSection === "Overview" ? "active-box" : ""}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" />
              </svg>
            </div>
            Overview
          </li>

          <li
            className={`mt-5 mx-4 flex text-lg font-semibold cursor-pointer ${
              activeSection === "People Directory" ? "active" : ""
            }`}
            onClick={() => setActiveSection("People Directory")}
          >
            <div className={`box ${activeSection === "People Directory" ? "active-box" : ""}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" />
              </svg>
            </div>
            People Directory
          </li>
        </ul>
      </div>

      <div className="main ">
        {activeSection === "Overview" && (
          <div className="front">
            <h1 className="text-5xl mt-5 mx-3 font-semibold">Welcome, John Dae!</h1>
          </div>
        )}

        {activeSection === "People Directory" && (
          <div>
            <TanStackTable />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
