import { Event, EventCategory, Speaker, ScheduleItem, Sponsor } from './types';

export const SYMPOSIUM_DATE = "2026-02-20T09:00:00";
export const VENUE_LOCATION = "Department of Electrical and Electronics Engineering, Government College of Engineering, Erode – 638316";

export const EVENTS: Event[] = [
  {
    id: "tech-hunt",
    title: "TECH HUNT",
    whatsappLink: "https://chat.whatsapp.com/HoiclgPoIm6E66eAsU9CJk",
    description: "A challenging multi-round competition designed to test your logic, facts, and quick thinking. The hunt is on !!",
    category: EventCategory.TECHNICAL,
    maxMembers: 2,
    fee: 250,
    prize: "Certificate + Cash Prize",
    timing: "10:30 AM",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    rounds: [
      {
        name: "ROUND 1: THE QUALIFIER",
        details: "Format: A traditional pen-and-paper challenge. Structure: 30 questions to be answered in 30 minutes. Topics: A mix of current affairs, general knowledge, and technical concepts. Note: Questions may be multiple-choice (MCQs) where applicable."
      },
      {
        name: "ROUND 2: THE TECHNICAL DEEP-DIVE",
        details: "Format: Pen-and-paper round for qualifying teams. Structure: 15 complex questions to be answered in 45 minutes. Topics: Exclusively focused on technical subjects. Note: Options may be provided for specific questions."
      }
    ],
    rules: [
      "Language of the questions are in English.",
      "Participants must wear your college ID card.",
      "Mobile phones and electronic devices are strictly prohibited.",
      "Teams must strictly adhere to the allocated time limits.",
      "Any form of malpractice or cheating will lead to immediate disqualification.",
      "The judges' decisions are final and binding.",
      "Participation certificate will be provided."
    ],
    coordinators: [
      { name: "SUNDHARAMOORTHI K", phone: "8248121866" }
    ]
  },
  {
    id: "embedded-mind",
    title: "EMBEDDED MIND",
    whatsappLink: "https://chat.whatsapp.com/IOl3b8G0o09LS6enAhgSOj",
    description: "Embedded Mind is a logic-based technical event that challenges participants to think like an embedded engineer using C programming concepts. The event focuses on output prediction, decision making, and system behavior analysis, without writing complex code. Fun puzzles and real-time embedded scenarios make this event beginner-friendly, engaging, and thought-provoking.",
    slogan: "Basics of C. Brains of embedded",
    category: EventCategory.TECHNICAL,
    maxMembers: 2,
    fee: 250,
    prize: "Certificate + Cash Prize",
    timing: "11:00 AM",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    rounds: [
      {
        name: "ROUND 1",
        details: "1.Each team can have 2 members only. 2.The round is conducted in buzzer format; the first team to buzz gets to answer. 3.Questions include C logic riddles, output prediction, and pattern puzzles. 4.No coding or syntax required, only thinking. 5.The use of any electronic gadgets is strictly prohibited."
      },
      {
        name: "ROUND 2",
        details: "1.Only teams selected from Round 1 are eligible to participate. 2.Participants will be presented with C code snippets and embedded system scenarios; they must mentally simulate the program and predict the system/device output. 4.Accuracy and speed will determine the score. 5.Correct answers carry full points, and faster responses may earn tie-breaker advantages."
      }
    ],
    rules: [
      "No coding or syntax required, only thinking.",
      "the use of any electronic gadgets is strictly prohibited.",
      "Coordinator’s decision is final."
    ],
    coordinators: [
      { name: "Barath Kumar M", phone: "6380616416" }
    ]
  },
  {
    id: "memory-matrix",
    title: "MEMORY MATRIX",
    whatsappLink: "https://chat.whatsapp.com/DzQ8iWwPgQ2BswxL9NFnV0",
    description: "Memory Matrix is a fun non-technical event to test participants’ memory and observation skills. Images will be displayed for a short time and participants must recall them correctly. Difficulty level increases round by round.",
    category: EventCategory.NON_TECHNICAL,
    maxMembers: 2,
    fee: 150,
    prize: "Certificate + Cash Prize",
    timing: "02:00 PM",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
    rounds: [
      {
        name: "ROUND 1: PICTURE ARRANGEMENT",
        details: "1)Pictures will be shown in a specific order on the screen. 2)Same pictures will be shuffled and given to the participants. 3)Participants must arrange them in the correct order."
      },
      {
        name: "ROUND 2: RECALL & WRITE",
        details: "1)Images will be displayed through PPT. 2)After slides end, participants must write the correct answers on paper."
      }
    ],
    rules: [
      "Mobile phones are strictly prohibited.",
      "Time limit must be followed.",
      "Malpractice leads to disqualification.",
      "Coordinator’s decision is final."
    ],
    coordinators: [
      { name: "GOKUL RAJ M", phone: "9025280584" }
    ]
  },
  {
    id: "guess-the-gadget",
    title: "GUESS THE GADGET",
    whatsappLink: "https://chat.whatsapp.com/J76CCGv8YuJ56ZjXmSyl0E",
    description: "Guess the Gadget is an interactive and fun-based technical event where participants identify various electronic gadgets using a series of clues. The clues are designed to test participants’ general awareness, logical thinking, and observation skills without requiring deep technical knowledge. The event is conducted in multiple stages with increasing difficulty, and participants are gradually eliminated based on their performance.",
    slogan: "Think smart. Guess fast. No googling",
    category: EventCategory.NON_TECHNICAL,
    maxMembers: 2,
    fee: 150,
    prize: "Certificate + Cash Prize",
    timing: "10:00 AM",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    rounds: [
      {
        name: "ROUND 1",
        details: "You will be given 3 simple clues. The gadget is something commonly used in daily life. Think fast and shout out / write your answer. Only one guess is allowed."
      },
      {
        name: "ROUND 2",
        details: "You will be given 3 technical clues. The gadget is used for work or studies. Discuss for 10–15 seconds before answering. No hints will be given."
      }
    ],
    rules: [
      "One guess per clue.",
      "Think smart. Guess fast. No googling.",
      "Winner identified by max correct gadget identification."
    ],
    coordinators: [
      { name: "Saravana bala S", phone: "9080046138" }
    ]
  },
  {
    id: "paper-xpose",
    title: "PAPERXPOSE",
    whatsappLink: "https://chat.whatsapp.com/FiPNsYv95y4GMWzAlnh51e",
    description: "PaperXpose is a platform where participants present their own innovative concepts and ideas through a paper presentation. The event encourages creativity, originality, and clear expression of ideas. Participants can showcase their thinking skills and present their concepts confidently before judges. PaperXpose helps students improve research, communication, and presentation abilities.",
    slogan: "Expose Your Ideas. Express Your Innovation. Think It, Ink It, Win It!",
    category: EventCategory.TECHNICAL,
    maxMembers: 4,
    fee: 250,
    prize: "Certificate + Cash Prize",
    timing: "10:00 AM",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    rules: [
      "Team size: Maximum 3 or 4 members.",
      "Abstract should be submitted in PDF and PPT format (6-7) slides.",
      "Topics should be related to EEE and emerging technologies.",
      "Presentation must be in PPT format (5–7 minutes).",
      "Judging will be based on content, innovation, and presentation skills.",
      "Certificates will be provided to all participants.",
      "College ID card is mandatory for participation.",
      "The decision of the judges will be final.",
      "Paper abstract should be sent before 19 feb on gceelixir26@gmail.com"
    ],
    coordinators: [
      { name: "PALANI R", phone: "8682938618" }
    ]
  },
  {
    id: "project-display",
    title: "PROJECT DISPLAY",
    whatsappLink: "https://chat.whatsapp.com/DjHbLLT6NurKvf9Lav76CV",
    description: "Project Display is a platform where participants showcase their projects and working models to demonstrate practical applications of their ideas. The event encourages innovation, creativity, and hands-on problem solving. Participants explain their project concepts, design, and implementation clearly before judges. Project Display helps students enhance technical knowledge, teamwork, communication, and presentation skills.",
    slogan: "Show Your Skills. Share Your Vision. Learn. Create. Present.",
    category: EventCategory.TECHNICAL,
    maxMembers: 4,
    fee: 250,
    prize: "Certificate + Cash Prize",
    timing: "10:00 AM",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    rules: [
      "1.A team may consist of a maximum of 3–4 members.",
      "2.The abstract must not exceed 400 words.",
      "3.Each team will be given 5–6 minutes for project presentation.",
      "4.A valid college identity card is mandatory for all participants.",
      "5.A hardware prototype or working model must be displayed on the day of the event.",
      "6.Project PPT presentation is optional.",
      "7.All team members must participate equally in the presentation.",
      "8.Projects will be evaluated based on innovation, technical content, working demonstration, and clarity of presentation.",
      "Note: Only one registration per team is required; individual registration of participants is not necessary."
    ],
    coordinators: [
      { name: "Akash S", phone: "9677132896" }
    ]
  },
  {
    id: "short-film",
    title: "SHORT FILM EVENT",
    whatsappLink: "https://chat.whatsapp.com/BvciWK0VlU20V0FxqWBJtj",
    description: "Showcase your cinematic vision and storytelling skills. Open to all students who want to convey a powerful message through the lens.",
    category: EventCategory.NON_TECHNICAL,
    maxMembers: 5,
    fee: 150,
    prize: "Certificate + Cash Prize",
    timing: "02:00 PM",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    rules: [
      "👥 Team Members: 1 to 5 members per team. Students from any department/college can participate.",
      "⏱️ Duration: Film should be 3 to 8 minutes only. More than 8 minutes = marks will be reduced or rejected.",
      "🎯 Theme: Open theme (any good story with a message).",
      "🗣️ Language: Any language is allowed. If not in English, English subtitles are needed.",
      "💾 Video Format: Submit in MP4 format. Minimum quality: HD (1080p). Bring the film in a pen drive on event day also.",
      "✨ Original Work: Film must be your own work. No copied story, scenes, or videos. Copy content = disqualification.",
      "🚫 Don’t Include: Vulgar or obscene scenes, Religious or political insults, Too much violence, Anything that hurts others.",
      "🎵 Music: Use copyright-free music or give proper credits."
    ],
    coordinators: [
      { name: "Midhun.R", phone: "9787671962" }
    ]
  },
  {
    id: "mystery-box",
    title: "MYSTERY BOX",
    whatsappLink: "https://chat.whatsapp.com/C29zQ3jszmI77CQ7kt3Eqq",
    description: "The Mystery Box is a fun-filled and exciting non-technical event designed to entertain participants and the audience. In this event, participants will choose a sealed mystery box without knowing what is inside. Each mystery box contains a paper with a small game or fun challenge written on it. After opening the box, the participant must perform the given task within the allotted time. Correct answers or successful performances will earn points.",
    slogan: "Pick a box, face the surprise, and let the fun begin!",
    category: EventCategory.NON_TECHNICAL,
    maxMembers: 2,
    fee: 150,
    prize: "Certificate + Cash Prize",
    timing: "11:30 AM",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
    rounds: [
      {
        name: "ROUND 1, 2, & 3",
        details: "The event will be conducted in three rounds, each with its own set of rules and increasing difficulty."
      }
    ],
    rules: [
      "1. No mobile phones allowed",
      "2. No hints from audience",
      "3. Task must be completed within time",
      "4. Misconduct leads to disqualification.",
      "5. Participants must follow organizer instructions.",
      "Participants: Team -2 members & Time - Round based"
    ],
    coordinators: [
      { name: "Saru Nithish R", phone: "7339250785" }
    ]
  },
  {
    id: "quicktalk",
    title: "QUICKTALK",
    whatsappLink: "https://chat.whatsapp.com/Lgby2njOCKB7bi5n8vSY4D",
    description: "The event consists of three exciting rounds, where participants must respond quickly and speak without hesitation. Each round increases in difficulty, focusing on speed, accuracy, and fluency. Participants who fail to follow the rules in any round will be eliminated. The final round tests continuous speaking ability, and the best or last remaining participant will be declared the winner.",
    slogan: "Let your words dance before silence catches them.",
    category: EventCategory.NON_TECHNICAL,
    maxMembers: 1,
    fee: 150,
    prize: "Certificate + Cash Prize",
    timing: "TBD",
    image: "https://images.unsplash.com/photo-1475721027486-4c7a29c991f3?auto=format&fit=crop&q=80&w=800",
    rounds: [
      {
        name: "ROUND 1, 2, & 3",
        details: "The event consists of three rounds, with elimination in each round. Round 3 tests continuous speaking ability."
      }
    ],
    rules: [
      "This is an individual participation event.",
      "The event consists of three rounds, with elimination in each round.",
      "Participants must respond within the given time limit.",
      "No pause, repetition, or incorrect response is allowed.",
      "Participants must speak clearly and confidently in English.",
      "The judges’ decision will be final and binding."
    ],
    coordinators: [
      { name: "Bharath PS", phone: "9095343275" }
    ]
  },
  {
    id: "prompt-writing",
    title: "PROMPT WRITING SKILLS",
    whatsappLink: "https://chat.whatsapp.com/Ed4DsYtmiKfCbzSVyDKMHd",
    description: "Prompt Writing Skills is a creative non-technical event where participants work in teams of two to design effective prompts that guide Artificial Intelligence tools to generate accurate, creative, and meaningful outputs. The event focuses on imagination, clarity of thought, teamwork, and language skills rather than technical knowledge. Participants will analyze given problem statements and collaboratively frame prompts that clearly define context, tone, and constraints to achieve the desired AI-generated result.",
    slogan: "Where words whisper and intelligence listens.",
    category: EventCategory.NON_TECHNICAL,
    maxMembers: 2,
    fee: 150,
    prize: "Certificate + Cash Prize",
    timing: "TBD",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    rounds: [
      {
        name: "MULTI-ROUND CHALLENGE",
        details: "The event consists of multiple rounds based on prompt-writing challenges. Teams must write prompts according to the given problem statement."
      }
    ],
    rules: [
      "1.Participation is team-based, with 2 members per team.",
      "2.The event consists of multiple rounds based on prompt-writing challenges.",
      "3.Teams must write prompts according to the given problem statement.",
      "4.Prompts should be clear, precise, and well-structured.",
      "5.Teams may discuss among themselves, but external assistance is not allowed.",
      "6.No technical or coding knowledge is required.",
      "7.Use of mobile phones or AI tools is not allowed unless permitted by the event coordinators.",
      "8.Each round will have a fixed time limit, which must be strictly followed.",
      "9.Judges will evaluate based on clarity, creativity, structure, and effectiveness."
    ],
    coordinators: [
      { name: "Sriram P", phone: "8778743292" }
    ]
  },
  {
    id: "analog-edge",
    title: "ANALOG EDGE",
    whatsappLink: "https://chat.whatsapp.com/FiPNsYv95y4GMWzAlnh51e",
    description: "Analog edge is a challenge where signals, circuits, and logic collide. Participants must break down analog problems by observing patterns, identifying faults, and predicting circuit behavior. It’s a test of how well you can think on your feet and apply concepts in real time. No shortcuts—only clear thinking earns you the edge.",
    slogan: "No shortcuts—only clear thinking earns you the edge.",
    category: EventCategory.TECHNICAL,
    maxMembers: 2,
    fee: 250,
    prize: "Certificate + Cash Prize",
    timing: "TBD",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800",
    rounds: [
      {
        name: "ROUND 1: ANALOG BASICS & FAULT HUNT",
        details: "Number of questions: 15. Question type: Fault identification in analog circuits and Basic analog electronics concepts. Mode: Pen and paper / printed questions. Time: 45 minutes."
      },
      {
        name: "ROUND 2: CODE-TO-CIRCUIT INTERPRETATION",
        details: "Questions: 5. Focus: Analyze code, interpret MATLAB/waveforms, identify circuit behavior, suggest corrections. Mode: Laptop only (viewing code/waveforms). Time: 50 minutes."
      }
    ],
    rules: [
      "Team size: Maximum 2 members per team",
      "Laptops are allowed only for viewing provided code/waveforms",
      "Mobile phones are strictly prohibited",
      "Internet access is not allowed",
      "All questions will be in English only",
      "Participants must follow time limits strictly",
      "The judges’ decision will be final and binding",
      "Certificates will be provided to all participants",
      "College ID card is mandatory"
    ],
    coordinators: [
      { name: "Arun N T", phone: "9842139399" }
    ]
  },
  {
    id: "reverse-coding",
    title: "REVERSE CODING",
    whatsappLink: "https://chat.whatsapp.com/LVgyPfUz4qO5GdgZYTjDhs",
    description: "Reverse Coding is a problem-solving method in which the final output is given. The task is to analyze the output, identify the underlying logic step by step, and then write the code or determine the inputs that produce that output.",
    slogan: "Logic is the bridge between output and code",
    category: EventCategory.TECHNICAL,
    maxMembers: 2,
    fee: 250,
    prize: "Certificate + Cash Prize",
    timing: "TBD",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    rounds: [
      {
        name: "Round 1: Elimination",
        details: "Focus will be on basic programs and fundamental logic. The program should generate the exact given output. Difficulty level: Easy to Medium. Time limit: Short."
      },
      {
        name: "Round 2: Final",
        details: "Teams will be given complex output-based problems. Focus will be on advanced patterns using nested loops, arrays, strings, and logic-based challenges. Difficulty level: Medium to Hard. Time limit: Longer than Round 1."
      }
    ],
    rules: [
      "Each team must have 2 members only.",
      "Participants must bring their own laptop.",
      "College ID card is mandatory for all participants.",
      "Any programming language can be used (C, C++, Java, Python, etc.).",
      "The program must produce the exact given output.",
      "Use of mobile phones, or external help is strictly prohibited.",
      "Solutions must be submitted within the given time limit.",
      "The judges’ decision will be final."
    ],
    coordinators: [
      { name: "Thilagesh.S", phone: "8300131258" }
    ]
  }
];

export const SPEAKERS: Speaker[] = [];

export const SCHEDULE: ScheduleItem[] = [
  { time: "08:30 AM", activity: "Registration & Breakfast", type: "General", venue: "Main Gate" },
  { time: "09:15 AM", activity: "Inauguration Ceremony", type: "Ceremony", venue: "Main Auditorium" },
  { time: "10:30 AM", activity: "Keynote Session", type: "Lecture", venue: "Main Auditorium" },
  { time: "11:30 AM", activity: "Events Begin", type: "Event", venue: "Respective Blocks" },
  { time: "01:00 PM", activity: "Lunch Break", type: "General", venue: "Food Court" },
  { time: "04:30 PM", activity: "Awards Ceremony", type: "Ceremony", venue: "Main Auditorium" }
];

export const SPONSORS: Sponsor[] = [
  { id: "sp1", name: "ABB", tier: "Title", logo: "https://picsum.photos/seed/abb/200/200" },
  { id: "sp2", name: "Siemens", tier: "Gold", logo: "https://picsum.photos/seed/siemens/200/200" }
];