const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const wikipediaHandler = require('./complementos/wikipedia');

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  if (message.body === 'creador') {
    // Get media from URL
    const media = await MessageMedia.fromUrl(
      'https://media.discordapp.net/attachments/1102448933608886293/1111892241359851520/My_project-1.png'
    );

    // Replying with media
    client.sendMessage(message.from, media, {
      caption: '*Equipo de desarrollo Version Beta: 1.0.1*',
    });
  } else if (message.body.startsWith('wiki')) {
    // Handle Wikipedia command
    wikipediaHandler(client, message);
  }
});
