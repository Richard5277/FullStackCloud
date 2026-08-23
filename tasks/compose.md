- commands

prod
docker-compose -f docker-compose.prod.yml up --build

dev
docker-compose -f docker-compose.yml up --build




shutdown
docker-compose down
docker volume rm fullstackcloud_xshop-node-modules
docker-compose up --build


docker-compose -f docker-compose.yml down
docker volume prune
docker-compose -f docker-compose.yml up --build


What you should be able to explain in an interview

If they ask "How do your containers communicate?"

Docker Compose creates a network, and services can communicate using service names such as redis:6379 and mongodb:27017.

If they ask "How do you configure different environments?"

I use environment variables rather than hardcoding service URLs, credentials, and configuration.

If they ask "How do you persist MongoDB data?"

I use a Docker named volume mounted to MongoDB's /data/db, so the data survives container recreation.

If they ask "How do you handle startup dependencies?"

I use health checks to determine when dependencies are actually ready, and configure dependent services to wait for healthy dependencies.

And this maps directly to EKS

This is why I recommended learning these before jumping into EKS.

The concepts translate:

Docker Compose                  Kubernetes / EKS

service                    →    Deployment / Pod
network                    →    Kubernetes Service / DNS
environment               →    ConfigMap / Secret
volume                     →    PersistentVolume
healthcheck               →    liveness/readiness probes

So when you understand these four Docker concepts, you're already building the foundation for the EKS portion of your interview.