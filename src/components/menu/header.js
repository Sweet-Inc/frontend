import React, { useEffect, useState } from 'react';
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from 'react-socks';
import { Link } from '@reach/router';
import useOnclickOutside from 'react-cool-onclickoutside';

// BE (firebase)
import { getUser } from '../../firebase/data/currentUser';
import { login } from '../../firebase/data/login';
import { useLogout } from '../../firebase/data/logout';
import CartModal from '../components/CartModal';

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);

const Header = function () {
  const { res } = getUser();
  const { logout, error } = useLogout();

  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };
  const ref = useOnclickOutside(() => {
    closeMenu();
  });
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });

  const [showmenu, btn_icon] = useState(false);

  const handleLogout = async () => {
    await logout();
    if (!error) {
      window.location.reload();
    }
  };

  const pathnamePatternsToIgnore = [
    '/admin',
    '/admin/mgmt/boxes',
    '/admin/mgmt/brands',
    '/admin/mgmt/categories',
  ];

  useEffect(() => {
    if (pathnamePatternsToIgnore.includes(window.location.pathname)) return;

    const header = document.getElementById('myHeader');
    const totop = document.getElementById('scroll-to-top');
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener('scroll', () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
        totop.classList.add('show');
      } else {
        header.classList.remove('sticky');
        totop.classList.remove('show');
      }
      if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      if (window.location.pathname === '/admin') return;
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, []);
  return window.location.pathname !== '/admin' ? (
    <header id="myHeader" className="navbar white">
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink to="/">
                <h3 style={{ lineHeight: 0, marginBottom: 0 }}>
                  The Candy Company
                </h3>
              </NavLink>
            </div>
          </div>

          <div className="search">
            <input
              id="quick_search"
              className="xs-hide"
              name="quick_search"
              placeholder="Your favorite candy..."
              type="text"
            />
          </div>

          <BreakpointProvider>
            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <Link to="/">
                    All candy
                    <span className="lines"></span>
                  </Link>
                </div>
                {res ? (
                  <div className="navbar-item">
                    <NavLink to="/custombox">
                      Custom box
                      <span className="lines"></span>
                    </NavLink>
                  </div>
                ) : null}
              </div>
            </Breakpoint>
          </BreakpointProvider>
          {res ? <CartModal /> : null}
          {res ? (
            <div className="navbar-item">
              <div
                ref={ref3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'right',
                  width: '250px',
                }}
              >
                <div
                  className="dropdown-custom dropdown-toggle btn"
                  onClick={handleBtnClick3}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={res.photoURL}
                      width={'35px'}
                      height={'35px'}
                      style={{ borderRadius: '50%', marginRight: '0.5rem' }}
                    />
                    <span style={{ color: '$black' }}>
                      Hello {res.displayName}
                    </span>
                  </div>
                </div>
                {openMenu3 && (
                  <div className="item-dropdown">
                    <div></div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button className="btn-main" onClick={login}>
              <span style={{ color: '#fff' }}>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  ) : (
    <div></div>
  );
};

export default Header;
