// components/partials/UserMenu.tsx
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const UserMenu: React.FC<{
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
  onDeleteAccount: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
}> = ({ isLoggedIn, username, onLogout, onDeleteAccount, onSignIn, onSignUp }) => {
  return isLoggedIn ? (
    <div className="user-menu desktop-only">
      <div className="user-menu-trigger">
        <FaUserCircle className="profile-icon" />
        <span>Profile ▾</span>
      </div>
      <div className="user-menu-dropdown">
        <div className="user-greeting">Hello, {username}</div>
        <button onClick={onLogout}>Logout</button>
        <button onClick={onDeleteAccount}>Delete Account</button>
      </div>
    </div>
  ) : (
    <div className="signin-signup-container desktop-only">
      <button className="signin-btn" onClick={onSignIn}>Sign In</button>
      <button className="signup-btn" onClick={onSignUp}>Sign Up</button>
    </div>
  );
};

export default UserMenu;
