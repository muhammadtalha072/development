import React, { useState } from 'react';

// Basic Counter Component
function BasicCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);
  const reset = () => setCount(0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Counter</h3>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-6">{count}</div>
        <div className="flex justify-center space-x-3">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            -1
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            +1
          </button>
        </div>
      </div>
    </div>
  );
}

// Counter with Limits
function LimitedCounter() {
  const [count, setCount] = useState(5);
  const min = 0;
  const max = 10;

  const increment = () => {
    setCount(prevCount => Math.min(prevCount + 1, max));
  };

  const decrement = () => {
    setCount(prevCount => Math.max(prevCount - 1, min));
  };

  const isAtMin = count <= min;
  const isAtMax = count >= max;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Limited Counter (0-10)</h3>
      <div className="text-center">
        <div className="text-4xl font-bold text-purple-600 mb-4">{count}</div>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(count / max) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
        <div className="flex justify-center space-x-3">
          <button
            onClick={decrement}
            disabled={isAtMin}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isAtMin 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            - {isAtMin ? '(Min)' : ''}
          </button>
          <button
            onClick={increment}
            disabled={isAtMax}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isAtMax 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            + {isAtMax ? '(Max)' : ''}
          </button>
        </div>
      </div>
    </div>
  );
}

// Counter with Custom Step
function StepCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(prevCount => prevCount + step);
  const decrement = () => setCount(prevCount => prevCount - step);
  const reset = () => setCount(0);

  const handleStepChange = (event) => {
    const newStep = parseInt(event.target.value) || 1;
    setStep(Math.max(1, newStep)); // Ensure step is at least 1
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Step Counter</h3>
      <div className="text-center">
        <div className="text-4xl font-bold text-orange-600 mb-4">{count}</div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Step Size:
          </label>
          <input
            type="number"
            value={step}
            onChange={handleStepChange}
            min="1"
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="flex justify-center space-x-3">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            -{step}
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            +{step}
          </button>
        </div>
      </div>
    </div>
  );
}

// Advanced Counter with Multiple Features
function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);
  const [isAutoIncrementing, setIsAutoIncrementing] = useState(false);

  // Auto increment using setInterval (for demo purposes)
  React.useEffect(() => {
    let interval;
    if (isAutoIncrementing) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount + 1);
        setHistory(prevHistory => [...prevHistory.slice(-9), count + 1]);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isAutoIncrementing, count]);

  const updateCount = (newCount) => {
    setCount(newCount);
    setHistory(prevHistory => [...prevHistory.slice(-9), newCount]);
  };

  const increment = () => updateCount(count + 1);
  const decrement = () => updateCount(count - 1);
  const double = () => updateCount(count * 2);
  const half = () => updateCount(Math.floor(count / 2));
  const reset = () => {
    updateCount(0);
    setIsAutoIncrementing(false);
  };

  const toggleAutoIncrement = () => {
    setIsAutoIncrementing(!isAutoIncrementing);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Advanced Counter</h3>
      
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold mb-2 ${
          isAutoIncrementing ? 'text-blue-600 animate-pulse' : 'text-gray-800'
        }`}>
          {count}
        </div>
        
        {/* History */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">History (last 10):</p>
          <div className="flex justify-center flex-wrap gap-1">
            {history.slice(-10).map((value, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-xs ${
                  index === history.length - 1
                    ? 'bg-blue-100 text-blue-800 font-semibold'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={decrement}
          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
        >
          -1
        </button>
        <button
          onClick={increment}
          className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
        >
          +1
        </button>
        <button
          onClick={half}
          className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
        >
          ÷2
        </button>
        <button
          onClick={double}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          ×2
        </button>
      </div>

      {/* Special Controls */}
      <div className="flex justify-center space-x-3">
        <button
          onClick={toggleAutoIncrement}
          className={`px-4 py-2 rounded-lg transition-colors text-sm ${
            isAutoIncrementing
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isAutoIncrementing ? 'Stop Auto' : 'Auto +1'}
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// Main Demo Component
export default function CounterDemo() {
  const [selectedExample, setSelectedExample] = useState('all');

  const examples = [
    { id: 'basic', name: 'Basic Counter', component: BasicCounter },
    { id: 'limited', name: 'Limited Counter', component: LimitedCounter },
    { id: 'step', name: 'Step Counter', component: StepCounter },
    { id: 'advanced', name: 'Advanced Counter', component: AdvancedCounter }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React State & Events Demo
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Interactive examples of useState Hook and event handling
          </p>
          
          {/* Filter Buttons */}
          <div className="flex justify-center flex-wrap gap-2">
            <button
              onClick={() => setSelectedExample('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedExample === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Show All
            </button>
            {examples.map(example => (
              <button
                key={example.id}
                onClick={() => setSelectedExample(example.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedExample === example.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {example.name}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {examples
            .filter(example => selectedExample === 'all' || selectedExample === example.id)
            .map(example => {
              const Component = example.component;
              return <Component key={example.id} />;
            })
          }
        </div>

        {/* Code Example */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Basic Counter Code Example
          </h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`import React, { useState } from 'react';

function Counter() {
  // State declaration with initial value
  const [count, setCount] = useState(0);

  // Event handlers
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`}
          </pre>
        </div>

      </div>
    </div>
  );
}