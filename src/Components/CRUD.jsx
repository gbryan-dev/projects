import React, { useState } from "react";
import "./CRUD.css";

const CRUD = () => {
  const [Fname, setFname] = useState();
  const [Lname, setLname] = useState();
  const [Email, setEmail] = useState();
  const [Accounts, setAccounts] = useState([]);
  const [randomNumber, setRandomNumber] = useState(1);
  const [id, setId] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const min = 1;
    const max = 4;
    const newRandomNumber = Math.floor(Math.random() * max) + min;
    setRandomNumber(newRandomNumber.toString());

    setFname("");
    setLname("");
    setEmail("");
    setId(id + 1);

    const newData = {
      id,
      fname: Fname,
      lname: Lname,
      email: Email,
      cover: require(`../IMAGE/COVER/${randomNumber}.jpg`),
      profile: require(`../IMAGE/PROFILE/${randomNumber}.jpg`),
    };

    setAccounts([...Accounts, newData]);
  };

  const handleDelete = (id) => {
    setId(id - 1);
    setAccounts(Accounts.filter((acc) => acc.id !== id));
  };

  return (
    <>
      <div className="h-[85vh] grid place-content-center">
        <div className="container">
          <form className="form" autoComplete="off" onSubmit={handleSubmit}>
            <div className="title">Welcome</div>
            <div className="subtitle">Welcome to my simple CRUD!</div>
            <div className="input-container ic1">
              <input
                id="firstname"
                className="input"
                type="text"
                maxlength="10"
                placeholder=" "
                onChange={(e) => setFname(e.target.value)}
                required
                value={Fname}
              />
              <div className="cut"></div>
              <label className="placeholder">First name</label>
            </div>
            <div className="input-container ic2">
              <input
                id="lastname"
                className="input"
                type="text"
                placeholder=" "
                maxlength="10"
                required
                onChange={(e) => setLname(e.target.value)}
                value={Lname}
              />
              <div className="cut"></div>
              <label className="placeholder">Last name</label>
            </div>
            <div className="input-container ic2">
              <input
                id="email"
                className="input"
                type="email"
                required
                placeholder=" "
                maxlength="30"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
              />
              <div className="cut cut-short"></div>
              <label className="placeholder">Email</label>
            </div>
            <button type="submit" className="submit">
              submit
            </button>
          </form>

          {Accounts.length !== 0 && (
            <div className="accounts">
              <div className="accountsflex">
                {Accounts?.map((acc, index) => (
                  <>
                    <div className="accountainer" key={index}>
                      <div
                        className="cover"
                        style={{
                          backgroundImage: `url(${acc.cover})`,
                        }}></div>
                      <div
                        className="profile"
                        style={{
                          backgroundImage: `url(${acc.profile})`,
                        }}></div>

                      <div className="name">
                        {acc.fname} {acc.lname}
                      </div>
                      <div
                        style={{
                          color: "#111111",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                        }}>
                        {acc.email}
                      </div>

                      <div className="accbtn">
                        <button
                          onClick={() => setSelectedIdx(acc)}
                          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Edit
                          </span>
                        </button>
                        <div
                          onClick={() => handleDelete(acc.id)}
                          style={{ cursor: "pointer" }}
                          class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                          Delete
                        </div>
                      </div>

                      <div
                        className={`accFront ${
                          selectedIdx.id === acc.id ? "show" : ""
                        }`}>
                        <div
                          className="input-container"
                          style={{ marginTop: "20px" }}>
                          <input
                            id="firstname"
                            className="input"
                            type="text"
                            maxlength="10"
                            placeholder=" "
                            autoComplete="off"
                            required
                            value={acc.fname}
                          />
                          <div className="cut"></div>
                          <label className="placeholder">First name</label>
                        </div>
                        <div className="input-container ic2">
                          <input
                            id="lastname"
                            className="input"
                            type="text"
                            placeholder=" "
                            maxlength="10"
                            required
                            autoComplete="off"
                            value={acc.lname}
                          />
                          <div className="cut"></div>
                          <label className="placeholder">Last name</label>
                        </div>
                        <div className="input-container ic2">
                          <input
                            id="email"
                            className="input"
                            type="email"
                            required
                            placeholder=" "
                            autoComplete="off"
                            maxlength="30"
                            value={acc.email}
                          />
                          <div className="cut cut-short"></div>
                          <label className="placeholder">Email</label>
                        </div>

                        <div
                          className="accbtn"
                          style={{ marginTop: "15px", opacity: 1 }}>
                          <button
                            onClick={() => setSelectedIdx(acc)}
                            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                            <span class="relative px-5 py-2.5 transition-all bg-white ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                              Update
                            </span>
                          </button>
                          <div
                            onClick={() => {
                              setSelectedIdx(-1);
                            }}
                            style={{ cursor: "pointer" }}
                            class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            Close
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="accountsflexbefore">
                <div>
                  <div class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Total Items
                    <span class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                      {Accounts.length}
                    </span>
                  </div>
                </div>

                <div>
                  <div
                    onClick={() => {
                      setAccounts([]);
                    }}
                    style={{ cursor: "pointer" }}
                    class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Delete All
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CRUD;
