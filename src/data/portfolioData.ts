export interface EditableProfile {
  collegeName: string;
  registrationNumber: string;
  email: string;
  linkedin: string;
  certificateNoteOne: string;
  certificateNoteTwo: string;
}

export const DEFAULT_PROFILE: EditableProfile = {
  collegeName: '[College / University Name]',
  registrationNumber: '[Registration Number]',
  email: '[your.email@example.com]',
  linkedin: '[linkedin.com/in/your-profile]',
  certificateNoteOne: '[Upcoming Certificate — Python Programming Foundations]',
  certificateNoteTwo: '[Upcoming Certificate — Generative AI & Machine Learning]',
};

export const GITHUB_URL = 'https://github.com/malla-divyasushma';

export type SkillCategory = 'All' | 'Programming' | 'Web' | 'AI Concepts';

export interface SkillItem {
  id: string;
  name: string;
  level: string;
  category: Exclude<SkillCategory, 'All'>;
  summary: string;
  focusAreas: string[];
}

export const SKILLS: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    level: 'Beginner',
    category: 'Programming',
    summary:
      'Writing clean starter scripts and building algorithmic confidence through foundational syntax and structured logic.',
    focusAreas: ['Variables & data types', 'Conditionals & loops', 'Functions & input validation'],
  },
  {
    id: 'html',
    name: 'HTML',
    level: 'Foundational',
    category: 'Web',
    summary:
      'Structuring semantic, accessible web documents with clear content hierarchy and standards-compliant markup.',
    focusAreas: ['Semantic landmarks', 'Forms & accessible labels', 'Document structure'],
  },
  {
    id: 'css',
    name: 'CSS',
    level: 'Foundational',
    category: 'Web',
    summary:
      'Designing responsive, readable interfaces using modern layout systems, spacing scale, and dark-theme contrast.',
    focusAreas: ['Flexbox & CSS Grid', 'Responsive breakpoints', 'Visual typography & glass surfaces'],
  },
  {
    id: 'genai',
    name: 'Generative AI',
    level: 'Basic',
    category: 'AI Concepts',
    summary:
      'Exploring foundational large language model concepts, structured prompting, and AI-assisted study workflows.',
    focusAreas: ['Structured prompt design', 'Concept verification', 'Foundational LLM literacy'],
  },
];

export interface ProjectItem {
  id: 'student-grade-calculator' | 'python-basic-calculator';
  title: string;
  context: string;
  status: 'Completed Learning Project' | 'In Progress';
  image: string;
  imageAlt: string;
  description: string;
  highlights: string[];
  codeSnippet: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'student-grade-calculator',
    title: 'Student Grade Calculator',
    context: 'Python · Generative AI Learning Project',
    status: 'Completed Learning Project',
    image: '/src/assets/images/project_grade_visual_1794826013455.jpg',
    imageAlt: 'Isometric dark glass planes with electric blue grid geometry representing structured grade calculation',
    description:
      'A Python learning project designed to evaluate student subject scores, calculate averages, and assign letter grades with clean range validation. Generative AI tools were used during study to review boundary conditions and improve code readability.',
    highlights: [
      'Validates numeric score ranges (0 to 100) before grading',
      'Applies clear conditional thresholds from A+ through F',
      'Practiced iterative prompt-guided debugging and edge-case testing',
    ],
    codeSnippet: `def calculate_grade(score: float) -> str:
    if not 0 <= score <= 100:
        raise ValueError("Score must be between 0 and 100")
    if score >= 90:
        return "A+ (Outstanding)"
    elif score >= 80:
        return "A (Excellent)"
    elif score >= 70:
        return "B (Good)"
    elif score >= 60:
        return "C (Satisfactory)"
    elif score >= 50:
        return "D (Pass)"
    return "F (Needs Improvement)"

def evaluate_subjects(marks: list[float]) -> tuple[float, str]:
    average = sum(marks) / len(marks)
    return round(average, 2), calculate_grade(average)`,
  },
  {
    id: 'python-basic-calculator',
    title: 'Python Basic Calculator',
    context: 'Python · Core Programming Logic',
    status: 'In Progress',
    image: '/src/assets/images/project_calc_visual_1794826013110.jpg',
    imageAlt: 'Balanced mathematical grid of dark obsidian glass blocks with violet and cobalt highlights',
    description:
      'An ongoing Python command-line calculator project focused on modular arithmetic functions, user input parsing, and safe handling of division-by-zero exceptions as part of first-year programming practice.',
    highlights: [
      'Separate pure functions for add, subtract, multiply, and divide',
      'Explicit zero-division guard with clear user feedback',
      'Planned next step: expression history loop and unit tests',
    ],
    codeSnippet: `def add(a: float, b: float) -> float:
    return a + b

def subtract(a: float, b: float) -> float:
    return a - b

def multiply(a: float, b: float) -> float:
    return a * b

def divide(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b`,
  },
];

export interface MilestoneItem {
  index: string;
  title: string;
  timeframe: string;
  description: string;
}

export const LEARNING_MILESTONES: MilestoneItem[] = [
  {
    index: '01',
    title: 'Began B.Tech in Computer Science',
    timeframe: 'Year 1 · Academic Foundation',
    description:
      'Started undergraduate studies in Computer Science, building core habits in structured problem solving and computing fundamentals.',
  },
  {
    index: '02',
    title: 'Built First Python Logic Projects',
    timeframe: 'Programming Practice',
    description:
      'Transitioned from syntax exercises to writing functional Python scripts with input validation, conditionals, and modular functions.',
  },
  {
    index: '03',
    title: 'Explored Generative AI Fundamentals',
    timeframe: 'AI Literacy',
    description:
      'Started studying how Generative AI models assist software learning workflows through structured prompting and careful code verification.',
  },
  {
    index: '04',
    title: 'Developed Responsive Web Portfolio',
    timeframe: 'Web Development',
    description:
      'Applied HTML, CSS, and modern frontend structure to publish an honest, maintainable home for coursework and future projects.',
  },
];
