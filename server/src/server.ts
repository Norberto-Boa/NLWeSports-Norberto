import express from 'express';
import cors from 'cors'

import { PrismaClient } from '@prisma/client';
import { convertHourToMinutes } from './utils/convert-hour-string-to-minute';
import { convertMinuteToHours } from './utils/convert-minutes-to-hours';

const app = express();

app.use(express.json());

app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
});

app.get('/games', async (req, res, next) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });

  return res.status(200).json(games);
});

app.get('/ads', (req, res, next) => {
  return res.status(200).json([]);
});

app.get('/games/:id/ads', async (req, res, next) => {
  const gameId = req.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,

    },
    where: {
      gameId: gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })


  return res.status(200).json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinuteToHours(ad.hourStart),
      hourEnd: convertMinuteToHours(ad.hourEnd),
    }
  }));
});
app.post('/games/:id/ads', async (req, res, next) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourToMinutes(body.hourStart),
      hourEnd: convertHourToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,  
    }
  })

  return res.status(200).json(ad);
});

app.get('/ads/:id/discord', async (req, res, next) => {
  const adId = req.params.id

  const discord = await prisma.ad.findUniqueOrThrow({
    where: {
      id: adId
    },
    select: {
      discord: true
    }
  })

  return res.json({
    discord: discord.discord
  })
})


app.listen(4444) 