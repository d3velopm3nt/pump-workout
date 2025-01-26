import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { FaFire } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="navbar bg-base-100/50 backdrop-blur-lg">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
              <FaFire className="h-6 w-6 text-primary" />
              <span className="font-bold">FitQuest</span>
            </Link>
          </div>
          <div className="flex-none gap-4">
            <ThemeToggle />
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="hero min-h-screen relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.1),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(14,165,233,0.05),transparent_50%)]"></div>
        
        <div className="hero-content text-center z-10 max-w-4xl px-4">
          <div>
            <h1 className="text-6xl font-bold mb-8 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary">
                FitQuest: Level Up Your Fitness Journey
              </span>
            </h1>
            <p className="py-8 text-xl text-base-content/80 max-w-2xl mx-auto">
              Transform your workout experience with our gamified fitness platform. Train smarter, compete with friends, and achieve your goals while having fun!
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup" className="btn btn-primary btn-lg">
                Start Your Journey
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg hover:btn-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-base-200">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose FitQuest?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="card-title m-0">Muscle Group Navigation</h3>
              </div>
              <p className="text-base-content/70">Easily find exercises for specific muscle groups with our intuitive drill-down system.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="card-title m-0">Community Driven</h3>
              </div>
              <p className="text-base-content/70">Join a thriving community of fitness enthusiasts sharing workouts and tips.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="card-title m-0">Gamified Experience</h3>
              </div>
              <p className="text-base-content/70">Level up, earn badges, and unlock achievements as you progress in your fitness journey.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div className="bg-base-300 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Epic Fitness Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Daily Challenges</h3>
                <p>Complete daily workout challenges to earn bonus experience and rewards.</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-primary">XP Boost</div>
                  <div className="badge badge-secondary">Rewards</div>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Monthly Championships</h3>
                <p>Compete with others in monthly themed workout championships.</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-primary">Leaderboards</div>
                  <div className="badge badge-secondary">Prizes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Set Your Goals, Track Your Progress</h2>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="stat-title">Daily Goals</div>
              <div className="stat-value text-primary">86%</div>
              <div className="stat-desc">Users achieving goals</div>
            </div>
            
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-title">Weekly Streaks</div>
              <div className="stat-value text-secondary">4.2k</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="hero bg-base-200">
        <div className="hero-content text-center py-16">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold">Ready to Begin Your Journey?</h2>
            <p className="py-6">Join thousands of users who are already transforming their fitness journey with FitQuest.</p>
            <Link to="/signup" className="btn btn-primary">Start Now - It's Free!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 