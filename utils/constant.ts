import { WhyChooseItem , adminNavProps} from "./prop";
import {
  RiUserStarLine,
  RiBookOpenLine,
  RiToolsLine,
} from "react-icons/ri";
import {  MdOutlineDashboard,
  MdOutlineMenuBook,MdOutlinePeople, MdOutlineSchool,MdOutlinePayments,MdOutlineBarChart,MdOutlineSettings,MdOutlineReport,MdAdd,MdPending,MdArchive, MdCategory, MdAddLink} from "react-icons/md"
import { id } from "zod/v4/locales";



export const oasisNavLinks = [
    { name: "Home", path: "/" },
    {name: "Courses", path: "/courses"},
    {name: "About", path: "/about"},    
    {name: "Contact", path: "/contact"},
    {name: "Blog", path: ""},
    {name: "Resources", path: ""},    
]


export const oasisAdminNavLinks: adminNavProps[] = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: MdOutlineDashboard,
  },

  {
    name: "Courses",
    icon: MdOutlineMenuBook,
    children: [
      { name: "All Courses", path: "/admin/courses", icon: MdOutlineMenuBook },
      { name: "Pending Approval", path: "/admin/courses/pending", icon: MdPending },
      { name: "Archived", path: "/admin/courses/archived", icon: MdArchive },
      { name: "Categories", path: "/admin/courses/categories", icon: MdCategory },
    ],
  },

  {
    name: "Staff",
    icon: MdOutlinePeople,
    children: [
      { name: "All Staff", path: "/admin/staff", icon: MdOutlinePeople },
      { name: "Add Staff", path: "/admin/staff/create", icon: MdAdd },
    ],
  },

  {
    name: "Students",
    path: "/admin/students",
    icon: MdOutlineSchool,
  },

  {
    name: "Enrollment",
    path: "/admin/enrollment",
    icon: MdAddLink,
  },


   {
    name: "Messages",
    path: "/admin/messages",
    icon: MdOutlinePeople,
  },

  {
    name: "Finance",
    icon: MdOutlinePayments,
    children: [
      { name: "Transactions", path: "/admin/transactions", icon: MdOutlinePayments },
      { name: "Payouts", path: "/admin/payouts", icon: MdOutlinePayments },
    ],
  },

  {
    name: "Reports",
    path: "/admin/reports",
    icon: MdOutlineBarChart,
  },

  {
    name: "Settings",
    path: "/admin/settings",
    icon: MdOutlineSettings,
  },

  {
    name: "Moderation",
    path: "/admin/moderation",
    icon: MdOutlineReport,
  },
];



export const oasisStaffNavLinks: adminNavProps[] = [
  {
    name: "Dashboard",
    path: "/staff",
    icon: MdOutlineDashboard,
  },

  {
    name: "My Courses",
    icon: MdOutlineMenuBook,
    children: [
      { name: "All My Courses", path: "/staff/courses", icon: MdOutlineMenuBook },
      { name: "Create Course", path: "/staff/courses/create", icon: MdAdd },
      { name: "Draft Courses", path: "/staff/courses/drafts", icon: MdOutlineMenuBook },
      { name: "Pending Approval", path: "/staff/courses/pending", icon: MdPending },
    ],
  },

  {
    name: "My Students",
    path: "/staff/students",
    icon: MdOutlineSchool,
  },

  {
    name: "Analytics",
    path: "/staff/analytics",
    icon: MdOutlineBarChart,
  },

  {
    name: "Messages",
    path: "/staff/messages",
    icon: MdOutlinePeople,
  },

  {
    name: "Settings",
    path: "/staff/settings",
    icon: MdOutlineSettings,
  },
];



export const oasisSuccess =[
    {label: "Studnets", value: 50000},
    {label: "main questions", value: 1100},
    {label: "job placement", value: 1200},
    {label: "satisfaction", value: 5000},
    {label: "Years of Expereince", value: 10},
]

export const whyChooseOasis: WhyChooseItem[] = [
    {
    label: "Expert Instructors",
    value: "Learn from industry experts with real-world experience.",
    icon: RiUserStarLine,
  },
  {
    label: "Comprehensive Curriculum",
    value: "Our courses cover a wide range of topics to ensure you have the skills needed to succeed.",
    icon: RiBookOpenLine,
  },
  {
    label: "Hands-on Learning",
    value: "Engage in practical projects and exercises to apply your knowledge.",
    icon: RiToolsLine,
  },
    
]


export const oasisFeatures =[
  {title: "Tools For Teachers And Learners", content:"Class has a dynamic set of teaching tools built to be deployed and used during class. Teachers can handout assignments in real-time for students to complete and submit", img:"/images/stdbg.png"},

  {title: "Assessments, Quizzes, Tests", content:"Easily launch live assignments, quizzes, and tests.Student results are automatically entered in the online gradebook.", img:"/images/city.png"},

  {title: "Class Management Tools for Educators", content:"Class provides tools to help run and manage the class such as Class Roster, Attendance, and more. With the Gradebook, teachers can review and grade tests and quizzes in real-time.", img:"/images/stats.png"},
]

