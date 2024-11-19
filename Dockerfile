FROM node:18-alpine AS base
RUN mkdir /app
RUN apk add --no-cache libc6-compat



WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Define environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Define build-time arguments and assign them to environment variables
ARG NEXT_PUBLIC_BASE_API
ENV NEXT_PUBLIC_BASE_API=$NEXT_PUBLIC_BASE_API


RUN npm run build
EXPOSE 3000
ENV PORT 3000
CMD ["npm","start"]