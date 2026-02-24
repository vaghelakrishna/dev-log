// logController.js ke andar ka logic:
const Log = require('../models/Log'); // Model ko import karna

exports.createLog = async (req, res) => {
  try {
    // 1. User se data lena
    const { content, tags } = req.body;

    // 2. Pichla (Last) log dhoondna taaki streak check kar sakein
    // .sort({ createdAt: -1 }) se sabse latest entry sabse pehle aati hai
    const lastLog = await Log.findOne().sort({ createdAt: -1 });

    let streak = 1; // Default streak 1 rakhenge

    if (lastLog) {
      const today = new Date();
      const lastDate = new Date(lastLog.createdAt);

      // Dono dates ka time 00:00:00 kar dete hain taaki sirf "Day" compare ho
      today.setHours(0, 0, 0, 0);
      lastDate.setHours(0, 0, 0, 0);

      // Dates ke beech ka difference nikalna (Milliseconds mein hota hai)
      const diffTime = today - lastDate;
      const diffInDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffInDays === 1) {
        // Agar pichla log kal tha, toh streak badhao
        streak = lastLog.streakCount + 1;
      } else if (diffInDays === 0) {
        // Agar aaj hi pehle log kar chuke ho, toh wahi streak rehne do
        streak = lastLog.streakCount;
      } else {
        // Agar 1 din se zyada ka gap hai, toh streak reset kar do
        streak = 1;
      }
    }

    // 3. Database mein naya log save karna (Streak ke saath)
    const newLog = await Log.create({
      content,
      tags,
      streakCount: streak
    });

    // 4. Response wapas bhejna
    res.status(201).json({
      success: true,
      message: `Streak: ${streak} days!`,
      data: newLog
    });

  } catch (error) {
    // Error handling
    res.status(400).json({ success: false, message: error.message });
  }
};

// Saare logs ko fetch karne ke liye logic:
exports.getLogs = async (req, res) => {
  try {
    // 1. Database se saare logs mangwana
    // .sort({ createdAt: -1 }) ka matlab hai Newest First
    const logs = await Log.find().sort({ createdAt: -1 });

    // 2. Response bhejna
    res.status(200).json({
      success: true,
      count: logs.length, // Total kitne logs hain
      data: logs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Data fetch nahi ho paya!"
    });
  }
};  