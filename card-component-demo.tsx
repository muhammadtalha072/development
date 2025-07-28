import React, { useState } from 'react';

// Card Component with Tailwind CSS
function Card({ 
  title, 
  children, 
  variant = "default",
  className = "",
  onClick,
  hover = false 
}) {
  const variants = {
    default: "bg-white border border-gray-200",
    primary: "bg-blue-50 border border-blue-200",
    success: "bg-green-50 border border-green-200",
    warning: "bg-yellow-50 border border-yellow-200",
    danger: "bg-red-50 border border-red-200",
    dark: "bg-gray-800 border border-gray-700"
  };

  const titleColors = {
    default: "text-gray-800",
    primary: "text-blue-800",
    success: "text-green-800",
    warning: "text-yellow-800",
    danger: "text-red-800",
    dark: "text-white"
  };

  const textColors = {
    default: "text-gray-600",
    primary: "text-blue-700",
    success: "text-green-700",
    warning: "text-yellow-700",
    danger: "text-red-700",
    dark: "text-gray-300"
  };

  return (
    <div 
      className={`
        ${variants[variant]}
        rounded-lg shadow-sm p-6 
        ${hover ? 'hover:shadow-lg hover:-translate-y-1' : 'hover:shadow-md'}
        ${onClick ? 'cursor-pointer' : ''}
        transition-all duration-300
        ${className}
      `}
      onClick={onClick}
    >
      {title && (
        <h3 className={`
          text-xl font-semibold mb-4
          ${titleColors[variant]}
        `}>
          {title}
        </h3>
      )}
      <div className={textColors[variant]}>
        {children}
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ title, value, change, icon }) {
  const isPositive = change > 0;
  
  return (
    <Card className="text-center">
      <div className="flex flex-col items-center space-y-2">
        <div className="text-3xl mb-2">{icon}</div>
        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </h4>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className={`text-sm font-medium flex items-center space-x-1 ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          <span>{isPositive ? '↗' : '↘'}</span>
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
    </Card>
  );
}

export default function CardDemo() {
  const [selectedCard, setSelectedCard] = useState(null);

  const stats = [
    { title: 'Total Users', value: '12,345', change: 12.5, icon: '👥' },
    { title: 'Revenue', value: '$45,678', change: 8.2, icon: '💰' },
    { title: 'Orders', value: '1,234', change: -2.4, icon: '📦' },
    { title: 'Growth', value: '23.4%', change: 15.7, icon: '📈' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tailwind CSS Card Components
          </h1>
          <p className="text-lg text-gray-600">
            Interactive examples of styled card components
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Card Variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          
          <Card title="Default Card" hover>
            <p className="mb-4">
              This is a default card with hover effects. Notice the subtle shadow 
              and transform on hover.
            </p>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Default
              </span>
            </div>
          </Card>

          <Card title="Primary Information" variant="primary" hover>
            <p className="mb-4">
              This primary card is perfect for highlighting important information
              or call-to-action content.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </Card>

          <Card title="Success Message" variant="success" hover>
            <p className="mb-4">
              Great job! Your operation completed successfully. All systems are
              running smoothly.
            </p>
            <div className="flex items-center space-x-2 text-green-700">
              <span>✓</span>
              <span className="font-medium">Completed</span>
            </div>
          </Card>

          <Card title="Warning Alert" variant="warning" hover>
            <p className="mb-4">
              Please review the following items before proceeding. Some attention
              may be required.
            </p>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              Review Now
            </button>
          </Card>

          <Card title="Error Notification" variant="danger" hover>
            <p className="mb-4">
              An error occurred while processing your request. Please try again
              or contact support.
            </p>
            <div className="flex space-x-2">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Retry
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                Contact Support
              </button>
            </div>
          </Card>

          <Card title="Dark Theme" variant="dark" hover>
            <p className="mb-4">
              This dark variant card works great for modern interfaces and
              provides excellent contrast.
            </p>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                Dark Mode
              </span>
            </div>
          </Card>

        </div>

        {/* Interactive Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Interactive Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['React', 'Vue', 'Angular'].map((framework, index) => (
              <Card
                key={framework}
                title={`${framework} Development`}
                variant={selectedCard === index ? 'primary' : 'default'}
                onClick={() => setSelectedCard(selectedCard === index ? null : index)}
                hover
                className="cursor-pointer"
              >
                <p className="mb-4">
                  Click to select this {framework} development card. 
                  {selectedCard === index && " This card is now selected!"}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl">
                    {framework === 'React' ? '⚛️' : framework === 'Vue' ? '🟢' : '🔺'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedCard === index 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedCard === index ? 'Selected' : 'Click to select'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <Card title="Usage Example" className="bg-gray-50 border-2 border-dashed border-gray-300">
          <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`<Card title="My Card" variant="primary" hover>
  <p>Card content goes here</p>
  <button className="bg-blue-600 text-white px-4 py-2 rounded">
    Action Button
  </button>
</Card>`}
          </pre>
        </Card>

      </div>
    </div>
  );
}