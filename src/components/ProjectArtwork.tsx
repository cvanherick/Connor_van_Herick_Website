import type { ReactNode } from 'react'

const ink = '#dce9e6'
const mint = '#91d9ce'
const gold = '#eccb80'
const muted = '#69837f'

const Label = ({ x, y, children, color = muted }: { x: number; y: number; children: ReactNode; color?: string }) => (
  <text x={x} y={y} fill={color} fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="10" letterSpacing="1.5">{children}</text>
)

const Window = ({ children }: { children: ReactNode }) => (
  <g>
    <rect x="90" y="25" width="380" height="132" rx="11" fill="#14252b" stroke="#39514e" />
    <path d="M90 48h380" stroke="#39514e" />
    <circle cx="108" cy="37" r="3" fill="#da867e" /><circle cx="120" cy="37" r="3" fill={gold} /><circle cx="132" cy="37" r="3" fill={mint} />
    {children}
  </g>
)

function ArtworkScene({ title }: { title: string }) {
  if (title.startsWith('Cadre')) return <>
    <path d="M280 73V91M136 113H424M136 91v22m72-22v22m72-22v22m72-22v22m72-22v22" stroke={muted} strokeWidth="1.5" />
    <rect x="229" y="40" width="102" height="34" rx="9" fill="#183b3c" stroke={mint} /><Label x={247} y={61} color={mint}>ORCHESTRATOR</Label>
    {['RESEARCH', 'ENGINEER', 'REVIEW', 'INTEGRATE', 'OUTPUT'].map((item, i) => <g key={item}><rect x={101 + i * 73} y="112" width="68" height="29" rx="6" fill={i === 4 ? '#3d3928' : '#1e3438'} stroke={i === 4 ? gold : '#48645f'} /><Label x={107 + i * 73} y={130} color={i === 4 ? gold : ink}>{item}</Label></g>)}
  </>
  if (title.startsWith('Vision-Guided')) return <>
    <path d="M118 133h116M194 133l28-35 32 5 28-42" stroke={ink} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {[ [194,133],[222,98],[254,103],[282,61] ].map(([x,y])=><circle key={x} cx={x} cy={y} r="6" fill={gold} stroke="#14252b" strokeWidth="3" />)}
    <path d="M280 61l13 12m-9-16l15 7" stroke={mint} strokeWidth="3" strokeLinecap="round" />
    <path d="M321 67h126v70H321z" fill="#192d30" stroke="#47615b" />
    {Array.from({length: 5},(_,r)=>Array.from({length: 9},(_,c)=><rect key={`${r}-${c}`} x={326+c*13} y={72+r*12} width="10" height="9" rx="2" fill={(r===1 && c>=2 && c<=4)||(r===2&&c===4) ? mint : (r===3&&c>=5&&c<=7) ? gold : '#254145'} />))}
    <Label x={322} y={58} color={mint}>BOARD STATE</Label>
  </>
  if (title.startsWith('Ngordnet')) return <Window><>
    <Label x={112} y={69} color={ink}>HISTORY / WORDNET</Label>
    <path d="M116 130l42-15 39 3 37-31 40 12 46-26 41 12 52-30" fill="none" stroke={mint} strokeWidth="2.5" />
    <path d="M116 139h220" stroke="#39514e" /><circle cx="380" cy="105" r="13" fill="#224a48" stroke={mint} /><circle cx="425" cy="82" r="11" fill="#224a48" stroke={mint} /><circle cx="429" cy="128" r="11" fill="#224a48" stroke={mint} /><path d="M390 100l26-15m-25 24l27 15" stroke={mint} /><Label x={356} y={153}>WORDS →</Label>
  </></Window>
  if (title.startsWith('Build Your')) return <>
    {Array.from({length: 9},(_,r)=>Array.from({length: 25},(_,c)=>{const floor=(r>1&&r<7&&c>1&&c<10)||(r>3&&r<8&&c>13&&c<23)||(r===4&&c>8&&c<15);return <rect key={`${r}-${c}`} x={99+c*14} y={30+r*14} width="12" height="12" rx="1" fill={floor ? ((r===4&&c===5)?gold:'#284444') : '#18282b'} stroke={floor?'#3b5a53':'#223337'} strokeWidth=".5" />}))}
    <circle cx="177" cy="95" r="5" fill={gold}/><circle cx="365" cy="109" r="5" fill="#d88379"/><Label x={100} y={170} color={mint}>SEEDED WORLD / LINE OF SIGHT</Label>
  </>
  if (title.startsWith('Snek')) return <Window><>
    {Array.from({length: 6},(_,r)=>Array.from({length: 21},(_,c)=><rect key={`${r}-${c}`} x={110+c*16} y={55+r*16} width="14" height="14" rx="2" fill={(r===0||r===5||c===0||c===20)?'#344a47':'#1a3033'} />))}
    {[[4,2],[5,2],[6,2],[7,2],[7,3],[7,4],[8,4],[9,4]].map(([c,r],i)=><rect key={i} x={110+c*16} y={55+r*16} width="14" height="14" rx="3" fill={i===7?gold:mint} />)}
    <circle cx="367" cy="100" r="5" fill="#d88379"/><Label x={112} y={151}>C / GAME STATE / MEMORY</Label>
  </></Window>
  if (title.startsWith('CS61Classify')) return <Window><>
    <Label x={114} y={68} color={ink}>INPUT MATRIX</Label><Label x={272} y={68} color={mint}>MATMUL → RELU</Label>
    {Array.from({length: 5},(_,r)=>Array.from({length: 6},(_,c)=><rect key={`${r}-${c}`} x={114+c*14} y={80+r*11} width="10" height="7" rx="1" fill={(r+c)%3===0?mint:'#2b4a49'} />))}
    <path d="M218 106h42m-7-7l8 7-8 7M351 106h29m-8-7l8 7-8 7" stroke={gold} strokeWidth="2" fill="none"/>
    {[0,1,2,3].map((i)=><rect key={i} x={391+i*17} y={126-[18,43,29,62][i]} width="10" height={[18,43,29,62][i]} rx="2" fill={i===3?gold:mint} />)}
  </></Window>
  if (title.startsWith('Secure File')) return <>
    <rect x="117" y="66" width="92" height="76" rx="9" fill="#1a3638" stroke={mint}/><path d="M147 66V55a16 16 0 0 1 32 0v11" fill="none" stroke={mint} strokeWidth="5"/><circle cx="163" cy="99" r="6" fill={gold}/><path d="M163 104v18" stroke={gold} strokeWidth="4"/>
    <path d="M209 104h66m-9-8l9 8-9 8M347 104h42m-9-8l9 8-9 8" fill="none" stroke={muted} strokeWidth="2"/>
    {[0,1,2].map((i)=><g key={i}><rect x={284+i*47} y={81+(i%2)*9} width="40" height="49" rx="4" fill="#20363a" stroke={i===2?gold:mint}/><path d={`M${292+i*47} ${96+(i%2)*9}h24m-24 8h16`} stroke={muted}/></g>)}
    <Label x={280} y={63} color={mint}>SHARE → REVOKE</Label>
  </>
  if (title.startsWith('Performance')) return <Window><>
    <Label x={112} y={70} color={ink}>ATTRIBUTION / PORTFOLIO</Label>
    {Array.from({length: 6},(_,i)=><g key={i}><rect x={123+i*52} y={96-[13,24,35,17,41,29][i]} width="18" height={[13,24,35,17,41,29][i]} fill={mint}/><rect x={123+i*52} y="96" width="18" height={[14,10,18,25,15,22][i]} fill={gold}/></g>)}
    <path d="M112 96h340M112 133h340" stroke="#455955"/><Label x={113} y={151}>ALLOCATION</Label><Label x={340} y={151}>SELECTION</Label>
  </></Window>
  if (title.startsWith('RISC-V')) return <>
    {[['FETCH',104],['DECODE',209],['EXECUTE',314]].map(([name,x])=><g key={name}><rect x={Number(x)} y="67" width="90" height="56" rx="6" fill="#1b3437" stroke={mint}/><Label x={Number(x)+14} y={98} color={ink}>{name}</Label></g>)}
    <path d="M194 95h15m90 0h15m90 0h44m-9-7l9 7-9 7" stroke={gold} strokeWidth="2" fill="none"/><path d="M359 123v23H148v-23" stroke={muted} strokeDasharray="4 4" fill="none"/><Label x={151} y={161} color={mint}>LOGISIM / RISC-V DATAPATH</Label>
  </>
  if (title.startsWith('Scheme')) return <Window><>
    <Label x={115} y={70} color={mint}>scheme&gt; (define (square x)</Label><Label x={145} y={89} color={ink}>(* x x))</Label><Label x={115} y={111} color={mint}>scheme&gt; (square 7)</Label><Label x={115} y={132} color={gold}>49</Label><path d="M337 73h88M337 93h63M337 113h103" stroke="#385552" strokeWidth="5" strokeLinecap="round" />
  </></Window>
  if (title.startsWith('2048')) return <>
    {Array.from({length: 4},(_,r)=>Array.from({length: 4},(_,c)=>{const values=[[0,2,0,4],[2,4,8,0],[0,8,16,32],[0,0,64,128]];const value=values[r][c];return <g key={`${r}-${c}`}><rect x={187+c*47} y={17+r*37} width="42" height="32" rx="5" fill={value ? (value>=32 ? '#716043':'#2d5551'):'#1b3033'} stroke={value ? (value>=32 ? gold:mint):'#2b4141'}/>{value>0&&<text x={208+c*47} y={38+r*37} fill={value>=32?gold:ink} textAnchor="middle" fontWeight="700" fontSize="16">{value}</text>}</g>}))}
  </>
  if (title.startsWith('Cook County')) return <Window><>
    <Label x={113} y={67} color={ink}>ASSESSMENT / MODEL ERROR</Label><path d="M120 133h318M120 133V78" stroke={muted}/><path d="M127 121l42-13 40-3 41-10 46-2 36-12 42-6 49-11" fill="none" stroke={mint} strokeWidth="2"/>
    {[ [152,112],[188,119],[225,97],[253,105],[284,83],[318,93],[357,76],[401,74] ].map(([x,y])=><circle key={x} cx={x} cy={y} r="4" fill={gold} />)}<Label x={315} y={151}>PREDICTED PRICE →</Label>
  </></Window>
  return null
}

