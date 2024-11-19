import React, { useState, useCallback } from 'react';
import { Upload, Calendar, TrendingUp, Download, Settings, LineChart } from 'lucide-react';
import FileUpload from './components/FileUpload';
import ConfigPanel from './components/ConfigPanel';
import Chart from './components/Chart';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [config, setConfig] = useState({
    forecastPeriod: 30,
    weeklySeasonality: true,
    yearlySeasonality: true,
  });

  const handleFileUpload = useCallback((file: File) => {
    setFile(file);
    // Simulate data preview
    const mockData = [
      { ds: '2024-01-01', y: 1200 },
      { ds: '2024-01-02', y: 1350 },
      { ds: '2024-01-03', y: 1100 },
    ];
    setPreviewData(mockData);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-indigo-600" />
            <h1 className="text-xl font-semibold text-gray-900">AI Sales Forecasting</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Upload className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-medium">Data Upload</h2>
              </div>
              <FileUpload onFileUpload={handleFileUpload} />
              {file && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Uploaded: {file.name}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-medium">Model Configuration</h2>
              </div>
              <ConfigPanel config={config} setConfig={setConfig} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <LineChart className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-medium">Forecast Visualization</h2>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </button>
              </div>
              <Chart data={previewData} />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Forecast Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Predicted Growth</p>
                  <p className="text-2xl font-semibold text-blue-600">+12.5%</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Accuracy Score</p>
                  <p className="text-2xl font-semibold text-green-600">94.2%</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Forecast Period</p>
                  <p className="text-2xl font-semibold text-purple-600">{config.forecastPeriod} days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;