import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../public/houseOfHoops.svg";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { AuthContext } from "../../context/auth-context";
import { CartItemContext } from "../../context/cartItem-context";

const settings = ["Profile", "Account", "Dashboard"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(false);

  const auth = React.useContext(AuthContext);
  const cart = React.useContext(CartItemContext);
  const handleNavMenu = () => {
    setAnchorElNav((prev) => !prev);
  };

  const handleUserMenu = () => {
    setAnchorElUser((prev) => !prev);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#FFF8F9" }}>
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            to="/"
            component={Link}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                height: "100px",
                width: "100px",
                marginTop: "10px",
              }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleNavMenu}
              color="inherit"
            >
              <MenuIcon style={{ color: "black" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={!anchorElNav}
              onClose={handleNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleNavMenu} to="/" component={Link}>
                <Typography
                  sx={{
                    fontFamily: "system-ui",
                    fontWeight: 500,
                  }}
                >
                  Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleNavMenu} to="/about" component={Link}>
                <Typography
                  sx={{
                    fontFamily: "system-ui",
                    fontWeight: 500,
                  }}
                >
                  About
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleNavMenu} to="/shop" component={Link}>
                <Typography
                  sx={{
                    fontFamily: "system-ui",
                    fontWeight: 500,
                  }}
                >
                  Shop
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            to="/"
            component={Link}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                height: "100px",
                width: "100px",
                marginTop: "10px",
                marginLeft: "85px",
              }}
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleNavMenu}
              to="/"
              component={Link}
              sx={{
                my: 2,
                color: "black",
                fontFamily: "system-ui",
                fontWeight: 500,
                marginRight: "15px",
              }}
              className="a"
            >
              Home
            </Button>
            <Button
              onClick={handleNavMenu}
              to="/about"
              component={Link}
              sx={{
                my: 2,
                color: "black",
                fontFamily: "system-ui",
                fontWeight: 500,
                marginRight: "15px",
              }}
              className="a"
            >
              About
            </Button>
            <Button
              onClick={handleNavMenu}
              to="/shop?page=1"
              component={Link}
              sx={{
                my: 2,
                color: "black",
                fontFamily: "system-ui",
                fontWeight: 500,
              }}
              className="a"
            >
              Shop
            </Button>
          </Box>

          {auth.isLoggedIn && (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                to="/cart"
                component={Link}
              >
                <Badge color="error" badgeContent={cart.cartItems}>
                  <ShoppingCartIcon
                    style={{
                      color: "black",
                      height: "30px",
                      width: "30px",
                    }}
                  />
                </Badge>
              </IconButton>
              <Box sx={{ flexGrow: 0, marginLeft: "15px" }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={anchorElUser}
                  onClose={handleUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleUserMenu}>
                      <Typography>{setting}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem key="logout" onClick={auth.logout}>
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
          {!auth.isLoggedIn && (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                to="/auth"
                component={Link}
                sx={{ flexGrow: 0, marginLeft: "15px" }}
              >
                <LoginIcon
                  style={{ color: "black", height: "30px", width: "30px" }}
                />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
