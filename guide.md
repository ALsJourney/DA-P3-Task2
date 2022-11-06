# Doge academy - Phase 3 - Task2

## Task 2

## Goal

Our endgoal is to create a simple NextJS application with TailwindCSS which will use the wallet-adapter and the solana-web3.js library to connect to the Solana network and send a transaction to the blockchain changing the trait types using a form with any wallet, in this example we will focus on the Phantom Wallet.

## Requirements

- Have a basic understanding of ReactJS and NextJS.
- https://scrimba.com/learn/learnreact
- https://reactjs.org/
- https://nextjs.org/
- Have a basic understanding of the Solana network.
- https://2501babe.github.io/posts/solana101.html
- https://solana.com/solana-whitepaper.pdf
- Have a basic understanding of the Solana Web3 library.
- https://medium.com/@lianxiongdi/solana-web3-tutorial-1-installation-and-account-operations-ca60a828a4ca
- https://docs.solana.com/de/developing/clients/javascript-api
- Have a basic understanding of the Wallet Adapter library.
- https://github.com/solana-labs/wallet-adapter
- Have a basic understanding of the Metaplex library.
- https://docs.metaplex.com/programs/token-metadata/getting-started
- Must have a Phantom Wallet installed.
- https://phantom.app/

  - don't forget to switch to Devnet

- Must have knowledge of the Solana CLI
- Must know GIT and how to use it.
- Must know how to use the terminal.
- Must know how to use TailwindCSS.

### 1. Fork the repository

https://github.com/Doge-Capital/DA-P3-Task2

### 2. Clone the repository using the terminal

```bash
git clone
```

### 3. Create a new NextJS application with TailwindCSS and Typescript

```bash
npx create-next-app@latest --typescript
```

https://nextjs.org/docs/api-reference/create-next-app

Follow the instructions here to install TailwindCSS into your NextJS application.
https://tailwindcss.com/docs/guides/nextjs

### 4. Install the dependencies, you can use either yarn or npm

```bash
yarn install
```

```bash
npm install
```

### 5. Try out your application

```bash
yarn dev
```

```bash
npm run dev
```

### 6. Help: Here are the packages with the required version for this project

Sometimes the dependencies don't work and create strange bugs. Here is a reference to all the versions we can use.

```json
// Package.json
{
  "name": "p3-task2",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@metaplex-foundation/js": "^0.15.0",
    "@solana-mobile/wallet-adapter-mobile": "^0.9.0",
    "@solana/spl-token": "^0.3.4",
    "@solana/wallet-adapter-base": "^0.9.15",
    "@solana/wallet-adapter-react": "^0.15.17",
    "@solana/wallet-adapter-react-ui": "^0.9.15",
    "@solana/wallet-adapter-wallets": "^0.18.4",
    "@solana/web3.js": "^1.53.0",
    "next": "12.2.5",
    "react": "^18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@types/node": "18.7.13",
    "@types/react": "18.0.17",
    "@types/react-dom": "18.0.6",
    "autoprefixer": "^10.4.8",
    "eslint": "8.22.0",
    "eslint-config-next": "12.2.5",
    "postcss": "^8.4.16",
    "tailwindcss": "^3.1.8",
    "typescript": "4.7.4"
  }
}
```

## Additional Tips

- Create new NFTs using the Solana CLI, that is the only way you have rights to mutate the traits of an existing nft.
