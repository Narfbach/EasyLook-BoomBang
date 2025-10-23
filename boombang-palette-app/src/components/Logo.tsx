export const Logo = () => {
  return (
    <svg width="240" height="80" viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto' }}>
      {/* Large explosion cloud - more dramatic like BOOM BANG */}
      <path 
        d="M 120,40 
           C 100,25 95,22 85,22 C 75,22 70,25 65,20 C 60,15 55,18 50,22 C 45,26 40,24 35,28 
           C 30,32 28,35 25,40 C 22,45 23,50 28,54 C 33,58 32,62 35,66 C 38,70 42,72 48,70 
           C 54,68 58,72 65,74 C 72,76 78,75 85,78 C 92,81 98,80 105,78 C 112,76 118,78 125,78 
           C 132,78 138,76 145,78 C 152,80 158,81 165,78 C 172,75 178,76 185,74 C 192,72 196,68 202,70 
           C 208,72 212,70 215,66 C 218,62 217,58 212,54 C 207,50 208,45 205,40 C 202,35 200,32 195,28 
           C 190,24 185,26 180,22 C 175,18 170,15 165,20 C 160,25 155,22 145,22 C 135,22 130,25 120,40 Z" 
        fill="none" 
        stroke="#6366f1" 
        strokeWidth="3" 
        strokeLinejoin="round"
      />
      
      {/* Star burst lines - more like comic style */}
      {/* Top bursts */}
      <line x1="120" y1="15" x2="120" y2="5" stroke="#6366f1" strokeWidth="3" strokeLinecap="round"/>
      <line x1="110" y1="18" x2="105" y2="8" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="130" y1="18" x2="135" y2="8" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      
      {/* Bottom bursts */}
      <line x1="120" y1="65" x2="120" y2="75" stroke="#6366f1" strokeWidth="3" strokeLinecap="round"/>
      <line x1="110" y1="62" x2="105" y2="72" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="130" y1="62" x2="135" y2="72" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      
      {/* Left bursts */}
      <line x1="30" y1="40" x2="15" y2="40" stroke="#6366f1" strokeWidth="3" strokeLinecap="round"/>
      <line x1="35" y1="30" x2="22" y2="22" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="35" y1="50" x2="22" y2="58" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      
      {/* Right bursts */}
      <line x1="210" y1="40" x2="225" y2="40" stroke="#6366f1" strokeWidth="3" strokeLinecap="round"/>
      <line x1="205" y1="30" x2="218" y2="22" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="205" y1="50" x2="218" y2="58" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      
      {/* Text "EASY LOOK" - bold comic style */}
      <text 
        x="120" 
        y="50" 
        fontFamily="Impact, Arial Black, sans-serif" 
        fontSize="28" 
        fontWeight="900" 
        textAnchor="middle" 
        fill="#6366f1"
        letterSpacing="2"
        style={{ textTransform: 'uppercase' }}
      >
        EASY LOOK
      </text>
      
      {/* Text shadow for depth */}
      <text 
        x="121" 
        y="51" 
        fontFamily="Impact, Arial Black, sans-serif" 
        fontSize="28" 
        fontWeight="900" 
        textAnchor="middle" 
        fill="rgba(99, 102, 241, 0.2)"
        letterSpacing="2"
        style={{ textTransform: 'uppercase' }}
      >
        EASY LOOK
      </text>
    </svg>
  );
};
