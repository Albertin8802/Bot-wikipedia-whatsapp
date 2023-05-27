const axios = require('axios');
const cheerio = require('cheerio');

async function fetchWikipedia(query) {
  try {
    const response = await axios.get(`https://es.wikipedia.org/wiki/${query}`); // https://es.wikipedia.org/wiki/cesar_vallejo
    const $ = cheerio.load(response.data);
    const title = $('#firstHeading').text().trim();
    const thumbnail = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`;
    const content = [];
    $('#mw-content-text > div.mw-parser-output').each(function (index, element) {
      const description = $(element).find('p').text().trim();
      content.push(description);
    });

    const data = {
      status: response.status,
      result: {
        title: title,
        thumbnail: 'https:' + thumbnail,
        content: content.join('\n\n'),
      },
    };

    return data;
  } catch (error) {
    const notFound = {
      status: error.response ? error.response.status : 500,
      message: error.message,
    };
    throw notFound;
  }
}

function wikipediaHandler(client, message) {
  const query = message.body.split(' ')[1];
  if (!query) {
    client.sendMessage(message.from, `*[❗️𝐈𝐍𝐅𝐎❗️] 𝙴𝚂𝚃𝙰𝚂 𝚄𝚂𝙰𝙽𝙳𝙾 𝙼𝙰𝙻 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾!!*\n*𝚄𝚂𝙾 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾:*\n*wiki 𝚙𝚊𝚕𝚊𝚋𝚛𝚊 𝚌𝚕𝚊𝚟𝚎 𝚊 𝚋𝚞𝚜𝚌𝚊𝚛*\n\n*𝙴𝙹𝙴𝙼𝙿𝙻𝙾:*\n*wiki Estrellas*`);
    return;
  }

  fetchWikipedia(query)
    .then((result) => {
      client.sendMessage(message.from, `*𝙰𝚀𝚄𝙸 𝚃𝙸𝙴𝙽𝙴𝚂 𝙻𝙰 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝙲𝙸𝙾𝙽 𝙴𝙽𝙲𝙾𝙽𝚃𝚁𝙰𝙳𝙰 𝙳𝙴 ${query}*\n\n${result.result.content}`);
    })
    .catch((error) => {
      const errorMessage = error.status === 404 ? `*[❗️𝐈𝐍𝐅𝐎❗️] 𝙽𝙾 𝚂𝙴 𝙴𝙽𝙲𝙾𝙽𝚃𝚁𝙾 𝙽𝙸𝙽𝙶𝚄𝙽𝙰 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝙲𝙸𝙾𝙽, 𝙿𝚁𝚄𝙴𝙱𝙰 𝚀𝚄𝙴 𝙷𝙰𝚈𝙰𝚂 𝙴𝚂𝙲𝚁𝙸𝚃𝙾 𝚄𝙽𝙰 𝚂𝙾𝙻𝙰 𝙿𝙰𝙻𝙰𝙱𝚁𝙰 𝚈 𝙻𝙾 𝙷𝙰𝚈𝙰𝚂 𝙴𝚂𝙲𝚁𝙸𝚃𝙾 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙰𝙼𝙴𝙽𝚃𝙴*` : `*[❗️𝐈𝐍𝐅𝐎❗️] 𝙴𝚛𝚛𝚘𝚛 𝙴𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚍𝚘 𝚊𝚕 𝚘𝚋𝚝𝚎𝚗𝚎𝚛 𝚕𝚊 𝚌𝚘𝚗𝚜𝚞𝚕𝚝𝚊 𝚊 𝚕𝚊 𝚑𝚎𝚛𝚛𝚊𝚖𝚒𝚎𝚗𝚝𝚊.`;
      client.sendMessage(message.from, errorMessage);
    });
}

module.exports = wikipediaHandler;
