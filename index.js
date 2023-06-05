const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const wikipediaHandler = require('./complementos/wikipedia');
const terminalHandler = require('./complementos/terminal');

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "Sofia" // Un identificador
  }),
  puppeteer: {
    args: [
      "--no-sandbox",
    ],
  },
});

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('Cargando...');
});

client.on('ready', () => {
  console.log('✅ CONECTADO AL WHATSAPP');
});

client.on('message', async (message) => {
  try {
    if (message.body === 'creador') {
      // Get media from URL
      const media = await MessageMedia.fromUrl(
        'https://media.discordapp.net/attachments/1102448933608886293/1111892241359851520/My_project-1.png'
      );

      // Replying with media
      client.sendMessage(message.from, media, {
        caption: '*Equipo de desarrollo Version Beta: 1.0.2*',
      });
    } else if (message.body.startsWith('wiki')) {
      // Handle Wikipedia command
      wikipediaHandler(client, message);
    }
  } catch (error) {
    console.error('❌ Error en el complemento:', error);
  }
});

const gradient = require('gradient-string');

console.log(
  gradient('white', 'red')(`
  ✅ Iniciando...
  ╦ ╦╦╦╔═╦  ╔╗ ╔═╗╔╦╗  ╔╦╗╔╦╗
  ║║║║╠╩╗║  ╠╩╗║ ║ ║   ║║║ ║║
  ╚╩╝╩╩ ╩╩  ╚═╝╚═╝ ╩   ╩ ╩═╩╝
              'WikiBot' By Albertin#8802
				Hosting: boxmineworld.com
          `)
);

client.on('message', (message) => {
  try {
    terminalHandler(message, { client });
  } catch (error) {
    console.error('❌ Error en el complemento:', error);
  }
});
