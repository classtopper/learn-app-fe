import rawCategories from "@/data/french-categories.json";

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
                French
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
            {category?.words.map(([french, english], i) => (
              <tr key={i}>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "6px",
                    fontWeight: 500,
                  }}
                >
                  {french}
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

const FrenchGrammarSection = () => (
  <div style={{ 
    padding: "2rem", 
    backgroundColor: "#f0f8ff",
    marginBottom: "2rem",
    borderRadius: "8px",
    border: "1px solid #ddd"
  }}>
    <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
      🇫🇷 French Grammar Basics: Verbs, Articles & Gender
    </h2>

    <h3 style={{ marginTop: "1.5rem" }}>1. French Articles</h3>
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Type</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Masculine</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Feminine</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Plural</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Definite</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>le (l&apos;)</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>la (l&apos;)</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>les</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Indefinite</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>un</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>une</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>des</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Partitive</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>du (de l&apos;)</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>de la (de l&apos;)</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>des</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 style={{ marginTop: "1.5rem" }}>2. Verb Conjugation (Present Tense)</h3>
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
      <div style={{ flex: "1 1 300px", padding: "1rem", backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #eee" }}>
        <h4 style={{ marginBottom: "0.5rem" }}>Être (to be)</h4>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li>Je <strong>suis</strong></li>
          <li>Tu <strong>es</strong></li>
          <li>Il/Elle <strong>est</strong></li>
          <li>Nous <strong>sommes</strong></li>
          <li>Vous <strong>êtes</strong></li>
          <li>Ils/Elles <strong>sont</strong></li>
        </ul>
      </div>
      <div style={{ flex: "1 1 300px", padding: "1rem", backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #eee" }}>
        <h4 style={{ marginBottom: "0.5rem" }}>Avoir (to have)</h4>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li>J&apos;<strong>ai</strong></li>
          <li>Tu <strong>as</strong></li>
          <li>Il/Elle <strong>a</strong></li>
          <li>Nous <strong>avons</strong></li>
          <li>Vous <strong>avez</strong></li>
          <li>Ils/Elles <strong>ont</strong></li>
        </ul>
      </div>
      <div style={{ flex: "1 1 300px", padding: "1rem", backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #eee" }}>
        <h4 style={{ marginBottom: "0.5rem" }}>Parler (to speak)</h4>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li>Je <strong>parle</strong></li>
          <li>Tu <strong>parles</strong></li>
          <li>Il/Elle <strong>parle</strong></li>
          <li>Nous <strong>parlons</strong></li>
          <li>Vous <strong>parlez</strong></li>
          <li>Ils/Elles <strong>parlent</strong></li>
        </ul>
      </div>
    </div>

    <h3 style={{ marginTop: "1.5rem" }}>3. Common French Verbs</h3>
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 300px", padding: "1rem", backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #eee" }}>
        <h4 style={{ marginBottom: "0.5rem" }}>-er Verbs (1st group)</h4>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li><strong>manger</strong> (to eat)</li>
          <li><strong>regarder</strong> (to watch)</li>
          <li><strong>habiter</strong> (to live)</li>
          <li><strong>aimer</strong> (to like/love)</li>
          <li><strong>travailler</strong> (to work)</li>
        </ul>
      </div>
      <div style={{ flex: "1 1 300px", padding: "1rem", backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #eee" }}>
        <h4 style={{ marginBottom: "0.5rem" }}>-ir Verbs (2nd group)</h4>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li><strong>finir</strong> (to finish)</li>
          <li><strong>choisir</strong> (to choose)</li>
          <li><strong>réussir</strong> (to succeed)</li>
          <li><strong>grandir</strong> (to grow)</li>
          <li><strong>remplir</strong> (to fill)</li>
        </ul>
      </div>
      <div style={{ flex: "1 1 300px", padding: "1rem", backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #eee" }}>
        <h4 style={{ marginBottom: "0.5rem" }}>Irregular Verbs (3rd group)</h4>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li><strong>aller</strong> (to go)</li>
          <li><strong>venir</strong> (to come)</li>
          <li><strong>prendre</strong> (to take)</li>
          <li><strong>voir</strong> (to see)</li>
          <li><strong>pouvoir</strong> (can)</li>
        </ul>
      </div>
    </div>
  </div>
);

const French = () => {
  const paired: [typeof categories[0], typeof categories[0]?][] = [];
  for (let i = 0; i < categories.length; i += 2) {
    paired.push([categories[i], categories[i + 1]]);
  }

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <FrenchGrammarSection />
      <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
        🇫🇷 Learn 1000 French – Basic Words by Category
      </h2>
      {paired.map(([left, right], idx) => (
        <TablePair key={idx} left={left} right={right} />
      ))}
    </div>
  );
};

export default French;