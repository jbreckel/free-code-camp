const bftCalculator = (mph) => {
  if ( mph < 1 ) return { speed: 0, desc: 'Calm' }
  if ( mph < 3 ) return { speed: 1, desc: 'Light Air' }
  if ( mph < 7 ) return { speed: 2, desc: 'Light Breeze' }
  if ( mph < 12 ) return { speed: 3, desc: 'Gentle Breeze' }
  if ( mph < 18 ) return { speed: 4, desc: 'Moderate Breeze' }
  if ( mph < 24 ) return { speed: 5, desc: 'Fresh Breeze' }
  if ( mph < 31 ) return { speed: 6, desc: 'Strong Breeze' }
  if ( mph < 38 ) return { speed: 7, desc: 'Moderate Gale' }
  if ( mph < 46 ) return { speed: 8, desc: 'Fresh Gale' }
  if ( mph < 54 ) return { speed: 9, desc: 'Strong Gale' }
  if ( mph < 63 ) return { speed: 10, desc: 'Whole Gale' }
  if ( mph < 75 ) return { speed: 11, desc: 'Storm' }
  return { speed: 12, desc: 'Hurricane' }
}

export default bftCalculator
