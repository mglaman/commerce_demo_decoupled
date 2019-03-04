import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-inverted.svg'

export default (props) => (
    <div className="jumbotron" style={{ background: '#babad3', color: '#fff' }}>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-3">
                    <Link to={`/`}>
                        <img src={logo} style={{ margin: 0 }} alt={`Belgrade`} />
                    </Link>
                </div>
                <div className="col-md-9 text-right">
                    <ul className="menu nav menu-catalog">
                        <li className="menu-catalog__item nav-item">
                            <Link to={`/catalog/apothecary`} className="menu-catalog__link nav-link">Apothecary</Link>
                        </li>
                        <li className="menu-catalog__item nav-item">
                            <Link to={`/catalog/audio-film`} className="menu-catalog__link nav-link">Audio &amp; Film</Link>
                        </li>
                        <li className="menu-catalog__item nav-item">
                            <Link to={`/catalog/men`} className="menu-catalog__link nav-link">Men</Link>
                        </li>
                        <li className="menu-catalog__item nav-item">
                            <Link to={`/catalog/print-shop`} className="menu-catalog__link nav-link">Print Shop</Link>
                        </li>
                        <li className="menu-catalog__item nav-item">
                            <Link to={`/catalog/urban-living`} className="menu-catalog__link nav-link">Urban Living</Link>
                        </li>
                        <li className="menu-catalog__item nav-item">
                            <Link to={`/catalog/women`} className="menu-catalog__link nav-link">Women</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
)
