// src/app/components/German.tsx

import rawCategories from "@/data/german-categories.json";

type Category = {
  title: string;
  words: [string, string][];
};

const categories = rawCategories as Category[];

const TablePair = ({
  left,
  right,
}: {
  left: typeof categories[0];
  right?: typeof categories[0];
}) => (
  <div
    style={{
      display: "flex",
      gap: "2rem",
      marginBottom: "2rem",
      flexWrap: "wrap",
    }}
  >
    {[left, right].filter(Boolean).map((category, index) => (
      <div
        key={index}
        style={{
          flex: "1 1 300px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "1rem",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>
          {category?.title}
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  borderBottom: "2px solid #333",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                German
              </th>
              <th
                style={{
                  borderBottom: "2px solid #333",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                English
              </th>
            </tr>
          </thead>
          <tbody>
            {category?.words.map(([german, english], i) => (
              <tr key={i}>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "6px",
                    fontWeight: 500,
                  }}
                >
                  {german}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>
                  {english}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

const GermanGrammarSection = () => (
  <div style={{ 
    padding: "2rem", 
    backgroundColor: "#f0f8ff",
    marginBottom: "2rem",
    borderRadius: "8px",
    border: "1px solid #ddd"
  }}>
    <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
      🇩🇪 German Grammar Basics: Verbs, Articles & Cases
    </h2>

    <h3 style={{ marginTop: "1.5rem" }}>1. German Articles</h3>
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Case</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Masculine</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Feminine</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Neuter</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Plural</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Nominative</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>der / ein</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>die / eine</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>das / ein</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>die / (keine)</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Accusative</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>den / einen</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>die / eine</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>das / ein</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>die / (keine)</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Dative</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>dem / einem</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>der / einer</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>dem / einem</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>den / (keinen)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 style={{ marginTop: "1.5rem" }}>2. Accusative vs. Dative Examples</h3>
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Verb</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Accusative Example</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Dative Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>geben (to give)</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Ich gebe <strong>den Ball</strong> (A).</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Ich gebe <strong>dem Kind</strong> (D) den Ball.</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>schenken (to gift)</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Er schenkt <strong>ein Buch</strong> (A).</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Er schenkt <strong>seiner Freundin</strong> (D) ein Buch.</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>zeigen (to show)</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Ich zeige <strong>das Bild</strong> (A).</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Ich zeige <strong>meinem Freund</strong> (D) das Bild.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 style={{ marginTop: "1.5rem" }}>3. Common Verbs with Cases</h3>
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 300px", padding: "1rem", backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #eee" }}>
        <h4 style={{ marginBottom: "0.5rem" }}>Accusative Verbs</h4>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li><strong>haben</strong> (to have) → Ich habe <strong>einen Hund</strong>.</li>
          <li><strong>sehen</strong> (to see) → Wir sehen <strong>den Film</strong>.</li>
          <li><strong>kaufen</strong> (to buy) → Sie kauft <strong>eine Tasche</strong>.</li>
        </ul>
      </div>
      <div style={{ flex: "1 1 300px", padding: "1rem", backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #eee" }}>
        <h4 style={{ marginBottom: "0.5rem" }}>Dative Verbs</h4>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li><strong>helfen</strong> (to help) → Ich helfe <strong>meiner Mutter</strong>.</li>
          <li><strong>danken</strong> (to thank) → Er dankt <strong>seinem Lehrer</strong>.</li>
          <li><strong>gehören</strong> (to belong) → Das gehört <strong>mir</strong>.</li>
        </ul>
      </div>
    </div>
  </div>
);

const German = () => {
  const paired: [typeof categories[0], typeof categories[0]?][] = [];
  for (let i = 0; i < categories.length; i += 2) {
    paired.push([categories[i], categories[i + 1]]);
  }

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <GermanGrammarSection />
      <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
        🇩🇪 Learn 1000 German – Basic Words by Category
      </h2>
      {paired.map(([left, right], idx) => (
        <TablePair key={idx} left={left} right={right} />
      ))}
    </div>
  );
};

export default German;