export const courses = [
  {
    id: "1",
    title: "Web Development",
    description: "Learn HTML, CSS, JS and React.",
    image: "/images/webdevelopment.jpg",
    price: "free",
  },
  {
    id: "2",
    title: "Data Science",
    description: "Master Python & Machine Learning.",
    image: "/images/data.webp",
    price: "free",
  },
  {
    id: "2",
    title: "Python Programming",
    description: "Master Python & Machine Learning.",
    image: "/images/python.webp",
    price: "free",
  },
  {
    id: "2",
    title: "Cyber Security",
    description: "Learning attacks on web servers.",
    image: "/images/cyber.webp",
    price: "free",
  },

   {
    id: "2",
    title: "Mobile Development",
    description: "Learn to build mobile apps for iOS and Android.",
    image: "/images/uiux.png",
    price: "free",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Gloria Rose",
    message:
      "Thank you so much for your help. It's exactly what I've been looking for.",
    image: "/images/smillingwoman.png",
    rating: 5,
  },
  {
    id: "2",
    name: "Miracle Sith",
    message:
      "I love the courses! The instructors are knowledgeable and the content is engaging.",
    image: "/images/smith.webp",
    rating: 4,
  },
];

export const oasisAboutFeatures = [
  {
    id: 1,
    title: "Practical, Hands-On ICT Training",
    description:
      "We focus on practical, real-world learning that equips students with job-ready digital and technology skills.",
  },
  {
    id: 2,
    title: "Combination of Training and ICT Solutions",
    description:
      "Integrated Oasis provides both ICT training and professional technology services, allowing learners to gain experience from real industry projects.",
  },
  
  {
    id: 3,
    title: "Development of Industry-Ready Skills",
    description:
      "Our programs are designed to equip individuals with competencies needed for careers in areas such as cybersecurity, data analytics, software development, cloud computing, and other digital technologies.",
  },
  {
    id: 4,
    title: "Student and Client-Centered Approach",
    description:
      "We prioritize the success and satisfaction of our students and clients by delivering high-quality training and reliable ICT solutions.",
  },
  
];


export const faqs = [
  {
    id: 1,
    question: "What is Integrated Oasis ?",
    answer:
      "Oasis Tech School is a modern training institute focused on equipping students with practical, in-demand tech skills such as software development, UI/UX design, and digital product building.",
  },
  {
    id: 2,
    question: "What courses do you offer?",
    answer:
      "We offer courses in Frontend & Backend Development, Fullstack Web Development, Mobile App Development, UI/UX Design, CyberSecurity, Cloud Computing, Digital Marketing, Data Analysis and many more.",
  },
  {
    id: 3,
    question: "Do I need prior experience to enroll?",
    answer:
      "No. Our programs are beginner-friendly and designed to take you from zero knowledge to industry-ready level.",
  },
  {
    id: 4,
    question: "How long are the programs?",
    answer:
      "Course durations vary depending on the track, typically ranging from 8 weeks to 6 months.",
  },
  {
    id: 5,
    question: "Are classes online or physical?",
    answer:
      "We offer fully online classes, physical classes (depending on location), and hybrid learning options.",
  },
  {
    id: 6,
    question: "Will I receive a certificate after completion?",
    answer:
      "Yes, students receive a certificate upon successfully completing their program and meeting all requirements.",
  },
  {
    id: 7,
    question: "Do you offer job placement or internship opportunities?",
    answer:
      "We provide career guidance, portfolio building support, internship opportunities (where available), and job readiness training.",
  },
  {
    id: 8,
    question: "What tools and technologies will I learn?",
    answer:
      "Students will work with modern tools such as JavaScript, TypeScript, React, Next.js, Node.js, Express, PostgreSQL, and Figma.",
  },
  {
    id: 9,
    question: "How much does it cost?",
    answer:
      "Tuition varies depending on the course. Flexible payment plans may also be available.",
  },
  {
    id: 10,
    question: "Can I pay in installments?",
    answer:
      "Yes, we offer flexible installment payment options to make learning accessible.",
  },
  {
    id: 11,
    question: "Will I work on real projects?",
    answer:
      "Absolutely. Our programs are project-based, allowing you to build real-world applications for your portfolio.",
  },
  {
    id: 12,
    question: "What support will I get during the course?",
    answer:
      "You’ll receive mentor guidance, live classes, assignments with feedback, and access to a supportive learning community.",
  },
  {
    id: 13,
    question: "Do I need a laptop?",
    answer:
      "Yes, a laptop is required for all technical courses to enable hands-on learning.",
  },
  {
    id: 14,
    question: "How do I enroll?",
    answer:
      "You can enroll by filling out the registration form on our website or contacting our support team.",
  },
  {
    id: 15,
    question: "Is there an admission process?",
    answer:
      "Some programs may require a short screening or introductory session to assess your readiness.",
  },
  {
    id: 16,
    question: "Can I learn at my own pace?",
    answer:
      "Some courses offer flexible learning options, but most follow a structured schedule to ensure consistency and progress.",
  },
  {
    id: 17,
    question: "What makes Oasis Tech School different?",
    answer:
      "We focus on hands-on learning, industry-relevant curriculum, experienced instructors, and strong emphasis on practical skills and employability.",
  },
];