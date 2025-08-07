import React, { useState, useEffect } from 'react';
import { Users, User, UserPlus, Home, ArrowLeft, Mail, Phone, MapPin, Building, Loader } from 'lucide-react';

// Router Component
const Router = ({ currentPath, navigate, children }) => {
  return children({ currentPath, navigate });
};

// UserCard Component
const UserCard = ({ user, onClick }) => (
  <div 
    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-blue-300"
    onClick={() => onClick(user.id)}
  >
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
    <div className="flex items-center text-gray-600 mb-2">
      <Mail className="w-4 h-4 mr-2" />
      <span className="text-sm">{user.email}</span>
    </div>
    <div className="flex items-center text-gray-600">
      <MapPin className="w-4 h-4 mr-2" />
      <span className="text-sm">{user.address?.city || 'N/A'}</span>
    </div>
  </div>
);

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <Loader className="w-8 h-8 animate-spin text-blue-500" />
    <span className="ml-2 text-gray-600">Loading...</span>
  </div>
);

// Navigation Component
const Navigation = ({ currentPath, navigate }) => (
  <nav className="bg-blue-600 text-white p-4 shadow-lg">
    <div className="container mx-auto flex items-center justify-between">
      <h1 className="text-2xl font-bold">User Directory</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
            currentPath === '/' ? 'bg-blue-700' : 'hover:bg-blue-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => navigate('/users')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
            currentPath === '/users' ? 'bg-blue-700' : 'hover:bg-blue-500'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Users</span>
        </button>
        <button
          onClick={() => navigate('/add-user')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
            currentPath === '/add-user' ? 'bg-blue-700' : 'hover:bg-blue-500'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>
    </div>
  </nav>
);

// Home Page Component
const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <div className="mb-8">
          <Users className="w-24 h-24 text-blue-600 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to User Directory</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and manage users with our intuitive directory application. 
            Browse user profiles, view detailed information, and add new users to your network.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Browse Users</h3>
            <p className="text-gray-600">View all users in a beautiful card layout with essential information.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <User className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Details</h3>
            <p className="text-gray-600">Get comprehensive information about each user including contact details.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <UserPlus className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Add New Users</h3>
            <p className="text-gray-600">Easily add new users to your directory with our simple form.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Users Page Component
const UsersPage = ({ navigate }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">User Directory</h2>
          <p className="text-gray-600">Click on any user card to view detailed information</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              onClick={handleUserClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// User Detail Page Component
const UserDetailPage = ({ userId, navigate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">User not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/users')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">@{user.username}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-800">
                  {user.address.street}, {user.address.suite}<br />
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Building className="w-5 h-5 text-gray-400 mr-3 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="text-gray-800 font-semibold">{user.company.name}</p>
                <p className="text-gray-600 text-sm">{user.company.catchPhrase}</p>
                <p className="text-gray-500 text-sm">{user.company.bs}</p>
              </div>
            </div>

            {user.website && (
              <div className="flex items-center">
                <div className="w-5 h-5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a 
                    href={`http://${user.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add User Page Component
const AddUserPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [addedUser, setAddedUser] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    
    if (!validateForm()) {
      return;
    }

    // Create new user with a temporary ID
    const newUser = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      email: formData.email,
      address: { city: 'Local' } // Default city for local users
    };

    setAddedUser(newUser);
    setFormData({ name: '', email: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <UserPlus className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800">Add New User</h2>
            <p className="text-gray-600">Fill in the details to add a new user</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add User
            </button>
          </div>

          {addedUser && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Newly Added User:</h3>
              <UserCard 
                user={addedUser} 
                onClick={() => {}} // No navigation for local users
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPath, setCurrentPath] = useState('/');

  const navigate = (path) => {
    setCurrentPath(path);
  };

  const getUserIdFromPath = () => {
    const match = currentPath.match(/\/users\/(\d+)/);
    return match ? parseInt(match[1]) : null;
  };

  const renderPage = () => {
    if (currentPath === '/') {
      return <HomePage />;
    } else if (currentPath === '/users') {
      return <UsersPage navigate={navigate} />;
    } else if (currentPath.startsWith('/users/')) {
      const userId = getUserIdFromPath();
      return <UserDetailPage userId={userId} navigate={navigate} />;
    } else if (currentPath === '/add-user') {
      return <AddUserPage />;
    }
    
    // 404 page
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPath={currentPath} navigate={navigate} />
      {renderPage()}
    </div>
  );
};

export default App;