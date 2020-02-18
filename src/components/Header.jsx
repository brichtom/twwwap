import React from 'react';

export default function header() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="index.html">
                Seriály
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="jumbotron text-center">
        <h1>Můj přehled seriálů</h1>
      </div>
    </>
  );
}