export default function ProjectArtwork({ title }: { title: string }) {
  if (title.startsWith('CS 180')) return <div className="relative h-44 overflow-hidden border-b border-cream/10 bg-[#15242a] md:h-48" role="img" aria-label="Before and after images from Connor's CS 180 color reconstruction project">
    <div className="grid h-full grid-cols-2">
      <img src="https://cvanherick.github.io/Connor_van_Herick_CS180/projects/project1/CS180_fa2026_bw_pngs/cathedral_bw.png" alt="" loading="lazy" className="h-full w-full object-cover object-center opacity-80 grayscale" />
      <img src="https://cvanherick.github.io/Connor_van_Herick_CS180/projects/project1/CS180_fa2026_merged_photos/cathedral_out.jpg" alt="" loading="lazy" className="h-full w-full object-cover object-center" />
    </div>
    <div className="absolute bottom-3 left-4 rounded bg-[#102127]/85 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white">Glass plate</div>
    <div className="absolute bottom-3 right-4 rounded bg-[#102127]/85 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white">Aligned color</div>
  </div>

  return <div className="h-44 overflow-hidden border-b border-cream/10 bg-[#101d24] md:h-48" role="img" aria-label={`Illustration of ${title}`}>
    <svg viewBox="0 0 560 180" preserveAspectRatio="xMidYMid meet" className="h-full w-full" aria-hidden="true">
      <defs><pattern id="project-art-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0v24" fill="none" stroke="#2c4243" strokeWidth=".5" /></pattern></defs>
      <rect width="560" height="180" fill="#101d24" /><rect width="560" height="180" fill="url(#project-art-grid)" opacity=".55" />
      <ArtworkScene title={title} />
    </svg>
  </div>
}
