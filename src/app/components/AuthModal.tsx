"use client";

import React, { useState } from 'react';
import './AuthModal.css';
import { useAuth } from '@/context/AuthContext';
import { fetchCountry } from '@/utils/api';

interface AuthModalProps {
  mode: 'signin' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'signin' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetStarted, setResetStarted] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { loginUser, signupUser, resetPassword } = useAuth();
  
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg(null);
    setSuccessMsg(null);
  };

const handleSubmit = async () => {
  if (!email.trim() || !password.trim()) return;

  try {
    setLoading(true);
    setErrorMsg(null);
    const { country } = await fetchCountry();

    if (mode === 'signin') {
      await loginUser(email.trim(), password.trim());
    } else {
      await signupUser(email.trim(), password.trim(), country);
    }

    setSuccessMsg(`${mode === 'signin' ? 'Login' : 'Signup'} successful`);
    resetForm();
    onClose();
  } catch (err: any) {
    setErrorMsg(err.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

  const handleResetPasswordStart = () => {
    if (email.trim()) {
      setResetStarted(true);
    } else {
      setErrorMsg('Please enter your email first');
    }
  };

  const handleFinalResetSubmit = async () => {
    if (!newPassword || newPassword !== confirmPassword) {
      setErrorMsg('Passwords must match and not be empty');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      await resetPassword(email.trim(), newPassword);
      setSuccessMsg('Password reset successful');
      resetForm();
      setShowForgotPassword(false);
      setResetStarted(false);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <h2 className="auth-modal-title">
          {showForgotPassword
            ? resetStarted
              ? 'Set New Password'
              : 'Reset Password'
            : mode === 'signin'
              ? 'Sign In'
              : 'Sign Up'}
        </h2>
        <p className="auth-modal-subtext">
          {showForgotPassword
            ? resetStarted
              ? 'Enter and confirm your new password'
              : 'Enter your email to reset your password'
            : 'Access exclusive learning resources'}
        </p>

        {errorMsg && <div className="auth-modal-error">{errorMsg}</div>}
        {successMsg && <div className="auth-modal-success">{successMsg}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        {!showForgotPassword && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        )}

        {showForgotPassword && resetStarted && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Re-enter New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </>
        )}

        <div className="auth-modal-buttons">
          {mode === 'signin' && !showForgotPassword && (
            <span
              className="auth-modal-forgot"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot password?
            </span>
          )}

          <button onClick={onClose} className="cancel-btn cancel-with-forgot" disabled={loading}>
            Cancel
          </button>

          {!showForgotPassword ? (
            <button onClick={handleSubmit} className="submit-btn" disabled={loading}>
              {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ) : resetStarted ? (
            <button onClick={handleFinalResetSubmit} className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          ) : (
            <button onClick={handleResetPasswordStart} className="submit-btn" disabled={loading}>
              Reset Password
            </button>
          )}
        </div>

        {!showForgotPassword && (
          <div className="auth-modal-switch">
            {mode === 'signin' ? (
              <>
                Don’t have an account?{' '}
                <span className="auth-modal-link" onClick={() => onSwitchMode('signup')}>Register</span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span className="auth-modal-link" onClick={() => onSwitchMode('signin')}>Sign In</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
