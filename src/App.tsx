import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          TCF Church
        </h1>
        <h2 className="text-2xl text-gray-700 mb-8">
          Development Environment
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <p className="text-lg text-gray-600 mb-6">
            React + TypeScript + Vite
          </p>
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <p className="text-green-800 font-semibold">
              ✓ Project setup successful.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
