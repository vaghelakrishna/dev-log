import { useState, useEffect } from 'react'
import { fetchLogs, createLog } from './api/logApi'

function App() {
  const [logs, setLogs] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => { getLogs(); }, []);

  const getLogs = async () => {
    try {
      const res = await fetchLogs();
      if (res.data?.data) setLogs(res.data.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    // Hum tag ko category ki tarah use karenge (e.g., 'Design', 'Back-End')
    await createLog({ content, tags: ['Design'] });
    setContent('');
    getLogs();
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-4 md:p-10 font-sans text-[#2B3674]">
      {/* Header Area */}
      <header className="max-w-[1600px] mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Dev Progress Board</h1>
          <p className="text-gray-400 text-sm">Track your daily coding streaks</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 font-bold">
            🔥 Streak: {logs[0]?.streakCount || 0}
          </div>
        </div>
      </header>

      {/* Main Kanban Grid */}
      <main className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Column 1: Add New Log (Custom Input Column) */}
        <div className="bg-[#EBEEF7] p-4 rounded-3xl h-fit">
          <h2 className="flex justify-between items-center font-bold mb-4 px-2">
            Add Progress <span className="bg-white px-2 py-0.5 rounded-lg text-xs">New</span>
          </h2>
          <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow-sm">
            <textarea
              className="w-full text-sm outline-none resize-none text-gray-600"
              placeholder="Write your task here..."
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="w-full mt-4 bg-[#4318FF] text-white py-3 rounded-xl font-bold hover:bg-[#3311CC] transition">
              + Add Log
            </button>
          </form>
        </div>

        {/* Column 2: Recent Logs (Like the Purple Column in image) */}
        <div className="bg-[#EBEEF7] p-4 rounded-3xl">
          <h2 className="f p0fxlex justify-between items-center font-bold mb-4 px-2">
            History <span className="bg-[#7551FF] text-white px-2 py-0.5 rounded-lg text-xs">{logs.length}</span>
          </h2>

          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log._id} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {new Date(log.createdAt).toDateString()}
                  </span>
                  <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-1 rounded-md font-bold">
                    Streak #{log.streakCount}
                  </span>
                </div>
                <p className="text-sm font-semibold leading-relaxed mb-4">
                  {log.content}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">D</div>
                  </div>
                  <div className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded">
                    Completed
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder Columns to match image vibes */}
        {/* <div className="hidden lg:block bg-[#EBEEF7]/50 border-2 border-dashed border-gray-200 rounded-3xl p-4">
          <p className="text-center text-gray-400 mt-10 font-bold text-sm">Future Goals</p>
        </div>
        <div className="hidden lg:block bg-[#EBEEF7]/50 border-2 border-dashed border-gray-200 rounded-3xl p-4">
          <p className="text-center text-gray-400 mt-10 font-bold text-sm">Bucket List</p>
        </div> */}

      </main>
    </div>
  )
}

export default App;