// src/app/components/English.tsx
import rawCategories from "@/data/english-categories.json";

type Category = {
  title: string;
  words: [string, string][];
};

const categories = rawCategories as Category[];

const TablePair = ({
  left,
  right,
}: {
  left: Category;
  right?: Category;
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
              <th style={{ borderBottom: "2px solid #333", padding: "8px", textAlign: "left" }}>English</th>
              <th style={{ borderBottom: "2px solid #333", padding: "8px", textAlign: "left" }}>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {category?.words.map(([word, meaning], i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #ccc", padding: "6px", fontWeight: 500 }}>{word}</td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

const EnglishGrammarSection = () => (
  <div style={{ 
    padding: "2rem", 
    backgroundColor: "#f0f8ff",
    marginBottom: "2rem",
    borderRadius: "8px",
    border: "1px solid #ddd"
  }}>
    <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
      🇬🇧 English Grammar Basics: Verbs, Articles & Cases
    </h2>

    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
      <div style={{ flex: "1 1 300px", padding: "1rem", backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #eee" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Common Verbs</h3>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li><strong>Action verbs:</strong> run, eat, write, speak</li>
          <li><strong>Helping verbs:</strong> be, have, do, can, will</li>
          <li><strong>Linking verbs:</strong> seem, become, appear, feel</li>
          <li><strong>Irregular verbs:</strong> go/went, see/saw, take/took</li>
        </ul>
      </div>

      <div style={{ flex: "1 1 300px", padding: "1rem", backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #eee" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Nouns</h3>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li><strong>Common:</strong> city, book, teacher</li>
          <li><strong>Proper:</strong> London, Harry Potter, Mr. Smith</li>
          <li><strong>Countable:</strong> apple/apples, car/cars</li>
          <li><strong>Uncountable:</strong> water, information, advice</li>
        </ul>
      </div>
    </div>

    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 300px", padding: "1rem", backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #eee" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Pronouns</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "6px", textAlign: "left" }}>Type</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "6px", textAlign: "left" }}>Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #eee", padding: "6px" }}>Personal</td>
              <td style={{ border: "1px solid #eee", padding: "6px" }}>I, you, he, she, it, we, they</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #eee", padding: "6px" }}>Possessive</td>
              <td style={{ border: "1px solid #eee", padding: "6px" }}>my, your, his, her, its, our, their</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #eee", padding: "6px" }}>Reflexive</td>
              <td style={{ border: "1px solid #eee", padding: "6px" }}>myself, yourself, himself, herself</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ flex: "1 1 300px", padding: "1rem", backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #eee" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Articles</h3>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li><strong>Definite:</strong> the (specific things)</li>
          <li><strong>Indefinite:</strong> a/an (non-specific things)</li>
          <li><strong>Zero article:</strong> (general concepts, plural nouns)</li>
        </ul>
        <h4 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>Examples:</h4>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li>&quot;The book on the table&quot; (specific)</li>
          <li>&quot;A book would make a good gift&quot; (any book)</li>
          <li>&quot;Books are important&quot; (general)</li>
        </ul>
      </div>
    </div>
  </div>
);

const English = () => {
  const paired: [Category, Category?][] = [];
  for (let i = 0; i < categories.length; i += 2) {
    paired.push([categories[i], categories[i + 1]]);
  }

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <EnglishGrammarSection />
      <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
        🇬🇧 English Basic Words by Category
      </h2>
      {paired.map(([left, right], idx) => (
        <TablePair key={idx} left={left} right={right} />
      ))}
    </div>
  );
};

export default English;
