// z.js — UPZ Codec der Y+X zusammenführt
// upz( upy( upx ) ) = up)y( up)x(

export const UPZ = {
  // encode
  encode: (x, y, mode='MUL') => {
    if (mode === 'MUL') return x * y;        // 81*27=2187 = 3⁷ ✓
    if (mode === 'ADD') return x + y;        // 108
    if (mode === 'CONCAT') return x*1000 + y; // 81027
    if (mode === 'BIT') return (x << 8) | y;
  },
  decode: (z, mode='MUL', hintX=81) => {
    if (mode === 'MUL') return { x: hintX, y: z / hintX };
    if (mode === 'ADD') return { x: z/2, y: z/2 };
    if (mode === 'CONCAT') return { x: Math.floor(z/1000), y: z%1000 };
  },

  // echte Schachtel: upz( upy( upx ) )
  wrap: (x, y) => ({
    upz: x * y,
    upy: { y, upx: { x } },
    raw: `upz(${y}(${x}))`,
    codec: `up)y( up)x( → ${x*y}`
  }),
  unwrap: (w) => ({
    x: w.upy.upx.x,
    y: w.upy.y,
    z: w.upz
  })
}

// Beispiel:
const x = 81; // GATE
const y = 27; // WLOCH
const z = UPZ.wrap(x,y);
// z = { upz:2187, upy:{ y:27, upx:{ x:81 } } }
// = upz(27(81)) = 2187
