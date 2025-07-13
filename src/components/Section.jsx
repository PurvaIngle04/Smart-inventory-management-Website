import React from 'react';

const Section = ({ bg, title, description, iconPath, color, cards, onClick }) => {
  return (
    <section
      className={`mb-10 p-8 rounded-2xl shadow-md card-section ${bg} transition cursor-pointer hover:shadow-lg`}
      onClick={onClick} // ✅ enable navigation or custom logic
    >
      <h2 className={`text-3xl font-bold text-${color}-700 mb-6 flex items-center`}>
        <svg className={`w-8 h-8 mr-3 text-${color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}></path>
        </svg>
        {title}
      </h2>
      <p className="text-gray-800 text-lg leading-relaxed mb-6">{description}</p>

      {/* Optional cards (like barcode + integration) */}
      {cards && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="p-5 bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <h3 className={`text-2xl font-semibold text-${color}-800 mb-3 flex items-center`}>
                <svg className={`w-6 h-6 mr-2 text-${color}-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.iconPath}></path>
                </svg>
                {card.title}
              </h3>
              <p className="text-gray-700">{card.desc}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Section;
