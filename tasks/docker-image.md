- Docker Image

- Understand container networking, environment variables, volumes, health checks.

Docker Network
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Next.js              Express                     │
│   :3000  ────────────> :4000                       │
│                           │                         │
│                    ┌──────┴──────┐                 │
│                    ▼             ▼                 │
│                  Redis         MongoDB              │
│                  :6379         :27017               │
│                                                     │
└─────────────────────────────────────────────────────┘

| Concept                   | Question it answers                             |
| ------------------------- | ----------------------------------------------- |
| **Networking**            | How do containers talk to each other?           |
| **Environment variables** | How does my app know where services/config are? |
| **Volumes**               | How do I keep data when a container is removed? |
| **Health checks**         | How do I know a service is actually ready?      |


A container can reach another container using the service name as the hostname.


2. Environment Variables

const redis = new Redis('redis://redis:6379');

This works locally in Docker.

But what happens in production?

Maybe your Redis becomes:

my-redis-prod.amazonaws.com

You don't want to change your source code every time you deploy.

Instead:

const redis = new Redis(process.env.REDIS_URL);

Then configure:

REDIS_URL=redis://redis:6379

locally.

Production could have:

REDIS_URL=rediss://my-production-redis.amazonaws.com:6379


For sensitive information:

MONGODB_PASSWORD=super-secret-password

you generally don't commit .env to Git.

Add it to:

.gitignore
.env

In production, you'd generally use a proper secret/configuration system rather than committing secrets into your project.


3. Volumes

This one is extremely important when you use MongoDB.

MongoDB stores its data inside the container.

Now:

docker rm mongodb

💥 The container is gone.

Without persistent storage, your database data can be lost along with it.

That's where volumes come in.

Think:

Container
┌──────────────────────┐
│ MongoDB              │
│                      │
│ /data/db             │
└──────────┬───────────┘
           │
           │ volume
           ▼
      Docker Volume
      ┌─────────────┐
      │ Mongo data  │
      └─────────────┘

The container can be deleted:

MongoDB container
       ↓
     deleted

but:

Docker volume
       ↓
     remains

Then you create a new MongoDB container and attach the same volume.

Your data is still there.


Compose:

services:

  mongodb:
    image: mongo:latest
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:

  This:

mongo-data:/data/db

means:

Docker volume: mongo-data
        ↓
Container path: /data/db

MongoDB writes to:

/data/db

and Docker persists that data in the volume.

You can see your volumes:

docker volume ls

And:

docker volume inspect mongo-data


4. Health Checks

