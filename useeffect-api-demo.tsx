import React, { useState, useEffect } from 'react';

const UsersList = () => {
  // State for storing users data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect for initial data fetching (componentDidMount equivalent)
  useEffect(() => {
    console.log('Component mounted - fetching users...');
    
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        setUsers(userData);
        console.log('Users fetched successfully:', userData.length);
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    
    // Cleanup function (componentWillUnmount equivalent)
    return () => {
      console.log('Cleanup: Component will unmount or dependencies changed');
    };
  }, []); // Empty dependency array - runs only once on mount

  // useEffect for search functionality (runs when searchTerm changes)
  useEffect(() => {
    console.log('Search term changed:', searchTerm);
    
    if (searchTerm && users.length > 0) {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log('Filtered users:', filtered.length);
    }
  }, [searchTerm, users]); // Runs when searchTerm or users change

  // useEffect for selected user (fetch additional data)
  useEffect(() => {
    if (selectedUser) {
      console.log('Selected user changed:', selectedUser.name);
      
      const fetchUserPosts = async () => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}/posts`);
          const posts = await response.json();
          console.log(`Fetched ${posts.length} posts for ${selectedUser.name}`);
        } catch (err) {
          console.error('Error fetching user posts:', err);
        }
      };

      fetchUserPosts();
    }
  }, [selectedUser]); // Runs when selectedUser changes

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-lg text-gray-600">Fetching users...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="text-lg font-semibold">Error occurred!</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">useEffect Hook Demo</h1>
      
      {/* Lifecycle Info Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">React Lifecycle with useEffect</h2>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• <strong>Mount:</strong> useEffect with empty [] runs once (like componentDidMount)</p>
          <p>• <strong>Update:</strong> useEffect with dependencies runs when they change</p>
          <p>• <strong>Unmount:</strong> Return function in useEffect runs on cleanup</p>
          <p>• <strong>Check console</strong> to see lifecycle logs!</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Users (triggers useEffect on change):
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Users Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map(user => (
          <div 
            key={user.id}
            className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedUser?.id === user.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.name.charAt(0)}
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="font-medium w-16">Email:</span>
                <span className="break-all">{user.email}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-16">Phone:</span>
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-16">Website:</span>
                <span className="text-blue-600">{user.website}</span>
              </div>
              <div className="flex items-start">
                <span className="font-medium w-16">Company:</span>
                <span>{user.company.name}</span>
              </div>
              <div className="flex items-start">
                <span className="font-medium w-16">Address:</span>
                <span>
                  {user.address.street}, {user.address.city}
                </span>
              </div>
            </div>

            {selectedUser?.id === user.id && (
              <div className="mt-4 p-3 bg-blue-100 rounded-md">
                <p className="text-sm text-blue-800">
                  Selected! Check console for additional API call.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredUsers.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No users found matching "{searchTerm}"</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">API Call Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{users.length}</div>
            <div className="text-sm text-green-700">Total Users Loaded</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{filteredUsers.length}</div>
            <div className="text-sm text-blue-700">Filtered Results</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {selectedUser ? '1' : '0'}
            </div>
            <div className="text-sm text-purple-700">Selected User</div>
          </div>
        </div>
      </div>

      {/* useEffect Code Examples */}
      <div className="mt-8 bg-gray-800 text-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">useEffect Examples Used:</h2>
        <div className="space-y-4 text-sm font-mono">
          <div>
            <div className="text-green-400">// 1. Run once on mount (API call)</div>
            <div>useEffect(() =&gt; fetchUsers(), []);</div>
          </div>
          <div>
            <div className="text-green-400">// 2. Run when searchTerm changes</div>
            <div>useEffect(() =&gt; filterUsers(), [searchTerm, users]);</div>
          </div>
          <div>
            <div className="text-green-400">// 3. Run when user selection changes</div>
            <div>useEffect(() =&gt; fetchUserPosts(), [selectedUser]);</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;