const pool = require('../db');

// Get bug history
exports.getBugHistory = async (req, res) => {
  try {
    const sql = `
      SELECT b.id, m.name AS module, b.severity, b.status, b.created_at
      FROM bugs b
      JOIN modules m ON b.module_id = m.id
      ORDER BY b.created_at DESC;
    `;
    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching bug history' });
  }
};

// Get AI insights (rule-based for now)
exports.getInsights = async (req, res) => {
  try {
    const sql = `
      SELECT m.name, b.severity, COUNT(*) as bug_count
      FROM bugs b
      JOIN modules m ON b.module_id = m.id
      GROUP BY m.name, b.severity;
    `;
    const result = await pool.query(sql);

    // Simple risk analysis
    const insights = result.rows.map(r => {
      let risk = 'Low';
      if (r.severity === 'Critical' && r.bug_count > 2) {
        risk = 'High';
      } else if (r.severity === 'High') {
        risk = 'Medium';
      }

      return {
        module: r.name,
        severity: r.severity,
        bug_count: r.bug_count,
        risk
      };
    });

    res.json({ insights });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generating insights' });
  }
};
