const handler = async (m, { client }) => {
  const { from, sender } = m;
  const { pushname, verifiedName, name } = sender || {};

  const displayName = pushname || verifiedName || name || from.replace('@c.us', '');

  const timestamp = new Date().toLocaleString(); // Agregar timestamp actual

  console.log(`\n[${timestamp}] 📩 Nuevo mensaje de ${displayName} (${from.replace('@c.us', '')}):`); // Incluir timestamp
  console.log(`📥 ${m.body}`);
};

handler.tags = ['terminal'];
handler.command = null;

module.exports = handler;
