import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.1),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(14,165,233,0.05),transparent_50%)]"></div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link to="/landing" className="text-2xl font-bold text-primary inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            FitQuest
          </Link>
          <h2 className="mt-6 text-3xl font-bold">Welcome Back, Fitness Warrior!</h2>
          <p className="mt-2 text-base-content/60">Continue your fitness journey</p>
        </div>

        {/* Clerk SignIn Component */}
        <div className="mt-8">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'btn btn-primary w-full',
                card: 'bg-base-100 shadow-lg rounded-lg p-8',
                headerTitle: 'text-2xl font-bold',
                headerSubtitle: 'text-base-content/60',
                socialButtonsBlockButton: 'btn btn-ghost w-full',
                formFieldInput: 'input input-bordered w-full',
                footerActionLink: 'link link-primary',
              }
            }}
            routing="path"
            path="/login"
            signUpUrl="/signup"
          />
        </div>
      </div>
    </div>
  );
};

export default Login; 