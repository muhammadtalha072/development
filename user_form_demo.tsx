import React, { useState } from 'react';
import { User, Mail, UserPlus, Trash2 } from 'lucide-react';

export default function UserFormDemo() {
  // Form state (controlled components)
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  // Users list state
  const [users, setUsers] = useState([]);
  
  // Form validation errors
  const [errors, setErrors] = useState({});
  
  // Form submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes (controlled components)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Check for duplicate email
    if (formData.email && users.some(user => user.email.toLowerCase() === formData.email.toLowerCase())) {
      newErrors.email = 'This email is already registered';
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add new user
    const newUser = {
      id: Date.now(), // Simple ID generation
      name: formData.name.trim(),
      email: formData.email.trim(),
      createdAt: new Date().toLocaleString()
    };
    
    setUsers(prev => [...prev, newUser]);
    
    // Reset form
    setFormData({ name: '', email: '' });
    setErrors({});
    setIsSubmitting(false);
  };

  // Handle user deletion
  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          User Management System
        </h1>
        
        {/* Form Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add New User
          </h2>
          
          <div className="space-y-6">
            {/* Name Input - Controlled Component */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter full name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-4 h-4">⚠️</span>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input - Controlled Component */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-4 h-4">⚠️</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding User...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add User
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Users List Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Registered Users ({users.length})
          </h2>
          
          {users.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No users registered yet</p>
              <p className="text-sm">Add your first user using the form above</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{user.name}</h3>
                      <p className="text-gray-600 flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        Added: {user.createdAt}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete user"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Educational Info Panel */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-3">React Forms Concepts Demonstrated:</h3>
        <ul className="text-blue-700 space-y-2 text-sm">
          <li><strong>Controlled Components:</strong> Form inputs are controlled by React state via value and onChange props</li>
          <li><strong>Form Validation:</strong> Real-time validation with error states and user feedback</li>
          <li><strong>State Management:</strong> Managing form data, user list, errors, and loading states</li>
          <li><strong>Event Handling:</strong> onSubmit, onChange, and onClick event handlers</li>
          <li><strong>Conditional Rendering:</strong> Error messages, loading states, and empty states</li>
        </ul>
      </div>
    </div>
  );
}