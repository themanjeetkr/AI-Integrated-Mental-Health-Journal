require("dotenv").config();
const analyzeJournal = require("./utils/aiAnalysis");

(async () => {
  const result = await analyzeJournal(
    "I feel very stressed and lonely today"
  );
  console.log(result);
})();