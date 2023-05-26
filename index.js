const express = require('express');
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({ intents:[IntentsBitField.Flags.GuildMembers]});

const app = express();
const port = 3000;

client.login('YOUR_TOKEN_HERE');

console.log('Connected to Discord API')

app.get('/:userid', async (req, res) => {
  const userId = req.params.userid;

  try {
    const user = await client.users.fetch(userId);

    res.send(user.tag);
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('IP: ' + clientIp + ' | ' + user.tag );

  } catch (error) {
    
    res.send('No User found');
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
