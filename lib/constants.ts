export const APP_NAME = "Panda Dojo"
export const APP_DESCRIPTION = "Sistema SaaS de Gestão para Academias de Artes Marciais"

export const PLANS = {
  STARTER: {
    name: "Starter",
    price: 97,
    maxStudents: 50,
    maxEvents: 5,
    features: [
      "Até 50 alunos",
      "5 eventos por mês",
      "Gestão de aulas e horários",
      "Check-in por QR Code",
      "Pagamentos básicos",
      "Landing page personalizada",
      "Suporte por email",
    ],
  },
  GROWTH: {
    name: "Growth",
    price: 197,
    maxStudents: 200,
    maxEvents: 15,
    features: [
      "Até 200 alunos",
      "15 eventos por mês",
      "Todos os recursos do Starter",
      "Sistema de leads avançado",
      "Notificações SMS/WhatsApp",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
  },
  PROFESSIONAL: {
    name: "Professional",
    price: 397,
    maxStudents: 500,
    maxEvents: 30,
    features: [
      "Até 500 alunos",
      "30 eventos por mês",
      "Todos os recursos do Growth",
      "IA para predição de churn",
      "Chatbot inteligente",
      "Campeonatos com chaveamento",
      "API access",
      "Suporte 24/7",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: 697,
    maxStudents: -1, // ilimitado
    maxEvents: -1,
    features: [
      "Alunos ilimitados",
      "Eventos ilimitados",
      "Todos os recursos do Professional",
      "White-label app",
      "Treinamento personalizado",
      "Gerente de conta dedicado",
      "SLA 99.9%",
    ],
  },
}

export const ADD_ONS = {
  ADVANCED_CHAMPIONSHIPS: {
    name: "Campeonatos Avançados",
    price: 99,
    description: "Chaveamento automático, placar ao vivo, transmissão",
  },
  AI_PREMIUM: {
    name: "IA Premium",
    price: 79,
    description: "Insights avançados, predições, recomendações personalizadas",
  },
  WHITE_LABEL_APP: {
    name: "App White-Label",
    price: 299,
    description: "Aplicativo mobile com sua marca na App Store e Play Store",
  },
  PRIORITY_SUPPORT: {
    name: "Suporte Prioritário",
    price: 149,
    description: "Atendimento 24/7 com tempo de resposta < 1h",
  },
  LIVE_STREAMING: {
    name: "Transmissão ao Vivo",
    price: 199,
    description: "Transmissão ilimitada de eventos e aulas",
  },
}

export const USER_ROLES = {
  SUPER_ADMIN: {
    name: "Super Admin",
    description: "Acesso total ao sistema (AnnITech)",
    permissions: ["*"],
  },
  ADMIN: {
    name: "Admin",
    description: "Dono da academia - acesso completo à gestão",
    permissions: [
      "manage_settings",
      "manage_users",
      "manage_students",
      "manage_instructors",
      "manage_classes",
      "manage_events",
      "manage_finances",
      "view_reports",
    ],
  },
  INSTRUCTOR: {
    name: "Instrutor",
    description: "Professor - visualiza alunos e gerencia aulas",
    permissions: [
      "view_students",
      "view_classes",
      "manage_attendance",
      "view_events",
      "view_schedule",
    ],
  },
  RECEPTIONIST: {
    name: "Recepcionista",
    description: "Atendimento - matrículas e check-in",
    permissions: [
      "manage_students",
      "manage_leads",
      "manage_enrollment",
      "manage_attendance",
      "view_schedule",
      "manage_payments",
    ],
  },
  STUDENT: {
    name: "Aluno",
    description: "Área pessoal do aluno",
    permissions: [
      "view_own_profile",
      "view_own_payments",
      "view_events",
      "register_for_events",
      "view_own_attendance",
    ],
  },
  GUARDIAN: {
    name: "Responsável",
    description: "Pais/tutores de alunos menores",
    permissions: [
      "view_child_profile",
      "view_child_payments",
      "view_child_attendance",
      "view_events",
    ],
  },
}

export const EVENT_TYPES = [
  { value: "CHAMPIONSHIP", label: "Campeonato", icon: "🏆" },
  { value: "WORKSHOP", label: "Workshop", icon: "🎓" },
  { value: "SEMINAR", label: "Seminário", icon: "📚" },
  { value: "BELT_EXAM", label: "Exame de Faixa", icon: "🥋" },
  { value: "SOCIAL", label: "Evento Social", icon: "🎉" },
  { value: "SPECIAL_CLASS", label: "Aula Especial", icon: "⭐" },
  { value: "OTHER", label: "Outro", icon: "📅" },
]

export const MODALITIES = [
  {
    name: "Jiu-Jitsu",
    description: "Arte marcial brasileira focada em técnicas de luta no chão",
    icon: "🥋",
  },
  {
    name: "Karatê",
    description: "Arte marcial japonesa com golpes de mão e pé",
    icon: "🥊",
  },
  {
    name: "Judô",
    description: "Arte marcial japonesa focada em arremessos e imobilizações",
    icon: "🤸",
  },
  {
    name: "Muay Thai",
    description: "Arte marcial tailandesa com uso de punhos, cotovelos, joelhos e canelas",
    icon: "🥊",
  },
  {
    name: "Taekwondo",
    description: "Arte marcial coreana conhecida por chutes altos e dinâmicos",
    icon: "🦶",
  },
  {
    name: "MMA",
    description: "Artes marciais mistas combinando várias técnicas de luta",
    icon: "🥊",
  },
  {
    name: "Boxe",
    description: "Arte nobre focada em golpes de punho",
    icon: "🥊",
  },
  {
    name: "Kung Fu",
    description: "Arte marcial chinesa com diversos estilos e filosofias",
    icon: "🐉",
  },
]

export const BELT_SYSTEMS = {
  "jiu-jitsu": [
    { name: "Branca", level: 1, color: "#FFFFFF" },
    { name: "Azul", level: 2, color: "#0000FF" },
    { name: "Roxa", level: 3, color: "#800080" },
    { name: "Marrom", level: 4, color: "#8B4513" },
    { name: "Preta", level: 5, color: "#000000" },
  ],
  "karate": [
    { name: "Branca", level: 1, color: "#FFFFFF" },
    { name: "Amarela", level: 2, color: "#FFFF00" },
    { name: "Laranja", level: 3, color: "#FFA500" },
    { name: "Verde", level: 4, color: "#008000" },
    { name: "Azul", level: 5, color: "#0000FF" },
    { name: "Marrom", level: 6, color: "#8B4513" },
    { name: "Preta", level: 7, color: "#000000" },
  ],
  "judo": [
    { name: "Branca", level: 1, color: "#FFFFFF" },
    { name: "Amarela", level: 2, color: "#FFFF00" },
    { name: "Laranja", level: 3, color: "#FFA500" },
    { name: "Verde", level: 4, color: "#008000" },
    { name: "Azul", level: 5, color: "#0000FF" },
    { name: "Marrom", level: 6, color: "#8B4513" },
    { name: "Preta", level: 7, color: "#000000" },
  ],
  "taekwondo": [
    { name: "Branca", level: 1, color: "#FFFFFF" },
    { name: "Branca Ponta Amarela", level: 2, color: "#FFFFFF" },
    { name: "Amarela", level: 3, color: "#FFFF00" },
    { name: "Amarela Ponta Verde", level: 4, color: "#FFFF00" },
    { name: "Verde", level: 5, color: "#008000" },
    { name: "Verde Ponta Azul", level: 6, color: "#008000" },
    { name: "Azul", level: 7, color: "#0000FF" },
    { name: "Azul Ponta Vermelha", level: 8, color: "#0000FF" },
    { name: "Vermelha", level: 9, color: "#FF0000" },
    { name: "Preta", level: 10, color: "#000000" },
  ],
}
