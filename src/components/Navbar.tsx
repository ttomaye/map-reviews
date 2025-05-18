
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    if (email && password) {
      setIsLoggedIn(true);
      setIsOpen(false);
      toast.success(isSignUp ? 'Account created successfully!' : 'Logged in successfully!');
      resetForm();
    } else {
      toast.error('Please fill in all fields');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.success('Logged out successfully!');
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setIsSignUp(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Restaurant Finder</span>
        </Link>
        
        <nav className="hidden space-x-4 md:flex">
          <Link to="/" className="text-sm font-medium text-gray-700 transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium text-gray-700 transition-colors hover:text-primary">
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">User</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>Sign In</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{isSignUp ? 'Create an Account' : 'Sign In'}</DialogTitle>
                  <DialogDescription>
                    {isSignUp 
                      ? 'Create an account to leave reviews and save your favorite restaurants.' 
                      : 'Sign in to your account to leave reviews and access your saved restaurants.'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAuth} className="space-y-4">
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe" 
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@example.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********" 
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button type="submit">{isSignUp ? 'Create Account' : 'Sign In'}</Button>
                    <Button 
                      type="button" 
                      variant="link" 
                      onClick={() => setIsSignUp(!isSignUp)}
                    >
                      {isSignUp 
                        ? 'Already have an account? Sign In' 
                        : "Don't have an account? Sign Up"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
}
