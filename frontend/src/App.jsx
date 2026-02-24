import { useState, useEffect } from 'react'
import { fetchLogs, createLog } from './api/logApi'

function App() {
  const [logs, setLogs] = useState([]);
  const [content, setContent] = useState('');

  // 1. Data load karna jab page open ho
  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    const res = await fetchLogs();
    setLogs(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLog({ content, tags: ['react', 'learning'] });
    setContent('');
    getLogs(); // List refresh karne ke liye
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="max-w-4xl mx-auto mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-400">Dev-Log 🔥</h1>
        <div className="bg-gray-800 px-4 py-2 rounded-lg border border-orange-500">
           Streak: {logs[0]?.streakCount || 0} Days
        </div>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <section>
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <textarea 
              className="w-full bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Aaj kya seekha?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-bold transition">
              Log Progress
            </button>
          </form>
        </section>

        {/* List Section */}
        <section className="space-y-4">
          {logs.map(log => (
            <div key={log._id} className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-300">{log.content}</p>
              <small className="text-gray-500 italic">{new Date(log.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App