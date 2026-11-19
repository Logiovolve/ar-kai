/**
 * 3D・AR教材 ポータル
 * iPad / iPhone の Safari で、画像をタップすると AR クイックルックが起動する。
 *
 * 重要: AR クイックルックは <a rel="ar"> の「最初の子要素が <img>」であることが条件。
 * そのためカード全体ではなく、サムネイル画像だけをリンクにしている。
 */

type Model = {
  id: string;
  title: string;
  description: string;
  file: string;
  /** public/thumbs/ などに実画像を置く場合はここにパスを指定（未指定なら自動生成の仮画像） */
  thumbnail?: string;
};

// ▼ 教材名・説明文はここを書き換えるだけで反映されます
const models: Model[] = [
  { id: "water-flow", title: "水流", description: "水の流れを3Dで観察できます", file: "/models/water-flow.usdz" },
  { id: "atmosphere", title: "大気の働き", description: "大気のはたらきを3Dで観察できます", file: "/models/atmosphere.usdz" },
  { id: "series-circuit", title: "直列回路", description: "直列回路を3Dで観察できます", file: "/models/series-circuit.reality" },
];

/** 仮サムネイル（立方体のアイコン＋「ARで見る」）をSVGのデータURIとして生成 */
function placeholderThumb(label: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420">
<rect width="600" height="420" fill="#1B2A41"/>
<g transform="translate(300 170)" stroke="#E9EEF3" stroke-width="4" stroke-linejoin="round" fill="none">
<polygon points="0,-90 78,-45 78,45 0,90 -78,45 -78,-45" fill="#24395A"/>
<polyline points="-78,-45 0,0 78,-45"/>
<line x1="0" y1="0" x2="0" y2="90"/>
</g>
<text x="300" y="52" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="700" fill="#E9EEF3">${label}</text>
<rect x="170" y="318" width="260" height="56" rx="28" fill="#FFD23F"/>
<text x="300" y="355" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="#1B2A41">タップしてARで見る</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default function Page() {
  return (
    <main className="page">
      <header className="head">
        <h1>3D・AR教材</h1>
        <p>
          見たい教材の画像をタップすると、カメラが起動して実物大の3Dモデルを机や床の上に表示できます。
          モデルの周りを歩いたり、近づいたりして観察しましょう。
        </p>
      </header>

      <ul className="grid">
        {models.map((m) => (
          <li key={m.id} className="item">
            {/* rel="ar" + 最初の子が <img> が AR クイックルックの起動条件 */}
            <a rel="ar" href={m.file} className="tile" aria-label={`${m.title}をARで見る`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.thumbnail ?? placeholderThumb(m.title)}
                alt={`${m.title}の3Dモデル`}
                width={600}
                height={420}
              />
            </a>
            <h2>{m.title}</h2>
            <p>{m.description}</p>
          </li>
        ))}
      </ul>

      <footer className="foot">
        <p>
          ARで表示できるのは iPad / iPhone の Safari です。他のブラウザや端末では、モデルのファイルがダウンロードされます。
        </p>
      </footer>
    </main>
  );
}
