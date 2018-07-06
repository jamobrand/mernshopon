import React, { Component } from 'react';


class HeaderLogin extends Component {
  render() {
    const style = {
      width: '20px',
      height: '20px',
    };

    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/"><b>Shoponfoods</b></a>
           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
           </button>
           <div className="collapse navbar-collapse" id="navbarResponsive">
           <ul className="navbar-nav ml-auto">
             <li className="nav-item">
              <a className="nav-link" href="/signup">
              <img src="/img/basket.png" alt="basket" style={style} />
              <span className="badge badge-secondary">0</span>
              </a>
             </li>
          </ul>
           </div>
          </div>
       </nav>
    );
  }
}

export default HeaderLogin;
