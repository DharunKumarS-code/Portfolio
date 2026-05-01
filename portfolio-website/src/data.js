export const projects = [
  {
    id: 1,
    title: 'AI Resume Screening Chatbot',
    description: 'Intelligent chatbot that screens multiple resumes using RAG pipelines, semantic search, and automatic skill extraction to match candidates efficiently.',
    tech: ['Python', 'Streamlit', 'LangChain', 'FAISS', 'HuggingFace', 'Groq LLaMA 3.1'],
    features: ['Upload multiple PDFs', 'Semantic candidate matching', 'Auto skill & experience extraction'],
    category: 'AI/ML',
    featured: true,
    github: 'https://github.com/dharunkumar',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    id: 2,
    title: 'Sales Performance Dashboard',
    description: 'Interactive Power BI dashboard delivering deep business insights through KPI tracking, regional analysis, and time-based sales visualization.',
    tech: ['Power BI', 'DAX', 'Data Modeling', 'Excel'],
    features: ['KPI tracking (revenue, growth)', 'Region & time-based analysis', 'Business decision insights'],
    category: 'Data Analytics',
    featured: true,
    github: 'https://github.com/dharunkumar',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 3,
    title: 'Healthcare AI Solution',
    description: 'AI-powered healthcare analytics platform providing data-driven insights for diagnosis support, improving clinical efficiency and decision-making.',
    tech: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn'],
    features: ['Predictive health analytics', 'Data-driven diagnosis support', 'Efficiency optimization'],
    category: 'AI/ML',
    featured: false,
    github: 'https://github.com/dharunkumar',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 4,
    title: 'Task Management System',
    description: 'Enterprise-grade task and project management software with full SRS documentation, version control integration, and team collaboration features.',
    tech: ['Java', 'Git', 'GitHub', 'SRS Documentation'],
    features: ['Project & task tracking', 'Version control integration', 'Team collaboration'],
    category: 'Software Dev',
    featured: false,
    github: 'https://github.com/dharunkumar',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 5,
    title: 'Kem — Action Item Generator',
    description: 'Concept product that transforms unstructured meeting notes, emails, and chats into structured, actionable tasks using NLP.',
    tech: ['Python', 'NLP', 'LangChain', 'Streamlit'],
    features: ['Meeting notes → tasks', 'Email & chat parsing', 'Actionable output generation'],
    category: 'AI/ML',
    featured: false,
    github: 'https://github.com/dharunkumar',
    color: 'from-sky-500 to-blue-600',
  },
]

export const skills = [
  { category: 'Programming', items: ['Python', 'Java'] },
  { category: 'AI / ML', items: ['NLP', 'RAG Pipelines', 'Embeddings', 'LangChain', 'FAISS'] },
  { category: 'Data Tools', items: ['Power BI', 'Pandas', 'Scikit-learn', 'Excel'] },
  { category: 'Dev Tools', items: ['Git', 'GitHub', 'Streamlit', 'VS Code'] },
  { category: 'Concepts', items: ['Data Structures', 'Analytics', 'CI/CD Basics', 'OOP'] },
]

export const experience = [
  {
    title: 'AI & RAG Pipeline Development',
    desc: 'Built production-ready RAG systems using LangChain, FAISS vector stores, and HuggingFace embeddings with Groq LLaMA 3.1 inference.',
    icon: '🤖',
  },
  {
    title: 'Data Analytics & Visualization',
    desc: 'Designed interactive Power BI dashboards with DAX measures, KPI cards, and drill-through reports for business stakeholders.',
    icon: '📊',
  },
  {
    title: 'DevOps & CI/CD Basics',
    desc: 'Practiced Git-based workflows, branching strategies, and CI/CD fundamentals for collaborative software development.',
    icon: '⚙️',
  },
  {
    title: 'Software Engineering',
    desc: 'Applied SRS documentation, agile principles, and version control in team projects with structured development cycles.',
    icon: '💻',
  },
]
