import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { Button } from '../components/common/Button.jsx';
import { Input } from '../components/common/Input.jsx';
import {
  Lock,
  Mail,
  ArrowRight,
} from 'lucide-react';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, googleSignIn } = useAuth();
  const toast = useToast();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const googleBtnRef = useRef(null);
  const gsiInitialized = useRef(false);

  // Handle the credential response from Google Identity Services
  const handleGoogleCredentialResponse = useCallback(async (response) => {
    if (!response?.credential) {
      setError('Google sign-in failed. No credential received.');
      return;
    }
    setGoogleLoading(true);
    setError('');
    try {
      const user = await googleSignIn(response.credential);
      toast.success(
        'Google Authentication Successful',
        `Welcome, ${user.fullName || user.email}!`
      );
      navigate('/');
    } catch (err) {
      const message = err.message || 'Google authentication failed.';
      setError(message);
      toast.error('Google Sign-In Error', message);
    } finally {
      setGoogleLoading(false);
    }
  }, [googleSignIn, navigate, toast]);

  // Initialize Google Identity Services
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    if (gsiInitialized.current) return;

    const initGsi = () => {
      if (!window.google?.accounts?.id) return;
      gsiInitialized.current = true;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      if (googleBtnRef.current) {
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          width: googleBtnRef.current.offsetWidth,
          text: 'continue_with',
          shape: 'pill',
          logo_alignment: 'left',
        });
      }
    };

    // If the GIS script is already loaded
    if (window.google?.accounts?.id) {
      initGsi();
    } else {
      // Wait for the script to load
      const checkInterval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(checkInterval);
          initGsi();
        }
      }, 100);
      // Clean up after 10 seconds
      const timeout = setTimeout(() => clearInterval(checkInterval), 10000);
      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    }
  }, [handleGoogleCredentialResponse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrUsername.trim()) {
      toast.error('Validation Error', 'Please enter your email or username.');
      return;
    }
    if (!password) {
      toast.error('Validation Error', 'Please enter your password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const user = await login(emailOrUsername, password);
      toast.success('Signed In', `Welcome back, ${user.fullName || user.email}!`);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
      toast.error('Authentication Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="saas-card p-5 sm:p-6 rounded-2xl shadow-xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800">
      {/* Centered Brand Logo (in high-contrast dark capsule) */}
      <div className="flex justify-center mb-3">
        <div className="inline-flex items-center justify-center px-6 py-2 rounded-2xl bg-[#1C1D22] border border-[#2B2C33] shadow-md">
          <img
            src="/wealthra-logo.png"
            alt="Wealthra"
            className="h-8 w-auto max-w-[180px] object-contain"
          />
        </div>
      </div>

      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Sign in to your account</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Enter your credentials to access your financial operations.
        </p>
      </div>

      {/* Google Sign-In Button (rendered by GIS) */}
      <div className="w-full flex justify-center mb-1">
        <div
          ref={googleBtnRef}
          className="w-full"
          style={{ minHeight: '44px' }}
        />
      </div>
      {googleLoading && (
        <p className="text-center text-xs text-slate-400 mt-1">Authenticating with Google…</p>
      )}
      {!GOOGLE_CLIENT_ID && (
        <p className="text-center text-xs text-rose-400 mt-1">Google Sign-In is not configured.</p>
      )}

      <div className="flex items-center my-3">
        <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
        <span className="px-3 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Or with credentials</span>
        <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
      </div>

      {error && (
        <div className="mb-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label="Email Address or Username"
          type="text"
          icon={Mail}
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          placeholder="name@company.com"
          required
        />

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Password</label>
            <Link to="/forgot-password" className="text-[11px] text-emerald-primary hover:underline font-semibold">
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          className="w-full mt-1"
          icon={ArrowRight}
        >
          Sign In
        </Button>
      </form>

      <div className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-emerald-primary hover:underline font-bold">
          Create New Account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
