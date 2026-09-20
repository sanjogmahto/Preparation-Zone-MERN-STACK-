export const INITIAL_SUBJECTS = [
  {
    id: "quant-apt",
    name: "Quantitative Aptitude",
    code: "QA-101",
    category: "Aptitude",
    description:
      "Arithmetic, Percentages, Profit & Loss, Speed-Time-Distance, Permutations & Combinations, Algebra, and Number Systems.",
    icon: "Calculator",
    testCount: 6,
    questionCount: 75,
    color: "emerald",
    isActive: true,
  },
  {
    id: "logical-reas",
    name: "Logical Reasoning",
    code: "LR-102",
    category: "Aptitude",
    description:
      "Puzzles, Blood Relations, Syllogisms, Seating Arrangements, Coding-Decoding, and Direction Sense.",
    icon: "Brain",
    testCount: 6,
    questionCount: 70,
    color: "indigo",
    isActive: true,
  },
  {
    id: "verbal-ability",
    name: "Verbal Ability",
    code: "VA-103",
    category: "Aptitude",
    description:
      "Reading Comprehension, Sentence Correction, Vocabulary, Para Jumbles, Idioms, and Error Spotting.",
    icon: "BookOpen",
    testCount: 6,
    questionCount: 65,
    color: "amber",
    isActive: true,
  },
  {
    id: "general-knowledge",
    name: "General Knowledge (GK)",
    code: "GK-104",
    category: "General Studies",
    description:
      "Current Affairs, Indian Polity, History, Geography, Economics, Awards, and Important Global Organizations.",
    icon: "Globe",
    testCount: 5,
    questionCount: 60,
    color: "rose",
    isActive: true,
  },
  {
    id: "general-science",
    name: "General Science (GS)",
    code: "GS-105",
    category: "General Studies",
    description:
      "Fundamental Physics, Chemistry, Biology, Environmental Ecology, and Modern Scientific Innovations.",
    icon: "Atom",
    testCount: 5,
    questionCount: 55,
    color: "teal",
    isActive: true,
  },
  {
    id: "comp-fundamentals",
    name: "Computer Fundamentals",
    code: "CF-201",
    category: "Core CS",
    description:
      "Computer Architecture, Memory Hierarchy, Number Systems, I/O Subsystems, Logic Gates, and Hardware Basics.",
    icon: "Cpu",
    testCount: 6,
    questionCount: 65,
    color: "blue",
    isActive: true,
  },
  {
    id: "dsa",
    name: "Data Structures & Algorithms (DSA)",
    code: "CS-202",
    category: "Core CS",
    description:
      "Arrays, Linked Lists, Trees, Graphs, Sorting, Searching, Dynamic Programming, Heaps, and Time Complexity.",
    icon: "Binary",
    testCount: 7,
    questionCount: 85,
    color: "violet",
    isActive: true,
  },
  {
    id: "dbms",
    name: "Database Management Systems (DBMS)",
    code: "CS-203",
    category: "Core CS",
    description:
      "Relational Model, SQL Queries, Normalization (1NF-BCNF), ACID Properties, Transactions, Indexing, and NoSQL.",
    icon: "Database",
    testCount: 6,
    questionCount: 70,
    color: "cyan",
    isActive: true,
  },
  {
    id: "operating-systems",
    name: "Operating Systems",
    code: "CS-204",
    category: "Core CS",
    description:
      "Process Scheduling, Deadlocks, Semaphore & Synchronization, Paging, Virtual Memory, and File Systems.",
    icon: "Terminal",
    testCount: 6,
    questionCount: 70,
    color: "orange",
    isActive: true,
  },
  {
    id: "computer-networks",
    name: "Computer Networks",
    code: "CS-205",
    category: "Core CS",
    description:
      "OSI & TCP/IP Models, IP Addressing, Subnetting, Routing Protocols, TCP/UDP, DNS, HTTP, and Cryptography.",
    icon: "Network",
    testCount: 6,
    questionCount: 70,
    color: "sky",
    isActive: true,
  },
  {
    id: "oop",
    name: "Object Oriented Programming (OOP)",
    code: "CS-206",
    category: "Core CS",
    description:
      "Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID Principles, Design Patterns, and C++/Java concepts.",
    icon: "Boxes",
    testCount: 6,
    questionCount: 65,
    color: "purple",
    isActive: true,
  },
  {
    id: "software-eng",
    name: "Software Engineering",
    code: "CS-207",
    category: "Core CS",
    description:
      "SDLC Models (Agile, Waterfall), Software Testing, Unit & Integration Tests, Git versioning, CI/CD, and UML diagrams.",
    icon: "FileCode",
    testCount: 5,
    questionCount: 55,
    color: "green",
    isActive: true,
  },
  {
    id: "web-technology",
    name: "Web Technology",
    code: "CS-208",
    category: "Emerging Tech",
    description:
      "HTML5, CSS3, Modern JavaScript (ES6+), React.js, RESTful APIs, WebSockets, State Management, and Web Security.",
    icon: "Code",
    testCount: 6,
    questionCount: 65,
    color: "pink",
    isActive: true,
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    code: "CS-209",
    category: "Emerging Tech",
    description:
      "Supervised & Unsupervised Learning, Neural Networks, Loss Functions, Gradient Descent, NLP, Computer Vision, and Generative AI.",
    icon: "Sparkles",
    testCount: 6,
    questionCount: 65,
    color: "red",
    isActive: true,
  },
];
export const QUESTION_BANK = {
  "quant-apt": [
    {
      id: "qa-q1",
      subjectId: "quant-apt",
      questionText:
        "A train 180 meters long running at 54 km/h passes a platform in 24 seconds. What is the length of the platform?",
      options: [
        { id: "A", text: "180 meters" },
        { id: "B", text: "220 meters" },
        { id: "C", text: "200 meters" },
        { id: "D", text: "240 meters" },
      ],
      correctOptionId: "A",
      explanation:
        "Speed = 54 * (5/18) = 15 m/s. Distance covered in 24s = 15 * 24 = 360m. Platform length = Total distance - Train length = 360 - 180 = 180m.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "qa-q2",
      subjectId: "quant-apt",
      questionText:
        "A trader marks his goods at 25% above cost price and allows a discount of 10% on the marked price. What is his net profit percentage?",
      options: [
        { id: "A", text: "12.5%" },
        { id: "B", text: "15.0%" },
        { id: "C", text: "11.5%" },
        { id: "D", text: "10.0%" },
      ],
      correctOptionId: "A",
      explanation:
        "Let CP = 100. MP = 125. SP after 10% discount = 125 - 12.5 = 112.5. Profit = 112.5 - 100 = 12.5%.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "qa-q3",
      subjectId: "quant-apt",
      questionText:
        "If log\u2082(x) + log\u2084(x) + log\u2081\u2086(x) = 21/4, what is the value of x?",
      options: [
        { id: "A", text: "4" },
        { id: "B", text: "8" },
        { id: "C", text: "16" },
        { id: "D", text: "32" },
      ],
      correctOptionId: "B",
      explanation:
        "log\u2082(x) + 0.5 log\u2082(x) + 0.25 log\u2082(x) = (7/4) log\u2082(x) = 21/4 => log\u2082(x) = 3 => x = 2\xB3 = 8.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "qa-q4",
      subjectId: "quant-apt",
      questionText:
        "A can complete a work in 12 days and B in 18 days. They work together for 4 days, then A leaves. How many days will B take to finish the remaining work?",
      options: [
        { id: "A", text: "6 days" },
        { id: "B", text: "8 days" },
        { id: "C", text: "7.5 days" },
        { id: "D", text: "9 days" },
      ],
      correctOptionId: "B",
      explanation:
        "A rate = 1/12, B rate = 1/18. Combined 1 day work = 5/36. In 4 days work done = 20/36 = 5/9. Remaining = 4/9. Time for B = (4/9) / (1/18) = 8 days.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "qa-q5",
      subjectId: "quant-apt",
      questionText:
        "In how many ways can 5 boys and 4 girls sit in a row such that no two girls sit together?",
      options: [
        { id: "A", text: "43,200" },
        { id: "B", text: "51,840" },
        { id: "C", text: "36,000" },
        { id: "D", text: "14,400" },
      ],
      correctOptionId: "A",
      explanation:
        "Arrange 5 boys in 5! = 120 ways. They create 6 empty gaps. Select 4 gaps for 4 girls: \u2076P\u2084 = 6 * 5 * 4 * 3 = 360. Total = 120 * 360 = 43,200.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Hard",
    },
    {
      id: "qa-q6",
      subjectId: "quant-apt",
      questionText:
        "A sum of money compounded annually doubles in 5 years. In how many years will it become 8 times of itself at the same rate?",
      options: [
        { id: "A", text: "10 years" },
        { id: "B", text: "15 years" },
        { id: "C", text: "20 years" },
        { id: "D", text: "25 years" },
      ],
      correctOptionId: "B",
      explanation:
        "In compound interest, if money becomes 2^1 in 5 years, it becomes 2^3 (8 times) in 5 * 3 = 15 years.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "qa-q7",
      subjectId: "quant-apt",
      questionText:
        "Two dice are thrown simultaneously. What is the probability that the sum of points obtained is greater than 9?",
      options: [
        { id: "A", text: "1/6" },
        { id: "B", text: "1/9" },
        { id: "C", text: "5/36" },
        { id: "D", text: "1/4" },
      ],
      correctOptionId: "A",
      explanation:
        "Favorable pairs with sum 10, 11, 12 are: (4,6), (5,5), (6,4), (5,6), (6,5), (6,6) = 6 outcomes out of 36. Probability = 6/36 = 1/6.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
  ],
  "logical-reas": [
    {
      id: "lr-q1",
      subjectId: "logical-reas",
      questionText:
        'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
      options: [
        { id: "A", text: "Brother" },
        { id: "B", text: "Uncle" },
        { id: "C", text: "Father" },
        { id: "D", text: "Cousin" },
      ],
      correctOptionId: "C",
      explanation:
        "Mother's only son is Suresh himself. The boy is the son of Suresh, so Suresh is his father.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "lr-q2",
      subjectId: "logical-reas",
      questionText:
        "Statements: Some cats are dogs. All dogs are birds. Conclusions: I. Some cats are birds. II. Some birds are cats.",
      options: [
        { id: "A", text: "Only conclusion I follows" },
        { id: "B", text: "Only conclusion II follows" },
        { id: "C", text: "Neither follows" },
        { id: "D", text: "Both I and II follow" },
      ],
      correctOptionId: "D",
      explanation:
        "Intersection of cats and dogs is within birds, so some cats are definitely birds, and reciprocally some birds are cats.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "lr-q3",
      subjectId: "logical-reas",
      questionText:
        "Find the next term in the sequence: 4, 9, 25, 49, 121, 169, ?",
      options: [
        { id: "A", text: "196" },
        { id: "B", text: "225" },
        { id: "C", text: "289" },
        { id: "D", text: "361" },
      ],
      correctOptionId: "C",
      explanation:
        "These are squares of consecutive prime numbers: 2\xB2, 3\xB2, 5\xB2, 7\xB2, 11\xB2, 13\xB2, and next prime is 17\xB2 = 289.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "lr-q4",
      subjectId: "logical-reas",
      questionText:
        'If in a certain code language, "ROSE" is written as "6821", "CHAIR" is written as "73456" and "PREACH" is written as "961473", what is the code for "SEARCH"?',
      options: [
        { id: "A", text: "214673" },
        { id: "B", text: "214763" },
        { id: "C", text: "246173" },
        { id: "D", text: "216473" },
      ],
      correctOptionId: "A",
      explanation:
        "By direct letter-to-digit substitution: S=2, E=1, A=4, R=6, C=7, H=3 => 214673.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "lr-q5",
      subjectId: "logical-reas",
      questionText:
        "A person walks 10m North, turns right and walks 15m, then turns right and walks 10m. In which direction and at what distance is he from starting point?",
      options: [
        { id: "A", text: "15m East" },
        { id: "B", text: "15m West" },
        { id: "C", text: "10m East" },
        { id: "D", text: "25m North-East" },
      ],
      correctOptionId: "A",
      explanation:
        "North 10m and South 10m cancel out. The horizontal movement is 15m towards East.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "lr-q6",
      subjectId: "logical-reas",
      questionText:
        "Five friends P, Q, R, S, T are sitting in a circle facing the center. S is sitting immediately to the left of R. P is between Q and T. R is immediately to the left of P. Who is sitting to the immediate right of S?",
      options: [
        { id: "A", text: "Q" },
        { id: "B", text: "R" },
        { id: "C", text: "T" },
        { id: "D", text: "P" },
      ],
      correctOptionId: "B",
      explanation:
        "Since S is immediately left of R, looking from the center towards S, to the immediate right of S is R.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Hard",
    },
  ],
  "verbal-ability": [
    {
      id: "va-q1",
      subjectId: "verbal-ability",
      questionText:
        'Choose the word nearest in meaning (Synonym) to "EPHEMERAL":',
      options: [
        { id: "A", text: "Eternal" },
        { id: "B", text: "Transient" },
        { id: "C", text: "Monumental" },
        { id: "D", text: "Perpetual" },
      ],
      correctOptionId: "B",
      explanation:
        '"Ephemeral" means lasting for a very short time. Transient is the precise synonym.',
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "va-q2",
      subjectId: "verbal-ability",
      questionText: 'Select the antonym of the given word: "METICULOUS"',
      options: [
        { id: "A", text: "Careless" },
        { id: "B", text: "Thorough" },
        { id: "C", text: "Fastidious" },
        { id: "D", text: "Punctual" },
      ],
      correctOptionId: "A",
      explanation:
        '"Meticulous" means showing great attention to detail. Careless or sloppy is its direct antonym.',
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "va-q3",
      subjectId: "verbal-ability",
      questionText: "Identify the grammatically correct sentence:",
      options: [
        { id: "A", text: "Neither the manager nor the employees was present." },
        {
          id: "B",
          text: "Neither the manager nor the employees were present.",
        },
        { id: "C", text: "Neither the manager or the employees was present." },
        { id: "D", text: "Neither the manager nor the employees is present." },
      ],
      correctOptionId: "B",
      explanation:
        'With "neither...nor", the verb agrees with the subject closer to it. "Employees" is plural, so "were" is correct.',
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "va-q4",
      subjectId: "verbal-ability",
      questionText:
        'What is the meaning of the idiom: "Burn the midnight oil"?',
      options: [
        { id: "A", text: "To waste fuel carelessly" },
        { id: "B", text: "To study or work late into the night" },
        { id: "C", text: "To start an argument" },
        { id: "D", text: "To suffer financial ruin" },
      ],
      correctOptionId: "B",
      explanation:
        '"Burning the midnight oil" refers to working hard or studying late through the night.',
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "va-q5",
      subjectId: "verbal-ability",
      questionText: "Complete the analogy: Candid : Indirect :: Honest : ?",
      options: [
        { id: "A", text: "Frank" },
        { id: "B", text: "Deceitful" },
        { id: "C", text: "Sincere" },
        { id: "D", text: "Trustworthy" },
      ],
      correctOptionId: "B",
      explanation:
        "Candid and Indirect are antonyms. Therefore, the antonym of Honest is Deceitful.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
  ],
  "general-knowledge": [
    {
      id: "gk-q1",
      subjectId: "general-knowledge",
      questionText:
        'Which Article of the Indian Constitution is referred to as the "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar?',
      options: [
        { id: "A", text: "Article 14" },
        { id: "B", text: "Article 19" },
        { id: "C", text: "Article 32" },
        { id: "D", text: "Article 21" },
      ],
      correctOptionId: "C",
      explanation:
        "Article 32 confers the Right to Constitutional Remedies, empowering individuals to move the Supreme Court to enforce fundamental rights.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "gk-q2",
      subjectId: "general-knowledge",
      questionText:
        "Where are the headquarters of the International Court of Justice (ICJ) located?",
      options: [
        { id: "A", text: "Geneva, Switzerland" },
        { id: "B", text: "The Hague, Netherlands" },
        { id: "C", text: "New York, USA" },
        { id: "D", text: "Vienna, Austria" },
      ],
      correctOptionId: "B",
      explanation:
        "The International Court of Justice is seated at the Peace Palace in The Hague, Netherlands.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "gk-q3",
      subjectId: "general-knowledge",
      questionText: "Which planet in our solar system has the highest density?",
      options: [
        { id: "A", text: "Jupiter" },
        { id: "B", text: "Earth" },
        { id: "C", text: "Mercury" },
        { id: "D", text: "Venus" },
      ],
      correctOptionId: "B",
      explanation:
        "Earth has an average density of ~5.51 g/cm\xB3, making it the densest planet in the solar system.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "gk-q4",
      subjectId: "general-knowledge",
      questionText:
        "The Bretton Woods Conference led to the establishment of which twin financial institutions?",
      options: [
        { id: "A", text: "WTO and UNESCO" },
        { id: "B", text: "IMF and World Bank (IBRD)" },
        { id: "C", text: "OECD and ADB" },
        { id: "D", text: "UNICEF and WHO" },
      ],
      correctOptionId: "B",
      explanation:
        "In 1944 at Bretton Woods, the International Monetary Fund (IMF) and the International Bank for Reconstruction and Development (World Bank) were formed.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
  ],
  "general-science": [
    {
      id: "gs-q1",
      subjectId: "general-science",
      questionText:
        "Which component of blood is primarily responsible for blood clotting?",
      options: [
        { id: "A", text: "Erythrocytes (RBC)" },
        { id: "B", text: "Leukocytes (WBC)" },
        { id: "C", text: "Thrombocytes (Platelets)" },
        { id: "D", text: "Blood Plasma" },
      ],
      correctOptionId: "C",
      explanation:
        "Platelets (thrombocytes) aggregate and trigger the cascade resulting in fibrin meshes to clot blood.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "gs-q2",
      subjectId: "general-science",
      questionText: "What is the SI unit of electric capacitance?",
      options: [
        { id: "A", text: "Henry" },
        { id: "B", text: "Farad" },
        { id: "C", text: "Siemens" },
        { id: "D", text: "Coulomb" },
      ],
      correctOptionId: "B",
      explanation:
        "The SI unit of capacitance is the Farad (F), named after Michael Faraday.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "gs-q3",
      subjectId: "general-science",
      questionText:
        "Which gas is commonly used in modern incandescent/fluorescent lamps to prevent oxidation of filament?",
      options: [
        { id: "A", text: "Nitrogen and Argon" },
        { id: "B", text: "Chlorine" },
        { id: "C", text: "Oxygen" },
        { id: "D", text: "Carbon Dioxide" },
      ],
      correctOptionId: "A",
      explanation:
        "Inert gases like Argon mixed with Nitrogen prevent tungsten filament evaporation and burning.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
  ],
  "comp-fundamentals": [
    {
      id: "cf-q1",
      subjectId: "comp-fundamentals",
      questionText:
        "Which memory type is non-volatile, fast, and holds the bootstrap loader (BIOS/UEFI)?",
      options: [
        { id: "A", text: "SRAM" },
        { id: "B", text: "DRAM" },
        { id: "C", text: "ROM / Flash ROM" },
        { id: "D", text: "L1 Cache" },
      ],
      correctOptionId: "C",
      explanation:
        "Read-Only Memory (ROM) or Flash EEPROM retains firmware instructions even when power is turned off.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "cf-q2",
      subjectId: "comp-fundamentals",
      questionText:
        "How many distinct binary values can an 8-bit byte represent?",
      options: [
        { id: "A", text: "128" },
        { id: "B", text: "256" },
        { id: "C", text: "512" },
        { id: "D", text: "1024" },
      ],
      correctOptionId: "B",
      explanation:
        "2^8 = 256 distinct combinations (0 to 255 in unsigned notation).",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "cf-q3",
      subjectId: "comp-fundamentals",
      questionText:
        "Which register in the CPU holds the memory address of the NEXT instruction to be executed?",
      options: [
        { id: "A", text: "Memory Address Register (MAR)" },
        { id: "B", text: "Program Counter (PC)" },
        { id: "C", text: "Instruction Register (IR)" },
        { id: "D", text: "Accumulator (AC)" },
      ],
      correctOptionId: "B",
      explanation:
        "The Program Counter (PC) automatically increments to point to the address of the next instruction in sequence.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "cf-q4",
      subjectId: "comp-fundamentals",
      questionText:
        "What is the 2's complement representation of -14 in an 8-bit binary system?",
      options: [
        { id: "A", text: "11110010" },
        { id: "B", text: "11110001" },
        { id: "C", text: "10001110" },
        { id: "D", text: "11110011" },
      ],
      correctOptionId: "A",
      explanation:
        "+14 is 00001110. 1's complement is 11110001. Adding 1 yields 11110010.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
  ],
  dsa: [
    {
      id: "dsa-q1",
      subjectId: "dsa",
      questionText:
        "What is the worst-case time complexity of QuickSort when a naive first-element pivot is chosen on an already sorted array?",
      options: [
        { id: "A", text: "O(N log N)" },
        { id: "B", text: "O(N)" },
        { id: "C", text: "O(N\xB2)" },
        { id: "D", text: "O(log N)" },
      ],
      correctOptionId: "C",
      explanation:
        "When the partition is extremely skewed (1 element vs N-1 elements at each recursion level), recursion tree height is N, yielding O(N\xB2).",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "dsa-q2",
      subjectId: "dsa",
      questionText:
        "Which data structure is primarily used to implement Breadth-First Search (BFS) on a graph?",
      options: [
        { id: "A", text: "Stack" },
        { id: "B", text: "Queue" },
        { id: "C", text: "Binary Search Tree" },
        { id: "D", text: "Min-Heap" },
      ],
      correctOptionId: "B",
      explanation:
        "BFS explores neighbors level-by-level in First-In-First-Out (FIFO) order using a Queue.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "dsa-q3",
      subjectId: "dsa",
      questionText:
        "In an AVL Tree, what is the maximum permissible difference between the heights of the left and right subtrees for any node?",
      options: [
        { id: "A", text: "0" },
        { id: "B", text: "1" },
        { id: "C", text: "2" },
        { id: "D", text: "log N" },
      ],
      correctOptionId: "B",
      explanation:
        "AVL trees are strictly height-balanced trees where the Balance Factor (BF = Height(L) - Height(R)) must be in {-1, 0, +1}.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "dsa-q4",
      subjectId: "dsa",
      questionText:
        "What is the optimal time complexity to find the median of two sorted arrays of size m and n using binary search?",
      options: [
        { id: "A", text: "O(m + n)" },
        { id: "B", text: "O(log(min(m, n)))" },
        { id: "C", text: "O((m+n) log(m+n))" },
        { id: "D", text: "O(1)" },
      ],
      correctOptionId: "B",
      explanation:
        "By performing binary search on the partition cut of the smaller array, we achieve O(log(min(m, n))) time complexity.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Hard",
    },
    {
      id: "dsa-q5",
      subjectId: "dsa",
      questionText:
        "Which graph algorithm can find the shortest path from a single source to all vertices in a directed graph that contains negative edge weights (and detect negative cycles)?",
      options: [
        { id: "A", text: "Dijkstra's Algorithm" },
        { id: "B", text: "Prim's Algorithm" },
        { id: "C", text: "Bellman-Ford Algorithm" },
        { id: "D", text: "Kruskal's Algorithm" },
      ],
      correctOptionId: "C",
      explanation:
        "Bellman-Ford relaxes all edges |V| - 1 times and can safely detect negative weight cycles in O(V * E) time.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
  ],
  dbms: [
    {
      id: "dbms-q1",
      subjectId: "dbms",
      questionText:
        "Which normal form eliminates partial functional dependencies on a composite candidate key?",
      options: [
        { id: "A", text: "First Normal Form (1NF)" },
        { id: "B", text: "Second Normal Form (2NF)" },
        { id: "C", text: "Third Normal Form (3NF)" },
        { id: "D", text: "Boyce-Codd Normal Form (BCNF)" },
      ],
      correctOptionId: "B",
      explanation:
        "2NF requires relation to be in 1NF and guarantees that every non-prime attribute is fully functionally dependent on the primary key.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "dbms-q2",
      subjectId: "dbms",
      questionText:
        'What does the "I" in ACID properties of a database transaction stand for, and what does it ensure?',
      options: [
        { id: "A", text: "Integrity: database constraints are validated" },
        {
          id: "B",
          text: "Isolation: concurrent transactions do not interfere with one another",
        },
        { id: "C", text: "Indexing: fast search traversal" },
        { id: "D", text: "Idempotence: multiple runs yield same result" },
      ],
      correctOptionId: "B",
      explanation:
        "Isolation ensures that the concurrent execution of transactions results in a system state that would be obtained if transactions were executed serially.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "dbms-q3",
      subjectId: "dbms",
      questionText:
        "Which SQL clause is used to filter aggregated group records produced by a GROUP BY statement?",
      options: [
        { id: "A", text: "WHERE" },
        { id: "B", text: "HAVING" },
        { id: "C", text: "ORDER BY" },
        { id: "D", text: "FILTER" },
      ],
      correctOptionId: "B",
      explanation:
        "WHERE filters rows before aggregation; HAVING filters groups after aggregation.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "dbms-q4",
      subjectId: "dbms",
      questionText:
        "Why are B+ Trees preferred over B Trees for relational database indexing on secondary storage?",
      options: [
        {
          id: "A",
          text: "All data pointers are stored in leaf nodes and leaf nodes are linked sequentially for rapid range queries.",
        },
        {
          id: "B",
          text: "B+ trees require less main memory than binary trees.",
        },
        {
          id: "C",
          text: "B+ trees do not require node splitting on insertion.",
        },
        { id: "D", text: "B+ trees have a constant height of 1." },
      ],
      correctOptionId: "A",
      explanation:
        "In B+ trees, internal nodes only store keys (allowing higher fan-out) while leaves contain actual record pointers and are doubly linked for sequential range scans.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Hard",
    },
  ],
  "operating-systems": [
    {
      id: "os-q1",
      subjectId: "operating-systems",
      questionText:
        "Which of the following is NOT one of Coffman's four necessary conditions for Deadlock to occur?",
      options: [
        { id: "A", text: "Mutual Exclusion" },
        { id: "B", text: "Hold and Wait" },
        { id: "C", text: "Preemption Allowed" },
        { id: "D", text: "Circular Wait" },
      ],
      correctOptionId: "C",
      explanation:
        'The condition is "No Preemption" (resources cannot be forcibly taken away). "Preemption Allowed" would actually prevent deadlock.',
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "os-q2",
      subjectId: "operating-systems",
      questionText:
        "What is Belady's Anomaly in Operating Systems paging systems?",
      options: [
        {
          id: "A",
          text: "Increasing allocated page frames causes more page faults under FIFO algorithm",
        },
        { id: "B", text: "CPU utilization drops below 10% during thrashing" },
        { id: "C", text: "LRU page replacement fails on sequential scans" },
        { id: "D", text: "Paging leads to internal fragmentation" },
      ],
      correctOptionId: "A",
      explanation:
        "Belady's Anomaly is the phenomenon in FIFO page replacement where adding more physical page frames unexpectedly increases the number of page faults.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "os-q3",
      subjectId: "operating-systems",
      questionText:
        "What is the role of the Translation Lookaside Buffer (TLB)?",
      options: [
        {
          id: "A",
          text: "Cache for recently translated Virtual Page Numbers to Physical Frame Numbers",
        },
        { id: "B", text: "Buffer for disk I/O scheduling" },
        { id: "C", text: "Register file holding process control blocks" },
        { id: "D", text: "Semaphore queue" },
      ],
      correctOptionId: "A",
      explanation:
        "The TLB is a fast hardware associative cache inside the MMU used to avoid extra memory accesses when resolving virtual to physical addresses.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "os-q4",
      subjectId: "operating-systems",
      questionText:
        "Which CPU scheduling algorithm is mathematically proven to guarantee the minimal average waiting time for a given set of stationary processes?",
      options: [
        { id: "A", text: "Round Robin" },
        { id: "B", text: "First-Come-First-Served (FCFS)" },
        { id: "C", text: "Shortest Job First (SJF)" },
        { id: "D", text: "Priority Scheduling" },
      ],
      correctOptionId: "C",
      explanation:
        "SJF (or SRTF in preemptive form) is optimal because assigning shortest CPU bursts first minimizes queue wait times.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
  ],
  "computer-networks": [
    {
      id: "cn-q1",
      subjectId: "computer-networks",
      questionText:
        "At which OSI layer does the Address Resolution Protocol (ARP) primarily operate to map IP addresses to MAC addresses?",
      options: [
        { id: "A", text: "Physical Layer" },
        { id: "B", text: "Data Link Layer (Layer 2 / 2.5)" },
        { id: "C", text: "Transport Layer" },
        { id: "D", text: "Session Layer" },
      ],
      correctOptionId: "B",
      explanation:
        "ARP translates Network Layer IP addresses into Data Link Layer MAC addresses within a local broadcast domain.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "cn-q2",
      subjectId: "computer-networks",
      questionText:
        "Given the IP address 192.168.10.65 with subnet mask 255.255.255.192 (/26), what is the Network ID?",
      options: [
        { id: "A", text: "192.168.10.0" },
        { id: "B", text: "192.168.10.64" },
        { id: "C", text: "192.168.10.32" },
        { id: "D", text: "192.168.10.128" },
      ],
      correctOptionId: "B",
      explanation:
        "Mask 192 has block size 256 - 192 = 64. Subnet intervals: 0, 64, 128, 192. Host 65 belongs to subnet 192.168.10.64.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "cn-q3",
      subjectId: "computer-networks",
      questionText:
        "Which protocol utilizes a 3-way handshake (SYN, SYN-ACK, ACK) to guarantee reliable byte-stream transmission?",
      options: [
        { id: "A", text: "UDP" },
        { id: "B", text: "TCP" },
        { id: "C", text: "ICMP" },
        { id: "D", text: "IGMP" },
      ],
      correctOptionId: "B",
      explanation:
        "TCP establishes connection parameters and initializes sequence numbers using the SYN -> SYN-ACK -> ACK handshake.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "cn-q4",
      subjectId: "computer-networks",
      questionText:
        "In TCP Congestion Control, what happens immediately when a Triple Duplicate ACK is received?",
      options: [
        { id: "A", text: "Slow Start restarts with cwnd = 1 MSS" },
        {
          id: "B",
          text: "Fast Retransmit & Fast Recovery are triggered, cwnd is halved + 3 MSS",
        },
        { id: "C", text: "The connection is abruptly terminated" },
        { id: "D", text: "Window size doubles exponentially" },
      ],
      correctOptionId: "B",
      explanation:
        "Triple duplicate ACKs indicate that packet delivery is still partially working; TCP Fast Retransmit retransmits the missing segment and triggers Fast Recovery without dropping cwnd back to 1.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Hard",
    },
  ],
  oop: [
    {
      id: "oop-q1",
      subjectId: "oop",
      questionText:
        "Which OOP pillar is demonstrated when an interface or abstract base class defines a method signature that different subclasses implement in specialized ways?",
      options: [
        { id: "A", text: "Polymorphism" },
        { id: "B", text: "Encapsulation" },
        { id: "C", text: "Aggregation" },
        { id: "D", text: "Composition" },
      ],
      correctOptionId: "A",
      explanation:
        "Polymorphism allows objects of different classes to respond to the same interface or method call appropriately at runtime.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "oop-q2",
      subjectId: "oop",
      questionText: 'What does the "L" in SOLID design principles represent?',
      options: [
        { id: "A", text: "Lazy Initialization Principle" },
        { id: "B", text: "Liskov Substitution Principle" },
        { id: "C", text: "Linear Inheritance Rule" },
        { id: "D", text: "Loose Coupling Principle" },
      ],
      correctOptionId: "B",
      explanation:
        "Liskov Substitution Principle states that sub-types must be substitutable for their base types without altering program correctness.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "oop-q3",
      subjectId: "oop",
      questionText:
        "Which Design Pattern ensures a class has only one instance while providing a global point of access to it?",
      options: [
        { id: "A", text: "Factory Pattern" },
        { id: "B", text: "Singleton Pattern" },
        { id: "C", text: "Observer Pattern" },
        { id: "D", text: "Decorator Pattern" },
      ],
      correctOptionId: "B",
      explanation:
        "Singleton restricts instantiation of a class to one single instance across the entire application runtime.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
  ],
  "software-eng": [
    {
      id: "se-q1",
      subjectId: "software-eng",
      questionText:
        "In Agile Scrum framework, what is the recommended duration of a standard Sprint?",
      options: [
        { id: "A", text: "1 to 4 weeks" },
        { id: "B", text: "3 to 6 months" },
        { id: "C", text: "1 year" },
        { id: "D", text: "24 hours" },
      ],
      correctOptionId: "A",
      explanation:
        "Scrum guidelines prescribe sprints of fixed length between 1 to 4 weeks (most commonly 2 weeks).",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "se-q2",
      subjectId: "software-eng",
      questionText:
        "Which testing technique evaluates internal code logic, branches, and conditional paths without requiring GUI?",
      options: [
        { id: "A", text: "Black Box Testing" },
        { id: "B", text: "White Box (Clear Box) Testing" },
        { id: "C", text: "User Acceptance Testing" },
        { id: "D", text: "Smoke Testing" },
      ],
      correctOptionId: "B",
      explanation:
        "White box testing verifies internal paths, branch coverage, and conditions with full knowledge of source code.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "se-q3",
      subjectId: "software-eng",
      questionText:
        "What is Cyclomatic Complexity in software metrics used to measure?",
      options: [
        {
          id: "A",
          text: "Number of linearly independent paths through program source code",
        },
        { id: "B", text: "Physical lines of code" },
        { id: "C", text: "Disk size of compiled binary" },
        { id: "D", text: "Network latency during deployment" },
      ],
      correctOptionId: "A",
      explanation:
        "Cyclomatic Complexity M = E - N + 2P represents the number of independent control-flow paths.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
  ],
  "web-technology": [
    {
      id: "web-q1",
      subjectId: "web-technology",
      questionText: "In modern JavaScript, what is the output of `typeof NaN`?",
      options: [
        { id: "A", text: '"undefined"' },
        { id: "B", text: '"number"' },
        { id: "C", text: '"nan"' },
        { id: "D", text: '"object"' },
      ],
      correctOptionId: "B",
      explanation:
        'In the IEEE 754 floating point standard and ECMAScript spec, NaN (Not a Number) is a numerical data type value, so `typeof NaN === "number"`.',
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "web-q2",
      subjectId: "web-technology",
      questionText:
        "Which HTTP header is sent by servers to instruct browsers to permit cross-origin requests?",
      options: [
        { id: "A", text: "Access-Control-Allow-Origin" },
        { id: "B", text: "X-Frame-Options" },
        { id: "C", text: "Strict-Transport-Security" },
        { id: "D", text: "Content-Security-Policy" },
      ],
      correctOptionId: "A",
      explanation:
        "CORS uses `Access-Control-Allow-Origin` to notify the client browser whether requests from the calling origin are authorized.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "web-q3",
      subjectId: "web-technology",
      questionText:
        "What is the primary difference between `localStorage` and `sessionStorage` in Web Storage API?",
      options: [
        {
          id: "A",
          text: "localStorage has a 5MB limit while sessionStorage is unlimited",
        },
        {
          id: "B",
          text: "sessionStorage data expires when the browser tab or session closes, whereas localStorage persists until explicitly cleared",
        },
        { id: "C", text: "localStorage is stored on the server" },
        { id: "D", text: "sessionStorage encrypts its keys automatically" },
      ],
      correctOptionId: "B",
      explanation:
        "sessionStorage lives only as long as the window tab is open. localStorage persists indefinitely across browser restarts.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "web-q4",
      subjectId: "web-technology",
      questionText:
        "What is the Event Loop mechanism in JavaScript responsible for?",
      options: [
        { id: "A", text: "Compiling JavaScript to machine code" },
        {
          id: "B",
          text: "Monitoring the Call Stack and Task / Microtask Queues to push pending callbacks onto the stack when it is empty",
        },
        { id: "C", text: "Managing CSS layouts" },
        { id: "D", text: "Handling DOM tree generation" },
      ],
      correctOptionId: "B",
      explanation:
        "The event loop checks if the execution call stack is empty; if so, it dequeues microtasks (Promises) followed by macrotasks (setTimeout, events).",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
  ],
  "ai-ml": [
    {
      id: "aiml-q1",
      subjectId: "ai-ml",
      questionText:
        "Which activation function is most widely used in hidden layers of deep neural networks to prevent vanishing gradients while maintaining computational efficiency?",
      options: [
        { id: "A", text: "Sigmoid" },
        { id: "B", text: "Tanh" },
        { id: "C", text: "ReLU (Rectified Linear Unit)" },
        { id: "D", text: "Step Function" },
      ],
      correctOptionId: "C",
      explanation:
        "ReLU (f(x) = max(0, x)) does not saturate for positive inputs, avoiding gradient vanishing and having very fast derivative evaluation.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "aiml-q2",
      subjectId: "ai-ml",
      questionText: "In Machine Learning, what does Overfitting signify?",
      options: [
        { id: "A", text: "High training error and high test error" },
        {
          id: "B",
          text: "Low training error but high test error (poor generalization)",
        },
        { id: "C", text: "The model has too few parameters" },
        { id: "D", text: "Learning rate is set too high" },
      ],
      correctOptionId: "B",
      explanation:
        "Overfitting occurs when a complex model memorizes noise and specific details of the training set rather than learning generalized underlying patterns.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Easy",
    },
    {
      id: "aiml-q3",
      subjectId: "ai-ml",
      questionText:
        'What is the core breakthrough mechanism introduced by the Transformer architecture in "Attention Is All You Need" (Vaswani et al.)?',
      options: [
        { id: "A", text: "Recurrent hidden state loops" },
        { id: "B", text: "Scaled Dot-Product Multi-Head Self-Attention" },
        { id: "C", text: "Convolutional filter strides" },
        { id: "D", text: "Markov Decision Chains" },
      ],
      correctOptionId: "B",
      explanation:
        "Self-attention calculates pairwise relevance between all tokens simultaneously in parallel, replacing sequential RNN bottlenecks.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
    {
      id: "aiml-q4",
      subjectId: "ai-ml",
      questionText:
        "Which metric is preferred over accuracy when evaluating a machine learning classifier on an extremely imbalanced dataset (e.g., fraud detection with 99.9% negative cases)?",
      options: [
        { id: "A", text: "Raw Accuracy" },
        { id: "B", text: "F1-Score / Precision-Recall AUC" },
        { id: "C", text: "Mean Squared Error" },
        { id: "D", text: "R-squared" },
      ],
      correctOptionId: "B",
      explanation:
        "A naive model predicting negative every time would achieve 99.9% accuracy. Precision, Recall, and F1-score accurately capture true positive detection quality.",
      marks: 4,
      negativeMarks: 1,
      difficulty: "Medium",
    },
  ],
};
export function generateAllMockTests() {
  const tests = [];
  const allQuestions = [];
  const difficulties = ["Easy", "Easy", "Medium", "Medium", "Hard", "Medium"];
  const durations = [20, 30, 45, 60, 30, 40];
  const questionCounts = [10, 15, 20, 25, 15, 20];
  INITIAL_SUBJECTS.forEach((subject) => {
    for (let i = 1; i <= 6; i++) {
      const diff = difficulties[i - 1];
      const duration = durations[i - 1];
      const qCount = questionCounts[i - 1];
      const testId = `${subject.id}-mock-${i}`;
      const baseTitle = `${subject.name} - Mock Paper 0${i}`;
      const subtitle =
        diff === "Easy"
          ? "Foundations & Core Practice"
          : diff === "Medium"
            ? "Speed & Accuracy Assessment"
            : "Advanced Placement & High-Yield Problems";
      const basePool =
        QUESTION_BANK[subject.id] || QUESTION_BANK["comp-fundamentals"];
      const testQuestions = [];
      for (let qIdx = 0; qIdx < qCount; qIdx++) {
        const template = basePool[qIdx % basePool.length];
        const questionId = `${testId}-q${qIdx + 1}`;
        const q = {
          id: questionId,
          testId,
          subjectId: subject.id,
          questionText:
            qIdx < basePool.length
              ? template.questionText
              : `[Question ${qIdx + 1}] On ${subject.name}: Regarding standard principles, what is the best practice for ${template.questionText.slice(0, 40)}...?`,
          options: template.options,
          correctOptionId: template.correctOptionId,
          explanation: template.explanation,
          marks: 4,
          negativeMarks: 1,
          difficulty:
            qIdx % 3 === 0 ? "Easy" : qIdx % 3 === 1 ? "Medium" : "Hard",
        };
        testQuestions.push(q);
        allQuestions.push(q);
      }
      const test = {
        id: testId,
        title: `${baseTitle}: ${subtitle}`,
        subjectId: subject.id,
        subjectName: subject.name,
        description: `Comprehensive ${duration}-minute timed mock test for ${subject.name}. Includes ${qCount} multiple-choice questions with instant scoring, negative marking, and detailed solutions.`,
        durationMinutes: duration,
        totalMarks: qCount * 4,
        passingMarks: Math.round(qCount * 4 * 0.4),
        difficulty: diff,
        isPublished: true,
        questionCount: qCount,
        questions: testQuestions,
        createdAt: new Date(Date.now() - (7 - i) * 864e5).toISOString(),
      };
      tests.push(test);
    }
  });
  return { tests, allQuestions };
}
export const INITIAL_LEADERBOARD = [
  {
    rank: 1,
    userId: "lead-1",
    name: "Aarav Sharma",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    college: "IIT Delhi",
    testsCompleted: 42,
    averageScore: 94.2,
    totalPoints: 3956,
    accuracy: 96.4,
    streakDays: 14,
  },
  {
    rank: 2,
    userId: "lead-2",
    name: "Priya Patel",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    college: "BITS Pilani",
    testsCompleted: 38,
    averageScore: 91.8,
    totalPoints: 3488,
    accuracy: 93.5,
    streakDays: 11,
  },
  {
    rank: 3,
    userId: "lead-3",
    name: "Rohan Verma",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
    college: "NIT Trichy",
    testsCompleted: 35,
    averageScore: 88.5,
    totalPoints: 3097,
    accuracy: 89.2,
    streakDays: 8,
  },
  {
    rank: 4,
    userId: "lead-4",
    name: "Ananya Deshmukh",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80",
    college: "DTU Delhi",
    testsCompleted: 31,
    averageScore: 86.4,
    totalPoints: 2678,
    accuracy: 87,
    streakDays: 6,
  },
  {
    rank: 5,
    userId: "lead-5",
    name: "Karthik Nair",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    college: "VIT Vellore",
    testsCompleted: 29,
    averageScore: 84.1,
    totalPoints: 2438,
    accuracy: 85.3,
    streakDays: 5,
  },
  {
    rank: 6,
    userId: "lead-6",
    name: "Sneha Roy",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    college: "IIIT Hyderabad",
    testsCompleted: 26,
    averageScore: 82,
    totalPoints: 2132,
    accuracy: 83.8,
    streakDays: 4,
  },
  {
    rank: 7,
    userId: "lead-7",
    name: "Vikram Singh",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    college: "Jadavpur University",
    testsCompleted: 22,
    averageScore: 80.5,
    totalPoints: 1771,
    accuracy: 81,
    streakDays: 3,
  },
];
