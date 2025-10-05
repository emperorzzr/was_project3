"use client";

export default function DevicesPage() {
  const devices = [
    {
      id: "xbox",
      name: "Xbox Series X|S",
      icon: "🟩",
      desc: "Microsoft’s powerful console designed for high performance, supporting 4K gaming, ray tracing, and Game Pass access to hundreds of games instantly.",
      features: [
        "Up to 12 TFLOPS processing power (Series X)",
        "Quick Resume for multiple games",
        "Access to Xbox Game Pass",
      ],
    },
    {
      id: "ps5",
      name: "PlayStation 5",
      icon: "🎮",
      desc: "Sony’s next-gen console featuring ultra-fast SSD storage and the DualSense controller with haptic feedback for a more immersive experience.",
      features: [
        "Ultra-fast SSD with near-instant load times",
        "DualSense Controller with haptic feedback",
        "Exclusive titles like God of War and Spider-Man",
      ],
    },
    {
      id: "pc",
      name: "PC Gaming",
      icon: "💻",
      desc: "The most flexible platform, allowing hardware upgrades and customization. Suitable for both casual gamers and professional eSports players.",
      features: [
        "Upgradeable CPU, GPU, and RAM based on budget",
        "Supports up to 8K resolution",
        "Wide range of platforms: Steam, Epic Games, Xbox PC Game Pass",
      ],
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
        🎮 Gaming Devices
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {devices.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition transform p-6 space-y-4"
          >
            <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-600">
              <span className="text-3xl">{d.icon}</span> {d.name}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{d.desc}</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              {d.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
