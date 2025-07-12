"use client";
import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  Mail, 
  Phone, 
  ArrowLeft,
  Github,
  Chrome,
  Facebook,
  Smartphone,
  AlertCircle,
  Check
} from 'lucide-react';

// TypeScript interfaces
interface LoginFormData {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  name: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
}

type LoginMethod = 'email' | 'phone';
type AuthMode = 'login' | 'signup';
type SocialProvider = 'google' | 'facebook' | 'github';

interface SocialLoginButtonProps {
  provider: SocialProvider;
  onClick: (provider: SocialProvider) => void;
  disabled?: boolean;
}

const MultiAuthLoginPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
    rememberMe: false
  });

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phone.trim()) return 'Phone number is required';
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must contain uppercase, lowercase, and number';
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Validate based on login method
    if (loginMethod === 'email') {
      newErrors.email = validateEmail(formData.email);
    } else {
      newErrors.phone = validatePhone(formData.phone);
    }

    // Validate password
    newErrors.password = validatePassword(formData.password);

    // Additional validation for signup
    if (authMode === 'signup') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).filter(key => newErrors[key as keyof ValidationErrors]).length === 0;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', { authMode, loginMethod, formData });
      // Handle successful login/signup
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: SocialProvider) => {
    setIsLoading(true);
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`${provider} login initiated`);
      // Handle social login
    } catch (error) {
      console.error(`${provider} login error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, onClick, disabled }) => {
    const getProviderConfig = (provider: SocialProvider) => {
      switch (provider) {
        case 'google':
          return {
            icon: <Chrome className="w-5 h-5" />,
            name: 'Google',
            bgColor: 'bg-red-600 hover:bg-red-700',
            textColor: 'text-white'
          };
        case 'facebook':
          return {
            icon: <Facebook className="w-5 h-5" />,
            name: 'Facebook',
            bgColor: 'bg-blue-600 hover:bg-blue-700',
            textColor: 'text-white'
          };
        case 'github':
          return {
            icon: <Github className="w-5 h-5" />,
            name: 'GitHub',
            bgColor: 'bg-gray-800 hover:bg-gray-700 border border-gray-600',
            textColor: 'text-white'
          };
        default:
          return {
            icon: <User className="w-5 h-5" />,
            name: 'Unknown',
            bgColor: 'bg-gray-600',
            textColor: 'text-white'
          };
      }
    };

    const config = getProviderConfig(provider);

    return (
      <button
        onClick={() => onClick(provider)}
        disabled={disabled}
        className={`w-full ${config.bgColor} ${config.textColor} py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {config.icon}
        <span>Continue with {config.name}</span>
      </button>
    );
  };

  const InputField: React.FC<{
    type: string;
    name: keyof LoginFormData;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    icon: React.ReactNode;
    error?: string;
    rightIcon?: React.ReactNode;
    onRightIconClick?: () => void;
  }> = ({ type, name, placeholder, value, onChange, icon, error, rightIcon, onRightIconClick }) => (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-gray-800 border ${
          error ? 'border-red-500' : 'border-gray-600'
        } rounded-lg pl-12 ${rightIcon ? 'pr-12' : 'pr-4'} py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all`}
      />
      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {rightIcon}
        </button>
      )}
      {error && (
        <div className="flex items-center space-x-2 mt-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">Skill Swap Platform</h1>
          </div>
          <button 
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="border border-gray-600 px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            {authMode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {authMode === 'login' ? 'Welcome Back' : 'Join Our Community'}
              </h2>
              <p className="text-gray-400">
                {authMode === 'login' 
                  ? 'Sign in to continue your skill journey' 
                  : 'Create your account to start swapping skills'}
              </p>
            </div>

            {/* Login Method Toggle */}
            <div className="flex bg-gray-800 rounded-lg p-1 mb-6">
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 ${
                  loginMethod === 'email' 
                    ? 'bg-teal-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </button>
              <button
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 ${
                  loginMethod === 'phone' 
                    ? 'bg-teal-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Phone</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Name Field (Sign Up only) */}
              {authMode === 'signup' && (
                <InputField
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(value) => handleInputChange('name', value)}
                  icon={<User className="w-5 h-5" />}
                  error={errors.name}
                />
              )}

              {/* Email/Phone Field */}
              {loginMethod === 'email' ? (
                <InputField
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  icon={<Mail className="w-5 h-5" />}
                  error={errors.email}
                />
              ) : (
                <InputField
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  icon={<Phone className="w-5 h-5" />}
                  error={errors.phone}
                />
              )}

              {/* Password Field */}
              <InputField
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(value) => handleInputChange('password', value)}
                icon={<Lock className="w-5 h-5" />}
                error={errors.password}
                rightIcon={showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                onRightIconClick={() => setShowPassword(!showPassword)}
              />

              {/* Confirm Password Field (Sign Up only) */}
              {authMode === 'signup' && (
                <InputField
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(value) => handleInputChange('confirmPassword', value)}
                  icon={<Lock className="w-5 h-5" />}
                  error={errors.confirmPassword}
                  rightIcon={showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 transition-colors ${
                      formData.rememberMe 
                        ? 'bg-teal-600 border-teal-600' 
                        : 'border-gray-600 bg-transparent'
                    }`}>
                      {formData.rememberMe && (
                        <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                      )}
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">Remember me</span>
                </label>
                
                {authMode === 'login' && (
                  <button
                    type="button"
                    className="text-teal-400 hover:text-teal-300 text-sm transition-colors"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-600/50 text-white py-3 px-6 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <SocialLoginButton
                  provider="google"
                  onClick={handleSocialLogin}
                  disabled={isLoading}
                />
                <SocialLoginButton
                  provider="facebook"
                  onClick={handleSocialLogin}
                  disabled={isLoading}
                />
                <SocialLoginButton
                  provider="github"
                  onClick={handleSocialLogin}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center mt-6 text-gray-400 text-sm">
              {authMode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    Sign up here
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    Sign in here
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiAuthLoginPage;