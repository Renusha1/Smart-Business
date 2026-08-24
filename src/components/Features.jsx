import "../styles/Features.css";
function Features() {
  const features = [
    {
      title: "Inventory",
      icon: "📦",
      desc: "Manage all products and stock.",
    },
    {
      title: "Sales",
      icon: "💰",
      desc: "Track daily and monthly sales.",
    },
    {
      title: "Retailers",
      icon: "🏪",
      desc: "Manage retailer accounts.",
    },
    {
      title: "Users",
      icon: "👥",
      desc: "Manage customer information.",
    },
    {
      title: "Reports",
      icon: "📊",
      desc: "Generate business reports.",
    },
    {
      title: "Orders",
      icon: "🛒",
      desc: "Track customer orders.",
    },
  ];

  return (
    <section className="features">
      <h2>Our Features</h2>

      <div className="feature-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <h1>{item.icon}</h1>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
