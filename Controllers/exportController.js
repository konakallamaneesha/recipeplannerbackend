// exportController neutralized because "Track my history" feature was removed
exports.recordExport = async (req, res) => {
  res.status(404).json({ error: 'exports API disabled' });
};
exports.getHistory = async (req, res) => {
  res.status(404).json({ error: 'exports API disabled' });
};
