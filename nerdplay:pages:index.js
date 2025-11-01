import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

export default function Home() {
  // Wallet Connect
  const [account, setAccount] = useState(null)
  async function connectWallet() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    setAccount(address)
  }

  // Dummy Data
  const features = [
    {
      title: "NFT Marketplace",
      desc: "Mint, buy, sell, and trade unique gaming NFTs.",
      color: "from-cyber to-electric",
    },
    {
      title: "Games Portal",
      desc: "Play card games, mini-games, fantasy sports, and more.",
      color: "from-electric to-neon",
    },
    {
      title: "Tournaments",
      desc: "Compete in live tournaments and climb the leaderboards.",
      color: "from-cyber to-neon",
    },
    {
      title: "Dashboard",
      desc: "Track your NFTs, tokens, achievements, and stats.",
      color: "from-electric to-cyber",
    },
  ]
  const nfts = [
    { name: "Epic Sword NFT", desc: "Level up your game with this rare NFT.", color: "bg-cyber" },
    { name: "Legendary Shield NFT", desc: "Defend your clan with style.", color: "bg-electric" },
    { name: "Mystic Potion NFT", desc: "Unlock secret powers.", color: "bg-neon" },
  ]
  const games = [
    { name: "Fantasy Battle", desc: "Join epic battles and win rewards.", color: "bg-electric" },
    { name: "Card Clash", desc: "Strategize and outplay your rivals.", color: "bg-cyber" },
    { name: "Sports Royale", desc: "Fantasy sports, real prizes.", color: "bg-neon" },
  ]
  const players = [
    { name: "PlayerOne", score: 1200 },
    { name: "GamerX", score: 1100 },
    { name: "CryptoChamp", score: 950 },
  ]

  return (
    <div>
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-charcoal shadow-lg">
        <div className="flex items-center">
          {/* Simple Logo */}
          <div className="h-10 w-10 rounded-full bg-electric flex items-center justify-center mr-3 drop-shadow-neon">
            <span className="text-charcoal text-2xl font-extrabold">N</span>
          </div>
          <span className="text-electric text-2xl font-bold">NerdPlay</span>
        </div>
        <ul className="flex space-x-8">
          <li className="text-white hover:text-electric transition">Home</li>
          <li className="text-white hover:text-electric transition">Marketplace</li>
          <li className="text-white hover:text-electric transition">Games</li>
          <li className="text-white hover:text-electric transition">Tournaments</li>
          <li className="text-white hover:text-electric transition">Dashboard</li>
        </ul>
        <div>
          {account ? (
            <span className="text-neon font-bold">Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
          ) : (
            <button
              className="bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-neon transition"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.h1
          className="text-5xl font-extrabold text-electric drop-shadow-neon mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to NerdPlay
        </motion.h1>
        <motion.p
          className="text-xl text-cyber mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The Next-Gen Gaming Universe. Play, Earn, Own.
        </motion.p>
        <motion.button
          className="px-8 py-4 bg-electric text-charcoal font-bold rounded-xl shadow-lg hover:bg-neon transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Get Started
        </motion.button>
        {/* 3D Animation */}
        <div className="mt-12 w-full h-96 flex items-center justify-center">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.7} />
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
              <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#00AEEF" emissive="#00FF88" emissiveIntensity={0.5} />
              </mesh>
            </Float>
            <OrbitControls enableZoom={false} />
            <Html center>
              <div className="text-cyber font-bold text-2xl">NerdPlay</div>
            </Html>
          </Canvas>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className={`rounded-2xl p-6 bg-gradient-to-br ${f.color} shadow-lg glassmorphism hover:scale-105 transition-transform duration-300`}
          >
            <h2 className="text-2xl font-bold mb-2">{f.title}</h2>
            <p className="text-white/80">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Marketplace Preview */}
      <section className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-electric mb-8">NFT Marketplace</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nfts.map((nft, i) => (
            <div key={i} className={`rounded-xl p-6 shadow-lg glassmorphism ${nft.color}`}>
              <div className="h-48 rounded-lg mb-4"></div>
              <h2 className="text-xl font-bold mb-2">{nft.name}</h2>
              <p className="text-white/70 mb-4">{nft.desc}</p>
              <button className="bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Buy Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Games Portal Preview */}
      <section className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-cyber mb-8">Games Portal</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((game, i) => (
            <div key={i} className={`rounded-xl p-6 shadow-lg glassmorphism ${game.color}`}>
              <div className="h-48 rounded-lg mb-4"></div>
              <h2 className="text-xl font-bold mb-2">{game.name}</h2>
              <p className="text-white/70 mb-4">{game.desc}</p>
              <button className="bg-cyber text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Play Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-cyber mb-6">Leaderboard</h2>
        <div className="bg-gradient-to-br from-cyber to-electric rounded-xl p-6 shadow-lg">
          <ul>
            {players.map((p, i) => (
              <li key={i} className="flex justify-between py-2 text-lg font-bold text-white">
                <span>{i + 1}. {p.name}</span>
                <span className="text-neon">{p.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-white/60 bg-charcoal border-t border-electric mt-12">
        &copy; {new Date().getFullYear()} NerdPlay. All rights reserved.
      </footer>
    </div>
  )
}

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

export default function Home() {
  // Wallet Connect
  const [account, setAccount] = useState(null)
  async function connectWallet() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    setAccount(address)
  }

  // Dummy Data
  const features = [
    { title: "NFT Marketplace", desc: "Mint, buy, sell, and trade unique gaming NFTs.", color: "from-cyber to-electric" },
    { title: "Games Portal", desc: "Play card games, mini-games, fantasy sports, and more.", color: "from-electric to-neon" },
    { title: "Tournaments", desc: "Compete in live tournaments and climb the leaderboards.", color: "from-cyber to-neon" },
    { title: "Dashboard", desc: "Track your NFTs, tokens, achievements, and stats.", color: "from-electric to-cyber" },
  ]
 const nfts = [
    { name: "Epic Sword NFT", desc: "Level up your game with this rare NFT.", color: "bg-cyber" },
    { name: "Legendary Shield NFT", desc: "Defend your clan with style.", color: "bg-electric" },
    { name: "Mystic Potion NFT", desc: "Unlock secret powers.", color: "bg-neon" },
  ]
  const games = [
    { name: "Fantasy Battle", desc: "Join epic battles and win rewards.", color: "bg-electric" },
    { name: "Card Clash", desc: "Strategize and outplay your rivals.", color: "bg-cyber" },
    { name: "Sports Royale", desc: "Fantasy sports, real prizes.", color: "bg-neon" },
  ]
  const players = [
    { name: "PlayerOne", score: 1200 },
    { name: "GamerX", score: 1100 },
    { name: "CryptoChamp", score: 950 },
  ]
  const tournaments = [
    { name: "Monthly Showdown", prize: "1 ETH + Rare NFT", status: "Live" },
    { name: "Weekly Clash", prize: "0.5 ETH + Badge", status: "Upcoming" },
    { name: "Daily Sprint", prize: "Exclusive NFT", status: "Completed" },
  ]
  const achievements = [
    { name: "NFT Collector", desc: "Own 10+ NFTs", icon: "🪙", color: "bg-neon" },
    { name: "Tournament Winner", desc: "Win 3 tournaments", icon: "🏆", color: "bg-cyber" },
    { name: "Early Adopter", desc: "Joined in 2025", icon: "🚀", color: "bg-electric" },
  ]
  const users = [
    { name: "Admin", role: "Super Admin", email: "admin@nerdplay.com" },
    { name: "PlayerOne", role: "User", email: "playerone@nerdplay.com" },
    { name: "GamerX", role: "User", email: "gamerx@nerdplay.com" },
  ]

  return (
    <div className="min-h-screen bg-charcoal text-white">
      {/* Navbar */}
      <nav className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 bg-charcoal shadow-lg">
        <div className="flex items-center mb-2 md:mb-0">
          {/* Simple Logo */}
          <div className="h-10 w-10 rounded-full bg-electric flex items-center justify-center mr-3 drop-shadow-neon">
            <span className="text-charcoal text-2xl font-extrabold">N</span>
          </div>
          <span className="text-electric text-2xl font-bold">NerdPlay</span>
        </div>
        <ul className="flex flex-wrap space-x-4 md:space-x-8 text-base">
          <li className="hover:text-electric transition">Home</li>
          <li className="hover:text-electric transition">Marketplace</li>
          <li className="hover:text-electric transition">Games</li>
          <li className="hover:text-electric transition">Tournaments</li>
          <li className="hover:text-electric transition">Dashboard</li>
        </ul>
        <div className="mt-2 md:mt-0">
          {account ? (
            <span className="text-neon font-bold">Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
          ) : (
            <button
              className="bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-neon transition"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-electric drop-shadow-neon mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to NerdPlay
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-cyber mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The Next-Gen Gaming Universe. Play, Earn, Own.
        </motion.p>
        <motion.button
          className="px-8 py-4 bg-electric text-charcoal font-bold rounded-xl shadow-lg hover:bg-neon transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
Get Started
        </motion.button>
        {/* 3D Animation */}
        <div className="mt-12 w-full h-64 md:h-96 flex items-center justify-center">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.7} />
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
              <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#00AEEF" emissive="#00FF88" emissiveIntensity={0.5} />
              </mesh>
            </Float>
            <OrbitControls enableZoom={false} />
            <Html center>
              <div className="text-cyber font-bold text-2xl">NerdPlay</div>
            </Html>
          </Canvas>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className={`rounded-2xl p-6 bg-gradient-to-br ${f.color} shadow-lg glassmorphism hover:scale-105 transition-transform duration-300`}
          >
<h2 className="text-2xl font-bold mb-2">{f.title}</h2>
            <p className="text-white/80">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Marketplace Preview */}
      <section className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-electric mb-8">NFT Marketplace</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nfts.map((nft, i) => (
            <div key={i} className={`rounded-xl p-6 shadow-lg glassmorphism ${nft.color}`}>
              <div className="h-48 rounded-lg mb-4"></div>
              <h2 className="text-xl font-bold mb-2">{nft.name}</h2>
              <p className="text-white/70 mb-4">{nft.desc}</p>
              <button className="bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Buy Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Games Portal Preview */}
      <section className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-cyber mb-8">Games Portal</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((game, i) => (
            <div key={i} className={`rounded-xl p-6 shadow-lg glassmorphism ${game.color}`}>
              <div className="h-48 rounded-lg mb-4"></div>
              <h2 className="text-xl font-bold mb-2">{game.name}</h2>
              <p className="text-white/70 mb-4">{game.desc}</p>
              <button className="bg-cyber text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Play Now</button>
            </div>
          ))}
        </div>
      </section>


      {/* Tournaments Section */}
      <section className="max-w-5xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-neon mb-8">Tournaments</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tournaments.map((t, i) => (
            <div key={i} className="rounded-xl p-6 shadow-lg glassmorphism bg-gradient-to-br from-cyber to-electric">
              <h2 className="text-xl font-bold mb-2">{t.name}</h2>
              <p className="text-white/80 mb-2">Prize: <span className="text-neon font-bold">{t.prize}</span></p>
              <span className={`px-3 py-1 rounded-full font-bold ${t.status === "Live" ? "bg-neon text-charcoal" : t.status === "Upcoming" ? "bg-electric text-charcoal" : "bg-cyber text-white"}`}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-cyber mb-6">Leaderboard</h2>
 <div className="bg-gradient-to-br from-cyber to-electric rounded-xl p-6 shadow-lg">
          <ul>
            {players.map((p, i) => (
              <li key={i} className="flex justify-between py-2 text-lg font-bold text-white">
                <span>{i + 1}. {p.name}</span>
                <span className="text-neon">{p.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-electric mb-8">Your Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
            <h2 className="text-xl font-bold mb-2">NFTs Owned</h2>
            <p className="text-3xl text-neon font-bold">12</p>
          </div>
          <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
            <h2 className="text-xl font-bold mb-2">Tournaments Won</h2>
            <p className="text-3xl text-cyber font-bold">3</p>
          </div>
        </div>
        {/* Achievements/Badges */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <div key={i} className={`rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center ${a.color}`}>
              <span className="text-4xl mb-2">{a.icon}</span>
              <h3 className="text-lg font-bold mb-1">{a.name}</h3>
              <p className="text-white/70">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>
   {/* Social Chat & Links */}
      <section className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold text-cyber mb-6">Join the Community</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="bg-cyber px-6 py-3 rounded-xl font-bold text-white hover:bg-electric transition">Discord</a>
          <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="bg-neon px-6 py-3 rounded-xl font-bold text-charcoal hover:bg-electric transition">Telegram</a>
        </div>
        <div className="mt-6 text-white/70">Chat, share, and win rewards with other gamers!</div>
      </section>

      {/* Admin Panel Preview */}
      <section className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-electric mb-6">Admin Panel</h1>
        <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 text-neon">Name</th>
                <th className="py-2 text-cyber">Role</th>
                <th className="py-2 text-electric">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} className="border-b border-cyber">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.role}</td>
                  <td className="py-2">{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-white/60 bg-charcoal border-t border-electric mt-12">
        &copy; {new Date().getFullYear()} NerdPlay. All rights reserved.
      </footer>
    </div>
  )
}

{/* NFT Minting Preview */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Mint Your NFT</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col md:flex-row items-center gap-8">
    <div className="flex-1">
      <div className="h-40 w-40 bg-gradient-to-br from-electric to-cyber rounded-2xl flex items-center justify-center text-5xl font-bold text-white mb-4">
        🎮
      </div>
      <h2 className="text-xl font-bold mb-2">Create a Custom Game NFT</h2>
      <p className="text-white/70 mb-4">Show off your style and own a piece of NerdPlay!</p>
    </div>
    <div className="flex-1">
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="NFT Name" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" />
        <input type="text" placeholder="Description" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" />
        <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Mint NFT</button>
      </form>
    </div>
  </div>
</section>

{/* Real-Time Chat UI */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Live Chat</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <div className="h-64 overflow-y-auto mb-4 flex flex-col gap-2">
      <div className="bg-electric px-4 py-2 rounded-lg text-charcoal font-bold self-start">PlayerOne: GG!</div>
      <div className="bg-cyber px-4 py-2 rounded-lg text-white font-bold self-end">GamerX: Well played!</div>
      <div className="bg-neon px-4 py-2 rounded-lg text-charcoal font-bold self-start">CryptoChamp: Who's up for a tournament?</div>
    </div>
    <form className="flex gap-2">
      <input type="text" placeholder="Type your message..." className="flex-1 px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" />
      <button className="bg-electric text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Send</button>
    </form>
  </div>
</section>

{/* Referral & Affiliate System */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Invite & Earn</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
    <p className="text-white/80 mb-4">Share your referral link and earn rewards for every friend who joins NerdPlay!</p>
    <div className="flex gap-2 mb-4">
      <input type="text" value="https://nerdplay.com/ref/yourcode" readOnly className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white w-64" />
      <button className="bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Copy Link</button>
    </div>
    <div className="text-cyber font-bold">Total Referrals: <span className="text-neon">7</span></div>
    <div className="mt-2 text-electric font-bold">Rewards Earned: <span className="text-neon">0.2 ETH</span></div>
  </div>
</section>


{/* DAO Governance Voting UI */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">DAO Governance</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <h2 className="text-xl font-bold mb-2">Vote on the Next Game Feature</h2>
    <form className="flex flex-col gap-4">
      <label className="flex items-center gap-2">
        <input type="radio" name="vote" className="accent-neon" />
        Add Battle Royale Mode
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="vote" className="accent-neon" />
        Launch NFT Staking
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="vote" className="accent-neon" />
        Integrate AI Opponents
      </label>
      <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition mt-4">Submit Vote</button>
    </form>
    <div className="mt-4 text-white/70">Voting ends in <span className="text-neon font-bold">2 days</span></div>
  </div>
</section>


{/* AI-Powered Recommendations */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Recommended For You</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="rounded-xl p-6 shadow-lg glassmorphism bg-cyber">
      <h2 className="text-xl font-bold mb-2">Try "Card Clash"</h2>
      <p className="text-white/70 mb-2">Based on your recent wins!</p>
      <button className="bg-neon text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-electric transition">Play Now</button>
    </div>
    <div className="rounded-xl p-6 shadow-lg glassmorphism bg-electric">
      <h2 className="text-xl font-bold mb-2">Mint "Epic Sword NFT"</h2>
      <p className="text-white/70 mb-2">You love rare items!</p>
      <button className="bg-cyber text-white px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Mint Now</button>
    </div>
    <div className="rounded-xl p-6 shadow-lg glassmorphism bg-neon">
      <h2 className="text-xl font-bold mb-2">Join "Monthly Showdown"</h2>
      <p className="text-charcoal mb-2">Top tournament for your skill level.</p>
      <button className="bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-cyber transition">Join</button>
    </div>
  </div>
</section>


{/* Mobile/PWA Install Banner */}
<section className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
  <div className="bg-electric text-charcoal px-6 py-3 rounded-xl shadow-lg flex items-center gap-4">
    <span className="font-bold">Install NerdPlay App for the best experience!</span>
    <button className="bg-neon text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-cyber transition">Install</button>
  </div>
</section>

{/* Animated Confetti (simple emoji version) */}
<div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none text-5xl animate-bounce">
  🎉🎊🏆
</div>

{/* User Profile Section */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Your Profile</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col md:flex-row items-center gap-8">
    <div className="flex flex-col items-center">
      <div className="h-32 w-32 rounded-full bg-gradient-to-br from-electric to-cyber flex items-center justify-center text-5xl font-bold text-white mb-4">
        <span role="img" aria-label="avatar">🧑‍🚀</span>
      </div>
      <button className="bg-neon text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-electric transition">Upload Avatar</button>
    </div>
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-2">PlayerOne</h2>
      <p className="text-white/70 mb-2">playerone@nerdplay.com</p>
      <div className="flex gap-4">
        <span className="bg-cyber px-3 py-1 rounded-full font-bold">Level 12</span>
  <span className="bg-neon px-3 py-1 rounded-full font-bold text-charcoal">Clan: Alpha</span>
      </div>
    </div>
  </div>
</section>


{/* Achievements Progress Bars */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Achievements Progress</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-bold text-neon">NFT Collector</span>
        <span className="font-bold text-white">8/10</span>
      </div>
      <div className="w-full bg-cyber rounded-full h-4">
        <div className="bg-neon h-4 rounded-full" style={{ width: '80%' }}></div>
      </div>
    </div>
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-bold text-electric">Tournament Winner</span>
        <span className="font-bold text-white">2/3</span>
      </div>
      <div className="w-full bg-electric rounded-full h-4">
        <div className="bg-cyber h-4 rounded-full" style={{ width: '66%' }}></div>
      </div>
    </div>
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-bold text-cyber">Early Adopter</span>
        <span className="font-bold text-white">1/1</span>
      </div>
      <div className="w-full bg-cyber rounded-full h-4">
        <div className="bg-neon h-4 rounded-full" style={{ width: '100%' }}></div>
      </div>
    </div>
  </div>
</section>

{/* Staking & Rewards UI */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Staking & Rewards</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col md:flex-row items-center gap-8">
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-2">Stake Your Tokens</h2>
      <p className="text-white/70 mb-4">Earn rewards by staking your NerdPlay tokens.</p>
      <form className="flex gap-2">
        <input type="number" placeholder="Amount" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white w-32" />
        <button className="bg-electric text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Stake</button>

   </form>
    </div>
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-2">Rewards</h2>
      <div className="text-cyber font-bold mb-2">Current APY: <span className="text-neon">12%</span></div>
      <div className="text-electric font-bold">Total Earned: <span className="text-neon">0.5 ETH</span></div>
    </div>
  </div>
</section>

{/* Animated Badges */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Your Badges</h1>
  <div className="flex gap-6 flex-wrap justify-center">
    <div className="bg-neon px-6 py-4 rounded-xl font-bold text-charcoal text-2xl animate-bounce">🏆 Winner</div>
    <div className="bg-cyber px-6 py-4 rounded-xl font-bold text-white text-2xl animate-pulse">🪙 Collector</div>
    <div className="bg-electric px-6 py-4 rounded-xl font-bold text-white text-2xl animate-spin">🚀 Early</div>
  </div>
</section>

{/* Notifications Center */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Notifications</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <ul className="space-y-4">
      <li className="bg-neon px-4 py-2 rounded-lg text-charcoal font-bold">🎉 You won the Monthly Showdown!</li>
      <li className="bg-cyber px-4 py-2 rounded-lg text-white font-bold">🪙 New NFT minted: Epic Sword</li>
      <li className="bg-electric px-4 py-2 rounded-lg text-white font-bold">🚀 Welcome to NerdPlay!</li>
    </ul>
  </div>
</section>

{/* Settings Panel */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Settings</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <form className="flex flex-col gap-4">
      <label>
        <span className="font-bold text-cyber">Email Notifications</span>
        <input type="checkbox" className="ml-2 accent-neon" defaultChecked />
      </label>
      <label>
        <span className="font-bold text-electric">Dark Mode</span>
        <input type="checkbox" className="ml-2 accent-cyber" defaultChecked />
      </label>
      <label>
        <span className="font-bold text-neon">Show Achievements</span>
        <input type="checkbox" className="ml-2 accent-electric" defaultChecked />
      </label>
      <button className="bg-cyber text-white px-6 py-2 rounded-lg font-bold hover:bg-neon transition mt-4">Save Settings</button>
    </form>
  </div>
</section>

{/* Multi-chain Wallet Connect UI */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Connect Your Wallet</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex gap-6 flex-wrap justify-center">
    <button className="bg-electric text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-neon transition">MetaMask</button>
    <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-cyber transition">WalletConnect</button>
    <button className="bg-cyber text-white px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Coinbase Wallet</button>
    <button className="bg-electric text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Phantom (Solana)</button>
  </div>
</section>

{/* Live Tournament Countdown */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Next Tournament Starts In:</h1>
  <div className="bg-gradient-to-br from-cyber to-electric rounded-xl p-6 shadow-lg flex flex-col items-center">
    <div className="text-5xl font-bold text-white mb-4 animate-pulse">02:14:36</div>
    <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Join Now</button>
  </div>
</section>

{/* FAQ/Help Center */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">FAQ & Help Center</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <details className="mb-4">
      <summary className="font-bold text-neon cursor-pointer">How do I mint an NFT?</summary>
      <div className="text-white/70 mt-2">Go to the NFT Marketplace, fill in the details, and click "Mint NFT".</div>
    </details>
    <details className="mb-4">
      <summary className="font-bold text-electric cursor-pointer">How do I join tournaments?</summary>
      <div className="text-white/70 mt-2">Visit the Tournaments section and click "Join Now" on any live event.</div>
    </details>
    <details>
      <summary className="font-bold text-cyber cursor-pointer">How do I connect my wallet?</summary>
      <div className="text-white/70 mt-2">Click "Connect Wallet" in the navbar or wallet section and choose your provider.</div>
    </details>
  </div>
</section>

{/* Contact Form */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Contact Us</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <form className="flex flex-col gap-4">
      <input type="text" placeholder="Your Name" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" />
      <input type="email" placeholder="Your Email" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" />
      <textarea placeholder="Your Message" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" rows={4}></textarea>
      <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Send Message</button>
    </form>
  </div>
</section>

{/* User Activity Feed */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Activity Feed</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <ul className="space-y-4">
      <li className="flex items-center gap-3">
        <span className="text-2xl">🏆</span>
        <span className="text-white/80">You won <span className="text-neon font-bold">Monthly Showdown</span>!</span>
        <span className="ml-auto text-xs text-cyber">2h ago</span>
      </li>
      <li className="flex items-center gap-3">
        <span className="text-2xl">🪙</span>
        <span className="text-white/80">Minted <span className="text-electric font-bold">Epic Sword NFT</span></span>
        <span className="ml-auto text-xs text-cyber">5h ago</span>
      </li>
      <li className="flex items-center gap-3">
        <span className="text-2xl">🤝</span>
        <span className="text-white/80">Invited <span className="text-neon font-bold">GamerX</span> to NerdPlay</span>
        <span className="ml-auto text-xs text-cyber">1d ago</span>
      </li>
    </ul>
  </div>
</section>

{/* In-App Notifications (Toast) */}
<div className="fixed top-6 right-6 z-50">
  <div className="bg-neon text-charcoal px-6 py-3 rounded-xl shadow-lg font-bold mb-2 animate-bounce">
    🎉 You earned a new badge!
  </div>
  <div className="bg-cyber text-white px-6 py-3 rounded-xl shadow-lg font-bold mb-2 animate-pulse">
    🪙 NFT minted successfully!
  </div>
</div>

{/* Game Achievements Modal */}
<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
  <div className="bg-charcoal rounded-2xl p-8 shadow-2xl glassmorphism max-w-md w-full text-center">
    <h2 className="text-2xl font-bold text-neon mb-4">Congratulations!</h2>
    <div className="text-5xl mb-4 animate-bounce">🏆</div>
    <p className="text-white/80 mb-4">You unlocked the <span className="text-cyber font-bold">Tournament Winner</span> achievement!</p>
    <button className="bg-electric text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Close</button>
  </div>
</div>

{/* Animated Progress Circles */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Your Progress</h1>
  <div className="flex gap-8 flex-wrap justify-center">
    <div className="flex flex-col items-center">
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="#00AEEF" strokeWidth="10" fill="none" />
        <circle cx="50" cy="50" r="40" stroke="#00FF88" strokeWidth="10" fill="none"
          strokeDasharray="251.2" strokeDashoffset="50" strokeLinecap="round" />
      </svg>
      <span className="text-neon font-bold mt-2">80% NFT Collector</span>
    </div>
    <div className="flex flex-col items-center">
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="#9D4EDD" strokeWidth="10" fill="none" />
        <circle cx="50" cy="50" r="40" stroke="#00AEEF" strokeWidth="10" fill="none"
          strokeDasharray="251.2" strokeDashoffset="84" strokeLinecap="round" />
      </svg>
      <span className="text-cyber font-bold mt-2">66% Tournament Winner</span>
    </div>
  </div>
</section>


{/* User Friends List */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Your Friends</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <ul className="flex gap-6 flex-wrap">
      <li className="flex flex-col items-center">
        <div className="h-16 w-16 rounded-full bg-neon flex items-center justify-center text-2xl font-bold text-charcoal mb-2">🧑‍🚀</div>
        <span className="text-white font-bold">GamerX</span>
      </li>
      <li className="flex flex-col items-center">
        <div className="h-16 w-16 rounded-full bg-cyber flex items-center justify-center text-2xl font-bold text-white mb-2">👾</div>
        <span className="text-white font-bold">CryptoChamp</span>
      </li>
      <li className="flex flex-col items-center">
        <div className="h-16 w-16 rounded-full bg-electric flex items-center justify-center text-2xl font-bold text-white mb-2">🦸‍♂️</div>
        <span className="text-white font-bold">PlayerOne</span>
      </li>
    </ul>
    <button className="mt-6 bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Add Friend</button>
  </div>
</section>

{/* Invite Friends Modal */}
<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
  <div className="bg-charcoal rounded-2xl p-8 shadow-2xl glassmorphism max-w-md w-full text-center">
    <h2 className="text-2xl font-bold text-neon mb-4">Invite a Friend</h2>
    <input type="email" placeholder="Friend's Email" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white w-full mb-4" />
    <button className="bg-electric text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Send Invite</button>
    <button className="mt-4 text-cyber underline">Cancel</button>
  </div>
</div>


{/* Theme Switcher */}
<div className="fixed top-6 left-6 z-50">
  <button className="bg-cyber text-white px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Switch Theme</button>
</div>

{/* User Security Settings */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Security Settings</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <form className="flex flex-col gap-4">
      <label>
        <span className="font-bold text-cyber">Change Password</span>
        <input type="password" placeholder="New Password" className="ml-2 px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white w-full" />
      </label>
      <label>
        <span className="font-bold text-electric">2FA Authentication</span>
        <input type="checkbox" className="ml-2 accent-neon" defaultChecked />
      </label>
      <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition mt-4">Save Security Settings</button>
    </form>
  </div>
</section>


{/* Transaction History Table */}
<section className="max-w-4xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Transaction History</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="py-2 text-neon">Date</th>
          <th className="py-2 text-cyber">Type</th>
          <th className="py-2 text-electric">Amount</th>
          <th className="py-2 text-white">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-cyber">
          <td className="py-2">2025-09-12</td>
          <td className="py-2">NFT Mint</td>
          <td className="py-2">0.05 ETH</td>
          <td className="py-2 text-neon">Success</td>
        </tr>
        <tr className="border-b border-cyber">
          <td className="py-2">2025-09-10</td>
          <td className="py-2">Tournament Win</td>
          <td className="py-2">1.00 ETH</td>
          <td className="py-2 text-neon">Success</td>
        </tr>
        <tr>
          <td className="py-2">2025-09-08</td>
          <td className="py-2">NFT Sale</td>
          <td className="py-2">0.15 ETH</td>
          <td className="py-2 text-neon">Success</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

{/* Footer with Social Links & Policies */}
<footer className="w-full py-8 text-center text-white/60 bg-charcoal border-t border-electric mt-12">
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-2">
    <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="text-cyber hover:text-neon font-bold">Discord</a>
    <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="text-neon hover:text-cyber font-bold">Telegram</a>
    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-electric hover:text-cyber font-bold">Twitter</a>
    <a href="/privacy" className="text-white/80 hover:text-neon font-bold">Privacy Policy</a>
    <a href="/terms" className="text-white/80 hover:text-cyber font-bold">Terms of Service</a>
  </div>
  &copy; {new Date().getFullYear()} NerdPlay. All rights reserved.
</footer>

{/* Analytics Dashboard */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Analytics Dashboard</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="flex flex-col items-center">
      <span className="text-5xl font-bold text-neon mb-2">12</span>
      <span className="text-white/80">NFTs Owned</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-5xl font-bold text-cyber mb-2">3</span>
      <span className="text-white/80">Tournaments Won</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-5xl font-bold text-electric mb-2">7</span>
      <span className="text-white/80">Referrals</span>
    </div>
  </div>
  {/* Dummy Chart */}
  <div className="mt-8 bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <h2 className="text-xl font-bold text-neon mb-4">Activity Chart</h2>
    <svg width="100%" height="120">
      <polyline
        fill="none"
        stroke="#00AEEF"
        strokeWidth="4"
        points="0,100 20,80 40,60 60,40 80,60 100,80 120,60 140,40 160,60 180,80 200,100"
      />
    </svg>
    <div className="text-white/70 mt-2">Your activity over the last 10 days</div>
  </div>
</section>

{/* NFT Gallery */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">NFT Gallery</h1>
  <div className="mb-4 flex gap-4">
    <button className="bg-neon text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-electric transition">All</button>
    <button className="bg-cyber text-white px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Weapons</button>
    <button className="bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-cyber transition">Potions</button>
    <button className="bg-neon text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-cyber transition">Badges</button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    <div className="bg-cyber rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-24 w-24 bg-neon rounded-lg mb-2"></div>
      <span className="font-bold text-white">Epic Sword</span>
      <span className="text-white/70 text-sm">Weapon</span>
    </div>
    <div className="bg-electric rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-24 w-24 bg-cyber rounded-lg mb-2"></div>
      <span className="font-bold text-white">Mystic Potion</span>
      <span className="text-white/70 text-sm">Potion</span>
    </div>
    <div className="bg-neon rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-24 w-24 bg-electric rounded-lg mb-2"></div>
      <span className="font-bold text-charcoal">Champion Badge</span>
      <span className="text-white/70 text-sm">Badge</span>
    </div>
    <div className="bg-cyber rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-24 w-24 bg-neon rounded-lg mb-2"></div>
      <span className="font-bold text-white">Legendary Shield</span>
      <span className="text-white/70 text-sm">Weapon</span>
    </div>
  </div>
</section>

{/* Game Store */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Game Store</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-electric rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-24 w-24 bg-cyber rounded-lg mb-2"></div>
      <span className="font-bold text-white mb-2">Fantasy Battle</span>
      <button className="bg-neon text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-cyber transition">Buy</button>
      <button className="mt-2 bg-cyber text-white px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Download</button>
    </div>
    <div className="bg-cyber rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-24 w-24 bg-neon rounded-lg mb-2"></div>
      <span className="font-bold text-white mb-2">Card Clash</span>
      <button className="bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Buy</button>
      <button className="mt-2 bg-neon text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-cyber transition">Download</button>
    </div>
    <div className="bg-neon rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-24 w-24 bg-electric rounded-lg mb-2"></div>
      <span className="font-bold text-charcoal mb-2">Sports Royale</span>
      <button className="bg-cyber text-white px-4 py-2 rounded-lg font-bold hover:bg-electric transition">Buy</button>
      <button className="mt-2 bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Download</button>
    </div>
  </div>
</section>


{/* User Inventory */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Your Inventory</h1>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    <div className="bg-cyber rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-16 w-16 bg-neon rounded-lg mb-2"></div>
      <span className="font-bold text-white">Epic Sword</span>
      <button className="mt-2 bg-neon text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-electric transition">Sell</button>
    </div>
    <div className="bg-electric rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-16 w-16 bg-cyber rounded-lg mb-2"></div>
      <span className="font-bold text-white">Mystic Potion</span>
      <button className="mt-2 bg-cyber text-white px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Use</button>
    </div>
    <div className="bg-neon rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-16 w-16 bg-electric rounded-lg mb-2"></div>
      <span className="font-bold text-charcoal">Champion Badge</span>
      <button className="mt-2 bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-cyber transition">Show Off</button>
    </div>
    <div className="bg-cyber rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-16 w-16 bg-neon rounded-lg mb-2"></div>
      <span className="font-bold text-white">Legendary Shield</span>
      <button className="mt-2 bg-neon text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-electric transition">Sell</button>
    </div>
  </div>
</section>


{/* VIP Membership Section */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">VIP Membership</h1>
  <div className="bg-gradient-to-br from-cyber to-electric rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
    <span className="text-5xl font-bold text-white mb-2 animate-bounce">👑</span>
    <h2 className="text-xl font-bold mb-2">Become a VIP</h2>
    <p className="text-white/80 mb-4">Unlock exclusive tournaments, NFT drops, and more!</p>
    <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Join VIP</button>
  </div>
</section>


{/* Promo Banner */}
<div className="fixed top-0 left-0 right-0 z-50 bg-neon text-charcoal px-6 py-3 text-center font-bold shadow-lg animate-pulse">
  🚀 Limited Time: Get 20% off on all NFT mints! Use code: NERDPLAY20
</div>


{/* Multi-language Switcher */}
<div className="fixed top-6 right-24 z-50">
  <select className="bg-cyber text-white px-4 py-2 rounded-lg font-bold hover:bg-neon transition">
    <option>English</option>
    <option>हिन्दी</option>
    <option>Español</option>
    <option>Français</option>
    <option>中文</option>
  </select>
</div>

{/* Accessibility Controls */}
<div className="fixed top-6 right-40 z-50 flex gap-2">
  <button className="bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-neon transition">A+</button>
  <button className="bg-cyber text-white px-4 py-2 rounded-lg font-bold hover:bg-neon transition">A-</button>
  <button className="bg-neon text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-cyber transition">High Contrast</button>
</div>


{/* Bug Report Form */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Report a Bug</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <form className="flex flex-col gap-4">
      <input type="text" placeholder="Your Name" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" />
      <input type="email" placeholder="Your Email" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" />
      <textarea placeholder="Describe the bug..." className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" rows={4}></textarea>
      <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Submit Bug</button>
    </form>
  </div>
</section>


{/* Legal/Compliance Notices */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Legal & Compliance</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <ul className="list-disc pl-6 text-white/70">
      <li>NerdPlay is compliant with all major gaming and crypto regulations.</li>
      <li>All NFTs and tokens are subject to local laws.</li>
      <li>Users must be 18+ to participate in tournaments and NFT trading.</li>
      <li>For more info, see our <a href="/privacy" className="text-neon underline">Privacy Policy</a> and <a href="/terms" className="text-cyber underline">Terms of Service</a>.</li>
    </ul>
  </div>
</section>


{/* Real-Time Online Users Widget */}
<div className="fixed bottom-6 right-6 z-50 bg-cyber text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 font-bold">
  <span className="animate-pulse text-neon">●</span>
  1,234 Online
</div>



{/* Marketplace Auction Section */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Live NFT Auctions</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-cyber rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-24 w-24 bg-neon rounded-lg mb-2"></div>
      <span className="font-bold text-white mb-2">Epic Sword</span>
      <span className="text-white/70 mb-2">Current Bid: <span className="text-neon font-bold">0.12 ETH</span></span>
      <span className="text-xs text-cyber mb-2">Ends in: 00:12:34</span>
      <button className="bg-neon text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-electric transition">Place Bid</button>
    </div>
    <div className="bg-electric rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-24 w-24 bg-cyber rounded-lg mb-2"></div>
      <span className="font-bold text-white mb-2">Mystic Potion</span>
      <span className="text-white/70 mb-2">Current Bid: <span className="text-cyber font-bold">0.08 ETH</span></span>
      <span className="text-xs text-cyber mb-2">Ends in: 01:05:22</span>
      <button className="bg-cyber text-white px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Place Bid</button>
    </div>
    <div className="bg-neon rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-24 w-24 bg-electric rounded-lg mb-2"></div>
      <span className="font-bold text-charcoal mb-2">Champion Badge</span>
      <span className="text-charcoal/70 mb-2">Current Bid: <span className="text-electric font-bold">0.20 ETH</span></span>
      <span className="text-xs text-cyber mb-2">Ends in: 00:45:10</span>
      <button className="bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-cyber transition">Place Bid</button>
    </div>
  </div>
</section>


{/* NFT Rarity Meter */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">NFT Rarity Meter</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
    <div className="w-full flex flex-col md:flex-row gap-8 justify-center">
      <div className="flex-1 flex flex-col items-center">
        <span className="font-bold text-white mb-2">Epic Sword</span>
        <div className="w-full bg-cyber rounded-full h-4 mb-2">
          <div className="bg-neon h-4 rounded-full" style={{ width: '90%' }}></div>
        </div>
        <span className="text-neon font-bold">Legendary</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <span className="font-bold text-white mb-2">Mystic Potion</span>
        <div className="w-full bg-cyber rounded-full h-4 mb-2">
          <div className="bg-electric h-4 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <span className="text-electric font-bold">Rare</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <span className="font-bold text-white mb-2">Champion Badge</span>
        <div className="w-full bg-cyber rounded-full h-4 mb-2">
          <div className="bg-cyber h-4 rounded-full" style={{ width: '30%' }}></div>
        </div>
        <span className="text-cyber font-bold">Uncommon</span>
      </div>
    </div>
  </div>
</section>

{/* Game Leaderboard with Avatars */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Top Players</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <ul>
      <li className="flex items-center gap-4 py-2 border-b border-cyber">
        <div className="h-10 w-10 rounded-full bg-neon flex items-center justify-center text-2xl font-bold text-charcoal">🧑‍🚀</div>
        <span className="font-bold text-white">PlayerOne</span>
        <span className="ml-auto text-neon font-bold">1200 pts</span>
      </li>
      <li className="flex items-center gap-4 py-2 border-b border-cyber">
        <div className="h-10 w-10 rounded-full bg-cyber flex items-center justify-center text-2xl font-bold text-white">👾</div>
        <span className="font-bold text-white">GamerX</span>
        <span className="ml-auto text-cyber font-bold">1100 pts</span>
      </li>
      <li className="flex items-center gap-4 py-2">
        <div className="h-10 w-10 rounded-full bg-electric flex items-center justify-center text-2xl font-bold text-white">🦸‍♂️</div>
        <span className="font-bold text-white">CryptoChamp</span>
        <span className="ml-auto text-electric font-bold">950 pts</span>
      </li>
    </ul>
  </div>
</section>


{/* User Level-Up Animation */}
<div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
  <div className="bg-neon text-charcoal px-8 py-6 rounded-2xl shadow-2xl text-3xl font-extrabold animate-bounce">
    🎉 Level Up! You reached Level 13!
  </div>
</div>


{/* Gift NFTs to Friends */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Gift an NFT</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col md:flex-row items-center gap-8">
    <div className="flex-1">
      <div className="h-24 w-24 bg-neon rounded-lg mb-4"></div>
      <h2 className="text-xl font-bold mb-2">Epic Sword</h2>
      <p className="text-white/70 mb-4">Gift this NFT to a friend and share the power!</p>
    </div>
    <div className="flex-1">
      <form className="flex flex-col gap-4">
        <input type="email" placeholder="Friend's Email" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" />
        <button className="bg-electric text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Send Gift</button>
      </form>
    </div>
  </div>
</section>

{/* Marketplace Search & Filter */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Marketplace Search</h1>
  <div className="flex gap-4 mb-6">
    <input type="text" placeholder="Search NFTs..." className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white w-64" />
    <select className="bg-cyber text-white px-4 py-2 rounded-lg font-bold hover:bg-neon transition">
      <option>All</option>
      <option>Weapons</option>
      <option>Potions</option>
      <option>Badges</option>
    </select>
    <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Search</button>
  </div>
  {/* (You can show NFT cards here as in previous sections) */}
</section>


{/* Downloadable Whitepaper */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">NerdPlay Whitepaper</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
    <p className="text-white/80 mb-4">Learn more about our vision, technology, and roadmap.</p>
    <a href="/NerdPlay-Whitepaper.pdf" download className="bg-electric text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Download PDF</a>
  </div>
</section>

{/* Newsletter Signup */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Subscribe to Our Newsletter</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
    <form className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
      <input type="email" placeholder="Your Email" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" />
      <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Subscribe</button>
    </form>
    <div className="mt-2 text-white/70">Get the latest updates, drops, and news!</div>
  </div>
</section>


{/* API Status/Health Widget */}
<div className="fixed bottom-6 left-6 z-50 bg-electric text-charcoal px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 font-bold">
  <span className="animate-pulse text-neon">●</span>
  API: <span className="text-neon">Online</span>
</div>


{/* In-Game Event Calendar */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Event Calendar</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="py-2 text-neon">Date</th>
          <th className="py-2 text-cyber">Event</th>
          <th className="py-2 text-electric">Type</th>
          <th className="py-2 text-white">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-cyber">
          <td className="py-2">2025-09-15</td>
          <td className="py-2">Monthly Showdown</td>
          <td className="py-2">Tournament</td>
          <td className="py-2 text-neon">Upcoming</td>
        </tr>
        <tr className="border-b border-cyber">
          <td className="py-2">2025-09-12</td>
          <td className="py-2">NFT Drop: Mystic Potion</td>
          <td className="py-2">NFT Drop</td>
          <td className="py-2 text-electric">Live</td>
        </tr>
        <tr>
          <td className="py-2">2025-09-10</td>
          <td className="py-2">Patch 1.2 Released</td>
          <td className="py-2">Update</td>
          <td className="py-2 text-cyber">Completed</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>


{/* NFT Showcase Carousel */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">NFT Showcase</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex overflow-x-auto gap-8">
    <div className="min-w-[200px] bg-cyber rounded-xl p-4 flex flex-col items-center">
      <div className="h-24 w-24 bg-neon rounded-lg mb-2"></div>
      <span className="font-bold text-white">Epic Sword</span>
    </div>
    <div className="min-w-[200px] bg-electric rounded-xl p-4 flex flex-col items-center">
      <div className="h-24 w-24 bg-cyber rounded-lg mb-2"></div>
      <span className="font-bold text-white">Mystic Potion</span>
    </div>
    <div className="min-w-[200px] bg-neon rounded-xl p-4 flex flex-col items-center">
      <div className="h-24 w-24 bg-electric rounded-lg mb-2"></div>
      <span className="font-bold text-charcoal">Champion Badge</span>
    </div>
    <div className="min-w-[200px] bg-cyber rounded-xl p-4 flex flex-col items-center">
      <div className="h-24 w-24 bg-neon rounded-lg mb-2"></div>
      <span className="font-bold text-white">Legendary Shield</span>
    </div>
  </div>
</section>


{/* User Milestones Timeline */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Your Milestones</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <ul className="list-none pl-0">
      <li className="mb-6 flex items-center">
        <span className="text-neon text-2xl mr-4">●</span>
        <div>
          <span className="font-bold text-white">Joined NerdPlay</span>
          <div className="text-white/70 text-sm">2025-08-01</div>
        </div>
      </li>
      <li className="mb-6 flex items-center">
        <span className="text-cyber text-2xl mr-4">●</span>
        <div>
          <span className="font-bold text-white">Minted First NFT</span>
          <div className="text-white/70 text-sm">2025-08-10</div>
        </div>
      </li>
      <li className="mb-6 flex items-center">
        <span className="text-electric text-2xl mr-4">●</span>
        <div>
          <span className="font-bold text-white">Won First Tournament</span>
          <div className="text-white/70 text-sm">2025-09-01</div>
        </div>
      </li>
      <li className="flex items-center">
        <span className="text-neon text-2xl mr-4">●</span>
        <div>
          <span className="font-bold text-white">Became VIP Member</span>
          <div className="text-white/70 text-sm">2025-09-10</div>
        </div>
      </li>
    </ul>
  </div>
</section>


{/* Marketplace Featured Sellers */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Featured Sellers</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-neon rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-16 w-16 rounded-full bg-cyber flex items-center justify-center text-2xl font-bold text-white mb-2">🧑‍🚀</div>
      <span className="font-bold text-charcoal">PlayerOne</span>
      <span className="text-white/70 text-sm">120 NFTs Sold</span>
    </div>
    <div className="bg-electric rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-16 w-16 rounded-full bg-neon flex items-center justify-center text-2xl font-bold text-charcoal mb-2">👾</div>
      <span className="font-bold text-white">GamerX</span>
      <span className="text-white/70 text-sm">98 NFTs Sold</span>
    </div>
    <div className="bg-cyber rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-16 w-16 rounded-full bg-electric flex items-center justify-center text-2xl font-bold text-white mb-2">🦸‍♂️</div>
      <span className="font-bold text-white">CryptoChamp</span>
      <span className="text-white/70 text-sm">75 NFTs Sold</span>
    </div>
  </div>
</section>

{/* Game Patch Notes/Updates */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Patch Notes</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <ul className="list-disc pl-6 text-white/70">
      <li>Patch 1.2: Added new Battle Royale mode.</li>
      <li>Patch 1.1: Improved NFT minting speed.</li>
      <li>Patch 1.0: Launched NerdPlay platform!</li>
    </ul>
    <div className="mt-4 text-cyber font-bold">Last updated: 2025-09-10</div>
  </div>
</section>

{/* User Feedback Poll */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Your Feedback</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <form className="flex flex-col gap-4">
      <label className="font-bold text-neon">Which feature should we add next?</label>
      <label className="flex items-center gap-2">
        <input type="radio" name="poll" className="accent-neon" />
        NFT Lending
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="poll" className="accent-neon" />
        In-game Voice Chat
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="poll" className="accent-neon" />
        More Tournaments
      </label>
      <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition mt-4">Vote</button>
    </form>
    <div className="mt-4 text-white/70">Poll closes in <span className="text-neon font-bold">3 days</span></div>
  </div>
</section>


{/* Leaderboard Filters */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Leaderboard Filters</h1>
  <div className="flex gap-4 mb-6">
    <select className="bg-cyber text-white px-4 py-2 rounded-lg font-bold hover:bg-neon transition">
      <option>All Games</option>
      <option>Fantasy Battle</option>
      <option>Card Clash</option>
      <option>Sports Royale</option>
    </select>
    <select className="bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-cyber transition">
      <option>This Week</option>
      <option>Last Week</option>
      <option>This Month</option>
    </select>
    <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Apply</button>
  </div>
  {/* (Show leaderboard here as in previous sections) */}
</section>


{/* NFT Transfer History */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">NFT Transfer History</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="py-2 text-cyber">Date</th>
          <th className="py-2 text-electric">NFT</th>
          <th className="py-2 text-neon">To</th>
          <th className="py-2 text-white">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-cyber">
          <td className="py-2">2025-09-12</td>
          <td className="py-2">Epic Sword</td>
          <td className="py-2">GamerX</td>
          <td className="py-2 text-neon">Success</td>
        </tr>
        <tr className="border-b border-cyber">
          <td className="py-2">2025-09-10</td>
          <td className="py-2">Mystic Potion</td>
          <td className="py-2">CryptoChamp</td>
          <td className="py-2 text-neon">Success</td>
        </tr>
        <tr>
          <td className="py-2">2025-09-08</td>
          <td className="py-2">Champion Badge</td>
          <td className="py-2">PlayerOne</td>
          <td className="py-2 text-neon">Success</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>


{/* VIP Lounge Chat Preview */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">VIP Lounge Chat</h1>
  <div className="bg-gradient-to-br from-cyber to-electric rounded-xl p-6 shadow-lg glassmorphism">
    <div className="h-40 overflow-y-auto mb-4 flex flex-col gap-2">
      <div className="bg-neon px-4 py-2 rounded-lg text-charcoal font-bold self-start">PlayerOne: Welcome to the VIP Lounge!</div>
      <div className="bg-cyber px-4 py-2 rounded-lg text-white font-bold self-end">GamerX: Excited for the next drop!</div>
      <div className="bg-electric px-4 py-2 rounded-lg text-white font-bold self-start">CryptoChamp: VIP perks are awesome!</div>
    </div>
    <form className="flex gap-2">
      <input type="text" placeholder="Type your message..." className="flex-1 px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" />
      <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Send</button>
    </form>
  </div>
</section>

{/* Gamified Daily Login Rewards */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Daily Login Rewards</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex gap-8 flex-wrap justify-center">
    <div className="flex flex-col items-center">
      <span className="text-4xl mb-2">🪙</span>
      <span className="font-bold text-neon">Day 1</span>
      <span className="text-white/70">+10 Tokens</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-4xl mb-2">🎁</span>
      <span className="font-bold text-cyber">Day 2</span>
      <span className="text-white/70">Mystery Box</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-4xl mb-2">🏆</span>
      <span className="font-bold text-electric">Day 3</span>
      <span className="text-white/70">Exclusive Badge</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-4xl mb-2">🧑‍🚀</span>
      <span className="font-bold text-neon">Day 4</span>
      <span className="text-white/70">VIP Access</span>
    </div>
  </div>
</section>

{/* NFT Crafting/Upgrade UI */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">NFT Crafting & Upgrade</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col md:flex-row items-center gap-8">
    <div className="flex-1">
      <div className="h-24 w-24 bg-neon rounded-lg mb-4"></div>
      <h2 className="text-xl font-bold mb-2">Epic Sword</h2>
      <p className="text-white/70 mb-4">Upgrade your NFT to unlock new powers!</p>
    </div>
    <div className="flex-1">
      <form className="flex flex-col gap-4">
        <select className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white">
          <option>Choose Material</option>
          <option>Magic Stone</option>
          <option>Rare Metal</option>
          <option>Ancient Rune</option>
        </select>
        <button className="bg-electric text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Upgrade NFT</button>
      </form>
    </div>
  </div>
</section>

{/* User Achievements Trophy Room */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Trophy Room</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex gap-8 flex-wrap justify-center">
    <div className="flex flex-col items-center">
      <span className="text-5xl mb-2">🏆</span>
      <span className="font-bold text-neon">Tournament Winner</span>
      <span className="text-white/70 text-sm">3x</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-5xl mb-2">🪙</span>
      <span className="font-bold text-cyber">NFT Collector</span>
      <span className="text-white/70 text-sm">10+ NFTs</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-5xl mb-2">🚀</span>
      <span className="font-bold text-electric">Early Adopter</span>
      <span className="text-white/70 text-sm">2025</span>
    </div>
  </div>
</section>

{/* Marketplace Price History Chart */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">NFT Price History</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <h2 className="text-xl font-bold text-neon mb-4">Epic Sword</h2>
    <svg width="100%" height="120">
      <polyline
        fill="none"
        stroke="#00AEEF"
        strokeWidth="4"
        points="0,100 20,80 40,60 60,40 80,60 100,80 120,60 140,40 160,60 180,80 200,100"
      />
    </svg>
    <div className="text-white/70 mt-2">Price trend over the last 10 sales</div>
  </div>
</section>


{/* Game Streaming Preview */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Live Game Streaming</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
    <div className="w-full h-64 bg-black rounded-lg mb-4 flex items-center justify-center text-white/40 text-2xl">
      [Live Stream Preview]
    </div>
    <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Watch Now</button>
  </div>
</section>


{/* User Support Ticket System */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Support Tickets</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <form className="flex flex-col gap-4 mb-6">
      <input type="text" placeholder="Subject" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" />
      <textarea placeholder="Describe your issue..." className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" rows={4}></textarea>
      <button className="bg-electric text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Submit Ticket</button>
    </form>
    <div className="mt-4">
      <h2 className="text-lg font-bold text-cyber mb-2">Your Tickets</h2>
      <ul className="space-y-2">
        <li className="bg-neon px-4 py-2 rounded-lg text-charcoal font-bold">#1234 - Pending</li>
        <li className="bg-cyber px-4 py-2 rounded-lg text-white font-bold">#1233 - Resolved</li>
      </ul>
    </div>
  </div>
</section>


{/* NFT Burn (Destroy) UI */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Burn NFT</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
    <div className="h-24 w-24 bg-neon rounded-lg mb-4"></div>
    <h2 className="text-xl font-bold mb-2">Epic Sword</h2>
    <p className="text-white/70 mb-4">Permanently destroy this NFT. This action cannot be undone.</p>
    <button className="bg-cyber text-white px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Burn NFT</button>
  </div>
</section>


{/* Marketplace Bulk Actions */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Bulk Actions</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism">
    <form className="flex flex-col md:flex-row gap-4 items-center mb-4">
      <select className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white">
        <option>Select Action</option>
        <option>List for Sale</option>
        <option>Transfer</option>
        <option>Burn</option>
      </select>
      <input type="text" placeholder="NFT IDs (comma separated)" className="px-4 py-2 rounded-lg bg-charcoal border border-cyber text-white" />
      <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Apply</button>
    </form>
    <div className="text-white/70">Easily manage multiple NFTs at once.</div>
  </div>
</section>


{/* User Block/Report System */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">Block or Report User</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col md:flex-row items-center gap-8">
    <div className="flex-1 flex flex-col items-center">
      <div className="h-16 w-16 rounded-full bg-cyber flex items-center justify-center text-2xl font-bold text-white mb-2">👾</div>
      <span className="font-bold text-white">GamerX</span>
    </div>
    <div className="flex-1 flex flex-col gap-4">
      <button className="bg-cyber text-white px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Block User</button>
      <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Report User</button>
    </div>
  </div>
</section>


{/* NFT Wishlist */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-cyber mb-6">Your Wishlist</h1>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    <div className="bg-neon rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-16 w-16 bg-cyber rounded-lg mb-2"></div>
      <span className="font-bold text-charcoal">Legendary Shield</span>
      <button className="mt-2 bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-cyber transition">Buy Now</button>
    </div>
    <div className="bg-electric rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-16 w-16 bg-neon rounded-lg mb-2"></div>
      <span className="font-bold text-white">Mystic Potion</span>
      <button className="mt-2 bg-cyber text-white px-4 py-2 rounded-lg font-bold hover:bg-neon transition">Buy Now</button>
    </div>
    <div className="bg-cyber rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-16 w-16 bg-electric rounded-lg mb-2"></div>
      <span className="font-bold text-white">Epic Sword</span>
      <button className="mt-2 bg-neon text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-electric transition">Buy Now</button>
    </div>
    <div className="bg-neon rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
      <div className="h-16 w-16 bg-cyber rounded-lg mb-2"></div>
      <span className="font-bold text-charcoal">Champion Badge</span>
      <button className="mt-2 bg-electric text-charcoal px-4 py-2 rounded-lg font-bold hover:bg-cyber transition">Buy Now</button>
    </div>
  </div>
</section>


{/* Season Pass Progress */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-electric mb-6">Season Pass</h1>
  <div className="bg-gradient-to-br from-cyber to-electric rounded-xl p-6 shadow-lg glassmorphism flex flex-col items-center">
    <div className="w-full bg-cyber rounded-full h-6 mb-4">
      <div className="bg-neon h-6 rounded-full" style={{ width: '70%' }}></div>
    </div>
    <div className="flex justify-between w-full text-white font-bold mb-4">
      <span>Level 1</span>
      <span>Level 7</span>
      <span>Level 10</span>
    </div>
    <button className="bg-neon text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-electric transition">Claim Rewards</button>
  </div>
</section>


{/* NFT Lending/Borrowing UI */}
<section className="max-w-5xl mx-auto py-12">
  <h1 className="text-3xl font-bold text-neon mb-6">NFT Lending & Borrowing</h1>
  <div className="bg-charcoal rounded-xl p-6 shadow-lg glassmorphism flex flex-col md:flex-row items-center gap-8">
    <div className="flex-1">
      <div className="h-24 w-24 bg-neon rounded-lg mb-4"></div>
      <h2 className="text-xl font-bold mb-2">Epic Sword</h2>
      <p className="text-white/70 mb-4">Lend your NFT and earn passive income, or borrow rare NFTs for tournaments!</p>
    </div>
    <div className="flex-1 flex flex-col gap-4">
      <button className="bg-electric text-charcoal px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Lend NFT</button>
      <button className="bg-cyber text-white px-6 py-2 rounded-lg font-bold hover:bg-neon transition">Borrow NFT</button>
    </div>
  </div>
</section>